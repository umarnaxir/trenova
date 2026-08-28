"use client";

import styled from "styled-components";

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.45rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${({ theme }) => theme.mediaQueries.md} {
    gap: ${({ theme }) => theme.space[3]};
    padding: ${({ theme }) => theme.space[3]};
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Media = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 12px;
  }

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const BadgeRow = styled.div`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    top: ${({ theme }) => theme.space[3]};
    left: ${({ theme }) => theme.space[3]};
  }
`;

export const WishButton = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 1;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  ${({ theme }) => theme.mediaQueries.md} {
    top: ${({ theme }) => theme.space[3]};
    right: ${({ theme }) => theme.space[3]};
    width: 34px;
    height: 34px;
  }

  &:hover,
  &[data-active="true"] {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const OverlayTag = styled.span`
  position: absolute;
  left: 0.4rem;
  right: 0.4rem;
  bottom: 0.4rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 22px;
  padding: 0 0.4rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(10, 10, 10, 0.72);
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.55rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  backdrop-filter: blur(4px);

  ${({ theme }) => theme.mediaQueries.md} {
    left: ${({ theme }) => theme.space[3]};
    right: ${({ theme }) => theme.space[3]};
    bottom: ${({ theme }) => theme.space[3]};
    gap: 6px;
    min-height: 28px;
    padding: 0 ${({ theme }) => theme.space[3]};
    font-size: 0.65rem;
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: ${({ theme }) => theme.space[2]};
  }

  /* Compact shared Price / Rating inside cards on mobile */
  [aria-label^="Rated"] {
    gap: 0.25rem;

    svg {
      width: 10px;
      height: 10px;
    }

    span {
      font-size: 0.6rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    [aria-label^="Rated"] {
      gap: ${({ theme }) => theme.space[2]};

      svg {
        width: 14px;
        height: 14px;
      }

      span {
        font-size: inherit;
      }
    }
  }
`;

export const CategoryLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.6rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: capitalize;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const TitleLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  font-size: 0.7rem;
  line-height: 1.25;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.snug};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: ${({ theme }) => theme.space[2]};
  }

  /* Price component root */
  & > div {
    font-size: 0.75rem;
    gap: 0.25rem;
  }

  & > div span:last-child {
    font-size: 0.65rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      font-size: ${({ theme }) => theme.fontSizes.md};
      gap: ${({ theme }) => theme.space[2]};
    }

    & > div span:last-child {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

export const OffBadge = styled.span`
  color: #b42318;
  font-size: 0.55rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 6px;
  }
`;

export const ColorDot = styled.span<{ $hex: string }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $hex }) => $hex};
  box-shadow: inset 0 0 0 1px rgba(10, 10, 10, 0.15);

  ${({ theme }) => theme.mediaQueries.md} {
    width: 12px;
    height: 12px;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: auto;
  padding-top: 0.15rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  width: 100%;
  min-height: 30px;
  padding: 0 0.4rem;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.575rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    gap: ${({ theme }) => theme.space[2]};
    min-height: 42px;
    padding: 0 ${({ theme }) => theme.space[3]};
    border-radius: 10px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`;
