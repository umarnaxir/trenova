import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { CartView } from "@/features/cart/CartView";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("cart");

export default function CartPage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph("cart")} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        {SEO_PAGES.cart.h1}
      </Text>
      <CartView />
    </PageShell>
  );
}
