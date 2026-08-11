"use client";

import Image from "next/image";
import {
  CollectionEyebrow,
  GoldBar,
  HeroCopy,
  HeroRoot,
  HeroSubtitle,
  HeroTitle,
  PromoBanner,
  PromoContent,
  PromoCta,
  PromoEyebrow,
  PromoShade,
  PromoTitle,
  TitleRow,
  TitleStack,
} from "@/features/shop/CategoryHero.styles";

export type CategoryHeroProps = {
  title: string;
  subtitle: string;
  banner: {
    image: string;
    eyebrow: string;
    headline: string;
    href: string;
  };
};

export function CategoryHero({ title, subtitle, banner }: CategoryHeroProps) {
  return (
    <HeroRoot>
      <HeroCopy>
        <TitleRow>
          <GoldBar aria-hidden />
          <TitleStack>
            <CollectionEyebrow>Collection</CollectionEyebrow>
            <HeroTitle>{title}</HeroTitle>
          </TitleStack>
        </TitleRow>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </HeroCopy>

      <PromoBanner href={banner.href}>
        <Image
          src={banner.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          priority
        />
        <PromoShade />
        <PromoContent>
          <PromoEyebrow>{banner.eyebrow}</PromoEyebrow>
          <PromoTitle>{banner.headline}</PromoTitle>
          <PromoCta>Explore Collection</PromoCta>
        </PromoContent>
      </PromoBanner>
    </HeroRoot>
  );
}
