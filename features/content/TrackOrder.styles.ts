"use client";

import styled from "styled-components";

export const TrackRoot = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const TrackIntro = styled.header`
  display: grid;
  gap: 0.4rem;
`;

export const TrackTitle = styled.h1`
  margin: 0.2rem 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.05;
`;

export const TrackLead = styled.p`
  margin: 0;
  max-width: 36rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
  line-height: 1.55;
`;

export const TrackLayout = styled.div`
  display: grid;
  gap: 1.15rem;
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
  }
`;

export const TrackCard = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1.15rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 1.35rem 1.4rem;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  svg {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.85rem;
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 48px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.45;
`;

export const ErrorBanner = styled.div`
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(180, 35, 24, 0.25);
  background: rgba(180, 35, 24, 0.06);
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
`;

export const ResultHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const OrderNumber = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const StatusPill = styled.span<{ $tone: string }>`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: ${({ $tone, theme }) => {
    if ($tone === "delivered") return "rgba(2, 122, 72, 0.12)";
    if ($tone === "cancelled") return "rgba(180, 35, 24, 0.12)";
    if ($tone === "shipped") return "rgba(198, 167, 94, 0.18)";
    return theme.colors.gray100;
  }};
  color: ${({ $tone, theme }) => {
    if ($tone === "delivered") return theme.colors.success;
    if ($tone === "cancelled") return theme.colors.error;
    if ($tone === "shipped") return theme.colors.goldDark;
    return theme.colors.gray700;
  }};
`;

export const Timeline = styled.ol`
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0;
`;

export const TimelineStep = styled.li<{ $done?: boolean; $current?: boolean }>`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0.75rem;
  position: relative;
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child)::before {
    content: "";
    position: absolute;
    left: 13px;
    top: 28px;
    bottom: 0;
    width: 2px;
    background: ${({ theme, $done }) =>
      $done ? theme.colors.gold : theme.colors.gray200};
  }
`;

export const StepDot = styled.span<{ $done?: boolean; $current?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  border: 2px solid
    ${({ theme, $done, $current }) =>
      $done || $current ? theme.colors.gold : theme.colors.gray300};
  background: ${({ theme, $done }) =>
    $done ? theme.colors.gold : theme.colors.white};
  color: ${({ theme, $done }) =>
    $done ? theme.colors.black : theme.colors.gray400};
  z-index: 1;
`;

export const StepCopy = styled.div`
  padding-top: 0.2rem;

  strong {
    display: block;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const ItemList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const ItemThumb = styled.div`
  position: relative;
  width: 56px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  img {
    object-fit: contain;
  }
`;

export const ItemMeta = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  span {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const ItemPrice = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const MetaGrid = styled.div`
  display: grid;
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MetaCard = styled.div`
  padding: 0.85rem 0.9rem;
  border-radius: 10px;
  background: rgba(198, 167, 94, 0.1);
  border: 1px solid rgba(198, 167, 94, 0.22);

  span {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  strong {
    display: block;
    margin-top: 0.3rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const SideCard = styled.aside`
  display: grid;
  gap: 0.85rem;
  padding: 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: rgba(198, 167, 94, 0.08);
  height: fit-content;

  ${({ theme }) => theme.mediaQueries.lg} {
    position: sticky;
    top: 6.5rem;
  }
`;

export const SideActions = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const SideLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 42px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &[data-primary="true"] {
    background: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }
`;
