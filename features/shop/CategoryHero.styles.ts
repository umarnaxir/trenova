"use client";

import styled from "styled-components";

export const HeroRoot = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 1.05fr);
    align-items: stretch;
    gap: ${({ theme }) => theme.space[8]};
  }
`;

export const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => `${theme.space[2]} 0`};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.space[4]};
`;

export const GoldBar = styled.span`
  width: 4px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.goldLight},
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.goldDark}
  );
`;

export const TitleStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

export const CollectionEyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 28rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const PromoBanner = styled.a`
  position: relative;
  display: block;
  min-height: 220px;
  overflow: hidden;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 260px;
  }

  img {
    object-fit: cover;
    object-position: center top;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const PromoShade = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(10, 10, 10, 0.72) 0%,
    rgba(10, 10, 10, 0.28) 55%,
    rgba(10, 10, 10, 0.12) 100%
  );
  pointer-events: none;
`;

export const PromoContent = styled.div`
  position: absolute;
  inset: auto auto ${({ theme }) => theme.space[6]} ${({ theme }) => theme.space[6]};
  z-index: 1;
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  max-width: 18rem;
`;

export const PromoEyebrow = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldLight};
`;

export const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  line-height: ${({ theme }) => theme.lineHeights.snug};
`;

export const PromoCta = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.space[5]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;
