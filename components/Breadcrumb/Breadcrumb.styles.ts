"use client";

import styled from "styled-components";

export const CrumbList = styled.nav<{ $compact?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme, $compact }) =>
    $compact ? theme.fontSizes.xs : theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
  margin-top: ${({ theme, $compact }) =>
    $compact ? theme.space[3] : theme.space[0]};
  margin-bottom: ${({ theme, $compact }) =>
    $compact ? theme.space[3] : theme.space[6]};
  padding-top: ${({ theme, $compact }) =>
    $compact ? theme.space[2] : "0"};
`;

export const CrumbLink = styled.a`
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const CrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.black};
`;
