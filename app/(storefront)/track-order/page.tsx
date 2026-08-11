import { PageShell } from "@/components/PageShell/PageShell";
import { TrackOrderForm } from "@/features/content/TrackOrderForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track Order",
  description: "Track your Trenova order status with order number and email.",
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <PageShell>
      <TrackOrderForm />
    </PageShell>
  );
}
