"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroRoot = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 460px;
  max-height: 780px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  isolation: isolate;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 420px;
  }
`;

export const Slide = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

export const SlideMedia = styled(motion.div)`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center center;
  }

  .hero-img-mobile {
    display: block;
  }

  .hero-img-desktop {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .hero-img-mobile {
      display: none;
    }

    .hero-img-desktop {
      display: block;
    }
  }
`;

export const SlideOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 58%,
    rgba(0, 0, 0, 0.28) 78%,
    rgba(0, 0, 0, 0.62) 100%
  );

  ${({ theme }) => theme.mediaQueries.md} {
    background:
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.88) 0%,
        rgba(0, 0, 0, 0.7) 26%,
        rgba(0, 0, 0, 0.32) 45%,
        transparent 58%
      ),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.18) 0%,
        transparent 30%,
        transparent 70%,
        rgba(0, 0, 0, 0.28) 100%
      );
  }
`;

export const SlideInner = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-block: 2.5rem 3.75rem;
  pointer-events: none;

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: center;
    justify-content: flex-start;
    padding-block: 4rem 5rem;
  }

  a,
  button {
    pointer-events: auto;
  }
`;

export const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  gap: 0.65rem;
  max-width: 680px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 1.35rem;
  }
`;

export const Eyebrow = styled(motion.p)`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.8125rem;
    letter-spacing: 0.18em;
  }
`;

export const Headline = styled(motion.p)`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.55rem, 7vw, 2.15rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: clamp(2.15rem, 6.5vw, 4.25rem);
    line-height: 1.05;
  }
`;

export const HeadlineAccent = styled.span`
  color: ${({ theme }) => theme.colors.gold};
`;

export const Subcopy = styled(motion.p)`
  margin: 0;
  max-width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 1.0625rem;
    line-height: 1.65;
  }
`;

export const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  width: 100%;
  margin-top: 0.15rem;

  a {
    flex: 1 1 0;
    min-width: 0;
    min-height: 28px;
    padding: 0 0.3rem;
    font-size: 0.55rem;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 0.4rem;
    width: auto;

    a {
      flex: 0 0 auto;
      min-width: 7rem;
      min-height: 40px;
      padding: 0 ${({ theme }) => theme.space[5]};
      font-size: 0.75rem;
      letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    }
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 20;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  pointer-events: auto;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }

  &.hero-prev {
    left: 0.5rem;
  }

  &.hero-next {
    right: 0.5rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 44px;
    height: 44px;

    svg {
      width: 22px;
      height: 22px;
    }

    &.hero-prev {
      left: 1rem;
    }

    &.hero-next {
      right: 1rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &.hero-prev {
      left: 1.5rem;
    }

    &.hero-next {
      right: 1.5rem;
    }
  }
`;

export const Pagination = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.85rem;
  z-index: 20;
  display: flex;
  justify-content: center;
  gap: 0.45rem;
  pointer-events: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 1.5rem;
    gap: 0.55rem;
  }
`;

export const PaginationDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "22px" : "7px")};
  height: 7px;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : "rgba(255, 255, 255, 0.45)"};
  cursor: pointer;
  transition:
    width ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.base};

  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ $active }) => ($active ? "28px" : "8px")};
    height: 8px;
  }
`;
