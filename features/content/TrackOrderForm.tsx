"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockOrders } from "@/services/mock/user";
import { Panel, StatusPillLike } from "@/features/content/TrackOrder.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { formatCurrency, formatDate } from "@/utils/format";

const schema = z.object({
  orderNumber: z.string().min(4, "Enter your order number"),
  email: z.string().email("Enter the email used at checkout"),
});

type FormValues = z.infer<typeof schema>;

type Result =
  | { ok: true; order: (typeof mockOrders)[number] }
  | { ok: false; message: string };

export function TrackOrderForm() {
  const [result, setResult] = useState<Result | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <Stack gap={5}>
      <Panel
        as="form"
        onSubmit={handleSubmit(async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 450));
          const order = mockOrders.find(
            (item) =>
              item.orderNumber.toLowerCase() ===
              values.orderNumber.trim().toLowerCase(),
          );
          if (!order) {
            setResult({
              ok: false,
              message:
                "We couldn’t find that order. Check the number and try again, or contact support.",
            });
            return;
          }
          setResult({ ok: true, order });
        })}
      >
        <Stack gap={4}>
          <Text color="gray600">
            Enter your order number and checkout email to view live status.
            Demo orders: TRN-10482, TRN-10511.
          </Text>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tracking..." : "Track order"}
          </Button>
        </Stack>
      </Panel>

      {result?.ok === false ? (
        <Panel>
          <Text style={{ color: "#B42318" }}>{result.message}</Text>
        </Panel>
      ) : null}

      {result?.ok ? (
        <Panel>
          <Stack gap={3}>
            <Text as="h3" variant="h3">
              {result.order.orderNumber}
            </Text>
            <StatusPillLike $tone={result.order.status}>
              {result.order.status}
            </StatusPillLike>
            <Text color="gray600">
              Placed on {formatDate(result.order.createdAt)} · Total{" "}
              {formatCurrency(result.order.total)}
            </Text>
            <Text color="gray600">
              Shipping to {result.order.shippingAddress.fullName},{" "}
              {result.order.shippingAddress.city}
            </Text>
            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
              {result.order.items.map((item) => (
                <li key={`${item.productId}-${item.size}`}>
                  {item.name} · {item.size} · Qty {item.quantity}
                </li>
              ))}
            </ul>
          </Stack>
        </Panel>
      ) : null}
    </Stack>
  );
}
