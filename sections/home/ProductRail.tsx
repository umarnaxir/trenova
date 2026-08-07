"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { Container } from "@/components/Container/Container";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import {
  DotDashBar,
  DotDashItem,
  NewBadge,
  PriceText,
  ProductCardFooter,
  ProductCardTitle,
  ProductCardWrapper,
  ProductImageWrap,
  ProductRailRoot,
  RailGridWrap,
  RailTitle,
  ScrollContainer,
  ScrollControlsWrap,
  TitleWrap,
  WishlistIconButton,
} from "@/sections/home/ProductRail.styles";

type ProductRailProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  href?: string;
  tone?: "light" | "dark" | "cream";
};

export function ProductRail({
  title,
  products,
  tone = "light",
}: ProductRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const hasWishlist = useWishlistStore((state) => state.has);
  const pushToast = useUiStore((state) => state.pushToast);

  const totalDots = Math.min(products.length, 5);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const ratio = scrollLeft / maxScroll;
        const index = Math.min(
          Math.floor(ratio * totalDots),
          totalDots - 1
        );
        setActiveIndex(index);
      }
    }
  };

  const scrollToDot = (dotIdx: number) => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (maxScroll / (totalDots - 1)) * dotIdx;
      containerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveIndex(dotIdx);
    }
  };

  return (
    <ProductRailRoot $tone={tone}>
      <Container>
        <TitleWrap>
          <RailTitle>{title.toUpperCase()}</RailTitle>
        </TitleWrap>

        <RailGridWrap>
          <ScrollContainer ref={containerRef} onScroll={handleScroll}>
            {products.map((product) => {
              const inWishlist = hasWishlist(product.id);

              return (
                <ProductCardWrapper key={product.id}>
                  <WishlistIconButton
                    type="button"
                    aria-label="Wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                      pushToast(
                        inWishlist ? "Removed from wishlist" : "Added to wishlist",
                        "info"
                      );
                    }}
                  >
                    <Heart
                      size={18}
                      fill={inWishlist ? "#C6A75E" : "none"}
                      color={inWishlist ? "#C6A75E" : "#0A0A0A"}
                    />
                  </WishlistIconButton>

                  <ProductImageWrap href={`/product/${product.slug}`}>
                    <Image
                      src={product.images.front}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </ProductImageWrap>

                  <div>
                    <ProductCardTitle href={`/product/${product.slug}`}>
                      {product.name}
                    </ProductCardTitle>
                    <ProductCardFooter>
                      <PriceText>₹{product.price.toLocaleString("en-IN")}</PriceText>
                      {product.isNewArrival ? <NewBadge>NEW</NewBadge> : null}
                    </ProductCardFooter>
                  </div>
                </ProductCardWrapper>
              );
            })}
          </ScrollContainer>

          <ScrollControlsWrap>
            <DotDashBar>
              {Array.from({ length: totalDots }).map((_, idx) => (
                <DotDashItem
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  $active={activeIndex === idx}
                  onClick={() => scrollToDot(idx)}
                />
              ))}
            </DotDashBar>
          </ScrollControlsWrap>
        </RailGridWrap>
      </Container>
    </ProductRailRoot>
  );
}

