import { ContactPageClient } from "@/features/content/ContactPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact Trenova for support, partnerships, or product questions.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
