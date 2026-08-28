import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { WishlistView } from "@/features/wishlist/WishlistView";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("wishlist");

export default function WishlistPage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph("wishlist")} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        {SEO_PAGES.wishlist.h1}
      </Text>
      <WishlistView />
    </PageShell>
  );
}
