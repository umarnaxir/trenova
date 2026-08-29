import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto, { randomBytes } from 'crypto';
import prisma from '../lib/prisma';
import { validateCouponLogic } from '../services/coupon.service';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let calculatedTotal = 0;

    for (const item of items) {
      let product = await prisma.product.findUnique({
        where: { id: item.productId }
      });
      if (!product) {
        product = await prisma.product.findUnique({
          where: { slug: item.productId }
        });
      }
      if (!product && item.slug) {
        product = await prisma.product.findUnique({
          where: { slug: item.slug }
        });
      }
      if (!product) throw new Error(`Product not found: ${item.name || item.productId}`);

      const sizeStockObj: any = product.sizeStock || {};
      const availableStock = Number(sizeStockObj[item.size] || 0);

      if (availableStock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name} (Size: ${item.size})`);
      }

      calculatedTotal += product.price * item.quantity;
    }

    let finalTotal = calculatedTotal;

    if (couponCode) {
      const normalized = String(couponCode).trim().toUpperCase();
      const coupon = await prisma.coupon.findUnique({ where: { code: normalized } });
      if (!coupon) throw new Error('Invalid coupon code');
      
      const validation = validateCouponLogic(coupon, calculatedTotal);
      if (!validation.valid) throw new Error(`Coupon invalid: ${validation.reason}`);
      
      finalTotal = validation.finalTotal;
    }

    // Shipping threshold (Free shipping on orders ₹500 and above, otherwise ₹79)
    const shipping = finalTotal >= 500 || items.length === 0 ? 0 : 79;
    const payableTotal = finalTotal + shipping;

    const options = {
      amount: Math.round(payableTotal * 100),
      currency: "INR",
      receipt: `TR-RCT-${Date.now().toString().slice(-6)}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: options.amount,
        keyId: RAZORPAY_KEY_ID
      }
    });
  } catch (error: any) {
    console.error("Create Razorpay Order Error:", error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create payment order' });
  }
};

/**
 * Idempotently places an order for a verified Razorpay transaction.
 * Prevents double-creation of orders and double-decrementing stock.
 */
export async function placeRazorpayOrder(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
  checkoutData: any;
}) {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, checkoutData } = params;

  // Idempotency check: return existing order if already created
  const existingOrder = await prisma.order.findUnique({
    where: { razorpayOrderId },
    include: { items: true },
  });

  if (existingOrder) {
    return existingOrder;
  }

  const { userId, userEmail, fullName, phone, line1, city, state, postalCode, country, items, couponCode } = checkoutData;
  const orderNumber = `TR-${Date.now().toString().slice(-6)}-${randomBytes(2).toString('hex').toUpperCase()}`;

  return await prisma.$transaction(async (tx) => {
    // Re-verify existing order inside transaction for strict concurrency isolation
    const doubleCheck = await tx.order.findUnique({ where: { razorpayOrderId } });
    if (doubleCheck) return doubleCheck;

    let calculatedTotal = 0;
    const orderItemsToCreate = [];

    for (const item of items) {
      let product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        product = await tx.product.findUnique({ where: { slug: item.productId } });
      }
      if (!product && item.slug) {
        product = await tx.product.findUnique({ where: { slug: item.slug } });
      }
      if (!product) throw new Error(`Product not found: ${item.name || item.productId}`);

      const sizeStockObj: any = product.sizeStock || {};
      const availableStock = Number(sizeStockObj[item.size] || 0);

      if (availableStock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      sizeStockObj[item.size] = availableStock - item.quantity;
      const newTotalStock = product.stock - item.quantity;

      await tx.product.update({
        where: { id: product.id },
        data: { sizeStock: sizeStockObj, stock: Math.max(0, newTotalStock) }
      });

      calculatedTotal += product.price * item.quantity;

      orderItemsToCreate.push({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: item.image || (product.images as any)?.front || '',
        size: item.size,
        color: item.color,
        price: product.price,
        quantity: item.quantity
      });
    }

    let finalTotal = calculatedTotal;
    let appliedDiscount = 0;
    let couponIdToLog: string | null = null;

    if (couponCode) {
      const normalized = String(couponCode).trim().toUpperCase();
      const coupon = await tx.coupon.findUnique({ where: { code: normalized } });
      if (coupon) {
        const validation = validateCouponLogic(coupon, calculatedTotal);
        if (validation.valid) {
          if (coupon.maxUses !== null) {
            await tx.coupon.updateMany({
              where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
              data: { usedCount: { increment: 1 } }
            });
          } else {
            await tx.coupon.update({
              where: { id: coupon.id },
              data: { usedCount: { increment: 1 } }
            });
          }
          finalTotal = validation.finalTotal;
          appliedDiscount = validation.discountAmount;
          couponIdToLog = coupon.id;
        }
      }
    }

    const shipping = finalTotal >= 500 || items.length === 0 ? 0 : 79;
    const payableTotal = finalTotal + shipping;

    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        userId,
        userEmail,
        fullName,
        phone,
        line1,
        city,
        state,
        postalCode,
        country: country || 'India',
        subtotal: calculatedTotal,
        discount: appliedDiscount,
        shipping,
        total: payableTotal,
        couponCode: couponCode ? String(couponCode).trim().toUpperCase() : null,
        paymentMethod: 'RAZORPAY',
        status: 'CONFIRMED',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature: razorpaySignature || null,
        items: { create: orderItemsToCreate }
      },
      include: { items: true }
    });

    if (couponIdToLog) {
      await tx.couponRedemption.create({
        data: {
          couponId: couponIdToLog,
          orderId: newOrder.id,
          userId: userId || null,
          discountApplied: appliedDiscount,
        }
      }).catch(() => {});
    }

    return newOrder;
  }, { maxWait: 10000, timeout: 25000 });
}

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      checkoutData
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !checkoutData) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    const order = await placeRazorpayOrder({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      checkoutData
    });

    res.status(200).json({ success: true, message: 'Payment verified and order placed', data: order });
  } catch (error: any) {
    console.error("Verify Payment Error:", error);
    res.status(400).json({ success: false, message: error.message || 'Payment verification failed' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'] as string;
    
    if (!webhookSignature) {
      return res.status(400).json({ status: 'error', message: 'Missing signature' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== webhookSignature) {
      return res.status(400).json({ status: 'error', message: 'Invalid webhook signature' });
    }

    const event = req.body.event;

    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;
      const checkoutData = payment.notes || {};

      if (razorpayOrderId && checkoutData.items) {
        await placeRazorpayOrder({
          razorpayOrderId,
          razorpayPaymentId,
          checkoutData: typeof checkoutData.items === 'string' ? JSON.parse(checkoutData.items) : checkoutData
        });
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Razorpay Webhook Error:', error);
    res.status(500).json({ status: 'error' });
  }
};

