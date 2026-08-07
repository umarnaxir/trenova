"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/Section/Section";
import { Grid } from "@/components/Grid/Grid";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import styled from "styled-components";

const CollectionCard = styled(motion.a)`
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CollectionContent = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: ${({ theme }) => theme.space[6]};
  background: linear-gradient(transparent, rgba(10, 10, 10, 0.82));
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

const collections = [
  {
    title: "Men",
    description: "Tees, polos, hoodies, jackets, and more.",
    href: "/categories/men",
    image: "/products/collection-essentials.jpg",
  },
  {
    title: "Women",
    description: "Soft tees, activewear, and elevated essentials.",
    href: "/categories/women",
    image: "/products/collection-women.jpg",
  },
  {
    title: "Layers",
    description: "Hoodies and jackets for everyday polish.",
    href: "/categories/men-hoodies",
    image: "/products/collection-layers.jpg",
  },
];

export function FeaturedCollections() {
  return (
    <Section
      eyebrow="Shop Collections"
      title="Start shopping"
      description="Browse clothing by collection. Every piece opens to a full product page with size, color, and buy options."
    >
      <Grid
        gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
        style={{ gap: "1.25rem" }}
      >
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.title}
            href={collection.href}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 2}
            />
            <CollectionContent>
              <Text as="h2" variant="h2" color="white">
                {collection.title}
              </Text>
              <Text color="gray300">{collection.description}</Text>
              <Button as="span" variant="light" size="sm">
                Shop now
              </Button>
            </CollectionContent>
          </CollectionCard>
        ))}
      </Grid>
    </Section>
  );
}
