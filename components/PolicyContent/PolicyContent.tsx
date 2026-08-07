"use client";

import { Prose } from "@/components/PolicyContent/PolicyContent.styles";
import { Text } from "@/components/Text/Text";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { PageShell } from "@/components/PageShell/PageShell";

type PolicyContentProps = {
  title: string;
  children: React.ReactNode;
};

export function PolicyContent({ title, children }: PolicyContentProps) {
  return (
    <PageShell narrow>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: title },
        ]}
      />
      <Text as="h1" variant="h1" mb={6}>
        {title}
      </Text>
      <Prose>{children}</Prose>
    </PageShell>
  );
}
