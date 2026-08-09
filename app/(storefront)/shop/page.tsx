import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import { getProducts } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Shop",
  description: "Browse the full Trenova collection of premium fashion essentials.",
  path: "/shop",
});

export default async function ShopPage() {
  const { items } = await getProducts({ pageSize: 50 });

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />
      <Text as="h1" variant="h1" mb={2}>
        Shop
      </Text>
      <Text color="gray600" mb={8}>
        Premium apparel and lifestyle essentials, ready to wear.
      </Text>
      <ShopCatalog products={items} />
    </PageShell>
  );
}
