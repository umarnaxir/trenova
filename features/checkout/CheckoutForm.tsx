"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  CheckoutLayout,
  CouponApplied,
  CouponRow,
  FormGrid,
  FormPanel,
  FormRow,
  FormRowTriple,
  LineDetail,
  LineItem,
  LineMeta,
  LineName,
  LinePrice,
  LineThumb,
  PanelTitle,
  PaymentCopy,
  PaymentOption,
  PaymentOptions,
  PaymentRadio,
  SecureNote,
  SummaryPanel,
  TotalRow,
  Totals,
} from "@/features/checkout/CheckoutForm.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { placeOrder } from "@/services/user.service";
import { validateCoupon } from "@/services/coupon.service";
import { openRazorpayCheckout } from "@/lib/razorpayClient";
import { formatCurrency } from "@/utils/format";
import { SITE } from "@/constants/site";

const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING = 79;

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  line1: z.string().min(3, "Enter address"),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  postalCode: z.string().min(5, "Enter PIN code"),
  paymentMethod: z.enum(["upi", "card", "cod"]),
});

type FormValues = z.infer<typeof schema>;

const paymentMethods = [
  {
    value: "upi" as const,
    title: "UPI (Razorpay)",
    description: "Pay instantly with GPay, PhonePe, Paytm or any UPI app.",
  },
  {
    value: "card" as const,
    title: "Card (Razorpay)",
    description: "Credit / debit cards secured by Razorpay.",
  },
  {
    value: "cod" as const,
    title: "Cash on Delivery",
    description: "Pay in cash when your order arrives.",
  },
];

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const cartTotal = useCartStore((state) => state.total());
  const coupon = useCartStore((state) => state.coupon);
  const setCoupon = useCartStore((state) => state.setCoupon);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const pushToast = useUiStore((state) => state.pushToast);
  const [couponCode, setCouponCode] = useState(coupon?.code ?? "");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const shipping =
    cartTotal >= FREE_SHIPPING_THRESHOLD || items.length === 0
      ? 0
      : FLAT_SHIPPING;
  const payable = cartTotal + shipping;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: "upi",
      fullName: user ? `${user.firstName} ${user.lastName}`.trim() : "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      line1: user?.addresses[0]?.line1 ?? "",
      city: user?.addresses[0]?.city ?? "",
      state: user?.addresses[0]?.state ?? "",
      postalCode: user?.addresses[0]?.postalCode ?? "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const completeOrder = async (values: FormValues, paymentId?: string) => {
    await placeOrder({
      userId: user?.id,
      userEmail: values.email,
      fullName: values.fullName,
      phone: values.phone,
      line1: values.line1,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      items,
      total: payable,
    });
    clearCart();
    pushToast(
      paymentId
        ? `Order placed · Payment ${paymentId.slice(0, 14)}…`
        : "Order placed successfully",
    );
    router.push("/account/orders");
  };

  const payWithRazorpay = async (values: FormValues) => {
    const createRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: payable,
        receipt: `trn_${Date.now()}`,
        notes: {
          email: values.email,
          phone: values.phone,
          method: values.paymentMethod,
        },
      }),
    });
    const created = (await createRes.json()) as {
      ok?: boolean;
      demo?: boolean;
      error?: string;
      order?: {
        id: string;
        amount: number;
        currency: string;
        keyId: string;
      };
    };

    // Demo fallback when keys are not configured yet
    if (createRes.status === 503 && created.demo) {
      const demoPaymentId = `demo_${values.paymentMethod}_${Date.now()}`;
      const verifyRes = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demo: true,
          razorpay_payment_id: demoPaymentId,
        }),
      });
      const verified = (await verifyRes.json()) as { ok?: boolean };
      if (!verified.ok) {
        throw new Error("Demo payment verification failed");
      }
      pushToast(
        "Razorpay demo mode — add keys in .env for live UPI checkout",
        "info",
      );
      await completeOrder(values, demoPaymentId);
      return;
    }

    if (!created.ok || !created.order) {
      throw new Error(created.error || "Could not start Razorpay payment");
    }

    await new Promise<void>((resolve, reject) => {
      void openRazorpayCheckout({
        key: created.order!.keyId,
        amount: created.order!.amount,
        currency: created.order!.currency,
        name: SITE.name,
        description: `Trenova order · ${formatCurrency(payable)}`,
        order_id: created.order!.id,
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone,
        },
        theme: { color: "#C6A75E" },
        method:
          values.paymentMethod === "upi"
            ? { upi: true, card: false, netbanking: false, wallet: false }
            : { upi: false, card: true, netbanking: true, wallet: false },
        onSuccess: (response) => {
          void (async () => {
            try {
              const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              const verified = (await verifyRes.json()) as {
                ok?: boolean;
                error?: string;
                paymentId?: string;
              };
              if (!verified.ok) {
                throw new Error(verified.error || "Payment verification failed");
              }
              await completeOrder(values, verified.paymentId);
              resolve();
            } catch (error) {
              reject(error);
            }
          })();
        },
        onDismiss: () => {
          reject(new Error("Payment cancelled"));
        },
      }).catch(reject);
    });
  };

  if (!items.length) {
    return (
      <EmptyState
        title="Nothing to checkout"
        description="Your cart is empty."
        actionLabel="Shop now"
        href="/shop"
      />
    );
  }

  return (
    <CheckoutLayout>
      <FormPanel
        as="form"
        onSubmit={handleSubmit(async (values) => {
          try {
            if (values.paymentMethod === "cod") {
              await completeOrder(values);
              return;
            }
            await payWithRazorpay(values);
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Could not place order";
            if (message !== "Payment cancelled") {
              pushToast(message, "error");
            } else {
              pushToast("Payment cancelled", "info");
            }
          }
        })}
      >
        <PanelTitle>Shipping details</PanelTitle>
        <FormGrid>
          <Input
            placeholder="Full name"
            aria-label="Full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <FormRow>
            <Input
              placeholder="Email"
              aria-label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              placeholder="Phone"
              aria-label="Phone"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </FormRow>
          <Input
            placeholder="Address"
            aria-label="Address"
            error={errors.line1?.message}
            {...register("line1")}
          />
          <FormRowTriple>
            <Input
              placeholder="City"
              aria-label="City"
              error={errors.city?.message}
              {...register("city")}
            />
            <Input
              placeholder="State"
              aria-label="State"
              error={errors.state?.message}
              {...register("state")}
            />
            <Input
              placeholder="PIN code"
              aria-label="PIN code"
              error={errors.postalCode?.message}
              {...register("postalCode")}
            />
          </FormRowTriple>
        </FormGrid>

        <PanelTitle>Payment</PanelTitle>
        <PaymentOptions role="radiogroup" aria-label="Payment method">
          {paymentMethods.map((method) => {
            const active = paymentMethod === method.value;
            return (
              <PaymentOption
                key={method.value}
                type="button"
                $active={active}
                role="radio"
                aria-checked={active}
                onClick={() =>
                  setValue("paymentMethod", method.value, {
                    shouldValidate: true,
                  })
                }
              >
                <PaymentRadio $active={active} aria-hidden />
                <PaymentCopy>
                  <strong>{method.title}</strong>
                  <small>{method.description}</small>
                </PaymentCopy>
              </PaymentOption>
            );
          })}
        </PaymentOptions>
        <input type="hidden" {...register("paymentMethod")} />
        {errors.paymentMethod?.message ? (
          <Text variant="small" style={{ color: "#B42318" }}>
            {errors.paymentMethod.message}
          </Text>
        ) : null}

        <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
          {isSubmitting
            ? paymentMethod === "cod"
              ? "Placing order..."
              : "Opening Razorpay..."
            : paymentMethod === "cod"
              ? `Place COD order · ${formatCurrency(payable)}`
              : `Pay with Razorpay · ${formatCurrency(payable)}`}
        </Button>
        <SecureNote>
          UPI & card payments are processed securely by Razorpay. COD skips
          online payment.
        </SecureNote>
      </FormPanel>

      <SummaryPanel>
        <PanelTitle>Order summary</PanelTitle>

        <div>
          {items.map((item) => (
            <LineItem key={`${item.productId}-${item.size}-${item.color}`}>
              <LineThumb>
                <Image src={item.image} alt={item.name} fill sizes="72px" />
              </LineThumb>
              <LineMeta>
                <LineName>{item.name}</LineName>
                <LineDetail>
                  Size {item.size} · {item.color}
                </LineDetail>
                <LineDetail>Qty {item.quantity}</LineDetail>
              </LineMeta>
              <LinePrice>
                {formatCurrency(item.price * item.quantity)}
              </LinePrice>
            </LineItem>
          ))}
        </div>

        {coupon ? (
          <CouponApplied>
            <div>
              <strong>{coupon.code}</strong>
              <small>{coupon.description}</small>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setCoupon(null);
                setCouponCode("");
                pushToast("Coupon removed", "info");
              }}
            >
              Remove
            </Button>
          </CouponApplied>
        ) : (
          <CouponRow>
            <Input
              placeholder="Coupon code"
              aria-label="Coupon code"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
            />
            <Button
              type="button"
              variant="secondary"
              disabled={applyingCoupon || !couponCode.trim()}
              onClick={async () => {
                setApplyingCoupon(true);
                try {
                  const result = await validateCoupon(couponCode, subtotal);
                  if (!result.coupon) {
                    pushToast(result.error ?? "Invalid coupon", "error");
                    setCoupon(null);
                    return;
                  }
                  setCoupon(result.coupon);
                  setCouponCode(result.coupon.code);
                  pushToast(`Coupon ${result.coupon.code} applied`);
                } finally {
                  setApplyingCoupon(false);
                }
              }}
            >
              {applyingCoupon ? "..." : "Apply"}
            </Button>
          </CouponRow>
        )}

        <Totals>
          <TotalRow>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </TotalRow>
          {discount > 0 ? (
            <TotalRow>
              <span>Discount{coupon ? ` (${coupon.code})` : ""}</span>
              <span>-{formatCurrency(discount)}</span>
            </TotalRow>
          ) : null}
          <TotalRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
          </TotalRow>
          {shipping === 0 ? (
            <Text variant="small" color="gray500">
              Free shipping on orders above ₹{FREE_SHIPPING_THRESHOLD}
            </Text>
          ) : (
            <Text variant="small" color="gray500">
              Add {formatCurrency(FREE_SHIPPING_THRESHOLD - cartTotal)} more for
              free shipping
            </Text>
          )}
          <TotalRow $strong>
            <span>Total</span>
            <span>{formatCurrency(payable)}</span>
          </TotalRow>
        </Totals>
      </SummaryPanel>
    </CheckoutLayout>
  );
}
