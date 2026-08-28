import { createHmac, timingSafeEqual } from "crypto";

export function getRazorpayCredentials() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ?? "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";
  return {
    keyId,
    keySecret,
    configured: Boolean(keyId && keySecret),
  };
}

export async function createRazorpayOrder(input: {
  amountInr: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const { keyId, keySecret, configured } = getRazorpayCredentials();
  if (!configured) {
    throw new Error("Razorpay keys are not configured");
  }

  const amountPaise = Math.round(input.amountInr * 100);
  if (amountPaise < 100) {
    throw new Error("Order amount must be at least ₹1");
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: input.receipt.slice(0, 40),
      notes: input.notes ?? {},
    }),
  });

  const data = (await response.json()) as {
    id?: string;
    amount?: number;
    currency?: string;
    error?: { description?: string };
  };

  if (!response.ok || !data.id) {
    throw new Error(data.error?.description || "Failed to create Razorpay order");
  }

  return {
    id: data.id,
    amount: data.amount ?? amountPaise,
    currency: data.currency ?? "INR",
    keyId,
  };
}

export function verifyRazorpaySignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret, configured } = getRazorpayCredentials();
  if (!configured) return false;

  const body = `${input.orderId}|${input.paymentId}`;
  const expected = createHmac("sha256", keySecret).update(body).digest("hex");

  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(input.signature, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
