import { NextResponse } from "next/server";
import { createRazorpayOrder, getRazorpayCredentials } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const { configured } = getRazorpayCredentials();
    if (!configured) {
      return NextResponse.json(
        {
          ok: false,
          demo: true,
          error:
            "Razorpay is not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as {
      amount?: number;
      receipt?: string;
      notes?: Record<string, string>;
    };

    const amount = Number(body.amount ?? 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid amount" },
        { status: 400 },
      );
    }

    const order = await createRazorpayOrder({
      amountInr: amount,
      receipt: body.receipt || `trn_${Date.now()}`,
      notes: body.notes,
    });

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Could not create order",
      },
      { status: 500 },
    );
  }
}
