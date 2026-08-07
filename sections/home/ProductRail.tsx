"use client";

import type { Product } from "@/types/product";
import { Section } from "@/components/Section/Section";
import { Grid } from "@/components/Grid/Grid";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/Button/Button";

type ProductRailProps = {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  href?: string;
  tone?: "light" | "dark" | "cream";
};

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  href = "/shop",
  tone = "light",
}: ProductRailProps) {
  return (
    <Section
      eyebrow={eyebrow}
      title={title}
      description={description}
      tone={tone}
      action={
        <Button as="a" href={href} variant={tone === "dark" ? "light" : "secondary"} size="sm">
          View all
        </Button>
      }
    >
      <Grid
        gridTemplateColumns={["1fr 1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        style={{ gap: "1.25rem" }}
      >
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  );
}
