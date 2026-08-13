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
import {
  breadcrumbJsonLd,
  buildMetadata,
  categorySeo,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

type Props = PageProps<"/categories/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return buildMetadata({
      title: "Category",
      path: `/categories/${slug}`,
      noIndex: true,
    });
  }

  const seo = categorySeo(category);
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/categories/${slug}`,
    keywords: seo.keywords,
    absoluteTitle: true,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const parent = category.parentSlug
    ? await getCategoryBySlug(category.parentSlug)
    : null;
  const { items } = await getProducts({ category: slug, pageSize: 80 });
  const { subtitle, banner } = getCategoryPageCopy(category);
  const subcategories = buildSubcategoryOptions(category, items);
  const seo = categorySeo(category);
  const path = `/categories/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    ...(parent
      ? [{ name: parent.name, path: `/categories/${parent.slug}` }]
      : []),
    { name: category.name, path },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          webPageJsonLd({
            name: seo.title,
            description: seo.description,
            path,
            type: "CollectionPage",
          }),
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(items, path, seo.h1),
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          ...(parent
            ? [{ label: parent.name, href: `/categories/${parent.slug}` }]
            : []),
          { label: category.name },
        ]}
      />
      <ShopCatalog
        title={seo.h1}
        subtitle={subtitle}
        banner={banner}
        products={items}
        subcategories={subcategories}
        initialFilters={{ category: slug }}
      />
    </PageShell>
  );
}
