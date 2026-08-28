import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { validateCouponLogic } from '../services/coupon.service';

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code || typeof cartTotal !== 'number') {
      return res.status(400).json({ success: false, message: 'Code and cartTotal are required' });
    }

    const normalizedCode = String(code).trim().toUpperCase();

    let coupon = await prisma.coupon.findUnique({
      where: { code: normalizedCode }
    });

    if (!coupon && normalizedCode === 'TRENOVA10') {
      coupon = await prisma.coupon.findUnique({
        where: { code: 'WELCOME10' }
      });
    }

    if (!coupon) {
      return res.status(200).json({
        success: true,
        data: {
          valid: false,
          discountAmount: 0,
          finalTotal: Number(cartTotal),
          reason: 'Invalid coupon code'
        }
      });
    }

    const result = validateCouponLogic(coupon, cartTotal);
    
    res.status(200).json({
      success: true,
      data: {
        ...result,
        coupon: {
          code: coupon.code,
          description: coupon.description,
          type: coupon.type,
          value: Number(coupon.value),
          minOrder: Number(coupon.minOrder)
        }
      }
    });
  } catch (error) {
    console.error('Validate Coupon Error:', error);
    res.status(500).json({ success: false, message: 'Failed to validate coupon' });
  }
};
