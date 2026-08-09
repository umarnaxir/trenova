import { ContentPage } from "@/features/content/ContentPage";
import {
  CtaBand,
  PolicyBlock,
  PolicyStack,
  Prose,
  Section,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms governing use of the Trenova website, accounts, and purchases.",
  path: "/terms",
});

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By browsing ${SITE.domain}, creating an account, or placing an order with ${SITE.legalName} (“Trenova”), you agree to these Terms & Conditions and our related policies (Privacy, Shipping, Returns, and Payments). If you do not agree, please do not use the storefront.`,
  },
  {
    title: "2. Website use",
    body: "You agree to use Trenova lawfully and not to misuse the site, attempt unauthorised access, scrape content at scale, interfere with operations, or post harmful content. We may suspend access for abuse or suspected fraud. Product details, imagery, and availability may change without notice.",
  },
  {
    title: "3. Accounts",
    body: "You are responsible for keeping login details confidential and for activity under your account. Notify us promptly of any unauthorised use. We may refuse or close accounts that violate these terms or applicable law.",
  },
  {
    title: "4. Orders, pricing, and taxes",
    body: "All orders are subject to availability and confirmation. Prices, offers, and shipping fees may change without notice. Confirmed orders keep the checkout price for that order. We may cancel orders for stock issues, pricing errors, payment failure, or suspected fraud. Taxes are calculated at checkout where applicable. Promotional codes apply only as stated and cannot be combined unless we say otherwise.",
  },
  {
    title: "5. Product information",
    body: "We aim for accurate descriptions and imagery. Colour and fabric appearance may vary slightly due to screen settings and production batches. Care instructions on garment labels take precedence for washing and maintenance.",
  },
  {
    title: "6. Shipping, returns, and payments",
    body: "Delivery timelines and fees follow the Shipping Policy. Returns and exchanges follow the Returns Policy. Accepted methods, COD, and refunds follow the Payment Policy. Those policies form part of these terms by reference.",
  },
  {
    title: "7. Intellectual property",
    body: `Brand marks, product imagery, copy, and design systems remain the property of ${SITE.legalName}. You may not copy, modify, or redistribute them without written permission.`,
  },
  {
    title: "8. Liability",
    body: "To the fullest extent permitted by law, Trenova is not liable for indirect or consequential losses arising from site use or delayed delivery caused by courier or force majeure events. Nothing in these terms limits rights that cannot be excluded under Indian consumer law.",
  },
  {
    title: "9. Governing law",
    body: "These terms are governed by the laws of India. Courts in Jammu and Kashmir shall have jurisdiction, subject to mandatory consumer forum rights.",
  },
  {
    title: "10. Contact and notices",
    body: `For questions or legal notices, email ${SITE.email} or write to ${SITE.address.line1}${SITE.address.line2 ? `, ${SITE.address.line2}` : ""}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.postalCode}, ${SITE.address.country}. Phone: ${SITE.phone} / ${SITE.phoneSecondary}. CIN: ${SITE.cin}.`,
  },
];

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms & conditions"
      lead={`Rules for using ${SITE.domain}, placing orders, and holding a Trenova account.`}
    >
      <Section>
        <Prose>
          <p>
            Related policies:{" "}
            <a href="/privacy-policy">Privacy</a>,{" "}
            <a href="/shipping-policy">Shipping</a>,{" "}
            <a href="/returns-policy">Returns</a>,{" "}
            <a href="/payment-policy">Payments</a>.
          </p>
        </Prose>
      </Section>

      <Section>
        <PolicyStack>
          {sections.map((section) => (
            <PolicyBlock key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </PolicyBlock>
          ))}
        </PolicyStack>
      </Section>

      <CtaBand>
        <div>
          <Text as="h3" variant="h3" color="white" mb={2}>
            Questions about these terms?
          </Text>
          <Text color="gray300">Our team can clarify before you order.</Text>
        </div>
        <Button as="a" href="/contact" variant="gold">
          Contact us
        </Button>
      </CtaBand>
    </ContentPage>
  );
}
