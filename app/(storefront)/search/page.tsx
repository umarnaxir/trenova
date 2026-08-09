import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { searchProducts } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo";

type Props = PageProps<"/search">;

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  return buildMetadata({
    title: q ? `Search: ${q}` : "Search",
    description: "Search the Trenova catalog.",
    path: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const products = q ? await searchProducts(q) : [];

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search" },
        ]}
      />
      <Text as="h1" variant="h1" mb={2}>
        Search
      </Text>
      <Text color="gray600" mb={8}>
        {q ? `Results for “${q}”` : "Enter a query to find products."}
      </Text>
      {q && products.length ? (
        <ShopCatalog products={products} initialFilters={{ q }} />
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
