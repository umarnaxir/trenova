import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { Grid } from "@/components/Grid/Grid";
import { Stack } from "@/components/Stack/Stack";
import { ContactForm } from "@/features/contact/ContactForm";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact TRENOvA for support, partnerships, or product questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <Text as="h1" variant="h1" mb={2}>
        Contact
      </Text>
      <Text color="gray600" mb={8}>
        We typically respond within one business day.
      </Text>
      <Grid
        gridTemplateColumns={["1fr", null, "1fr 1fr"]}
        style={{ gap: "2rem" }}
      >
        <Stack gap={4}>
          <div>
            <Text as="h2" variant="h3" mb={3}>
              {SITE.legalName}
            </Text>
            <Text color="gray600" mb={2}>
              CIN: {SITE.cin}
            </Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              Address
            </Text>
            <Text color="gray600">
              {SITE.address.line1}
              {SITE.address.line2 ? `, ${SITE.address.line2}` : ""}
            </Text>
            <Text color="gray600">
              {SITE.address.city}, {SITE.address.state} {SITE.address.postalCode}
            </Text>
            <Text color="gray600">{SITE.address.country}</Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              Email
            </Text>
            <Text color="gray600">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              Phone
            </Text>
            <Text color="gray600">
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </Text>
            <Text color="gray600">
              <a href={`tel:${SITE.phoneSecondary.replace(/\s/g, "")}`}>
                {SITE.phoneSecondary}
              </a>
            </Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              WhatsApp
            </Text>
            <Text color="gray600">
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.phone}
              </a>
            </Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              Instagram
            </Text>
            <Text color="gray600">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.instagramHandle}
              </a>
            </Text>
          </div>
          <div>
            <Text as="h3" variant="eyebrow" mb={2}>
              Website
            </Text>
            <Text color="gray600">
              <a href={SITE.url} target="_blank" rel="noopener noreferrer">
                {SITE.domain}
              </a>
            </Text>
          </div>
        </Stack>
        <ContactForm />
      </Grid>
    </PageShell>
  );
}
