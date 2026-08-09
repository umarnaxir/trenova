import type { Coupon } from "@/types/cart";
import { coupons } from "@/services/mock/coupons";

export async function validateCoupon(
  code: string,
  subtotal: number,
): Promise<{ coupon: Coupon | null; error?: string }> {
  const coupon = coupons.find(
    (item) => item.code.toLowerCase() === code.trim().toLowerCase(),
  );

  if (!coupon) {
    return { coupon: null, error: "Invalid coupon code" };
  }

  if (coupon.minOrder && subtotal < coupon.minOrder) {
    return {
      coupon: null,
      error: `Minimum order of ₹${coupon.minOrder.toLocaleString("en-IN")} required`,
    };
  }

  return { coupon };
}
