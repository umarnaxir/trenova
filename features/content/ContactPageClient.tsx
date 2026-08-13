"use client";

import { ContentPage } from "@/features/content/ContentPage";
import { ContentCards } from "@/features/content/ContentCards";
import {
  ContactSplit,
  CtaBand,
  MapFrame,
  Section,
  SectionTitle,
  SocialGrid,
  SocialLink,
  SplitPanel,
  VisitActions,
  VisitItem,
  VisitMeta,
} from "@/features/content/ContentPage.styles";
import { ContactForm } from "@/features/contact/ContactForm";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useSiteSettings } from "@/hooks/stores/siteSettingsStore";
import { PageFaqs } from "@/features/content/PageFaqs";
import { CONTACT_FAQS } from "@/constants/seoPages";

const socialsMeta = [
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
      </svg>
    ),
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
  },
  {
    key: "twitter" as const,
    label: "X / Twitter",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.26L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
];

export function ContactPageClient() {
  const site = useSiteSettings();
  const mapQuery = encodeURIComponent(
    `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
  );

  return (
    <ContentPage
      eyebrow="Support"
      title="Contact us"
      lead="Questions about orders, sizing, partnerships, or press — we typically reply within one business day."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact Us" },
      ]}
    >
      <ContentCards
        cards={[
          {
            title: "Email",
            body: site.supportEmail,
            icon: "Mail",
          },
          {
            title: "Phone",
            body: `${site.supportPhone} · ${site.phoneSecondary}`,
            icon: "Phone",
          },
          {
            title: "WhatsApp",
            body: "Chat with support for quick order help.",
            icon: "MessageCircle",
          },
        ]}
      />

      <Section>
        <SectionTitle>Send a message</SectionTitle>
        <ContactSplit>
          <SplitPanel>
            <ContactForm />
          </SplitPanel>
          <SplitPanel>
            <Text as="h3" variant="h3" mb={5}>
              Visit / write to us
            </Text>
            <VisitMeta>
              <VisitItem>
                <strong>Location</strong>
                <p>
                  {site.address.line1}
                  {site.address.line2 ? `, ${site.address.line2}` : ""}
                  <br />
                  {site.address.city}, {site.address.state}{" "}
                  {site.address.postalCode}
                  <br />
                  {site.address.country}
                </p>
              </VisitItem>
              <VisitItem>
                <strong>Company</strong>
                <p>
                  {site.legalName}
                  <br />
                  CIN: {site.cin}
                </p>
              </VisitItem>
              <VisitItem>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
                </p>
              </VisitItem>
              <VisitItem>
                <strong>WhatsApp</strong>
                <p>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.supportPhone}
                  </a>
                </p>
              </VisitItem>
              <VisitActions>
                <Button
                  as="a"
                  href={`mailto:${site.supportEmail}`}
                  variant="secondary"
                  size="sm"
                >
                  Email
                </Button>
                <Button
                  as="a"
                  href={`https://wa.me/${site.whatsapp}`}
                  variant="gold"
                  size="sm"
                >
                  WhatsApp
                </Button>
              </VisitActions>
            </VisitMeta>
          </SplitPanel>
        </ContactSplit>
      </Section>

      <Section>
        <SectionTitle>Find us</SectionTitle>
        <MapFrame>
          <iframe
            title="Trenova location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            allowFullScreen
          />
        </MapFrame>
      </Section>

      <Section>
        <SectionTitle>Follow Trenova</SectionTitle>
        <SocialGrid>
          {socialsMeta.map((item) => (
            <SocialLink
              key={item.label}
              href={site.social[item.key]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
              {item.label}
            </SocialLink>
          ))}
        </SocialGrid>
      </Section>

      <PageFaqs items={CONTACT_FAQS} />

      <CtaBand>
        <div>
          <Text as="h3" variant="h3" color="white" mb={2}>
            Looking for policies?
          </Text>
          <Text color="gray300">
            Shipping, returns, payments, and terms are all in Help.
          </Text>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button as="a" href="/faq" variant="gold">
            View FAQ
          </Button>
          <Button as="a" href="/shipping-policy" variant="whiteOutline">
            Shipping
          </Button>
        </div>
      </CtaBand>
    </ContentPage>
  );
}
