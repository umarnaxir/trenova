import { ContentPage } from "@/features/content/ContentPage";
import { ContentCards } from "@/features/content/ContentCards";
import { PageFaqs } from "@/features/content/PageFaqs";
import {
  CtaBand,
  Prose,
  Section,
  SectionTitle,
  Step,
  StepIndex,
  Steps,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { SEO_PAGES } from "@/constants/seoPages";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("returns");

export default function ReturnsPolicyPage() {
  return (
    <>
      <JsonLd data={pageGraph("returns")} />
      <ContentPage
        eyebrow="Help"
        title={SEO_PAGES.returns.h1}
        lead="Changed your mind? Return or exchange unused pieces within 7 days of delivery — simple and transparent."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Returns & Exchanges" },
        ]}
      >
        <Section id="eligibility">
          <SectionTitle>Eligibility</SectionTitle>
          <ContentCards
            cards={[
              {
                title: "Eligible",
                body: "Unused items in original condition with tags and packaging intact.",
                icon: "CheckCircle2",
              },
              {
                title: "Window",
                body: "Request a return or exchange within 7 days of delivery.",
                icon: "RotateCcw",
              },
              {
                title: "Not eligible",
                body: "Worn, washed, altered, damaged, or missing-tag products.",
                icon: "XCircle",
              },
              {
                title: "Hygiene items",
                body: "Certain accessories may be final sale if sealed packaging is opened.",
                icon: "PackageOpen",
              },
              {
                title: "Exchanges",
                body: "Size or colour swaps depend on stock and ship as a fresh fulfilment.",
                icon: "RefreshCw",
              },
              {
                title: "Refunds",
                body: "Approved refunds return to the original payment method in 5–7 days.",
                icon: "Wallet",
              },
            ]}
          />
        </Section>

        <Section id="process">
          <SectionTitle>How it works</SectionTitle>
          <Steps>
            <Step>
              <StepIndex>01</StepIndex>
              <Text as="h3" variant="h3">
                Request
              </Text>
              <Text color="gray600">
                Contact support with your order number and reason for return.
              </Text>
            </Step>
            <Step>
              <StepIndex>02</StepIndex>
              <Text as="h3" variant="h3">
                Pickup / drop-off
              </Text>
              <Text color="gray600">
                We’ll share reverse-pickup details or drop-off instructions.
              </Text>
            </Step>
            <Step>
              <StepIndex>03</StepIndex>
              <Text as="h3" variant="h3">
                Inspection
              </Text>
              <Text color="gray600">
                Once received, we inspect the item and confirm refund or exchange.
              </Text>
            </Step>
          </Steps>
        </Section>

        <Section id="refunds">
          <SectionTitle>Refunds & exchanges</SectionTitle>
          <Prose>
            <p>
              Approved refunds are issued to the original payment method within
              5–7 business days after inspection. Exchanges depend on size/color
              availability and may ship as a new order.
            </p>
            <p>
              Shipping fees are non-refundable unless the return is due to a Trenova
              error (wrong/defective item).
            </p>
          </Prose>
        </Section>

        <PageFaqs items={SEO_PAGES.returns.faqs} />

        <CtaBand>
          <div>
            <Text as="h3" variant="h3" color="white" mb={2}>
              Need a return started?
            </Text>
            <Text color="gray300">Our support team will guide the next step.</Text>
          </div>
          <Button as="a" href="/contact" variant="gold">
            Contact support
          </Button>
        </CtaBand>
      </ContentPage>
    </>
  );
}
