import { PolicyContent } from "@/components/PolicyContent/PolicyContent";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How TRENOvA collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PolicyContent title="Privacy Policy">
      <p>
        We collect account, order, and communication details solely to operate
        and improve the TRENOvA shopping experience.
      </p>
      <h2>Data we process</h2>
      <ul>
        <li>Contact and shipping information</li>
        <li>Order history and preferences</li>
        <li>Device and analytics data for performance</li>
      </ul>
      <h2>Your choices</h2>
      <p>
        You may request access, correction, or deletion of personal data by
        contacting {SITE.email}.
      </p>
    </PolicyContent>
  );
}
