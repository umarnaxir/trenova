"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Building2,
  Check,
  Hash,
  Headset,
  Lock,
  Mail,
  Map,
  MapPin,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import {
  CheckoutLayout,
  CheckoutRoot,
  CouponApply,
  CouponApplied,
  CouponInput,
  CouponRow,
  Field,
  FieldError,
  FieldLabel,
  FormColumn,
  FormGrid,
  FormRow,
  FormRowTriple,
  GrandTotal,
  IconInput,
  LineActions,
  LineDetail,
  LineItem,
  LineList,
  LineMeta,
  LineName,
  LinePrice,
  LineThumb,
  LineTop,
  PageIntro,
  PageLead,
  PageTitle,
  PayButton,
  PaymentCopy,
  PaymentLeft,
  PaymentOption,
  PaymentOptions,
  PaymentRadio,
  QtyButton,
  QtyControl,
  QtyValue,
  RemoveButton,
  SectionCard,
  SectionHeader,
  SectionHeading,
  SectionTitle,
  SecureNote,
  SecurePill,
  ShippingNote,
  StepBadge,
  SummaryBody,
  SummaryHeader,
  SummaryPanel,
  TotalRow,
  Totals,
  TrustBar,
  TrustItem,
} from "@/features/checkout/CheckoutForm.styles";
import {
  CardBrandMarks,
  CodBrandMarks,
  UpiBrandMarks,
} from "@/features/checkout/PaymentBrandMarks";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
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

const TRUST = [
  { icon: Truck, title: "Free Shipping", copy: "On orders above ₹999" },
  { icon: RotateCcw, title: "Easy Returns", copy: "14 days return policy" },
  { icon: ShieldCheck, title: "Secure Payment", copy: "100% secure checkout" },
  { icon: Headset, title: "24/7 Support", copy: "We're here to help" },
] as const;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const cartTotal = useCartStore((state) => state.total());
  const coupon = useCartStore((state) => state.coupon);
  const setCoupon = useCartStore((state) => state.setCoupon);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
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
    <CheckoutRoot>
      <PageIntro>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <PageTitle>Checkout</PageTitle>
        <PageLead>
          Complete your purchase by providing your details and payment
          information.
        </PageLead>
      </PageIntro>

      <CheckoutLayout>
        <FormColumn>
          <form
            id="checkout-form"
            style={{ display: "grid", gap: "1.15rem" }}
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
            <SectionCard>
              <SectionHeader>
                <SectionHeading>
                  <StepBadge>1</StepBadge>
                  <SectionTitle>Shipping Details</SectionTitle>
                </SectionHeading>
                <SecurePill>
                  <Lock size={12} aria-hidden />
                  Secure & Confidential
                </SecurePill>
              </SectionHeader>

              <FormGrid>
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <IconInput $error={Boolean(errors.fullName)}>
                    <User size={16} aria-hidden />
                    <input
                      placeholder="Enter your full name"
                      aria-label="Full name"
                      {...register("fullName")}
                    />
                  </IconInput>
                  {errors.fullName?.message ? (
                    <FieldError>{errors.fullName.message}</FieldError>
                  ) : null}
                </Field>

                <FormRow>
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <IconInput $error={Boolean(errors.email)}>
                      <Mail size={16} aria-hidden />
                      <input
                        placeholder="you@email.com"
                        aria-label="Email"
                        type="email"
                        {...register("email")}
                      />
                    </IconInput>
                    {errors.email?.message ? (
                      <FieldError>{errors.email.message}</FieldError>
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <IconInput $error={Boolean(errors.phone)}>
                      <Phone size={16} aria-hidden />
                      <input
                        placeholder="10-digit mobile"
                        aria-label="Phone"
                        {...register("phone")}
                      />
                    </IconInput>
                    {errors.phone?.message ? (
                      <FieldError>{errors.phone.message}</FieldError>
                    ) : null}
                  </Field>
                </FormRow>

                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <IconInput $error={Boolean(errors.line1)}>
                    <MapPin size={16} aria-hidden />
                    <input
                      placeholder="House no, street, landmark"
                      aria-label="Address"
                      {...register("line1")}
                    />
                  </IconInput>
                  {errors.line1?.message ? (
                    <FieldError>{errors.line1.message}</FieldError>
                  ) : null}
                </Field>

                <FormRowTriple>
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    <IconInput $error={Boolean(errors.city)}>
                      <Building2 size={16} aria-hidden />
                      <input
                        placeholder="City"
                        aria-label="City"
                        {...register("city")}
                      />
                    </IconInput>
                    {errors.city?.message ? (
                      <FieldError>{errors.city.message}</FieldError>
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel>State</FieldLabel>
                    <IconInput $error={Boolean(errors.state)}>
                      <Map size={16} aria-hidden />
                      <input
                        placeholder="State"
                        aria-label="State"
                        {...register("state")}
                      />
                    </IconInput>
                    {errors.state?.message ? (
                      <FieldError>{errors.state.message}</FieldError>
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel>PIN Code</FieldLabel>
                    <IconInput $error={Boolean(errors.postalCode)}>
                      <Hash size={16} aria-hidden />
                      <input
                        placeholder="PIN"
                        aria-label="PIN code"
                        {...register("postalCode")}
                      />
                    </IconInput>
                    {errors.postalCode?.message ? (
                      <FieldError>{errors.postalCode.message}</FieldError>
                    ) : null}
                  </Field>
                </FormRowTriple>
              </FormGrid>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionHeading>
                  <StepBadge>2</StepBadge>
                  <SectionTitle>Payment Method</SectionTitle>
                </SectionHeading>
                <SecurePill>
                  <Lock size={12} aria-hidden />
                  100% Secure Payment
                </SecurePill>
              </SectionHeader>

              <PaymentOptions role="radiogroup" aria-label="Payment method">
                <PaymentOption
                  type="button"
                  $active={paymentMethod === "upi"}
                  role="radio"
                  aria-checked={paymentMethod === "upi"}
                  onClick={() =>
                    setValue("paymentMethod", "upi", { shouldValidate: true })
                  }
                >
                  <PaymentLeft>
                    <PaymentRadio $active={paymentMethod === "upi"} />
                    <PaymentCopy>
                      <strong>
                        UPI (Razorpay)
                        {paymentMethod === "upi" ? (
                          <Check
                            size={14}
                            style={{ marginLeft: 6, verticalAlign: "-2px" }}
                            aria-hidden
                          />
                        ) : null}
                      </strong>
                      <small>GPay, PhonePe, Paytm & more</small>
                    </PaymentCopy>
                  </PaymentLeft>
                  <UpiBrandMarks />
                </PaymentOption>

                <PaymentOption
                  type="button"
                  $active={paymentMethod === "card"}
                  role="radio"
                  aria-checked={paymentMethod === "card"}
                  onClick={() =>
                    setValue("paymentMethod", "card", { shouldValidate: true })
                  }
                >
                  <PaymentLeft>
                    <PaymentRadio $active={paymentMethod === "card"} />
                    <PaymentCopy>
                      <strong>
                        Card (Razorpay)
                        {paymentMethod === "card" ? (
                          <Check
                            size={14}
                            style={{ marginLeft: 6, verticalAlign: "-2px" }}
                            aria-hidden
                          />
                        ) : null}
                      </strong>
                      <small>Credit & debit cards</small>
                    </PaymentCopy>
                  </PaymentLeft>
                  <CardBrandMarks />
                </PaymentOption>

                <PaymentOption
                  type="button"
                  $active={paymentMethod === "cod"}
                  role="radio"
                  aria-checked={paymentMethod === "cod"}
                  onClick={() =>
                    setValue("paymentMethod", "cod", { shouldValidate: true })
                  }
                >
                  <PaymentLeft>
                    <PaymentRadio $active={paymentMethod === "cod"} />
                    <PaymentCopy>
                      <strong>
                        Cash on Delivery
                        {paymentMethod === "cod" ? (
                          <Check
                            size={14}
                            style={{ marginLeft: 6, verticalAlign: "-2px" }}
                            aria-hidden
                          />
                        ) : null}
                      </strong>
                      <small>Pay when your order arrives</small>
                    </PaymentCopy>
                  </PaymentLeft>
                  <CodBrandMarks />
                </PaymentOption>
              </PaymentOptions>

              <input type="hidden" {...register("paymentMethod")} />
              {errors.paymentMethod?.message ? (
                <FieldError>{errors.paymentMethod.message}</FieldError>
              ) : null}

              <PayButton type="submit" disabled={isSubmitting}>
                <Lock size={15} aria-hidden />
                {isSubmitting
                  ? paymentMethod === "cod"
                    ? "Placing order..."
                    : "Opening Razorpay..."
                  : paymentMethod === "cod"
                    ? `Place COD Order · ${formatCurrency(payable)}`
                    : `Pay with Razorpay · ${formatCurrency(payable)}`}
              </PayButton>
              <SecureNote>
                Your payment details are secure. We do not store your card or
                UPI information.
              </SecureNote>
            </SectionCard>
          </form>
        </FormColumn>

        <SummaryPanel>
          <SummaryHeader>
            <ShoppingBag size={16} aria-hidden />
            <h2>Order Summary</h2>
          </SummaryHeader>

          <SummaryBody>
            <LineList>
              {items.map((item) => (
                <LineItem
                  key={`${item.productId}-${item.size}-${item.color}`}
                >
                  <LineThumb>
                    <Image src={item.image} alt={item.name} fill sizes="64px" />
                  </LineThumb>
                  <LineMeta>
                    <LineTop>
                      <LineName>{item.name}</LineName>
                      <LinePrice>
                        {formatCurrency(item.price * item.quantity)}
                      </LinePrice>
                    </LineTop>
                    <LineDetail>
                      Size: {item.size} · Color: {item.color} · Qty:{" "}
                      {item.quantity}
                    </LineDetail>
                    <LineActions>
                      <QtyControl>
                        <QtyButton
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                        >
                          <Minus size={12} />
                        </QtyButton>
                        <QtyValue>{item.quantity}</QtyValue>
                        <QtyButton
                          type="button"
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                        >
                          <Plus size={12} />
                        </QtyButton>
                      </QtyControl>
                      <RemoveButton
                        type="button"
                        onClick={() => {
                          removeItem(item.productId, item.size, item.color);
                          pushToast("Item removed from order", "info");
                        }}
                      >
                        <Trash2 size={12} aria-hidden />
                        Remove
                      </RemoveButton>
                    </LineActions>
                  </LineMeta>
                </LineItem>
              ))}
            </LineList>

            {coupon ? (
              <CouponApplied>
                <div>
                  <strong>{coupon.code}</strong>
                  <small>{coupon.description}</small>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCoupon(null);
                    setCouponCode("");
                    pushToast("Coupon removed", "info");
                  }}
                >
                  Remove
                </button>
              </CouponApplied>
            ) : (
              <CouponRow>
                <CouponInput>
                  <Tag size={15} aria-hidden />
                  <input
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                  />
                </CouponInput>
                <CouponApply
                  type="button"
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
                </CouponApply>
              </CouponRow>
            )}

            <Totals>
              <TotalRow>
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </TotalRow>
              {discount > 0 ? (
                <TotalRow>
                  <span>Discount{coupon ? ` (${coupon.code})` : ""}</span>
                  <strong>-{formatCurrency(discount)}</strong>
                </TotalRow>
              ) : null}
              <TotalRow>
                <span>Shipping</span>
                <strong>
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </strong>
              </TotalRow>
              {shipping === 0 ? (
                <ShippingNote>
                  <Truck size={13} aria-hidden />
                  Free shipping on orders above ₹{FREE_SHIPPING_THRESHOLD}
                </ShippingNote>
              ) : (
                <ShippingNote style={{ color: "#6B6B6B" }}>
                  <Truck size={13} aria-hidden />
                  Add {formatCurrency(FREE_SHIPPING_THRESHOLD - cartTotal)} more
                  for free shipping
                </ShippingNote>
              )}
              <GrandTotal>
                <span>Total</span>
                <strong>{formatCurrency(payable)}</strong>
              </GrandTotal>
            </Totals>
          </SummaryBody>
        </SummaryPanel>
      </CheckoutLayout>

      <TrustBar>
        {TRUST.map(({ icon: Icon, title, copy }) => (
          <TrustItem key={title}>
            <Icon size={16} strokeWidth={1.75} aria-hidden />
            <div>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          </TrustItem>
        ))}
      </TrustBar>
    </CheckoutRoot>
  );
}
