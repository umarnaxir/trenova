"use client";

import styled, { keyframes } from "styled-components";

export const CartLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 280px);
    align-items: start;
    gap: ${({ theme }) => theme.space[6]};
  }
`;

export const MainColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  min-width: 0;
`;

export const CartItems = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const CartItemsHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const ItemCount = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;

export const ContinueLink = styled.a`
  color: ${({ theme }) => theme.colors.goldDark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const Line = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 104px 1fr auto;
    gap: ${({ theme }) => theme.space[4]};
    padding: ${({ theme }) => theme.space[4]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const Thumb = styled.a`
  position: relative;
  display: block;
  width: 80px;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 104px;
  }

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

export const LineBody = styled.div`
  min-width: 0;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.space[2]};
`;

export const LineActions = styled.div`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[1]};

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-column: auto;
    margin-top: 0;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const LinePrice = styled.p`
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.02em;
`;

export const Summary = styled.aside`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  background:
    linear-gradient(
      135deg,
      rgba(198, 167, 94, 0.08) 0%,
      transparent 42%
    ),
    ${({ theme }) => theme.colors.white};

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto auto 0;
    width: 72px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  padding-top: ${({ theme }) => theme.space[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const CouponRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.space[2]};
  align-items: end;

  button {
    height: 48px;
    min-height: 48px;
    min-width: 120px;
    padding-inline: ${({ theme }) => theme.space[6]};
  }
`;

export const CouponHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const TrendingPanel = styled.aside`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[4]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  min-width: 0;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.lg} {
    position: sticky;
    top: 6.5rem;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto -20% -30% auto;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(198, 167, 94, 0.28),
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const TrendingHeader = styled.div`
  display: grid;
  gap: 0.35rem;
  position: relative;
  z-index: 1;
`;

export const TrendingEyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
`;

export const TrendingTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`;

export const TrendingSub = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const TrendingList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  position: relative;
  z-index: 1;
`;

export const TrendingCard = styled.article`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: rgba(198, 167, 94, 0.1);
    transform: translateY(-2px);
  }
`;

export const TrendingThumb = styled.a`
  position: relative;
  display: block;
  width: 56px;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray700};

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

export const TrendingMeta = styled.div`
  min-width: 0;
  display: grid;
  align-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
`;

export const TrendingName = styled.a`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.snug};

  &:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`;

export const TrendingFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[1]};
  min-width: 0;

  > div {
    min-width: 0;
    flex-wrap: wrap;
    gap: 0.2rem;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.white};
  }

  span + span {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const TrendingAdd = styled.button<{ $busy?: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  min-height: 28px;
  min-width: 52px;
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ $busy, theme }) =>
    $busy
      ? `linear-gradient(90deg, ${theme.colors.gold}, ${theme.colors.goldLight}, ${theme.colors.gold})`
      : theme.colors.gold};
  background-size: ${({ $busy }) => ($busy ? "200% 100%" : "auto")};
  animation: ${({ $busy }) => ($busy ? shimmer : "none")} 0.8s linear infinite;
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.goldLight};
    border-color: ${({ theme }) => theme.colors.goldLight};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;
