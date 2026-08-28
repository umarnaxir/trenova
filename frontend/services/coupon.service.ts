import { API_URL } from "@/lib/api";
import { getAdminCoupons } from "@/services/admin.service";

export type ValidateCouponResponse = {
  valid: boolean;
  discountAmount: number;
  finalTotal: number;
  reason?: string;
  error?: string;
  coupon?: {
    code: string;
    description: string;
    type: "PERCENT" | "FIXED" | "percent" | "fixed";
    value: number;
    minOrder: number;
  };
};

export async function validateCoupon(
  code: string,
  cartTotal: number,
): Promise<ValidateCouponResponse> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return {
      valid: false,
      discountAmount: 0,
      finalTotal: cartTotal,
      reason: "Enter a coupon code",
      error: "Enter a coupon code",
    };
  }

  try {
    const res = await fetch(`${API_URL}/coupons/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: normalized, cartTotal }),
    });

    const json = await res.json();
    if (res.ok && json.success && json.data) {
      if (json.data.valid && json.data.coupon) {
        return {
          ...json.data,
          error: undefined,
        };
      }
      if (json.data.valid === false) {
        return {
          ...json.data,
          error: json.data.reason || "Invalid coupon code",
        };
      }
    }
  } catch {
    // API network fetch failed, fallback to client store below
  }

  try {
    const allCoupons = await getAdminCoupons();
    let found = allCoupons.find(
      (c) => c.code.toUpperCase() === normalized && c.isActive,
    );

    if (!found && normalized === "TRENOVA10") {
      found = allCoupons.find((c) => c.code.toUpperCase() === "WELCOME10") || {
        id: "cpn-trenova10",
        code: "TRENOVA10",
        description: "10% off welcome discount",
        type: "PERCENT",
        value: 10,
        minOrder: 500,
        isActive: true,
      };
    }

    if (!found) {
      return {
        valid: false,
        discountAmount: 0,
        finalTotal: cartTotal,
        reason: "Invalid coupon code",
        error: "Invalid coupon code",
      };
    }

    const minOrder = Number(found.minOrder || 0);
    if (cartTotal < minOrder) {
      const msg = `Minimum order amount of ₹${minOrder.toLocaleString("en-IN")} required`;
      return {
        valid: false,
        discountAmount: 0,
        finalTotal: cartTotal,
        reason: "MinOrderNotMet",
        error: msg,
      };
    }

    let discount = 0;
    const typeUpper = String(found.type).toUpperCase();
    if (typeUpper === "PERCENT") {
      discount = Math.round((cartTotal * Number(found.value)) / 100);
      if (
        found.maxDiscountAmount &&
        discount > Number(found.maxDiscountAmount)
      ) {
        discount = Number(found.maxDiscountAmount);
      }
    } else {
      discount = Math.min(cartTotal, Number(found.value));
    }

    return {
      valid: true,
      discountAmount: discount,
      finalTotal: Math.max(0, cartTotal - discount),
      coupon: {
        code: found.code,
        description:
          found.description ||
          `${found.value}${typeUpper === "PERCENT" ? "%" : " ₹"} off`,
        type: typeUpper as any,
        value: Number(found.value),
        minOrder,
      },
    };
  } catch {
    return {
      valid: false,
      discountAmount: 0,
      finalTotal: cartTotal,
      reason: "Invalid coupon code",
      error: "Invalid coupon code",
    };
  }
}
