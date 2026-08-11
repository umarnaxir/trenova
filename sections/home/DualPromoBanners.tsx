"use client";

import Image from "next/image";
import { Container } from "@/components/Container/Container";
import {
  BannerCard,
  BannerCopy,
  BannerGrid,
  BannerLink,
  BannerMedia,
  BannerText,
  BannerTitle,
  DualPromoRoot,
} from "@/sections/home/DualPromoBanners.styles";

const banners = [
  {
    id: "women",
    title: "Stay comfortable",
    copy: "Performance wear for every move.",
    href: "/categories/women",
    label: "Woman",
    image: "/images/hero/hero-02.png",
    alt: "Trenova women performance wear",
  },
  {
    id: "men",
    title: "Made for you",
    copy: "New arrivals for every lifestyle.",
    href: "/categories/men",
    label: "Man",
    image: "/images/hero/hero-01.png",
    alt: "Trenova men lifestyle essentials",
  },
  {
    id: "kids",
    title: "For every goal",
    copy: "Comfort-first styles for kids.",
    href: "/categories/kids",
    label: "Kids",
    image: "/images/hero/hero-03.png",
    alt: "Trenova kidswear lifestyle cover",
  },
] as const;

export function DualPromoBanners() {
  return (
    <DualPromoRoot aria-label="Featured promotions">
      <Container>
        <BannerGrid>
          {banners.map((banner) => (
            <BannerCard key={banner.id} href={banner.href}>
              <BannerMedia>
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  sizes="(max-width: 768px) 86vw, 48vw"
                />
              </BannerMedia>
              <BannerLink>{banner.label}</BannerLink>
              <BannerText>
                <BannerTitle>{banner.title}</BannerTitle>
                <BannerCopy>{banner.copy}</BannerCopy>
              </BannerText>
            </BannerCard>
          ))}
        </BannerGrid>
      </Container>
    </DualPromoRoot>
  );
}
