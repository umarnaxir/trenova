"use client";

import { SITE } from "@/constants/site";
import { Container } from "@/components/Container/Container";
import { Logo } from "@/components/Logo/Logo";
import { PaymentIcons } from "@/components/PaymentIcons/PaymentIcons";
import {
  BrandCol,
  BrandText,
  ColTitle,
  ContactItem,
  ContactLink,
  ContactList,
  Credit,
  FooterBottom,
  FooterCol,
  FooterGrid,
  FooterLink,
  FooterRoot,
  MetaLine,
  MidBand,
  MidLabel,
  SocialButton,
  SocialRow,
  TopRule,
} from "@/components/layout/Footer/Footer.styles";

const company = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Shop", href: "/shop" },
];

const support = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns Policy", href: "/returns-policy" },
  { label: "Track Order", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
];

const policies = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Account", href: "/account" },
  { label: "Coming Soon", href: "/coming-soon" },
];

const socials = [
  { label: "IG", href: SITE.social.instagram, name: "Instagram" },
  { label: "FB", href: SITE.social.facebook, name: "Facebook" },
  { label: "X", href: SITE.social.twitter, name: "X" },
  { label: "YT", href: SITE.social.youtube, name: "YouTube" },
];

export function Footer() {
  return (
    <FooterRoot>
      <Container>
        <TopRule />

        <FooterGrid>
          <BrandCol>
            <Logo variant="nav" height={44} />
            <BrandText>
              {SITE.tagline}. Premium apparel crafted for everyday elegance.
            </BrandText>
            <ContactList>
              <ContactLink href={`mailto:${SITE.email}`}>
                <span>Email</span>
                {SITE.email}
              </ContactLink>
              <ContactLink href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                <span>Phone</span>
                {SITE.phone}
              </ContactLink>
              <ContactItem>
                <span>Visit</span>
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
              </ContactItem>
            </ContactList>
          </BrandCol>

          <FooterCol>
            <ColTitle>Company</ColTitle>
            {company.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <ColTitle>Support</ColTitle>
            {support.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <ColTitle>Policies</ColTitle>
            {policies.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <SocialRow>
              {socials.map((item) => (
                <SocialButton
                  key={item.label}
                  href={item.href}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </SocialButton>
              ))}
            </SocialRow>
          </FooterCol>
        </FooterGrid>

        <MidBand>
          <MidLabel>Secure payments</MidLabel>
          <PaymentIcons tone="dark" />
        </MidBand>

        <FooterBottom>
          <MetaLine>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </MetaLine>
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
        </FooterBottom>
      </Container>
    </FooterRoot>
  );
}
