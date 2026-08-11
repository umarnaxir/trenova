"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Headphones,
  Mail,
  Package,
  PackageSearch,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getOrdersStore } from "@/services/mock/usersStore";
import type { Order, OrderStatus } from "@/types/user";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Input } from "@/components/Input/Input";
import { formatCurrency, formatDate } from "@/utils/format";
import {
  CardTitle,
  ErrorBanner,
  FormGrid,
  Hint,
  ItemList,
  ItemMeta,
  ItemPrice,
  ItemRow,
  ItemThumb,
  MetaCard,
  MetaGrid,
  OrderNumber,
  ResultHeader,
  SideActions,
  SideCard,
  SideLink,
  StatusPill,
  StepCopy,
  StepDot,
  SubmitButton,
  Timeline,
  TimelineStep,
  TrackCard,
  TrackIntro,
  TrackLayout,
  TrackLead,
  TrackRoot,
  TrackTitle,
} from "@/features/content/TrackOrder.styles";

const schema = z.object({
  orderNumber: z.string().min(4, "Enter your order number"),
  email: z.string().email("Enter the email used at checkout"),
});

type FormValues = z.infer<typeof schema>;

type Result =
  | { ok: true; order: Order }
  | { ok: false; message: string };

const STEPS: Array<{ key: OrderStatus; label: string; copy: string }> = [
  { key: "pending", label: "Order placed", copy: "We received your order" },
  { key: "confirmed", label: "Confirmed", copy: "Payment verified & packing" },
  { key: "shipped", label: "Shipped", copy: "On the way with courier" },
  { key: "delivered", label: "Delivered", copy: "Arrived at your door" },
];

function stepIndex(status: OrderStatus) {
  if (status === "cancelled") return -1;
  const index = STEPS.findIndex((step) => step.key === status);
  return index < 0 ? 0 : index;
}

export function TrackOrderForm() {
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const activeStep = useMemo(() => {
    if (!result || !result.ok) return 0;
    return stepIndex(result.order.status);
  }, [result]);

  return (
    <TrackRoot>
      <TrackIntro>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Track Order" },
          ]}
        />
        <TrackTitle>Track your order</TrackTitle>
        <TrackLead>
          Enter your order number and checkout email to see live status — from
          confirmed to delivered.
        </TrackLead>
      </TrackIntro>

      <TrackLayout>
        <div style={{ display: "grid", gap: "1.15rem" }}>
          <TrackCard
            as="form"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 450));
              const order = getOrdersStore().find(
                (item) =>
                  item.orderNumber.toLowerCase() ===
                    values.orderNumber.trim().toLowerCase() &&
                  item.userEmail?.toLowerCase() ===
                    values.email.trim().toLowerCase(),
              );
              if (!order) {
                setResult({
                  ok: false,
                  message:
                    "We couldn’t find that order. Check the number and email, then try again.",
                });
                return;
              }
              setResult({ ok: true, order });
            })}
          >
            <CardTitle>
              <PackageSearch size={16} aria-hidden />
              Order lookup
            </CardTitle>
            <Hint>
              Demo orders: TRN-10482 / TRN-10511 with the matching checkout
              email.
            </Hint>
            <FormGrid>
              <Input
                label="Order number"
                placeholder="e.g. TRN-10511"
                error={errors.orderNumber?.message}
                {...register("orderNumber")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                <Truck size={15} aria-hidden />
                {isSubmitting ? "Tracking..." : "Track order"}
              </SubmitButton>
            </FormGrid>
          </TrackCard>

          {result?.ok === false ? (
            <ErrorBanner>{result.message}</ErrorBanner>
          ) : null}

          {result?.ok ? (
            <>
              <TrackCard>
                <ResultHeader>
                  <OrderNumber>{result.order.orderNumber}</OrderNumber>
                  <StatusPill $tone={result.order.status}>
                    {result.order.status}
                  </StatusPill>
                </ResultHeader>

                <MetaGrid>
                  <MetaCard>
                    <span>Placed on</span>
                    <strong>{formatDate(result.order.createdAt)}</strong>
                  </MetaCard>
                  <MetaCard>
                    <span>Order total</span>
                    <strong>{formatCurrency(result.order.total)}</strong>
                  </MetaCard>
                </MetaGrid>

                {result.order.status === "cancelled" ? (
                  <Hint>This order was cancelled and will not be shipped.</Hint>
                ) : (
                  <Timeline>
                    {STEPS.map((step, index) => {
                      const done = activeStep > index;
                      const current = activeStep === index;
                      return (
                        <TimelineStep
                          key={step.key}
                          $done={done}
                          $current={current}
                        >
                          <StepDot $done={done || current} $current={current}>
                            {done || current ? <Check size={13} /> : index + 1}
                          </StepDot>
                          <StepCopy>
                            <strong>{step.label}</strong>
                            <span>{step.copy}</span>
                          </StepCopy>
                        </TimelineStep>
                      );
                    })}
                  </Timeline>
                )}
              </TrackCard>

              <TrackCard>
                <CardTitle>
                  <Package size={16} aria-hidden />
                  Items in this order
                </CardTitle>
                <ItemList>
                  {result.order.items.map((item) => (
                    <ItemRow
                      key={`${item.productId}-${item.size}-${item.color}`}
                    >
                      <ItemThumb>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                        />
                      </ItemThumb>
                      <ItemMeta>
                        <strong>{item.name}</strong>
                        <span>
                          Size {item.size} · {item.color} · Qty {item.quantity}
                        </span>
                      </ItemMeta>
                      <ItemPrice>
                        {formatCurrency(item.price * item.quantity)}
                      </ItemPrice>
                    </ItemRow>
                  ))}
                </ItemList>
                <Hint>
                  Shipping to {result.order.shippingAddress.fullName},{" "}
                  {result.order.shippingAddress.city}
                </Hint>
              </TrackCard>
            </>
          ) : null}
        </div>

        <SideCard>
          <CardTitle>
            <ShoppingBag size={16} aria-hidden />
            Need help?
          </CardTitle>
          <Hint>
            Signed-in customers can view every order, address, and wishlist in
            one place.
          </Hint>
          <SideActions>
            <SideLink href="/account/orders" data-primary="true">
              My orders
            </SideLink>
            <SideLink href="/cart">
              <ShoppingBag size={14} aria-hidden />
              View cart
            </SideLink>
            <SideLink href="/wishlist">Wishlist</SideLink>
            <SideLink href="/contact">
              <Headphones size={14} aria-hidden />
              Contact support
            </SideLink>
            <SideLink href="mailto:hello@trenova.in">
              <Mail size={14} aria-hidden />
              Email us
            </SideLink>
          </SideActions>
        </SideCard>
      </TrackLayout>
    </TrackRoot>
  );
}
