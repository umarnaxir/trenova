import { validateCouponLogic } from '../coupon.service';
import { Coupon, CouponType, Prisma } from '@prisma/client';

function createMockCoupon(overrides: Partial<Coupon>): Coupon {
  return {
    id: 'test-id',
    code: 'TEST',
    description: null,
    type: CouponType.FIXED,
    value: new Prisma.Decimal(100),
    minOrder: new Prisma.Decimal(0),
    maxDiscountAmount: null,
    isActive: true,
    maxUses: null,
    usedCount: 0,
    expiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
}

describe('Coupon Validation Logic', () => {
  it('should validate a simple fixed coupon', () => {
    const coupon = createMockCoupon({ value: new Prisma.Decimal(100) });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toEqual({ valid: true, discountAmount: 100, finalTotal: 400 });
  });

  it('should return Invalid if inactive', () => {
    const coupon = createMockCoupon({ isActive: false });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toMatchObject({ valid: false, reason: 'Inactive' });
  });

  it('should return Expired if past expiresAt boundary', () => {
    const past = new Date(Date.now() - 1000); // 1 sec ago
    const coupon = createMockCoupon({ expiresAt: past });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toMatchObject({ valid: false, reason: 'Expired' });
  });

  it('should fail if minOrder exact boundary is not met', () => {
    const coupon = createMockCoupon({ minOrder: new Prisma.Decimal(500) });
    const res = validateCouponLogic(coupon, 499.99);
    expect(res).toMatchObject({ valid: false, reason: 'MinOrderNotMet' });
  });

  it('should pass if minOrder exact boundary is met', () => {
    const coupon = createMockCoupon({ minOrder: new Prisma.Decimal(500) });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toMatchObject({ valid: true, discountAmount: 100 });
  });

  it('should cap FIXED discount exceeding cart total', () => {
    const coupon = createMockCoupon({ type: CouponType.FIXED, value: new Prisma.Decimal(1000) });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toEqual({ valid: true, discountAmount: 500, finalTotal: 0 });
  });

  it('should cap PERCENT exceeding maxDiscountAmount', () => {
    const coupon = createMockCoupon({ type: CouponType.PERCENT, value: new Prisma.Decimal(50), maxDiscountAmount: new Prisma.Decimal(100) });
    const res = validateCouponLogic(coupon, 1000);
    // 50% of 1000 is 500, but capped at 100
    expect(res).toEqual({ valid: true, discountAmount: 100, finalTotal: 900 });
  });

  it('should fail if maxUses is reached', () => {
    const coupon = createMockCoupon({ maxUses: 5, usedCount: 5 });
    const res = validateCouponLogic(coupon, 500);
    expect(res).toMatchObject({ valid: false, reason: 'MaxUsesReached' });
  });
});
