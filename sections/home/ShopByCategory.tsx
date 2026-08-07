"use client";

import type { Category } from "@/types/category";
import { Section } from "@/components/Section/Section";
import { Grid } from "@/components/Grid/Grid";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";

export function ShopByCategory({ categories }: { categories: Category[] }) {
  return (
    <Section
      eyebrow="Shop by Category"
      title="Find your lane"
      description="Men, women, kids, and accessories — designed as a coherent wardrobe system."
      tone="cream"
    >
      <Grid
        gridTemplateColumns={["1fr", "1fr 1fr", "repeat(4, 1fr)"]}
        style={{ gap: "1rem" }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </Section>
  );
}
