"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import type { Product, ProductSize } from "@/types/product";
import type { Review } from "@/types/review";
import {
  Actions,
  BadgeRow,
  BlockTitle,
  BrandLabel,
  ComparePrice,
  ColorChip,
  ColorDot,
  CurrentPrice,
  DetailsRoot,
  DiscountTag,
  Divider,
  Gallery,
  InfoPanel,
  Layout,
  MainImage,
  OptionBlock,
  OptionLabel,
  OptionRow,
  PriceBlock,
  ProductTitle,
  SectionCard,
  SectionTitle,
  ShortCopy,
  CompactCopy,
  SizeChip,
  SpecList,
  StockHint,
  Thumb,
  ThumbRow,
} from "@/features/product/ProductDetails.styles";
import { Badge } from "@/components/Badge/Badge";
import { Rating } from "@/components/Rating/Rating";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { Button } from "@/components/Button/Button";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Grid } from "@/components/Grid/Grid";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useRecentlyViewedStore } from "@/hooks/stores/recentlyViewedStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { discountPercent, formatCurrency } from "@/utils/format";
import { getSizeQty } from "@/utils/inventory";

type ProductDetailsProps = {
  product: Product;
  reviews: Review[];
  related: Product[];
};

type Angle = "front" | "left" | "right";

const ANGLES: Angle[] = ["front", "left", "right"];

export function ProductDetails({
  product,
  reviews,
  related,
}: ProductDetailsProps) {
  const router = useRouter();
  const [angle, setAngle] = useState<Angle>("front");
  const firstAvailable =
    product.sizes.find((item) => getSizeQty(product, item) > 0) ??
    product.sizes[0];
  const [size, setSize] = useState<ProductSize>(firstAvailable);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWish = useWishlistStore((state) => state.toggle);
  const wishedRaw = useWishlistStore((state) => state.has(product.id));
  const isClient = useIsClient();
  const wished = isClient && wishedRaw;
  const addRecent = useRecentlyViewedStore((state) => state.add);
  const pushToast = useUiStore((state) => state.pushToast);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const sizeStock = getSizeQty(product, size);
  const selectedColor = product.colors.find((item) => item.name === color);

  useEffect(() => {
    addRecent(product);
  }, [addRecent, product]);

  useEffect(() => {
    setQuantity((current) => Math.min(current, Math.max(1, sizeStock || 1)));
  }, [sizeStock]);

  const addToCart = () => {
    if (sizeStock <= 0) {
      pushToast("Selected size is out of stock", "error");
      return false;
    }
    addItem({ product, size, color, quantity: Math.min(quantity, sizeStock) });
    pushToast("Added to cart");
    return true;
  };

  return (
    <DetailsRoot>
      <Layout>
        <Gallery>
          <MainImage>
            <Image
              key={angle}
              src={product.images[angle]}
              alt={`${product.name} ${angle} view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </MainImage>
          <ThumbRow>
            {ANGLES.map((key) => (
              <Thumb
                key={key}
                type="button"
                $active={angle === key}
                aria-label={`Show ${key} image`}
                aria-pressed={angle === key}
                onMouseEnter={() => setAngle(key)}
                onFocus={() => setAngle(key)}
                onClick={() => setAngle(key)}
              >
                <Image
                  src={product.images[key]}
                  alt={`${product.name} ${key}`}
                  fill
                  sizes="140px"
                />
              </Thumb>
            ))}
          </ThumbRow>
        </Gallery>

        <InfoPanel>
          <BadgeRow>
            {product.isNewArrival ? <Badge>New</Badge> : null}
            {product.isBestSeller ? <Badge tone="dark">Best seller</Badge> : null}
            {discount ? <Badge tone="sale">-{discount}% off</Badge> : null}
          </BadgeRow>

          <div>
            <BrandLabel>{product.brand}</BrandLabel>
            <ProductTitle>{product.name}</ProductTitle>
          </div>

          <Rating value={product.rating} count={product.reviewCount} />

          <PriceBlock>
            <CurrentPrice>{formatCurrency(product.price)}</CurrentPrice>
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <ComparePrice>
                {formatCurrency(product.compareAtPrice)}
              </ComparePrice>
            ) : null}
            {discount ? <DiscountTag>{discount}% off</DiscountTag> : null}
          </PriceBlock>

          <ShortCopy>{product.shortDescription}</ShortCopy>

          <Divider />

          <OptionBlock>
            <OptionLabel>
              <span>Color</span>
              <small>Selected: {selectedColor?.name ?? color}</small>
            </OptionLabel>
            <OptionRow>
              {product.colors.map((item) => (
                <ColorChip
                  key={item.name}
                  type="button"
                  $active={color === item.name}
                  aria-label={item.name}
                  aria-pressed={color === item.name}
                  onClick={() => setColor(item.name)}
                >
                  <ColorDot $hex={item.hex} $active={color === item.name} />
                  <span>{item.name}</span>
                </ColorChip>
              ))}
            </OptionRow>
          </OptionBlock>

          <OptionBlock>
            <OptionLabel>
              <span>Size</span>
              <small>{size}</small>
            </OptionLabel>
            <OptionRow>
              {product.sizes.map((item) => {
                const qty = getSizeQty(product, item);
                const disabled = qty <= 0;
                return (
                  <SizeChip
                    key={item}
                    type="button"
                    $active={size === item}
                    disabled={disabled}
                    title={disabled ? "Out of stock" : `${qty} in stock`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </SizeChip>
                );
              })}
            </OptionRow>
          </OptionBlock>

          <OptionBlock>
            <OptionLabel>
              <span>Quantity</span>
            </OptionLabel>
            <QuantityStepper
              value={quantity}
              max={Math.max(1, sizeStock)}
              onChange={setQuantity}
            />
            <StockHint $danger={sizeStock <= 0}>
              {sizeStock > 0
                ? `${sizeStock} available in size ${size}`
                : `Size ${size} is out of stock`}
            </StockHint>
          </OptionBlock>

          <Actions>
            <Button
              size="sm"
              onClick={() => {
                addToCart();
              }}
              disabled={sizeStock <= 0}
            >
              Add to cart
            </Button>
            <Button
              size="sm"
              variant="gold"
              disabled={sizeStock <= 0}
              onClick={() => {
                if (addToCart()) router.push("/checkout");
              }}
            >
              Buy now
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                toggleWish(product);
                pushToast(
                  wished ? "Removed from wishlist" : "Added to wishlist",
                  "info",
                );
              }}
            >
              <Heart size={14} fill={wished ? "currentColor" : "none"} />
              {wished ? "Saved" : "Wishlist"}
            </Button>
          </Actions>

          <SectionCard>
            <SectionTitle>Description</SectionTitle>
            <CompactCopy>{product.description}</CompactCopy>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Specifications</SectionTitle>
            <SpecList>
              {Object.entries(product.specifications)
                .slice(0, 3)
                .map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              <div>
                <dt>SKU</dt>
                <dd>{product.sku}</dd>
              </div>
            </SpecList>
          </SectionCard>
        </InfoPanel>
      </Layout>

      {reviews.length ? (
        <section>
          <BlockTitle>Reviews</BlockTitle>
          <Grid
            gridTemplateColumns={["1fr", null, "1fr 1fr"]}
            style={{ gap: "1rem" }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Grid>
        </section>
      ) : null}

      {related.length ? (
        <section>
          <BlockTitle>You may also like</BlockTitle>
          <Grid
            gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
            style={{ gap: "1.25rem" }}
          >
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </Grid>
        </section>
      ) : null}
    </DetailsRoot>
  );
}
