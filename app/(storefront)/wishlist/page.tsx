import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { WishlistView } from "@/features/wishlist/WishlistView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wishlist",
  description: "Your saved TRENOvA favorites.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        Wishlist
      </Text>
      <WishlistView />
    </PageShell>
  );
}
