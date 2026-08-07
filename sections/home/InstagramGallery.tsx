"use client";

import Image from "next/image";
import styled from "styled-components";
import { Section } from "@/components/Section/Section";
import { Grid } from "@/components/Grid/Grid";
import { SITE } from "@/constants/site";

const Shot = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blackMuted};

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const shots = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  src: `/products/instagram-${index + 1}.jpg`,
  href: SITE.social.instagram,
}));

export function InstagramGallery() {
  return (
    <Section
      eyebrow="Instagram"
      title={SITE.instagramHandle}
      description="Follow the brand for drops, fits, and behind-the-scenes."
      tone="cream"
    >
      <Grid
        gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(6, 1fr)"]}
        style={{ gap: "0.75rem" }}
      >
        {shots.map((shot) => (
          <Shot
            key={shot.id}
            href={shot.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`TRENOvA Instagram look ${shot.id}`}
          >
            <Image src={shot.src} alt={`TRENOvA look ${shot.id}`} fill sizes="16vw" />
          </Shot>
        ))}
      </Grid>
    </Section>
  );
}
