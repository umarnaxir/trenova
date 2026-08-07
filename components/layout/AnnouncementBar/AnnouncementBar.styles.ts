"use client";

import styled, { keyframes } from "styled-components";

const marquee = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

export const Bar = styled.div`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray700};
`;

export const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 60s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;

  &::after {
    content: "•";
    color: ${({ theme }) => theme.colors.gold};
  }
`;
