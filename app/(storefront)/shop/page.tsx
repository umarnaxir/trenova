import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
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
  const { items } = await getProducts({ pageSize: 80 });

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />
      <ShopCatalog
        title="Shop"
        subtitle="Premium apparel and lifestyle essentials, ready to wear."
        banner={{
          image: "/images/hero/cover-01.png",
          eyebrow: "Full Collection",
          headline: "Premium Style. Everyday.",
          href: "/shop",
        }}
        products={items}
      />
    </PageShell>
  );
}
