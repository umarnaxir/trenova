import { PageShell } from "@/components/PageShell/PageShell";
import { TrackOrderForm } from "@/features/content/TrackOrderForm";
import { PageFaqs } from "@/features/content/PageFaqs";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("trackOrder");

export default function TrackOrderPage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph("trackOrder")} />
      <TrackOrderForm />
      <PageFaqs items={SEO_PAGES.trackOrder.faqs} />
    </PageShell>
  );
}
