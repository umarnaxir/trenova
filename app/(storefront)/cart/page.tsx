import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { CartView } from "@/features/cart/CartView";
import { getCartSuggestions } from "@/services/product.service";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata("cart");

export default async function CartPage() {
  const suggestions = await getCartSuggestions(8);

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
      <CartView suggestions={suggestions} />
    </PageShell>
  );
}
