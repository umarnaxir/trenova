"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";

const goldShimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const goldGlow = keyframes`
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(198, 167, 94, 0.28),
      0 10px 24px rgba(10, 10, 10, 0.2);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(198, 167, 94, 0.55),
      0 0 22px rgba(198, 167, 94, 0.28),
      0 12px 28px rgba(10, 10, 10, 0.28);
  }
`;

export const AccountShell = styled.div`
  display: grid;
  gap: 1.25rem;
`;

export const AccountHero = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.2rem;
  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.cream} 0%,
    ${({ theme }) => theme.colors.offWhite} 42%,
    ${({ theme }) => theme.colors.white} 100%
  );
`;

export const HeroCopy = styled.div`
  display: grid;
  gap: 0.3rem;
  min-width: 0;

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.5rem, 3vw, 2rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 0.875rem;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const HeroButton = styled(Link)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 40px;
  padding: 0 0.9rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $primary }) =>
      $primary ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $primary }) =>
    $primary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $primary }) =>
    $primary ? theme.colors.white : theme.colors.black};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const StatCard = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 108px;
  padding: 1.15rem 1.1rem;
  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: 14px;
  background:
    linear-gradient(
      135deg,
      rgba(198, 167, 94, 0.14) 0%,
      transparent 42%,
      rgba(198, 167, 94, 0.08) 100%
    ),
    ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  animation: ${goldGlow} 4.5s ease-in-out infinite;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 20%,
      rgba(198, 167, 94, 0.18) 45%,
      transparent 70%
    );
    background-size: 220% 220%;
    animation: ${goldShimmer} 5s ease-in-out infinite;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.gold};
  }

  span {
    position: relative;
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldLight};
  }

  strong {
    position: relative;
    display: block;
    margin-top: 0.55rem;
    font-size: 1.35rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }
`;

export const ActionCard = styled(Link)`
  display: grid;
  justify-items: center;
  align-content: start;
  text-align: center;
  gap: 0.65rem;
  min-height: 168px;
  padding: 1rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  color: inherit;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 188px;
    padding: 1.35rem 1.25rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 12px 28px rgba(198, 167, 94, 0.14);

    .icon {
      background: ${({ theme }) => theme.colors.gold};
      color: ${({ theme }) => theme.colors.black};
      border-color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

export const CardIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(198, 167, 94, 0.14);
  color: ${({ theme }) => theme.colors.goldDark};
  border: 1px solid rgba(198, 167, 94, 0.28);
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const CardCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.825rem;
  line-height: 1.45;
`;

export const CardCta = styled.span`
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
`;
