import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import {
  buildSubcategoryOptions,
  getCategoryPageCopy,
} from "@/features/shop/categoryPageData";
import { getCategoryBySlug } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = PageProps<"/categories/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return buildMetadata({
    title: category?.name ?? "Category",
    description:
      category?.description ||
      `Shop ${category?.name ?? "category"} at Trenova.`,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { items } = await getProducts({ category: slug, pageSize: 80 });
  const { subtitle, banner } = getCategoryPageCopy(category);
  const subcategories = buildSubcategoryOptions(category, items);

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />
      <ShopCatalog
        title={category.name}
        subtitle={subtitle}
        banner={banner}
        products={items}
        subcategories={subcategories}
        initialFilters={{ category: slug }}
      />
    </PageShell>
  );
}
