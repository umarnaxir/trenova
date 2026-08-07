"use client";

import { Section } from "@/components/Section/Section";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";

export function NewsletterSection() {
  return (
    <Section
      eyebrow="Newsletter"
      title="Stay in the circle"
      description="Early access to drops, private offers, and style notes."
      tone="dark"
    >
      <NewsletterForm />
    </Section>
  );
}
