"use client";

import Image from "next/image";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";
import {
  Actions,
  AddButton,
  BadgeRow,
  Card,
  CategoryLabel,
  ColorDot,
  ColorRow,
  Media,
  Meta,
  OffBadge,
  OverlayTag,
  PriceRow,
  TitleLink,
  WishButton,
} from "@/components/ProductCard/ProductCard.styles";
import { Badge } from "@/components/Badge/Badge";
import { Price } from "@/components/Price/Price";
import { Rating } from "@/components/Rating/Rating";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { discountPercent } from "@/utils/format";
import { getSizeQty } from "@/utils/inventory";

type ProductCardProps = {
  product: Product;
};

function categoryLabel(slug: string) {
  const part = slug.split("-").pop() ?? slug;
  return part.replace(/-/g, " ");
}

function overlayLabel(product: Product) {
  if (product.isBestSeller) return "Bestseller";
  if (product.name.toLowerCase().includes("dry-fit")) return "Dry-Fit";
  if (product.specifications?.Fit) return product.specifications.Fit;
  if (product.isFeatured) return "Premium Quality";
  return "Classic Fit";
}

export function ProductCard({ product }: ProductCardProps) {
  const toggle = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.has(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const isClient = useIsClient();
  const has = isClient && wished;
  const pushToast = useUiStore((state) => state.pushToast);
  const discount = discountPercent(product.price, product.compareAtPrice);

  const toggleWish = () => {
    toggle(product);
    pushToast(has ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  const addToCart = () => {
    const size =
      product.sizes.find((item) => getSizeQty(product, item) > 0) ??
      product.sizes[0];
    const color = product.colors[0]?.name ?? "Default";
    if (!size) {
      pushToast("This product is unavailable", "error");
      return;
    }
    addItem({ product, size, color, quantity: 1 });
    pushToast("Added to cart", "success");
  };

  return (
    <Card>
      <Media href={`/product/${product.slug}`}>
        <Image
          src={product.images.front}
          alt={`${product.name} by Trenova — front view`}
          title={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <BadgeRow>
          {product.isNewArrival ? <Badge>New</Badge> : null}
          {product.isOnSale && !product.isNewArrival ? (
            <Badge tone="sale">Sale</Badge>
          ) : null}
        </BadgeRow>
        <WishButton
          type="button"
          aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
          data-active={has}
          onClick={(event) => {
            event.preventDefault();
            toggleWish();
          }}
        >
          <Heart size={14} fill={has ? "currentColor" : "none"} />
        </WishButton>
        <OverlayTag>
          <Sparkles size={10} aria-hidden />
          {overlayLabel(product)}
        </OverlayTag>
      </Media>

      <Meta>
        <CategoryLabel>{categoryLabel(product.categorySlug)}</CategoryLabel>
        <TitleLink href={`/product/${product.slug}`}>{product.name}</TitleLink>
        <Rating value={product.rating} count={product.reviewCount} />
        <PriceRow>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          {discount ? <OffBadge>{discount}% OFF</OffBadge> : null}
        </PriceRow>
        {product.colors.length ? (
          <ColorRow aria-label="Available colors">
            {product.colors.slice(0, 5).map((color) => (
              <ColorDot key={color.name} $hex={color.hex} title={color.name} />
            ))}
          </ColorRow>
        ) : null}
        <Actions>
          <AddButton type="button" onClick={addToCart}>
            <ShoppingBag size={12} aria-hidden />
            Add to Cart
          </AddButton>
        </Actions>
      </Meta>
    </Card>
  );
}
