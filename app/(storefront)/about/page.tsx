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
import { SITE } from "@/constants/site";
import { SEO_PAGES } from "@/constants/seoPages";
import { pageGraph, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  const seo = SEO_PAGES.about;

  return (
    <>
      <JsonLd data={pageGraph("about")} />
      <ContentPage
        eyebrow="Company"
        title={seo.h1}
        lead="Elevated essentials for modern living — precise fits, considered fabrics, and a signature black–white–gold identity."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      >
        <Section id="story">
          <SectionTitle>Our story</SectionTitle>
          <Prose>
            <p>
              Trenova started in Sopore, Jammu and Kashmir, with a small studio
              and a clear idea: clothing for real days should feel intentional —
              not loud, not disposable, and never careless with fit or fabric.
            </p>
            <p>
              We grew from sketches and sample rooms into a brand for men, women,
              and kids. Each collection is built around clean silhouettes,
              durable construction, and a quiet luxury that moves with you —
              from morning training to evening plans.
            </p>
            <p>
              Today Trenova is a wardrobe language: black, white, and gold as a
              signature; trusted quality at accessible prices; and pieces you
              reach for again because they still look and feel right after every
              wash.
            </p>
          </Prose>
        </Section>

        <Section id="philosophy">
          <SectionTitle>Philosophy</SectionTitle>
          <ContentCards
            cards={[
              {
                title: "Quiet confidence",
                body: "No loud logos. Refined cuts, tactile fabrics, and details that hold up close.",
                icon: "Sparkles",
              },
              {
                title: "Trusted quality",
                body: "We obsess over stitching, hand-feel, and wash performance so pieces last seasons.",
                icon: "Shield",
              },
              {
                title: "Made to move",
                body: "From activewear to essentials, every silhouette is designed for real-life motion.",
                icon: "Heart",
              },
              {
                title: "Responsible choices",
                body: "We keep improving fabric sourcing, packaging, and inventory planning with care.",
                icon: "Leaf",
              },
              {
                title: "Honest pricing",
                body: "Premium feel without the mark-up theatre — quality you can actually wear every week.",
                icon: "Wallet",
              },
              {
                title: "Fit-first design",
                body: "Patterns, size runs, and finishes are tested so comfort and structure stay in balance.",
                icon: "CheckCircle2",
              },
            ]}
          />
        </Section>

        <Section id="craft">
          <SectionTitle>What we make</SectionTitle>
          <Steps>
            <Step>
              <StepIndex>01</StepIndex>
              <Text as="h3" variant="h3">
                Apparel
              </Text>
              <Text color="gray600">
                Hoodies, tees, joggers, jackets, and polished everyday layers.
              </Text>
            </Step>
            <Step>
              <StepIndex>02</StepIndex>
              <Text as="h3" variant="h3">
                Activewear
              </Text>
              <Text color="gray600">
                Performance fabrics with a clean aesthetic for training and travel.
              </Text>
            </Step>
            <Step>
              <StepIndex>03</StepIndex>
              <Text as="h3" variant="h3">
                Accessories
              </Text>
              <Text color="gray600">
                Caps, socks, and finishing pieces that complete the Trenova look.
              </Text>
            </Step>
          </Steps>
        </Section>

        <Section id="company">
          <SectionTitle>Company</SectionTitle>
          <Prose>
            <p>
              <strong>{SITE.legalName}</strong>
              <br />
              CIN: {SITE.cin}
            </p>
            <p>
              {SITE.address.line1}
              {SITE.address.line2 ? `, ${SITE.address.line2}` : ""}
              <br />
              {SITE.address.city}, {SITE.address.state} {SITE.address.postalCode}
              <br />
              {SITE.address.country}
            </p>
            <p>
              Online at{" "}
              <a href={SITE.url} target="_blank" rel="noopener noreferrer">
                {SITE.domain}
              </a>{" "}
              · Instagram{" "}
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.instagramHandle}
              </a>
            </p>
          </Prose>
        </Section>

        <PageFaqs items={seo.faqs} />

        <CtaBand>
          <div>
            <Text as="h3" variant="h3" color="white" mb={2}>
              Ready to elevate every move?
            </Text>
            <Text color="gray300">
              Shop the latest drops or reach out to the team.
            </Text>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button as="a" href="/shop" variant="gold">
              Shop now
            </Button>
            <Button as="a" href="/contact" variant="whiteOutline">
              Contact us
            </Button>
          </div>
        </CtaBand>
      </ContentPage>
    </>
  );
}
