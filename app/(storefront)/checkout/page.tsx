import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Secure checkout for your TRENOvA order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        Checkout
      </Text>
      <CheckoutForm />
    </PageShell>
  );
}
