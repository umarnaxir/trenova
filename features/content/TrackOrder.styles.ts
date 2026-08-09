"use client";

import styled from "styled-components";

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[7]};
  }
`;

export const StatusPillLike = styled.span<{ $tone: string }>`
  display: inline-flex;
  width: fit-content;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  background: ${({ theme, $tone }) => {
    if ($tone === "delivered") return "rgba(2, 122, 72, 0.1)";
    if ($tone === "cancelled") return "rgba(180, 35, 24, 0.1)";
    if ($tone === "shipped" || $tone === "confirmed")
      return "rgba(181, 71, 8, 0.12)";
    return theme.colors.gray100;
  }};
  color: ${({ theme, $tone }) => {
    if ($tone === "delivered") return theme.colors.success;
    if ($tone === "cancelled") return theme.colors.error;
    if ($tone === "shipped" || $tone === "confirmed") return theme.colors.warning;
    return theme.colors.gray600;
  }};
`;
