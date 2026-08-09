import { PolicyContent } from "@/components/PolicyContent/PolicyContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shipping Policy",
  description: "Shipping timelines, fees, and delivery information for Trenova orders.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <PolicyContent title="Shipping Policy">
      <p>
        Orders are processed within 1–2 business days. Standard delivery across
        India typically takes 3–7 business days depending on location.
      </p>
      <h2>Shipping fees</h2>
      <ul>
        <li>Complimentary shipping on orders above ₹2,999</li>
        <li>Flat shipping fee applied below the threshold at checkout</li>
      </ul>
      <h2>Tracking</h2>
      <p>
        Tracking details are shared by email/SMS once your order ships.
      </p>
    </PolicyContent>
  );
}
