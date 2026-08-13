import { PageShell } from "@/components/PageShell/PageShell";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { pageMetadata } from "@/lib/seo";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("notFound");

export default function NotFound() {
  return (
    <PageShell narrow>
      <Stack gap={5} style={{ minHeight: "60vh", justifyContent: "center" }}>
        <Text as="span" variant="eyebrow">
          404
        </Text>
        <Text as="h1" variant="display">
          {SEO_PAGES.notFound.h1}
        </Text>
        <Text color="gray600">
          The page you are looking for has moved or no longer exists. Continue
          shopping premium fashion, or visit Help for shipping and returns.
        </Text>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button as="a" href="/">
            Back to home
          </Button>
          <Button as="a" href="/shop" variant="secondary">
            Shop collection
          </Button>
        </div>
      </Stack>
    </PageShell>
  );
}
