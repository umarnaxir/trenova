import { PolicyContent } from "@/components/PolicyContent/PolicyContent";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms governing use of the Trenova website and purchases.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyContent title="Terms & Conditions">
      <p>
        By accessing {SITE.domain} and placing orders, you agree to these terms
        and our policies.
      </p>
      <h2>Orders</h2>
      <p>
        All orders are subject to availability and confirmation. Pricing and
        promotions may change without prior notice.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All brand marks, imagery, and content remain the property of{" "}
        {SITE.legalName}.
      </p>
    </PolicyContent>
  );
}
