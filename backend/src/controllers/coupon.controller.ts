import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { validateCouponLogic } from '../services/coupon.service';

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, cartTotal } = req.body;
    const numericTotal = Number(cartTotal);
    if (!code || isNaN(numericTotal)) {
      return res.status(400).json({ success: false, message: 'Code and cartTotal are required' });
    }

    const normalizedCode = String(code).trim().toUpperCase();

    let coupon = await prisma.coupon.findFirst({
      where: { code: { equals: normalizedCode, mode: 'insensitive' } }
    });

    if (!coupon && (normalizedCode === 'TRENOVA10' || normalizedCode === 'WELCOME10')) {
      coupon = await prisma.coupon.findFirst({
        where: { code: { in: ['WELCOME10', 'TRENOVA10'], mode: 'insensitive' } }
      });
    }

    if (!coupon) {
      return res.status(200).json({
        success: true,
        data: {
          valid: false,
          discountAmount: 0,
          finalTotal: numericTotal,
          reason: 'Invalid coupon code'
        }
      });
    }

    const result = validateCouponLogic(coupon, numericTotal);
    
    return res.status(200).json({
      success: true,
      data: {
        ...result,
        coupon: {
          code: coupon.code,
          description: coupon.description,
          type: String(coupon.type).toUpperCase(),
          value: Number(coupon.value),
          minOrder: Number(coupon.minOrder || 0),
          maxDiscountAmount: coupon.maxDiscountAmount ? Number(coupon.maxDiscountAmount) : null,
        }
      }
    });
  } catch (error: any) {
    console.error('Validate Coupon Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to validate coupon' });
  }
};
