import { ContentPage } from "@/features/content/ContentPage";
import { ContentCards } from "@/features/content/ContentCards";
import { PageFaqs } from "@/features/content/PageFaqs";
import {
  CtaBand,
  Prose,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { SITE } from "@/constants/site";
import { SEO_PAGES } from "@/constants/seoPages";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("payment");

export default function PaymentPolicyPage() {
  return (
    <>
      <JsonLd data={pageGraph("payment")} />
      <ContentPage
        eyebrow="Help"
        title={SEO_PAGES.payment.h1}
        lead="Secure checkout, clear methods, and transparent handling of refunds and failed payments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Payment Policy" },
        ]}
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

        <PageFaqs title="Payment FAQs" items={SEO_PAGES.payment.faqs} />

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
    </>
  );
}
