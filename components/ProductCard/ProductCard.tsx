"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import {
  BadgeRow,
  Card,
  Media,
  Meta,
  PriceRow,
  ShopLink,
  TitleLink,
  WishButton,
} from "@/components/ProductCard/ProductCard.styles";
import { Badge } from "@/components/Badge/Badge";
import { DiscountBadge } from "@/components/DiscountBadge/DiscountBadge";
import { Price } from "@/components/Price/Price";
import { Rating } from "@/components/Rating/Rating";
import { Text } from "@/components/Text/Text";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { discountPercent } from "@/utils/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const toggle = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.has(product.id));
  const isClient = useIsClient();
  const has = isClient && wished;
  const pushToast = useUiStore((state) => state.pushToast);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <Card>
      <Media href={`/product/${product.slug}`}>
        <Image
          src={product.images.front}
          alt={`${product.name} front view`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <BadgeRow>
          {product.isNewArrival ? <Badge>New</Badge> : null}
        </BadgeRow>
        <WishButton
          type="button"
          aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
          data-active={has}
          onClick={(event) => {
            event.preventDefault();
            toggle(product);
            pushToast(
              has ? "Removed from wishlist" : "Added to wishlist",
              "info",
            );
          }}
        >
          <Heart size={16} fill={has ? "currentColor" : "none"} />
        </WishButton>
      </Media>
      <Meta>
        <Text as="span" variant="small" color="gray500">
          {product.brand}
        </Text>
        <TitleLink href={`/product/${product.slug}`}>{product.name}</TitleLink>
        <Rating value={product.rating} count={product.reviewCount} />
        <PriceRow>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          {discount ? <DiscountBadge percent={discount} /> : null}
        </PriceRow>
        <ShopLink href={`/product/${product.slug}`}>Shop now</ShopLink>
      </Meta>
    </Card>
  );
}
