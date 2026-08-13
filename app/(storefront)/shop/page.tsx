import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import { PageFaqs } from "@/features/content/PageFaqs";
import { getProducts } from "@/services/product.service";
import {
  itemListJsonLd,
  pageGraph,
  pageMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata("shop");

export default async function ShopPage() {
  const { items } = await getProducts({ pageSize: 80 });
  const seo = SEO_PAGES.shop;

  return (
    <PageShell>
      <JsonLd
        data={pageGraph("shop", [
          itemListJsonLd(items, seo.path, seo.h1),
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />
      <ShopCatalog
        title={seo.h1}
        subtitle="Premium apparel, activewear and lifestyle essentials — ready to wear."
        banner={{
          image: "/images/hero/cover-01.png",
          eyebrow: "Full Collection",
          headline: "Premium Style. Everyday.",
          href: "/shop",
        }}
        products={items}
      />
      <PageFaqs items={seo.faqs} />
    </PageShell>
  );
}
