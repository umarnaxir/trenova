import { PageShell } from "@/components/PageShell/PageShell";
import { CategoriesIndex } from "@/features/shop/CategoriesIndex";
import { PageFaqs } from "@/features/content/PageFaqs";
import { getCategories } from "@/services/category.service";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("categories");

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
      <JsonLd data={pageGraph("categories")} />
      <CategoriesIndex categories={visible} />
      <PageFaqs items={SEO_PAGES.categories.faqs} />
    </PageShell>
  );
}
