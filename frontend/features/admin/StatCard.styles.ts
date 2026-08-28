"use client";

import styled, { keyframes } from "styled-components";

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Stat = styled.article<{ $tone?: "white" | "black"; $delay?: number }>`
  position: relative;
  overflow: hidden;
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "black" ? theme.colors.black : "rgba(198, 167, 94, 0.35)"};
  background: ${({ theme, $tone }) =>
    $tone === "black"
      ? `linear-gradient(145deg, ${theme.colors.black} 0%, #171717 100%)`
      : theme.colors.white};
  color: ${({ theme, $tone }) =>
    $tone === "black" ? theme.colors.white : theme.colors.black};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.08);
  transform: translateY(0) scale(1);
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  animation: ${riseIn} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};
  cursor: default;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(198, 167, 94, 0.12) 50%,
      transparent 70%
    );
    transform: translateX(-120%);
    transition: transform 0.6s ease;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 64px;
    height: 64px;
    background: radial-gradient(
      circle at top right,
      rgba(198, 167, 94, 0.28),
      transparent 70%
    );
    pointer-events: none;
    transition: transform 0.35s ease, opacity 0.35s ease;
  }

  &:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 18px 36px rgba(10, 10, 10, 0.16);
    border-color: ${({ theme }) => theme.colors.gold};

    &::before {
      transform: translateX(120%);
    }

    &::after {
      transform: scale(1.35);
      opacity: 0.9;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.005);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }

    &::before {
      display: none;
    }
  }
`;

export const StatValue = styled.p<{ $onDark?: boolean }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.15;
  color: ${({ theme, $onDark }) =>
    $onDark ? theme.colors.white : theme.colors.black};
`;
