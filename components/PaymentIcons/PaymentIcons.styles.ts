"use client";

import styled from "styled-components";

export const PaymentRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const PaymentChip = styled.span<{ $tone?: "light" | "dark" }>`
  min-width: 58px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "dark" ? theme.colors.gray600 : theme.colors.gray300};
  background: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.colors.blackSoft : theme.colors.white};
  font-size: 10px;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.colors.gray300 : theme.colors.gray600};
`;
