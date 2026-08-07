import type { Coupon } from "@/types/cart";

export const coupons: Coupon[] = [
  {
    code: "TRENOVA10",
    description: "10% off your order",
    type: "percent",
    value: 10,
    minOrder: 1499,
  },
  {
    code: "GOLD500",
    description: "₹500 off orders above ₹3,999",
    type: "fixed",
    value: 500,
    minOrder: 3999,
  },
];
