"use client";

import styled from "styled-components";

export const FiltersRoot = styled.aside`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  height: fit-content;
`;

export const FilterGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Chip = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;
