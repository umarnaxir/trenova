"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  CheckoutLayout,
  Panel,
} from "@/features/checkout/CheckoutForm.styles";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { formatCurrency } from "@/utils/format";
import { Flex } from "@/components/Flex/Flex";

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

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const clearCart = useCartStore((state) => state.clearCart);
  const pushToast = useUiStore((state) => state.pushToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: "upi",
    },
  });

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
      <form
        onSubmit={handleSubmit(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          clearCart();
          pushToast("Order placed successfully");
          router.push("/account/orders");
        })}
      >
        <Panel>
          <Text as="h2" variant="h3">
            Shipping details
          </Text>
          <Input label="Full name" error={errors.fullName?.message} {...register("fullName")} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
          <Input label="Address" error={errors.line1?.message} {...register("line1")} />
          <Flex gap={3} flexWrap="wrap">
            <Input label="City" error={errors.city?.message} {...register("city")} />
            <Input label="State" error={errors.state?.message} {...register("state")} />
            <Input
              label="PIN code"
              error={errors.postalCode?.message}
              {...register("postalCode")}
            />
          </Flex>
          <Select
            label="Payment method"
            options={[
              { label: "UPI", value: "upi" },
              { label: "Card", value: "card" },
              { label: "Cash on Delivery", value: "cod" },
            ]}
            error={errors.paymentMethod?.message}
            {...register("paymentMethod")}
          />
          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Placing order..." : `Pay ${formatCurrency(total)}`}
          </Button>
        </Panel>
      </form>

      <Panel>
        <Text as="h2" variant="h3">
          Your bag
        </Text>
        {items.map((item) => (
          <Flex key={`${item.productId}-${item.size}`} justifyContent="space-between">
            <Text fontSize="sm">
              {item.name} × {item.quantity}
            </Text>
            <Text fontSize="sm">
              {formatCurrency(item.price * item.quantity)}
            </Text>
          </Flex>
        ))}
        <Flex justifyContent="space-between">
          <Text fontWeight={600}>Total</Text>
          <Text fontWeight={600}>{formatCurrency(total)}</Text>
        </Flex>
      </Panel>
    </CheckoutLayout>
  );
}
