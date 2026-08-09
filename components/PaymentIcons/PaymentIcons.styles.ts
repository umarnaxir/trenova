"use client";

import styled from "styled-components";

export const PaymentRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space[2]};
    width: auto;
    overflow: visible;
  }
`;

export const PaymentChip = styled.span<{ $tone?: "light" | "dark" }>`
  flex: 1 1 0;
  min-width: 0;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.3rem;
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "dark" ? theme.colors.gray600 : theme.colors.gray300};
  background: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.colors.blackSoft : theme.colors.white};
  font-size: 8px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.colors.gray300 : theme.colors.gray600};

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 auto;
    min-width: 58px;
    height: 32px;
    padding: 0 ${({ theme }) => theme.space[3]};
    font-size: 10px;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  }
`;
