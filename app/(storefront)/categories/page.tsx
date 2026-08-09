import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { Grid } from "@/components/Grid/Grid";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";
import { getCategories } from "@/services/category.service";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Categories",
  description: "Explore Trenova categories across men, women, kids, and accessories.",
  path: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
      />
      <Text as="h1" variant="h1" mb={2}>
        Categories
      </Text>
      <Text color="gray600" mb={8}>
        Navigate the full Trenova wardrobe architecture.
      </Text>
      <Grid
        gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
        style={{ gap: "1rem" }}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </PageShell>
  );
}
