"use client";

import { Grid } from "@/components/Grid/Grid";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Loader } from "@/components/Loader/Loader";
import { useWishlistStore } from "@/hooks/stores/wishlistStore";
import { useIsClient } from "@/hooks/useIsClient";

export function WishlistView() {
  const items = useWishlistStore((state) => state.items);
  const isClient = useIsClient();

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
