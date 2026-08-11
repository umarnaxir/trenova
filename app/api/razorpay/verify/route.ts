import { NextResponse } from "next/server";
import { getRazorpayCredentials, verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const { configured } = getRazorpayCredentials();
    const body = (await request.json()) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      demo?: boolean;
    };

    if (!configured && body.demo) {
      return NextResponse.json({
        ok: true,
        demo: true,
        paymentId: body.razorpay_payment_id || `demo_pay_${Date.now()}`,
      });
    }

    if (
      !body.razorpay_order_id ||
      !body.razorpay_payment_id ||
      !body.razorpay_signature
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing payment verification fields" },
        { status: 400 },
      );
    }

    const valid = verifyRazorpaySignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Payment verification failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      paymentId: body.razorpay_payment_id,
      orderId: body.razorpay_order_id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Verification failed",
      },
      { status: 500 },
    );
  }
}
