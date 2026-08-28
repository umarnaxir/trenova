import type { AdminCoupon } from "@/types/admin";

export const coupons: AdminCoupon[] = [
  {
    id: "cpn-welcome10",
    code: "WELCOME10",
    description: "10% off your first order",
    type: "PERCENT",
    value: 10,
    minOrder: 0,
    isActive: true,
    usedCount: 14,
  },
  {
    id: "cpn-trenova10",
    code: "TRENOVA10",
    description: "10% off welcome discount",
    type: "PERCENT",
    value: 10,
    minOrder: 0,
    isActive: true,
    usedCount: 22,
  },
  {
    id: "cpn-flat500",
    code: "FLAT500",
    description: "Flat ₹500 off on orders over ₹1000",
    type: "FIXED",
    value: 500,
    minOrder: 1000,
    isActive: true,
    usedCount: 8,
  },
];
