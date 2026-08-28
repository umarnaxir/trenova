import { ContentPage } from "@/features/content/ContentPage";
import { ContentAccordion } from "@/features/content/ContentAccordion";
import { ContentCards } from "@/features/content/ContentCards";
import {
  CtaBand,
  Panel,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEO_PAGES } from "@/constants/seoPages";

export const metadata = pageMetadata("faq");

export default function FaqPage() {
  const seo = SEO_PAGES.faq;

  return (
    <>
      <JsonLd data={pageGraph("faq")} />
      <ContentPage
        eyebrow="Help centre"
        title={seo.h1}
        lead="Quick answers for sizing, delivery, returns, and payments — so you can shop with confidence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      >
        <ContentCards
          cards={[
            {
              title: "Shipping",
              body: "3–7 day delivery windows with tracking once your order ships.",
              icon: "Truck",
            },
            {
              title: "Returns",
              body: "7-day easy returns on unused items with original tags.",
              icon: "RefreshCw",
            },
            {
              title: "Orders",
              body: "Track status anytime with your order number and email.",
              icon: "Package",
            },
            {
              title: "Support",
              body: "Need something else? Our team replies within one business day.",
              icon: "HelpCircle",
            },
            {
              title: "Payments",
              body: "UPI, cards, net banking, wallets — and COD on eligible orders.",
              icon: "CreditCard",
            },
            {
              title: "Sizing",
              body: "XS–XXL on most apparel. Use the Size Guide for exact measurements.",
              icon: "CheckCircle2",
            },
          ]}
        />

        <Section>
          <SectionTitle>Common questions</SectionTitle>
          <Panel>
            <ContentAccordion items={[...seo.faqs]} />
          </Panel>
        </Section>

        <CtaBand>
          <div>
            <Text as="h3" variant="h3" color="white" mb={2}>
              Still need help?
            </Text>
            <Text color="gray300">
              Reach support or browse shipping and return policies.
            </Text>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button as="a" href="/contact" variant="gold">
              Contact us
            </Button>
            <Button as="a" href="/shipping-policy" variant="whiteOutline">
              Shipping policy
            </Button>
          </div>
        </CtaBand>
      </ContentPage>
    </>
  );
}
