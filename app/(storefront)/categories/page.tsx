import { PageShell } from "@/components/PageShell/PageShell";
import { CategoriesIndex } from "@/features/shop/CategoriesIndex";
import { getCategories } from "@/services/category.service";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Categories",
  description: "Explore Trenova categories across men, women, kids, and accessories.",
  path: "/categories",
});

const CATEGORY_ORDER = [
  "men",
  "women",
  "kids",
  "accessories",
  "best-sellers",
  "new-arrivals",
] as const;

export default async function CategoriesPage() {
  const categories = await getCategories();
  const visible = CATEGORY_ORDER.map((slug) =>
    categories.find((category) => category.slug === slug),
  ).filter((category): category is NonNullable<typeof category> =>
    Boolean(category),
  );

  return (
    <PageShell>
      <CategoriesIndex categories={visible} />
    </PageShell>
  );
}
