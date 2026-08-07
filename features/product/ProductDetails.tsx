"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import type { Product, ProductSize } from "@/types/product";
import type { Review } from "@/types/review";
import {
  Gallery,
  Layout,
  MainImage,
  OptionRow,
  SizeChip,
  SpecList,
  Swatch,
  Thumb,
  ThumbRow,
} from "@/features/product/ProductDetails.styles";
import { Text } from "@/components/Text/Text";
import { Price } from "@/components/Price/Price";
import { Rating } from "@/components/Rating/Rating";
import { Badge } from "@/components/Badge/Badge";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { Button } from "@/components/Button/Button";
import { Flex } from "@/components/Flex/Flex";
import { Stack } from "@/components/Stack/Stack";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Grid } from "@/components/Grid/Grid";
import { useCartStore } from "@/hooks/stores/cartStore";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useRecentlyViewedStore } from "@/hooks/stores/recentlyViewedStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { discountPercent } from "@/utils/format";

type ProductDetailsProps = {
  product: Product;
  reviews: Review[];
  related: Product[];
};

type Angle = "front" | "left" | "right";

export function ProductDetails({
  product,
  reviews,
  related,
}: ProductDetailsProps) {
  const router = useRouter();
  const [angle, setAngle] = useState<Angle>("front");
  const [size, setSize] = useState<ProductSize>(product.sizes[2] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWish = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.has(product.id));
  const addRecent = useRecentlyViewedStore((state) => state.add);
  const pushToast = useUiStore((state) => state.pushToast);
  const discount = discountPercent(product.price, product.compareAtPrice);

  useEffect(() => {
    addRecent(product);
  }, [addRecent, product]);

  const addToCart = () => {
    addItem({ product, size, color, quantity });
    pushToast("Added to cart");
  };

  return (
    <Stack gap={10}>
      <Layout>
        <Gallery>
          <MainImage>
            <Image
              src={product.images[angle]}
              alt={`${product.name} ${angle} view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </MainImage>
          <ThumbRow>
            {(["front", "left", "right"] as Angle[]).map((key) => (
              <Thumb
                key={key}
                type="button"
                $active={angle === key}
                onClick={() => setAngle(key)}
                aria-label={`Show ${key} image`}
              >
                <Image
                  src={product.images[key]}
                  alt={`${product.name} ${key}`}
                  fill
                  sizes="120px"
                />
              </Thumb>
            ))}
          </ThumbRow>
        </Gallery>

        <Stack gap={4}>
          <Flex gap={2}>
            {product.isNewArrival ? <Badge>New</Badge> : null}
            {discount ? <Badge tone="sale">-{discount}%</Badge> : null}
          </Flex>
          <Text as="p" variant="eyebrow">
            {product.brand}
          </Text>
          <Text as="h1" variant="h1">
            {product.name}
          </Text>
          <Rating value={product.rating} count={product.reviewCount} />
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          <Text color="gray600">{product.shortDescription}</Text>

          <div>
            <Text as="h2" variant="eyebrow" mb={3}>
              Color
            </Text>
            <OptionRow>
              {product.colors.map((item) => (
                <Swatch
                  key={item.name}
                  type="button"
                  $hex={item.hex}
                  $active={color === item.name}
                  aria-label={item.name}
                  onClick={() => setColor(item.name)}
                />
              ))}
            </OptionRow>
          </div>

          <div>
            <Text as="h2" variant="eyebrow" mb={3}>
              Size
            </Text>
            <OptionRow>
              {product.sizes.map((item) => (
                <SizeChip
                  key={item}
                  type="button"
                  $active={size === item}
                  onClick={() => setSize(item)}
                >
                  {item}
                </SizeChip>
              ))}
            </OptionRow>
          </div>

          <div>
            <Text as="h2" variant="eyebrow" mb={3}>
              Quantity
            </Text>
            <QuantityStepper
              value={quantity}
              max={product.stock}
              onChange={setQuantity}
            />
          </div>

          <Flex gap={3} flexWrap="wrap">
            <Button onClick={addToCart}>Add to cart</Button>
            <Button
              variant="gold"
              onClick={() => {
                addToCart();
                router.push("/checkout");
              }}
            >
              Buy now
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                toggleWish(product);
                pushToast(
                  wished ? "Removed from wishlist" : "Added to wishlist",
                  "info",
                );
              }}
            >
              <Heart size={16} fill={wished ? "currentColor" : "none"} />
              Wishlist
            </Button>
          </Flex>

          <div>
            <Text as="h2" variant="h3" mb={3}>
              Description
            </Text>
            <Text color="gray600">{product.description}</Text>
          </div>

          <div>
            <Text as="h2" variant="h3">
              Specifications
            </Text>
            <SpecList>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </SpecList>
          </div>
        </Stack>
      </Layout>

      <div>
        <Text as="h2" variant="h2" mb={5}>
          Reviews
        </Text>
        <Grid
          gridTemplateColumns={["1fr", null, "1fr 1fr"]}
          style={{ gap: "1rem" }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Grid>
      </div>

      {related.length ? (
        <div>
          <Text as="h2" variant="h2" mb={5}>
            Related products
          </Text>
          <Grid
            gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
            style={{ gap: "1.25rem" }}
          >
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </Grid>
        </div>
      ) : null}
    </Stack>
  );
}
