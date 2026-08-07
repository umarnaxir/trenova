"use client";

import styled from "styled-components";

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  th {
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray500};
    background: ${({ theme }) => theme.colors.offWhite};
  }
`;
