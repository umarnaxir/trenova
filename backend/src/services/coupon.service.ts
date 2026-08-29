export type CouponValidationResult = 
  | { valid: true; discountAmount: number; finalTotal: number }
  | { valid: false; discountAmount: number; finalTotal: number; reason: string };

export function validateCouponLogic(coupon: any, cartTotal: number): CouponValidationResult {
  if (!coupon.isActive) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'This coupon is inactive' };
  }

  if (coupon.expiresAt) {
    const expiryDate = new Date(coupon.expiresAt);
    if (!isNaN(expiryDate.getTime()) && new Date() > expiryDate) {
      return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'This coupon has expired' };
    }
  }

  if (coupon.maxUses !== null && coupon.maxUses !== undefined && Number(coupon.usedCount || 0) >= Number(coupon.maxUses)) {
    return { valid: false, discountAmount: 0, finalTotal: cartTotal, reason: 'Coupon usage limit reached' };
  }

  const minOrderNum = Number(coupon.minOrder || 0);
  if (cartTotal < minOrderNum) {
    return {
      valid: false,
      discountAmount: 0,
      finalTotal: cartTotal,
      reason: `Minimum order amount of ₹${minOrderNum.toLocaleString('en-IN')} required to apply this coupon`
    };
  }

  let discount = 0;
  const typeUpper = String(coupon.type || '').toUpperCase();
  if (typeUpper === 'FIXED') {
    discount = Number(coupon.value || 0);
  } else {
    // PERCENT
    discount = Math.round(cartTotal * (Number(coupon.value || 0) / 100));
    if (coupon.maxDiscountAmount !== null && coupon.maxDiscountAmount !== undefined) {
      const maxD = Number(coupon.maxDiscountAmount);
      if (maxD > 0 && discount > maxD) {
        discount = maxD;
      }
    }
  }

  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return { valid: true, discountAmount: discount, finalTotal: Math.max(0, cartTotal - discount) };
}
