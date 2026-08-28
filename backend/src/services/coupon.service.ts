import { Coupon } from '@prisma/client';

export type CouponValidationResult = 
  | { valid: true; discountAmount: number; finalTotal: number }
  | { valid: false; discountAmount: number; finalTotal: number; reason: string };

export function validateCouponLogic(coupon: Coupon, cartTotal: number): CouponValidationResult {
  if (!coupon.isActive) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'Inactive' };
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'Expired' };
  }

  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'MaxUsesReached' };
  }

  const minOrderNum = Number(coupon.minOrder);
  if (cartTotal < minOrderNum) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'MinOrderNotMet' };
  }

  let discount = 0;
  if (coupon.type === 'FIXED') {
    discount = Number(coupon.value);
  } else if (coupon.type === 'PERCENT') {
    discount = cartTotal * (Number(coupon.value) / 100);
    if (coupon.maxDiscountAmount !== null) {
      const maxD = Number(coupon.maxDiscountAmount);
      if (discount > maxD) {
        discount = maxD;
      }
    }
  }

  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return { valid: true, discountAmount: discount, finalTotal: cartTotal - discount };
}
