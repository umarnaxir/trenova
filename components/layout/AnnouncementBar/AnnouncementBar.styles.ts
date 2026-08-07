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
  background: linear-gradient(90deg, #D4AF37 0%, #C6A75E 50%, #B89635 100%);
  color: #0A0A0A;
  overflow: hidden;
  white-space: nowrap;
  padding-block: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
`;

export const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 35s linear infinite;

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
  gap: 0.5rem;
  padding-inline: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  svg {
    flex-shrink: 0;
  }

  &::after {
    content: "•";
    margin-left: 2rem;
    color: #0A0A0A;
    opacity: 0.4;
  }
`;

