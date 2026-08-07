"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Container } from "@/components/Container/Container";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";

const Banner = styled.section`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  padding-block: ${({ theme }) => theme.space[13]};
  overflow: hidden;
  min-height: 360px;
  display: grid;
  align-items: center;
`;

const Media = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(10, 10, 10, 0.82) 0%,
      rgba(10, 10, 10, 0.45) 55%,
      rgba(10, 10, 10, 0.2) 100%
    );
  }
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  max-width: 560px;
`;

export function PromoBanner() {
  return (
    <Banner>
      <Media>
        <Image
          src="/products/promo-banner.jpg"
          alt="TRENOvA sale collection"
          fill
          sizes="100vw"
          priority={false}
        />
      </Media>
      <Container>
        <Inner
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text as="span" variant="eyebrow">
            Limited offer
          </Text>
          <Text as="h2" variant="display" color="white">
            Season sale on essentials
          </Text>
          <Text color="gray300">
            Shop discounted tees, hoodies, and activewear — premium quality,
            ready to buy.
          </Text>
          <Button as="a" href="/categories/sale" variant="gold" size="lg">
            Shop sale
          </Button>
        </Inner>
      </Container>
    </Banner>
  );
}
