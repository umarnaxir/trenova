import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { randomBytes } from 'crypto';
import { validateCouponLogic } from '../services/coupon.service';

export const checkout = async (req: Request, res: Response) => {
  try {
    const { userId, userEmail, fullName, phone, line1, city, state, postalCode, country, items, total, paymentMethod, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderNumber = `TR-${Date.now().toString().slice(-6)}-${randomBytes(2).toString('hex').toUpperCase()}`;

    const order = await prisma.$transaction(async (tx) => {
      let calculatedTotal = 0;
      const orderItemsToCreate = [];

      for (const item of items) {
        let product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          product = await tx.product.findUnique({
            where: { slug: item.productId }
          });
        }

        if (!product && item.slug) {
          product = await tx.product.findUnique({
            where: { slug: item.slug }
          });
        }

        if (!product) {
          throw new Error(`Product not found: ${item.name || item.productId}`);
        }

        const sizeStockObj: any = product.sizeStock || {};
        const availableStock = Number(sizeStockObj[item.size] || 0);

        if (availableStock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name} (Size: ${item.size}). Available: ${availableStock}`);
        }

        sizeStockObj[item.size] = Math.max(0, availableStock - item.quantity);
        const newTotalStock = product.stock - item.quantity;

        await tx.product.update({
          where: { id: product.id },
          data: {
            sizeStock: sizeStockObj,
            stock: newTotalStock < 0 ? 0 : newTotalStock
          }
        });

        const priceToUse = product.price;
        calculatedTotal += priceToUse * item.quantity;

        orderItemsToCreate.push({
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          productImage: item.image || (product.images as any)?.front || '',
          size: item.size,
          color: item.color,
          price: priceToUse,
          quantity: item.quantity
        });
      }

      let finalTotal = calculatedTotal;
      let appliedDiscount = 0;
      let couponIdToLog: string | null = null;

      if (couponCode) {
        const normalized = String(couponCode).trim().toUpperCase();
        const coupon = await tx.coupon.findUnique({ where: { code: normalized } });
        
        if (!coupon) {
          throw new Error('Invalid coupon code');
        }

        const validation = validateCouponLogic(coupon, calculatedTotal);
        if (!validation.valid) {
          throw new Error(`Coupon no longer valid: ${validation.reason}`);
        }

        // Conditionally increment usedCount
        if (coupon.maxUses !== null) {
          const updatedCoupon = await tx.coupon.updateMany({
            where: {
              id: coupon.id,
              usedCount: { lt: coupon.maxUses }
            },
            data: { usedCount: { increment: 1 } }
          });
          
          if (updatedCoupon.count === 0) {
            throw new Error('Coupon max uses exceeded');
          }
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

      // Delivery charges: Free shipping on orders of ₹500 and above. Orders below ₹500 have ₹79 shipping charge.
      const calculatedShipping = (finalTotal >= 500 || items.length === 0) ? 0 : 79;
      const finalPayableTotal = finalTotal + calculatedShipping;

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
          shipping: calculatedShipping,
          total: finalPayableTotal,
          couponCode: couponCode ? String(couponCode).trim().toUpperCase() : null,
          paymentMethod: paymentMethod === 'RAZORPAY' ? 'RAZORPAY' : 'COD',
          status: 'PENDING',
          items: {
            create: orderItemsToCreate
          }
        },
        include: {
          items: true
        }
      });

      if (couponIdToLog) {
        await tx.couponRedemption.create({
          data: {
            couponId: couponIdToLog,
            orderId: newOrder.id,
            userId: userId || null,
            discountApplied: appliedDiscount
          }
        });
      }

      return newOrder;
    }, { maxWait: 10000, timeout: 25000 });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    res.status(400).json({ success: false, message: error.message || 'Failed to place order' });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const { orderNumber, email } = req.query;
    
    if (!orderNumber || !email) {
      return res.status(400).json({ success: false, message: 'Order number and email are required' });
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: {
          equals: String(orderNumber).trim(),
          mode: 'insensitive'
        },
        userEmail: {
          equals: String(email).trim(),
          mode: 'insensitive'
        }
      },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Track Order Error:", error);
    res.status(500).json({ success: false, message: 'Failed to track order' });
  }
};