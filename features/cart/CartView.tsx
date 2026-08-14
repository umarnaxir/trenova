"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartItems,
  CartItemsHeader,
  CartLayout,
  ContinueLink,
  CouponHint,
  CouponRow,
  ItemCount,
  Line,
  LineActions,
  LineBody,
  LinePrice,
  MainColumn,
  Summary,
  SummaryRow,
  SummaryTotal,
  Thumb,
  TrendingAdd,
  TrendingCard,
  TrendingEyebrow,
  TrendingFooter,
  TrendingHeader,
  TrendingList,
  TrendingMeta,
  TrendingName,
  TrendingPanel,
  TrendingSub,
  TrendingThumb,
  TrendingTitle,
} from "@/features/cart/CartView.styles";
import { Text } from "@/components/Text/Text";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { IconButton } from "@/components/IconButton/IconButton";
import { Loader } from "@/components/Loader/Loader";
import { Price } from "@/components/Price/Price";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { validateCoupon } from "@/services/coupon.service";
import { formatCurrency } from "@/utils/format";
import { getSizeQty } from "@/utils/inventory";
import type { Product } from "@/types/product";

type CartViewProps = {
  suggestions?: Product[];
};

export function CartView({ suggestions = [] }: CartViewProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const coupon = useCartStore((state) => state.coupon);
  const setCoupon = useCartStore((state) => state.setCoupon);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const total = useCartStore((state) => state.total());
  const itemCount = useCartStore((state) => state.itemCount());
  const pushToast = useUiStore((state) => state.pushToast);
  const [code, setCode] = useState(coupon?.code ?? "");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const isClient = useIsClient();

  const visibleSuggestions = useMemo(() => {
    const inCart = new Set(items.map((item) => item.productId));
    return suggestions.filter((product) => !inCart.has(product.id)).slice(0, 5);
  }, [items, suggestions]);

  const addSuggestion = async (product: Product) => {
    if (addingId) return;
    const size =
      product.sizes.find((item) => getSizeQty(product, item) > 0) ??
      product.sizes[0];
    const color = product.colors[0]?.name ?? "Default";
    if (!size) {
      pushToast("This product is unavailable", "error");
      return;
    }
    setAddingId(product.id);
    await new Promise((resolve) => setTimeout(resolve, 220));
    addItem({ product, size, color, quantity: 1 });
    pushToast(`${product.name} added`, "success");
    setAddingId(null);
  };

  const applyCoupon = async () => {
    setApplyingCoupon(true);
    const result = await validateCoupon(code, subtotal);
    if (!result.coupon) {
      pushToast(result.error ?? "Invalid coupon", "error");
      setCoupon(null);
      setApplyingCoupon(false);
      return;
    }
    setCoupon(result.coupon);
    pushToast(`Coupon ${result.coupon.code} applied`);
    setApplyingCoupon(false);
  };

  if (!isClient) {
    return (
      <div style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
        <Loader />
      </div>
    );
  }

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
      <MainColumn>
        <CartItems>
          <CartItemsHeader>
            <ItemCount>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </ItemCount>
            <ContinueLink href="/shop">Continue shopping</ContinueLink>
          </CartItemsHeader>

          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, height: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <Line>
                  <Thumb href={`/product/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="104px"
                    />
                  </Thumb>
                  <LineBody>
                    <Text as="h2" variant="h3" mb={0}>
                      <Link href={`/product/${item.slug}`}>{item.name}</Link>
                    </Text>
                    <Text variant="small" color="gray500">
                      {item.color} / {item.size}
                    </Text>
                    <QuantityStepper
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={(quantity) =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          quantity,
                        )
                      }
                    />
                  </LineBody>
                  <LineActions>
                    <LinePrice>
                      {formatCurrency(item.price * item.quantity)}
                    </LinePrice>
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
              </motion.div>
            ))}
          </AnimatePresence>
        </CartItems>

        <Summary>
          <Text as="h2" variant="h3">
            Order summary
          </Text>
          <div>
            <CouponRow>
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
                disabled={applyingCoupon || !code.trim()}
                onClick={applyCoupon}
              >
                {applyingCoupon ? "..." : "Apply"}
              </Button>
            </CouponRow>
            <CouponHint style={{ marginTop: "0.5rem" }}>
              {coupon
                ? `Applied: ${coupon.code}`
                : "Try TRENOVA10 for a welcome discount."}
            </CouponHint>
          </div>
          <SummaryRow>
            <Text color="gray600">Subtotal</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </SummaryRow>
          <SummaryRow>
            <Text color="gray600">Discount</Text>
            <Text color={discount > 0 ? "success" : undefined}>
              -{formatCurrency(discount)}
            </Text>
          </SummaryRow>
          <SummaryTotal>
            <Text fontWeight={600}>Total</Text>
            <Text fontWeight={700}>{formatCurrency(total)}</Text>
          </SummaryTotal>
          <Button as="a" href="/checkout" fullWidth>
            Checkout
          </Button>
        </Summary>
      </MainColumn>

      {visibleSuggestions.length ? (
        <TrendingPanel>
          <TrendingHeader>
            <TrendingEyebrow>Before you go</TrendingEyebrow>
            <TrendingTitle>Trending now</TrendingTitle>
            <TrendingSub>Quick add accessories & bestsellers.</TrendingSub>
          </TrendingHeader>
          <TrendingList>
            <AnimatePresence initial={false}>
              {visibleSuggestions.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <TrendingCard>
                    <TrendingThumb href={`/product/${product.slug}`}>
                      <Image
                        src={product.images.front}
                        alt={product.name}
                        title={product.name}
                        fill
                        sizes="56px"
                      />
                    </TrendingThumb>
                    <TrendingMeta>
                      <TrendingName href={`/product/${product.slug}`}>
                        {product.name}
                      </TrendingName>
                      <TrendingFooter>
                        <Price
                          price={product.price}
                          compareAtPrice={product.compareAtPrice}
                        />
                        <TrendingAdd
                          type="button"
                          $busy={addingId === product.id}
                          disabled={addingId === product.id}
                          onClick={() => addSuggestion(product)}
                        >
                          {addingId === product.id ? (
                            "..."
                          ) : (
                            <>
                              <Plus size={10} strokeWidth={2.5} aria-hidden />
                              Add
                            </>
                          )}
                        </TrendingAdd>
                      </TrendingFooter>
                    </TrendingMeta>
                  </TrendingCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </TrendingList>
        </TrendingPanel>
      ) : null}
    </CartLayout>
  );
}
