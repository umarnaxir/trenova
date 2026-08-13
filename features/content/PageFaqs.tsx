"use client";

import { ContentAccordion } from "@/features/content/ContentAccordion";
import {
  Panel,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import type { SeoFaq } from "@/constants/seoPages";

export function PageFaqs({
  title = "Frequently asked questions",
  items,
}: {
  title?: string;
  items: readonly SeoFaq[];
}) {
  if (!items.length) return null;

  return (
    <Section id="faq" style={{ marginTop: "2.5rem" }}>
      <SectionTitle>{title}</SectionTitle>
      <Panel>
        <ContentAccordion items={[...items]} />
      </Panel>
    </Section>
  );
}
