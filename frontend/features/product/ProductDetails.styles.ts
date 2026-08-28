"use client";

import styled from "styled-components";

export const DetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 0.5rem 1.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 2.5rem;
    padding-block: 0.75rem 2rem;
  }
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.25rem;
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 2rem;
    align-items: stretch;
  }
`;

export const Gallery = styled.div`
  display: grid;
  gap: 0.65rem;
  min-width: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 0.85rem;
    align-items: stretch;
    height: 100%;
    min-height: 34rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 100%;
  }
`;

export const ThumbColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.45rem;
  order: 2;
  overflow-x: auto;
  padding-bottom: 0.15rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    order: 0;
    overflow-x: visible;
    overflow-y: auto;
    height: 100%;
    padding-bottom: 0;
  }
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 64px;
  height: 64px;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray200};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.offWhite};
  overflow: hidden;
  cursor: pointer;
  padding: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  img {
    object-fit: contain;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

export const MainStage = styled.div`
  position: relative;
  min-width: 0;
  order: 1;
  height: 100%;
`;

export const MainImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: linear-gradient(180deg, #f7f5f2 0%, #efefe8 100%);
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    aspect-ratio: auto;
    height: 100%;
    min-height: 34rem;
  }

  img {
    object-fit: contain;
  }
`;

export const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 1rem;
  }
`;

export const TopMeta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

export const UtilityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
`;

export const ShareWrap = styled.div`
  position: relative;
`;

export const UtilityButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 34px;
  padding: 0 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;

  &:hover,
  &[data-active="true"],
  &[aria-expanded="true"] {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
  }

  span {
    display: none;

    ${({ theme }) => theme.mediaQueries.sm} {
      display: inline;
    }
  }
`;

export const ShareMenu = styled.div<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  width: min(220px, 72vw);
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const ShareMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  min-height: 38px;
  padding: 0 0.7rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  font: inherit;
  font-size: 0.8125rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

export const BrandLabel = styled.p`
  margin: 0;
  font-size: 0.6875rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 700;
`;

export const ProductTitle = styled.h1`
  margin: 0.25rem 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  line-height: 1.12;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const RatingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.gold};

  span {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 0.8125rem;
  }
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.45rem 0.7rem;
`;

export const CurrentPrice = styled.span`
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
`;

export const ComparePrice = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray400};
  text-decoration: line-through;
`;

export const DiscountTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const ShortCopy = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const OptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  span {
    font-size: 0.6875rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray700};
  }

  small {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray600};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: ${({ theme }) => theme.colors.goldDark};
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const ColorChip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.4rem;
  padding: 0.3rem 0.75rem 0.3rem 0.4rem;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  span {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: capitalize;
  }

  svg {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const ColorDot = styled.i<{ $hex: string }>`
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 999px;
  background: ${({ $hex }) => $hex};
  box-shadow: inset 0 0 0 1px rgba(10, 10, 10, 0.15);
  flex-shrink: 0;
`;

export const SizeChip = styled.button<{ $active?: boolean }>`
  min-width: 2.6rem;
  height: 2.5rem;
  padding: 0 0.7rem;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;

export const QtyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
`;

export const StockHint = styled.p<{ $danger?: boolean }>`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error : theme.colors.success};
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
  margin-top: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ActionButton = styled.button<{
  $variant?: "dark" | "gold" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 48px;
  padding: 0 1rem;
  border-radius: 8px;
  border: 1.5px solid
    ${({ theme, $variant }) =>
      $variant === "outline"
        ? theme.colors.gray300
        : $variant === "gold"
          ? theme.colors.gold
          : theme.colors.black};
  background: ${({ theme, $variant }) =>
    $variant === "outline"
      ? theme.colors.white
      : $variant === "gold"
        ? theme.colors.gold
        : theme.colors.black};
  color: ${({ theme, $variant }) =>
    $variant === "outline"
      ? theme.colors.black
      : $variant === "gold"
        ? theme.colors.black
        : theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
      $variant === "outline"
        ? theme.colors.offWhite
        : $variant === "gold"
          ? theme.colors.goldLight
          : theme.colors.blackSoft};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const TrustBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 0.75rem;
  padding: 1rem 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 1.15rem 1.35rem;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  min-width: 0;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.goldDark};
    margin-top: 0.1rem;
  }

  strong {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    display: block;
    margin-top: 0.1rem;
    font-size: 0.65rem;
    color: ${({ theme }) => theme.colors.gray500};
    line-height: 1.3;
  }
`;

export const TabsSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-top: 0.25rem;
`;

export const TabList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.25rem;
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  margin-bottom: 1.15rem;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  min-height: 42px;
  padding: 0 0.85rem;
  border: 0;
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.gold : "transparent")};
  background: transparent;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.gray500};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const TabPanel = styled.div`
  display: grid;
  gap: 1rem;
`;

export const TabCopy = styled.p`
  margin: 0;
  max-width: 52rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9375rem;
  line-height: 1.65;
`;

export const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SpecCard = styled.div`
  padding: 0.9rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};

  dt {
    margin: 0;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  dd {
    margin: 0.35rem 0 0;
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ReviewsGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const BlockTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.2rem, 2.2vw, 1.65rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
