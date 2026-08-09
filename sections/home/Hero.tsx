"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import {
  Actions,
  Content,
  Eyebrow,
  Headline,
  HeadlineAccent,
  HeroRoot,
  NavButton,
  Pagination,
  PaginationDot,
  Slide,
  SlideInner,
  SlideMedia,
  SlideOverlay,
  Subcopy,
} from "@/sections/home/Hero.styles";

type HeroSlide = {
  id: string;
  eyebrow: string;
  lines: Array<{ text: string; accent?: boolean; sameLine?: boolean }>;
  subcopy: string;
  image: string;
  alt: string;
};

const AUTO_MS = 3000;

const slides: HeroSlide[] = [
  {
    id: "cover-1",
    eyebrow: "Performance Meets Style",
    lines: [
      { text: "Move Better." },
      { text: "Live Better.", accent: true },
    ],
    subcopy:
      "Premium sportswear, lifestyle essentials & accessories for Men, Women & Kids.",
    image: "/images/hero/cover-01.png",
    alt: "TRENOVA menswear lifestyle cover",
  },
  {
    id: "cover-2",
    eyebrow: "Performance Meets Style",
    lines: [
      { text: "Style That " },
      { text: "Performs.", accent: true, sameLine: true },
    ],
    subcopy: "Engineered for Comfort. Designed for Everyday.",
    image: "/images/hero/cover-02.png",
    alt: "TRENOVA womenswear lifestyle cover",
  },
  {
    id: "cover-3",
    eyebrow: "Performance Meets Style",
    lines: [
      { text: "For Every Body." },
      { text: "For Every Goal.", accent: true },
    ],
    subcopy: "Men • Women • Kids",
    image: "/images/hero/cover-03.png",
    alt: "TRENOVA kidswear lifestyle cover",
  },
];

const ctas = [
  { label: "Shop Men", href: "/categories/men" },
  { label: "Shop Women", href: "/categories/women" },
  { label: "Shop Kids", href: "/categories/kids" },
] as const;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, total]);

  const slide = slides[activeIndex];

  return (
    <HeroRoot aria-label="Featured collections" aria-roledescription="carousel">
      <AnimatePresence mode="sync" initial={false}>
        <Slide
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <SlideMedia>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
            />
          </SlideMedia>
          <SlideOverlay />
          <SlideInner>
            <Container style={{ width: "100%" }}>
              <Content>
                <Eyebrow>{slide.eyebrow}</Eyebrow>
                <Headline>
                  {slide.lines.map((line, lineIndex) => {
                    const LineTag = line.accent ? HeadlineAccent : "span";
                    return (
                      <span key={`${line.text}-${lineIndex}`}>
                        {lineIndex > 0 && !line.sameLine ? <br /> : null}
                        <LineTag>{line.text}</LineTag>
                      </span>
                    );
                  })}
                </Headline>
                <Subcopy>{slide.subcopy}</Subcopy>
                <Actions>
                  {ctas.map((cta, ctaIndex) => (
                    <Button
                      key={cta.href}
                      as="a"
                      href={cta.href}
                      variant={
                        ctaIndex === activeIndex ? "gold" : "whiteOutline"
                      }
                      size="sm"
                    >
                      {cta.label}
                    </Button>
                  ))}
                </Actions>
              </Content>
            </Container>
          </SlideInner>
        </Slide>
      </AnimatePresence>

      <NavButton
        type="button"
        className="hero-prev"
        aria-label="Previous banner"
        onClick={goPrev}
      >
        <ChevronLeft size={22} strokeWidth={1.75} />
      </NavButton>
      <NavButton
        type="button"
        className="hero-next"
        aria-label="Next banner"
        onClick={goNext}
      >
        <ChevronRight size={22} strokeWidth={1.75} />
      </NavButton>

      <Pagination>
        {slides.map((item, index) => (
          <PaginationDot
            key={item.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            $active={index === activeIndex}
            onClick={() => goTo(index)}
          />
        ))}
      </Pagination>
    </HeroRoot>
  );
}
