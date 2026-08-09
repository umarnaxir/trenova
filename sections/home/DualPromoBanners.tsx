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
    title: "Train Hard. Stay Comfortable.",
    copy: "Performance wear that keeps up with you.",
    href: "/categories/women",
    label: "Woman",
    image: "/products/collection-women.jpg",
    alt: "TRENOVA women performance wear",
  },
  {
    id: "men",
    title: "Built for More. Made for You.",
    copy: "Discover new arrivals for every lifestyle.",
    href: "/categories/men",
    label: "Man",
    image: "/products/collection-essentials.jpg",
    alt: "TRENOVA men lifestyle essentials",
  },
  {
    id: "kids",
    title: "For Every Body. For Every Goal.",
    copy: "Comfort-first styles made for growing explorers.",
    href: "/categories/kids",
    label: "Kids",
    image: "/images/hero/cover-03.png",
    alt: "TRENOVA kidswear lifestyle cover",
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
