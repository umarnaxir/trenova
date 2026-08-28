"use client";

import styled from "styled-components";

export const PaginationRoot = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin-top: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.45rem;
    margin-top: ${({ theme }) => theme.space[8]};
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 28px;
  height: 28px;
  padding: 0 0.45rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  border-radius: 6px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.02em;
  line-height: 1;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 32px;
    height: 32px;
    padding: 0 0.55rem;
    border-radius: 8px;
    font-size: 0.75rem;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
