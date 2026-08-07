"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/public/images/hero.png";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import {
  Actions,
  Content,
  DesktopButtons,
  GlowingOrb,
  Headline,
  HeroGrid,
  HeroMedia,
  HeroRoot,
  InnerRing3D,
  MobileLinkLeft,
  MobileLinkRight,
  Overlay,
  Ring3D,
  Subcopy,
  TopRight3DGraphic,
} from "@/sections/home/Hero.styles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 35, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const titleWords = [
  { text: "Style.", highlight: false },
  { text: "Quality.", highlight: false },
  { text: "Trusted.", highlight: false },
  { text: "Affordable.", highlight: true },
];

export function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 35;
    const y = (clientY - top - height / 2) / 35;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <HeroRoot onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Overlay />

      <TopRight3DGraphic
        aria-hidden
        as={motion.div}
        animate={{
          rotateX: rotate.y * -1,
          rotateY: rotate.x,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 25, mass: 1.2 }}
      >
        <GlowingOrb />
        <Ring3D />
        <InnerRing3D />
      </TopRight3DGraphic>

      <Container style={{ height: "100%", position: "relative", zIndex: 2 }}>
        <HeroGrid>
          <Content>
            <Headline
              as={motion.h1}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleWords.map((word) => (
                <motion.span
                  key={word.text}
                  variants={wordVariants}
                  style={{
                    display: "block",
                    color: word.highlight ? "#C6A75E" : "#FFFFFF",
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </Headline>

            <Subcopy
              as={motion.p}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 1.25, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Premium fashion &amp; everyday essentials crafted for effortless luxury.
            </Subcopy>

            <Actions
              as={motion.div}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {/* Mobile View Underlined Links */}
              <MobileLinkLeft href="/shop">
                SHOP NOW <ArrowRight size={14} />
              </MobileLinkLeft>
              <MobileLinkRight href="/categories">
                EXPLORE COLLECTION
              </MobileLinkRight>

              {/* Desktop View Buttons */}
              <DesktopButtons>
                <Button as="a" href="/shop" variant="gold" size="lg">
                  SHOP NOW <ArrowRight size={16} />
                </Button>
                <Button as="a" href="/categories" variant="goldOutline" size="lg">
                  EXPLORE COLLECTION
                </Button>
              </DesktopButtons>
            </Actions>
          </Content>

          <HeroMedia
            as={motion.div}
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              rotateX: rotate.y * -0.4,
              rotateY: rotate.x * 0.4,
            }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Image
              src={heroImg}
              alt="TRENOVA luxury collection"
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </HeroMedia>
        </HeroGrid>
      </Container>
    </HeroRoot>
  );
}







