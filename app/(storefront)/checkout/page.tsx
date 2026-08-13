import { PageShell } from "@/components/PageShell/PageShell";
import { CheckoutForm } from "@/features/checkout/CheckoutForm";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("checkout");

export default function CheckoutPage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph("checkout")} />
      <CheckoutForm />
    </PageShell>
  );
}
