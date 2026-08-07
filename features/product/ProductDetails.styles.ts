"use client";

import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1.1fr 0.9fr;
    gap: ${({ theme }) => theme.space[10]};
  }
`;

export const Gallery = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const MainImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  background: ${({ theme }) => theme.colors.gray100};
  overflow: hidden;
`;

export const ThumbRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[3]};
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  position: relative;
  aspect-ratio: 1;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  overflow: hidden;
`;

export const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Swatch = styled.button<{ $active?: boolean; $hex: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $hex }) => $hex};
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
`;

export const SizeChip = styled.button<{ $active?: boolean }>`
  min-width: 44px;
  height: 40px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
`;

export const SpecList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[4]};

  div {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: ${({ theme }) => theme.space[3]};
    padding-bottom: ${({ theme }) => theme.space[3]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }

  dt {
    color: ${({ theme }) => theme.colors.gray500};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
