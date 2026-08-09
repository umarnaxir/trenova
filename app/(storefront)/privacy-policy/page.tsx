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
  title: "Privacy Policy",
  description: "How Trenova collects, uses, stores, and protects your personal information.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy explains how ${SITE.legalName} (“Trenova”, “we”, “us”) collects, uses, stores, and protects personal information when you visit ${SITE.domain}, create an account, place an order, or contact support. By using our storefront, you agree to this policy.`,
  },
  {
    title: "2. Information we collect",
    body: "We may collect account and contact details (name, email, phone); shipping and billing addresses; order history and preference signals (cart, wishlist); payment confirmation metadata from our gateways (we do not store full card numbers); device and browser analytics for performance; and messages you send via forms, email, or WhatsApp.",
  },
  {
    title: "3. How we use your information",
    body: "We use personal information to process and fulfil orders; send transactional updates; provide customer support; prevent fraud and secure checkout; improve product discovery, sizing help, and site reliability; send marketing only with consent or as permitted by law; and meet legal, tax, and consumer-protection obligations.",
  },
  {
    title: "4. Cookies and analytics",
    body: "Essential cookies keep login, cart, and checkout working. Analytics cookies help us understand traffic so we can fix slow pages and improve merchandising. You can control cookies in your browser; disabling some cookies may limit storefront features.",
  },
  {
    title: "5. Sharing and processors",
    body: "We share data only with trusted processors required to operate Trenova — payment gateways, logistics partners, and analytics tools — under confidentiality obligations. We do not sell personal information.",
  },
  {
    title: "6. Data retention and security",
    body: "We retain account and order records as long as needed for fulfilment, returns, legal, tax, and dispute purposes, then delete or anonymise when no longer required. We apply reasonable technical and organisational measures to protect personal data. No method of transmission over the internet is fully secure; please use a strong password for your account.",
  },
  {
    title: "7. Your rights",
    body: `You may request access, correction, or deletion of personal data by emailing ${SITE.email}. You may opt out of marketing emails via the unsubscribe link or by contacting us. Transactional order emails may still be sent. We respond within a reasonable timeframe under applicable law.`,
  },
  {
    title: "8. Children’s privacy",
    body: "Trenova sells kids’ apparel intended for purchase by adults. We do not knowingly collect personal data from children without parental involvement. If you believe a child provided data without consent, contact us and we will take appropriate steps.",
  },
  {
    title: "9. Policy updates",
    body: "We may update this Privacy Policy from time to time. The latest version will always be published on this page. Continued use of the storefront after changes means you accept the updated policy.",
  },
  {
    title: "10. Contact for privacy requests",
    body: `Email ${SITE.email}. Phone ${SITE.phone} / ${SITE.phoneSecondary}. Postal address: ${SITE.address.line1}${SITE.address.line2 ? `, ${SITE.address.line2}` : ""}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.postalCode}, ${SITE.address.country}. CIN: ${SITE.cin}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy policy"
      lead="How Trenova collects, uses, and protects your personal information — written clearly so you know exactly where you stand."
    >
      <Section>
        <Prose>
          <p>
            Operated by <strong>{SITE.legalName}</strong> (CIN: {SITE.cin}).
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
            Privacy questions?
          </Text>
          <Text color="gray300">
            We’re happy to explain how your data is handled.
          </Text>
        </div>
        <Button as="a" href="/contact" variant="gold">
          Contact us
        </Button>
      </CtaBand>
    </ContentPage>
  );
}
