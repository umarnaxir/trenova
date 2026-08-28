"use client";

import styled from "styled-components";
import { ADMIN_CARD_BG, ADMIN_CARD_BORDER } from "@/features/admin/AdminLayout.styles";

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${ADMIN_CARD_BORDER};
  background: ${ADMIN_CARD_BG};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.05);
`;

export const Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  min-width: 720px;
  background: transparent;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    border-bottom: 1px solid rgba(198, 167, 94, 0.28);
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.black};
  }

  th {
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.black};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    font-weight: 700;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.gray100};
  }

  tbody tr[data-selected="true"] td {
    background: rgba(198, 167, 94, 0.12);
  }
`;

export const SelectCell = styled.th`
  width: 44px;
  text-align: center !important;
`;

export const SelectTd = styled.td`
  width: 44px;
  text-align: center !important;
  vertical-align: middle;
`;

export const RowCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.gold};
  cursor: pointer;
`;

export const ActionsHeader = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

export const ActionsCell = styled.td`
  width: 1%;
  white-space: nowrap;
  text-align: right !important;
  padding-inline-end: ${({ theme }) => theme.space[3]} !important;
  vertical-align: middle;

  & > * {
    display: inline-flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

export const ActionsHeaderCell = styled.th`
  width: 1%;
  white-space: nowrap;
  text-align: right !important;
  padding-inline-end: ${({ theme }) => theme.space[3]} !important;
`;
