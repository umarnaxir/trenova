import { PageShell } from "@/components/PageShell/PageShell";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";
import { Stack } from "@/components/Stack/Stack";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Coming Soon",
  description: "New TRENOvA drops are on the way. Join the list.",
  path: "/coming-soon",
});

export default function ComingSoonPage() {
  return (
    <PageShell narrow>
      <Stack gap={5} style={{ minHeight: "50vh", justifyContent: "center" }}>
        <Text as="span" variant="eyebrow">
          Next drop
        </Text>
        <Text as="h1" variant="display">
          Coming soon
        </Text>
        <Text color="gray600">
          Footwear and sports equipment collections are in development. Be first
          to know.
        </Text>
        <NewsletterForm />
        <Button as="a" href="/shop" variant="secondary">
          Shop current collection
        </Button>
      </Stack>
    </PageShell>
  );
}
