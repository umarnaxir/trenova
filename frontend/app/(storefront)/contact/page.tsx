import { ContactPageClient } from "@/features/content/ContactPageClient";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageGraph("contact")} />
      <ContactPageClient />
    </>
  );
}
