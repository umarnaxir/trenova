import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { searchProducts } from "@/services/product.service";
import {
  breadcrumbJsonLd,
  buildMetadata,
  clipTitle,
  fitMetaDescription,
  itemListJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

type Props = PageProps<"/search">;

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  if (!q) return pageMetadata("search");

  return buildMetadata({
    title: clipTitle(`Search: ${q} | Trenova Fashion`),
    description: fitMetaDescription(
      `Search results for “${q}” in the Trenova premium fashion catalog.`,
      "Browse matching styles or shop the full collection.",
    ),
    path: `/search?q=${encodeURIComponent(q)}`,
    noIndex: true,
    absoluteTitle: true,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const products = q ? await searchProducts(q) : [];
  const seo = SEO_PAGES.search;
  const path = q ? `/search?q=${encodeURIComponent(q)}` : seo.path;

  return (
    <PageShell>
      <JsonLd
        data={[
          webPageJsonLd({
            name: q ? `Search: ${q}` : seo.title,
            description: seo.description,
            path,
            type: "SearchResultsPage",
          }),
          breadcrumbJsonLd(seo.breadcrumbs),
          ...(products.length
            ? [itemListJsonLd(products, path, q || "Search results")]
            : []),
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />
      {q && products.length ? (
        <ShopCatalog
          title={q}
          subtitle={`Search results for “${q}”.`}
          banner={{
            image: "/images/hero/cover-02.png",
            eyebrow: "Search",
            headline: "Find Your Fit.",
            href: "/shop",
          }}
          products={products}
          initialFilters={{ q }}
        />
      ) : (
        <EmptyState
          title={q ? "No matches found" : "Start searching"}
          description={
            q
              ? "Try another keyword or browse the shop."
              : "Use the search icon in the header."
          }
          actionLabel="Browse shop"
          href="/shop"
        />
      )}
    </PageShell>
  );
}
