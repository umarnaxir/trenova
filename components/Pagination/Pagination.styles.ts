"use client";

import styled from "styled-components";

export const PaginationRoot = styled.nav`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[8]};
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 40px;
  height: 40px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
