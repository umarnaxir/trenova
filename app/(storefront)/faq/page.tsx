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
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Answers about sizing, shipping, returns, payments, and Trenova orders.",
  path: "/faq",
});

const faqs = [
  {
    question: "What sizes do you offer?",
    answer:
      "Most apparel runs XS–XXL. Check each product page for exact availability, and use our Size Guide for measurements.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed in 1–2 business days and typically arrive within 3–7 business days across India after dispatch.",
  },
  {
    question: "Is shipping free?",
    answer:
      "Yes — complimentary shipping on orders above ₹999. A flat fee applies below that threshold at checkout.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Unused items with tags can be returned or exchanged within 7 days of delivery. See Returns & Exchanges for full details.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "UPI, major debit/credit cards, net banking, and select wallets. COD may be available on eligible orders.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Use Track Order with your order number and checkout email, or open your account orders page after signing in.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within India. International shipping is planned for a future release.",
  },
  {
    question: "How should I care for Trenova pieces?",
    answer:
      "Follow the care label on each garment. Most pieces prefer gentle machine wash, inside-out, and low-heat drying.",
  },
];

export default function FaqPage() {
  return (
    <ContentPage
      eyebrow="Help centre"
      title="Frequently asked questions"
      lead="Quick answers for sizing, delivery, returns, and payments — so you can shop with confidence."
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
          <ContentAccordion items={faqs} />
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
  );
}
