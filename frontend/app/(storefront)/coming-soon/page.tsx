import { PageShell } from "@/components/PageShell/PageShell";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";
import { Stack } from "@/components/Stack/Stack";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("comingSoon");

export default function ComingSoonPage() {
  return (
    <PageShell narrow>
      <JsonLd data={pageGraph("comingSoon")} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Coming Soon" },
        ]}
      />
      <Stack gap={5} style={{ minHeight: "50vh", justifyContent: "center" }}>
        <Text as="span" variant="eyebrow">
          Next drop
        </Text>
        <Text as="h1" variant="display">
          {SEO_PAGES.comingSoon.h1}
        </Text>
        <Text color="gray600">
          Footwear and sports equipment collections are in development. Be first
          to know — or shop premium fashion and activewear available now.
        </Text>
        <NewsletterForm />
        <Button as="a" href="/shop" variant="secondary">
          Shop current collection
        </Button>
      </Stack>
    </PageShell>
  );
}
