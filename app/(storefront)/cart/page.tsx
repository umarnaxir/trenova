import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { CartView } from "@/features/cart/CartView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review your Trenova cart and proceed to checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        Shopping cart
      </Text>
      <CartView />
    </PageShell>
  );
}
