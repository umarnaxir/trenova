"use client";

import { useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { PaymentIcons } from "@/components/PaymentIcons/PaymentIcons";
import { subscribeNewsletter } from "@/services/newsletter.service";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useSiteSettings } from "@/hooks/stores/siteSettingsStore";
import {
  BackToTopButton,
  BrandCol,
  BrandIdentity,
  BrandText,
  ColTitle,
  Credit,
  FooterBottom,
  FooterCol,
  FooterGrid,
  FooterLink,
  FooterNewsletterCol,
  FooterNewsletterForm,
  FooterNewsletterIcon,
  FooterNewsletterSub,
  FooterNewsletterText,
  FooterNewsletterTitle,
  FooterRoot,
  MetaLine,
  MidBand,
  MidLabel,
  SocialButton,
  SocialRow,
} from "@/components/layout/Footer/Footer.styles";

const shopLinks = [
  { label: "Men", href: "/categories/men" },
  { label: "Women", href: "/categories/women" },
  { label: "Kids", href: "/categories/kids" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Sale", href: "/categories/sale" },
  { label: "New Arrivals", href: "/categories/new-arrivals" },
];

const helpLinks = [
  { label: "FAQs", href: "/faq" },
  { label: "Shipping & Delivery", href: "/shipping-policy" },
  { label: "Returns & Exchanges", href: "/returns-policy" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Track Order", href: "/track-order" },
  { label: "Payment Policy", href: "/payment-policy" },
  { label: "Contact Us", href: "/contact" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const pushToast = useUiStore((state) => state.pushToast);
  const site = useSiteSettings();

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setLoading(true);
    const result = await subscribeNewsletter(email);
    pushToast(result.message, result.success ? "success" : "error");
    if (result.success) setEmail("");
    setLoading(false);
  };

  return (
    <FooterRoot>
      <Container>
        <FooterGrid>
          <BrandCol>
            <BrandIdentity>
              <Logo height={64} variant="mark" />
              <BrandText>Elevate Every Move.</BrandText>
            </BrandIdentity>
            <ColTitle $compact>FOLLOW US</ColTitle>
            <SocialRow style={{ gap: "0.5rem", marginTop: "0.25rem" }}>
              <SocialButton
                href={site.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </SocialButton>
              <SocialButton
                href={site.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </SocialButton>
              <SocialButton
                href={site.social.youtube}
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </SocialButton>
            </SocialRow>
          </BrandCol>

          <FooterCol>
            <ColTitle>SHOP</ColTitle>
            {shopLinks.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <ColTitle>HELP</ColTitle>
            {helpLinks.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <ColTitle>COMPANY</ColTitle>
            {companyLinks.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterNewsletterCol>
            <FooterNewsletterText>
              <FooterNewsletterIcon>
                <Mail size={18} />
              </FooterNewsletterIcon>
              <div>
                <FooterNewsletterTitle>JOIN THE Trenova COMMUNITY</FooterNewsletterTitle>
                <FooterNewsletterSub>Get exclusive updates, new arrivals &amp; special offers.</FooterNewsletterSub>
              </div>
            </FooterNewsletterText>

            <FooterNewsletterForm onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "..." : "SUBSCRIBE"}
              </button>
            </FooterNewsletterForm>
          </FooterNewsletterCol>
        </FooterGrid>

        <MidBand>
          <MidLabel>We Accept</MidLabel>
          <PaymentIcons tone="dark" />
        </MidBand>

        <FooterBottom>
          <MetaLine>©2026 to now. All rights reserved.</MetaLine>
          <Credit>
            Designed &amp; Developed by{" "}
            <a
              href="https://www.nexgendevelopers.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NexGen Developers
            </a>
          </Credit>
          <BackToTopButton
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowUp size={14} strokeWidth={2.25} />
            Back to Top
          </BackToTopButton>
        </FooterBottom>
      </Container>
    </FooterRoot>
  );
}


