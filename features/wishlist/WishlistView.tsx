"use client";

import { Grid } from "@/components/Grid/Grid";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";

export function WishlistView() {
  const items = useWishlistStore((state) => state.items);

  if (!items.length) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        description="Save pieces you love and revisit them anytime."
        actionLabel="Explore shop"
        href="/shop"
      />
    );
  }

  return (
    <Grid
      gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
      style={{ gap: "1.25rem" }}
    >
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
