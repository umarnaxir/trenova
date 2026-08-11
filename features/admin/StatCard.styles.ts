"use client";

import styled from "styled-components";

export const Stat = styled.article<{ $tone?: "white" | "black" }>`
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
  position: relative;
  z-index: 1;
`;
