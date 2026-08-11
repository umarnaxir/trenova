"use client";

import styled from "styled-components";

export const DetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[8]};
  padding-block: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[4]};
`;

export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 35% 65%;
    gap: 0.85rem;
    max-height: min(90vh, calc(100dvh - 5.5rem));
    min-height: 0;
  }
`;

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
  width: 100%;
`;

export const MainImage = styled.div`
  position: relative;
  width: 100%;
  min-height: 0;
  flex: 0 1 auto;
  max-height: 28rem;
  aspect-ratio: 1;
  background: linear-gradient(180deg, #f7f5f2 0%, #efefe8 100%);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  ${({ theme }) => theme.mediaQueries.lg} {
    aspect-ratio: auto;
    flex: 0 0 auto;
    height: min(62vh, 32rem);
    max-height: min(62vh, 32rem);
  }

  img {
    object-fit: contain;
    object-position: center;
    transition: opacity 0.25s ease;
  }
`;

export const ThumbRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
  width: 100%;
  flex: 0 0 auto;
  height: 5rem;
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray200};
  background: ${({ theme }) => theme.colors.offWhite};
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  outline: none;
  box-shadow: ${({ $active, theme }) =>
    $active ? `0 0 0 1px ${theme.colors.gold}` : "none"};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  img {
    object-fit: contain;
    object-position: center;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

export const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
  min-height: 0;
  padding-inline: 0 0.25rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    overflow: auto;
    height: 100%;
    padding-right: 0.35rem;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

export const BrandLabel = styled.p`
  margin: 0;
  font-size: 0.65rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const ProductTitle = styled.h1`
  margin: 0.1rem 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  line-height: 1.15;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.65rem;
`;

export const CurrentPrice = styled.span`
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`;

export const ComparePrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray400};
  text-decoration: line-through;
`;

export const DiscountTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.4rem;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const ShortCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.8125rem;
  line-height: 1.45;
  max-width: 40rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  margin: 0.1rem 0;
`;

export const OptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const OptionLabel = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};

  span {
    font-size: 0.65rem;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.gray700};
  }

  small {
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.goldDark};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

export const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const ColorChip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.25rem;
  padding: 0.25rem 0.7rem 0.25rem 0.35rem;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.black};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `0 0 0 2px ${theme.colors.white}, 0 0 0 4px ${theme.colors.gold}`
      : "none"};
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }

  span {
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: 0.04em;
    text-transform: capitalize;
  }
`;

export const ColorDot = styled.i<{ $hex: string; $active?: boolean }>`
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 999px;
  background: ${({ $hex }) => $hex};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.gold : "rgba(0,0,0,0.15)"};
  box-shadow: ${({ $active }) =>
    $active ? "inset 0 0 0 1px rgba(255,255,255,0.35)" : "none"};
  flex-shrink: 0;
`;

export const Swatch = styled.button<{ $active?: boolean; $hex: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $hex }) => $hex};
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `0 0 0 2px ${theme.colors.white}, 0 0 0 4px ${theme.colors.gold}`
      : "none"};
  cursor: pointer;
`;

export const SizeChip = styled.button<{ $active?: boolean }>`
  min-width: 2.5rem;
  height: 2.35rem;
  padding: 0 0.7rem;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.black};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `0 0 0 2px ${theme.colors.white}, 0 0 0 4px ${theme.colors.gold}`
      : "none"};
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    text-decoration: line-through;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

export const StockHint = styled.p<{ $danger?: boolean }>`
  margin: 0;
  font-size: 0.6875rem;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error : theme.colors.gray500};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 0.15rem;

  > * {
    flex: 0 0 auto;
    width: auto !important;
    min-width: 0;
    white-space: nowrap;
    padding-inline: 0.7rem !important;
  }
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 0.65rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const SpecList = styled.dl`
  display: grid;
  gap: 0;
  margin: 0;

  div {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 0.5rem;
    padding-block: 0.35rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }
  }

  dt {
    color: ${({ theme }) => theme.colors.gray500};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    font-size: 0.625rem;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 0.8125rem;
  }
`;

export const BlockTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space[5]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;

export const CompactCopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.8125rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
