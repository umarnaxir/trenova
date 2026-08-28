"use client";

import styled from "styled-components";

export const PageHeader = styled.header`
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 2.25rem;
  }
`;

export const PageTitle = styled.h1`
  margin: 0.35rem 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 6vw, 2.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.black};
`;

export const PageLead = styled.p`
  margin: 0.65rem 0 0;
  max-width: 28rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.8125rem;
  line-height: 1.55;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0.85rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.15rem;
  }
`;

export const CategoryTile = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    aspect-ratio: 5 / 4;
    border-radius: 18px;
  }

  img {
    object-fit: cover;
    object-position: center 22%;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const TileShade = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.08) 28%,
    rgba(10, 10, 10, 0.55) 62%,
    rgba(10, 10, 10, 0.88) 100%
  );
  pointer-events: none;
`;

export const TileContent = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.85rem 0.75rem 0.9rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.55rem;
    padding: 1.35rem 1.25rem 1.4rem;
  }
`;

export const IconBadge = styled.span`
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid rgba(198, 167, 94, 0.55);
  color: ${({ theme }) => theme.colors.gold};
  background: rgba(10, 10, 10, 0.28);
  margin-bottom: 0.1rem;

  svg {
    width: 13px;
    height: 13px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 38px;
    height: 38px;
    margin-bottom: 0.15rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const TileTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: clamp(1.35rem, 2vw, 1.75rem);
  }
`;

export const TileDescription = styled.p`
  display: none;
  margin: 0;
  max-width: 16rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.8125rem;
  line-height: 1.45;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

export const ExploreCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.15rem;
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.575rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.12em;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0.25rem;
    gap: 0.35rem;
    font-size: 0.6875rem;
    letter-spacing: 0.14em;
  }
`;

export const BenefitsBar = styled.section`
  margin-top: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 2.75rem;
    border-radius: 16px;
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.9rem 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  &:nth-child(odd) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
    padding: 1.15rem 1.25rem;
    border-bottom: 0;
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};

    &:nth-child(odd) {
      border-right: 1px solid ${({ theme }) => theme.colors.gray200};
    }

    &:last-child {
      border-right: 0;
    }
  }

  svg {
    flex-shrink: 0;
    margin-top: 0.1rem;
    color: ${({ theme }) => theme.colors.gold};

    ${({ theme }) => theme.mediaQueries.lg} {
      margin-top: 0;
    }
  }
`;

export const BenefitTitle = styled.p`
  margin: 0;
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.75rem;
  }
`;

export const BenefitCopy = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.65rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.gray500};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.75rem;
  }
`;
