"use client";

import styled, { css } from "styled-components";

export const CatalogRoot = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
`;

export const CatalogLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 260px minmax(0, 1fr);
    align-items: start;
    gap: ${({ theme }) => theme.space[8]};
  }
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: grid;
    gap: ${({ theme }) => theme.space[7]};
    position: sticky;
    top: 96px;
    padding: ${({ theme }) => theme.space[5]};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.white};
  }
`;

export const MobileFilterSheet = styled.div<{ $open?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.modal};
  display: ${({ $open }) => ($open ? "grid" : "none")};
  grid-template-rows: auto 1fr;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const MobileFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const MobileFilterBody = styled.div`
  overflow: auto;
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[7]};
`;

export const MainColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  min-width: 0;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`;

export const ResultCount = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ToolbarRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  margin-left: auto;
`;

export const SortWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;

export const SortSelect = styled.select`
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.space[8]} 0 ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white}
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230A0A0A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  appearance: none;
  cursor: pointer;
`;

export const ToolbarButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const FilterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.space[5]};
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
export const FilterGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const FilterLabel = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

export const CategoryItem = styled.li``;

export const CategoryCheck = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const CheckLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.gold};
  cursor: pointer;
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export const PriceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const RangeTrack = styled.div`
  position: relative;
  height: 28px;
`;

export const RangeInput = styled.input`
  position: absolute;
  inset: 10px 0 auto;
  width: 100%;
  appearance: none;
  background: transparent;
  pointer-events: none;

  &:nth-child(1) {
    z-index: 3;
  }

  &:nth-child(2) {
    z-index: 4;
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 2px solid ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.goldDark};
    pointer-events: auto;
    cursor: pointer;
  }

  &::-moz-range-track {
    height: 4px;
    background: ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.gold};
    pointer-events: auto;
    cursor: pointer;
  }
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Chip = styled.button<{ $active?: boolean }>`
  min-width: 40px;
  min-height: 36px;
  padding: 0 ${({ theme }) => theme.space[3]};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  cursor: pointer;
`;

export const ColorSwatch = styled.button<{ $active?: boolean; $hex: string }>`
  width: 26px;
  height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ $hex }) => $hex};
  cursor: pointer;

  ${({ $hex }) =>
    $hex.toLowerCase() === "#ffffff" || $hex.toLowerCase() === "#f7f5f2"
      ? css`
          box-shadow: inset 0 0 0 1px rgba(10, 10, 10, 0.18);
        `
      : null}

  ${({ $active, theme }) =>
    $active
      ? css`
          outline: 2px solid ${theme.colors.gold};
          outline-offset: 2px;
        `
      : null}
`;

export const ClearButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  justify-self: start;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ApplyFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  margin-top: ${({ theme }) => theme.space[2]};
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  cursor: pointer;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  cursor: pointer;
`;
