import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { FaqList } from "@/features/faq/FaqList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Answers to common questions about Trenova orders, shipping, and returns.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PageShell narrow>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        FAQ
      </Text>
      <FaqList />
    </PageShell>
  );
}
