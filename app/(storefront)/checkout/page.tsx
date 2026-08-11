import { PageShell } from "@/components/PageShell/PageShell";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Secure checkout for your Trenova order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <PageShell>
      <CheckoutForm />
    </PageShell>
  );
}
