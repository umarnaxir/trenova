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
import { ANNOUNCEMENTS } from "@/constants/site";
import { SEO_PAGES } from "@/constants/seoPages";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("shipping");

export default function ShippingPolicyPage() {
  return (
    <>
      <JsonLd data={pageGraph("shipping")} />
      <ContentPage
        eyebrow="Help"
        title={SEO_PAGES.shipping.h1}
        lead="Clear timelines, transparent fees, and tracking updates from dispatch to doorstep."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shipping & Delivery" },
        ]}
      >
        <Section id="overview">
          <SectionTitle>Overview</SectionTitle>
          <ContentCards
            cards={[
              {
                title: "Processing",
                body: "Orders are packed within 1–2 business days after confirmation.",
                icon: "PackageCheck",
              },
              {
                title: "Transit",
                body: "Standard delivery across India typically takes 3–7 business days.",
                icon: "Truck",
              },
              {
                title: "Free shipping",
                body: ANNOUNCEMENTS[0],
                icon: "MapPin",
              },
              {
                title: "Business days",
                body: "Weekends and public holidays may extend dispatch or transit times.",
                icon: "Clock",
              },
              {
                title: "Tracking",
                body: "Tracking details are shared as soon as your parcel leaves our facility.",
                icon: "Package",
              },
              {
                title: "India-wide",
                body: "We currently ship within India. Remote pin codes may need extra time.",
                icon: "CheckCircle2",
              },
            ]}
          />
        </Section>

        <Section id="fees">
          <SectionTitle>Shipping fees</SectionTitle>
          <Prose>
            <ul>
              <li>
                <strong>Free shipping</strong> on prepaid orders above ₹999
              </li>
              <li>
                A flat shipping fee is shown at checkout for orders below the
                threshold
              </li>
              <li>
                Remote pin codes may require additional transit time — we’ll show
                estimates when available
              </li>
            </ul>
          </Prose>
        </Section>

        <Section id="process">
          <SectionTitle>How delivery works</SectionTitle>
          <Steps>
            <Step>
              <StepIndex>01</StepIndex>
              <Text as="h3" variant="h3">
                Confirmed
              </Text>
              <Text color="gray600">
                You receive an order confirmation by email/SMS.
              </Text>
            </Step>
            <Step>
              <StepIndex>02</StepIndex>
              <Text as="h3" variant="h3">
                Shipped
              </Text>
              <Text color="gray600">
                Tracking details are shared once your parcel leaves our facility.
              </Text>
            </Step>
            <Step>
              <StepIndex>03</StepIndex>
              <Text as="h3" variant="h3">
                Delivered
              </Text>
              <Text color="gray600">
                Your courier completes delivery to the address provided at checkout.
              </Text>
            </Step>
          </Steps>
        </Section>

        <Section id="notes">
          <SectionTitle>Important notes</SectionTitle>
          <Prose>
            <p>
              Please ensure your phone number and address are accurate. Failed
              delivery attempts may delay or return the shipment. For status
              updates, use <a href="/track-order">Track Order</a> anytime.
            </p>
          </Prose>
        </Section>

        <PageFaqs items={SEO_PAGES.shipping.faqs} />

        <CtaBand>
          <div>
            <Text as="h3" variant="h3" color="white" mb={2}>
              Where is my order?
            </Text>
            <Text color="gray300">Track with your order number in seconds.</Text>
          </div>
          <Button as="a" href="/track-order" variant="gold">
            Track order
          </Button>
        </CtaBand>
      </ContentPage>
    </>
  );
}
