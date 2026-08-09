import { ContentPage } from "@/features/content/ContentPage";
import { SizeGuideTable } from "@/features/content/SizeGuideTable";
import {
  CtaBand,
  Panel,
  Prose,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Size Guide",
  description: "Trenova size charts for men, women, and kids with fit tips.",
  path: "/size-guide",
});

export default function SizeGuidePage() {
  return (
    <ContentPage
      eyebrow="Fit help"
      title="Size guide"
      lead="Find your best fit with measurement charts and simple tips. When in doubt, size up for a relaxed Trenova silhouette."
    >
      <Section id="charts">
        <SectionTitle>Size charts</SectionTitle>
        <Panel>
          <SizeGuideTable />
        </Panel>
      </Section>

      <Section id="measure">
        <SectionTitle>How to measure</SectionTitle>
        <Prose>
          <ul>
            <li>
              <strong>Chest</strong> — measure around the fullest part, keeping
              the tape parallel to the floor
            </li>
            <li>
              <strong>Waist</strong> — measure at your natural waistline
            </li>
            <li>
              <strong>Hip</strong> — measure around the fullest part of your hips
            </li>
          </ul>
          <p>Use a soft tape and measure over light clothing for accuracy.</p>
        </Prose>
      </Section>

      <Section id="tips">
        <SectionTitle>Fit tips</SectionTitle>
        <Prose>
          <ul>
            <li>Between sizes? Choose the larger size for everyday ease</li>
            <li>Activewear often prefers a closer fit — check the product notes</li>
            <li>Kids sizes are age-banded approximations; measure when possible</li>
          </ul>
        </Prose>
      </Section>

      <CtaBand>
        <div>
          <Text as="h3" variant="h3" color="white" mb={2}>
            Still unsure about sizing?
          </Text>
          <Text color="gray300">Send us your measurements — we’ll help.</Text>
        </div>
        <Button as="a" href="/contact" variant="gold">
          Ask support
        </Button>
      </CtaBand>
    </ContentPage>
  );
}
