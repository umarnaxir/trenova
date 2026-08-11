"use client";

import { SafeImage } from "@/components/SafeImage/SafeImage";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Container } from "@/components/Container/Container";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { discountPercent } from "@/utils/format";
import { getSizeQty } from "@/utils/inventory";
import {
  AddToCartButton,
  CategoryLabel,
  NewBadge,
  OffBadge,
  PriceRow,
  PriceText,
  ProductCardFooter,
  ProductCardTitle,
  ProductCardWrapper,
  ProductGrid,
  ProductImageWrap,
  ProductMeta,
  ProductRailRoot,
  RatingRow,
  RailTitle,
  TitleWrap,
  WishlistIconButton,
} from "@/sections/home/ProductRail.styles";

type ProductRailProps = {
  title: string;
  products: Product[];
  tone?: "light" | "dark" | "cream";
  showRating?: boolean;
};

function formatCategory(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");
}

export function ProductRail({
  title,
  products,
  tone = "light",
  showRating = false,
}: ProductRailProps) {
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const hasWishlist = useWishlistStore((state) => state.has);
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useUiStore((state) => state.pushToast);
  const isClient = useIsClient();

  return (
    <ProductRailRoot $tone={tone}>
      <Container>
        <TitleWrap>
          <RailTitle>{title}</RailTitle>
        </TitleWrap>

        <ProductGrid>
          {products.map((product) => {
            const inWishlist = isClient && hasWishlist(product.id);
            const filledStars = Math.round(product.rating);
            const discount = discountPercent(
              product.price,
              product.compareAtPrice,
            );

            return (
              <ProductCardWrapper key={product.id}>
                <ProductImageWrap href={`/product/${product.slug}`}>
                  {product.isNewArrival ? <NewBadge>New</NewBadge> : null}
                  <WishlistIconButton
                    type="button"
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                    onClick={(event) => {
                      event.preventDefault();
                      toggleWishlist(product);
                      pushToast(
                        inWishlist
                          ? "Removed from wishlist"
                          : "Added to wishlist",
                        "info",
                      );
                    }}
                  >
                    <Heart
                      size={16}
                      fill={inWishlist ? "#C6A75E" : "none"}
                      color={inWishlist ? "#C6A75E" : "#0A0A0A"}
                    />
                  </WishlistIconButton>
                  <SafeImage
                    src={product.images.front}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                </ProductImageWrap>

                <ProductMeta>
                  <ProductCardTitle href={`/product/${product.slug}`}>
                    {product.name}
                  </ProductCardTitle>
                  <CategoryLabel>
                    {formatCategory(product.categorySlug)}
                  </CategoryLabel>
                </ProductMeta>

                <ProductCardFooter>
                  {showRating ? (
                    <RatingRow aria-label={`Rated ${product.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          fill={index < filledStars ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                      <span>{product.rating.toFixed(1)}</span>
                    </RatingRow>
                  ) : null}
                  <PriceRow>
                    <PriceText>
                      ₹{product.price.toLocaleString("en-IN")}
                      {product.compareAtPrice &&
                      product.compareAtPrice > product.price ? (
                        <span
                          style={{
                            marginLeft: 6,
                            color: "#6B6B6B",
                            textDecoration: "line-through",
                            fontWeight: 400,
                            fontSize: "0.85em",
                          }}
                        >
                          ₹{product.compareAtPrice.toLocaleString("en-IN")}
                        </span>
                      ) : null}
                    </PriceText>
                    {discount ? <OffBadge>{discount}% OFF</OffBadge> : null}
                  </PriceRow>
                  <AddToCartButton
                    type="button"
                    onClick={() => {
                      const size = product.sizes.find(
                        (item) => getSizeQty(product, item) > 0,
                      );
                      const color = product.colors[0]?.name;
                      if (!size || !color) {
                        pushToast(
                          "Select size and color on the product page",
                          "info",
                        );
                        return;
                      }
                      addItem({ product, size, color, quantity: 1 });
                      pushToast("Added to cart", "success");
                    }}
                  >
                    Add to Cart
                  </AddToCartButton>
                </ProductCardFooter>
              </ProductCardWrapper>
            );
          })}
        </ProductGrid>
      </Container>
    </ProductRailRoot>
  );
}
