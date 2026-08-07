"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import {
  CartLayout,
  Line,
  LineActions,
  Summary,
  SummaryRow,
  Thumb,
} from "@/features/cart/CartView.styles";
import { Text } from "@/components/Text/Text";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { IconButton } from "@/components/IconButton/IconButton";
import { Flex } from "@/components/Flex/Flex";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { validateCoupon } from "@/services/coupon.service";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const coupon = useCartStore((state) => state.coupon);
  const setCoupon = useCartStore((state) => state.setCoupon);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const total = useCartStore((state) => state.total());
  const pushToast = useUiStore((state) => state.pushToast);
  const [code, setCode] = useState(coupon?.code ?? "");

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add premium essentials to begin checkout."
        actionLabel="Continue shopping"
        href="/shop"
      />
    );
  }

  return (
    <CartLayout>
      <div>
        {items.map((item) => (
          <Line key={`${item.productId}-${item.size}-${item.color}`}>
            <Thumb>
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
              />
            </Thumb>
            <div>
              <Text as="h2" variant="h3" mb={1}>
                <Link href={`/product/${item.slug}`}>{item.name}</Link>
              </Text>
              <Text variant="small" color="gray500" mb={3}>
                {item.color} / {item.size}
              </Text>
              <QuantityStepper
                value={item.quantity}
                max={item.maxStock}
                onChange={(quantity) =>
                  updateQuantity(item.productId, item.size, item.color, quantity)
                }
              />
            </div>
            <LineActions>
              <Text>{formatCurrency(item.price * item.quantity)}</Text>
              <IconButton
                label="Remove item"
                onClick={() => {
                  removeItem(item.productId, item.size, item.color);
                  pushToast("Item removed", "info");
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </LineActions>
          </Line>
        ))}
      </div>

      <Summary>
        <Text as="h2" variant="h3">
          Order summary
        </Text>
        <Flex gap={2} alignItems="flex-end">
          <Input
            label="Coupon"
            name="coupon"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="TRENOVA10"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              const result = await validateCoupon(code, subtotal);
              if (!result.coupon) {
                pushToast(result.error ?? "Invalid coupon", "error");
                setCoupon(null);
                return;
              }
              setCoupon(result.coupon);
              pushToast(`Coupon ${result.coupon.code} applied`);
            }}
          >
            Apply
          </Button>
        </Flex>
        <SummaryRow>
          <Text color="gray600">Subtotal</Text>
          <Text>{formatCurrency(subtotal)}</Text>
        </SummaryRow>
        <SummaryRow>
          <Text color="gray600">Discount</Text>
          <Text>-{formatCurrency(discount)}</Text>
        </SummaryRow>
        <SummaryRow>
          <Text fontWeight={600}>Total</Text>
          <Text fontWeight={600}>{formatCurrency(total)}</Text>
        </SummaryRow>
        <Button as="a" href="/checkout" fullWidth>
          Checkout
        </Button>
      </Summary>
    </CartLayout>
  );
}
