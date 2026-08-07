import { PolicyContent } from "@/components/PolicyContent/PolicyContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Returns Policy",
  description: "TRENOvA returns and exchanges within 7 days of delivery.",
  path: "/returns-policy",
});

export default function ReturnsPolicyPage() {
  return (
    <PolicyContent title="Returns Policy">
      <p>
        We offer easy returns within 7 days of delivery for unused items in
        original condition with tags attached.
      </p>
      <h2>Not eligible</h2>
      <ul>
        <li>Worn, washed, or damaged products</li>
        <li>Items without original packaging</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        Approved refunds are issued to the original payment method within 5–7
        business days after inspection.
      </p>
    </PolicyContent>
  );
}
