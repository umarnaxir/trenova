import { ContentPage } from "@/features/content/ContentPage";
import { TrackOrderForm } from "@/features/content/TrackOrderForm";
import {
  CtaBand,
  Prose,
  Section,
  SectionTitle,
} from "@/features/content/ContentPage.styles";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track Order",
  description: "Track your Trenova order status with order number and email.",
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <ContentPage
      eyebrow="Orders"
      title="Track your order"
      lead="Enter your order details to see the latest status — from confirmed to delivered."
    >
      <Section>
        <SectionTitle>Order lookup</SectionTitle>
        <TrackOrderForm />
      </Section>

      <Section>
        <SectionTitle>Need more help?</SectionTitle>
        <Prose>
          <p>
            If tracking hasn’t updated after dispatch, wait a few hours for
            courier systems to sync. Still stuck? Contact support with your
            order number.
          </p>
        </Prose>
      </Section>

      <CtaBand>
        <div>
          <Text as="h3" variant="h3" color="white" mb={2}>
            Prefer your account?
          </Text>
          <Text color="gray300">Signed-in customers can view all orders in one place.</Text>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button as="a" href="/account/orders" variant="gold">
            My orders
          </Button>
          <Button as="a" href="/contact" variant="whiteOutline">
            Contact support
          </Button>
        </div>
      </CtaBand>
    </ContentPage>
  );
}
