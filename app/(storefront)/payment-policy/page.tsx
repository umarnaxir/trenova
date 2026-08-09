import { ContentPage } from "@/features/content/ContentPage";
import { ContentCards } from "@/features/content/ContentCards";
import { ContentAccordion } from "@/features/content/ContentAccordion";
import {
  CtaBand,
  Panel,
  Prose,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Policy",
  description: "Accepted payment methods, security, COD, refunds, and billing for Trenova.",
  path: "/payment-policy",
});

const faqs = [
  {
    question: "When is my card charged?",
    answer:
      "Prepaid orders are charged when payment is authorized at checkout. Failed authorizations cancel the attempt automatically.",
  },
  {
    question: "Is cash on delivery available?",
    answer:
      "COD may be offered on eligible pin codes and order values. Extra COD fees, if any, are shown before you confirm.",
  },
  {
    question: "What if my payment succeeded but the order didn’t?",
    answer:
      "Contact support with the payment reference. Verified successes are either confirmed as orders or refunded promptly.",
  },
];

export default function PaymentPolicyPage() {
  return (
    <ContentPage
      eyebrow="Help"
      title="Payment policy"
      lead="Secure checkout, clear methods, and transparent handling of refunds and failed payments."
    >
      <Section id="methods">
        <SectionTitle>Accepted methods</SectionTitle>
        <ContentCards
          cards={[
            {
              title: "UPI",
              body: "Pay instantly via supported UPI apps at checkout.",
              icon: "Wallet",
            },
            {
              title: "Cards",
              body: "Visa, Mastercard, RuPay, and other major debit/credit cards.",
              icon: "CreditCard",
            },
            {
              title: "Net banking",
              body: "Pay through leading Indian banks where available.",
              icon: "ShieldCheck",
            },
            {
              title: "Wallets",
              body: "Select digital wallets accepted at checkout when offered.",
              icon: "Lock",
            },
            {
              title: "Cash on delivery",
              body: "COD on eligible pin codes and order values — fees shown before confirm.",
              icon: "Package",
            },
            {
              title: "Secure checkout",
              body: "Processed via trusted gateways. We never store full card numbers.",
              icon: "Shield",
            },
          ]}
        />
      </Section>

      <Section id="security">
        <SectionTitle>Security</SectionTitle>
        <Prose>
          <p>
            Payments are processed through trusted payment gateways. Trenova
            does not store full card numbers on our servers. Always complete
            checkout on {SITE.domain} and avoid sharing OTPs with anyone.
          </p>
        </Prose>
      </Section>

      <Section id="billing">
        <SectionTitle>Billing & refunds</SectionTitle>
        <Prose>
          <ul>
            <li>Order totals include product price, shipping, and applicable taxes</li>
            <li>Promotional discounts and coupons are applied before payment</li>
            <li>
              Approved refunds return to the original method within 5–7 business
              days after confirmation
            </li>
            <li>
              Bank timelines can vary; contact your bank if a refund is delayed
              beyond that window
            </li>
          </ul>
        </Prose>
      </Section>

      <Section id="faq">
        <SectionTitle>Payment FAQs</SectionTitle>
        <Panel>
          <ContentAccordion items={faqs} />
        </Panel>
      </Section>

      <CtaBand>
        <div>
          <Text as="h3" variant="h3" color="white" mb={2}>
            Payment issue?
          </Text>
          <Text color="gray300">Share your order or payment reference with support.</Text>
        </div>
        <Button as="a" href="/contact" variant="gold">
          Contact support
        </Button>
      </CtaBand>
    </ContentPage>
  );
}
