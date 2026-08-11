"use client";

import styled from "styled-components";
import { ADMIN_CARD_BG, ADMIN_CARD_BORDER } from "@/features/admin/AdminLayout.styles";

export const PaginationBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  background: ${ADMIN_CARD_BG};
  border: 1px solid ${ADMIN_CARD_BORDER};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.04);
`;

export const PaginationMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
`;

export const PaginationControls = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : "rgba(198, 167, 94, 0.45)"};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.black};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.black};
  }
`;
