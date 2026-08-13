import { AdminGate } from "@/features/admin/AdminGate";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard | Trenova Store Operations",
  description:
    "Private Trenova admin dashboard for products, orders, and store settings. Not indexed.",
  path: "/admin",
  noIndex: true,
  absoluteTitle: true,
});

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGate>{children}</AdminGate>;
}
