"use client";

import styled from "styled-components";

export const CheckoutLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    gap: clamp(1.5rem, 3vw, 2.75rem);
  }
`;

export const FormPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[7]};
  }
`;

export const SummaryPanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.offWhite};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[7]};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    position: sticky;
    top: 6.5rem;
  }
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

export const FormRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const FormRowTriple = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const LineItem = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.space[3]};
  align-items: start;
  padding-bottom: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  &:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const LineThumb = styled.div`
  position: relative;
  width: 72px;
  height: 90px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;

  img {
    object-fit: contain;
  }
`;

export const LineMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const LineName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.35;
`;

export const LineDetail = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const LinePrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;
`;

export const Totals = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  padding-top: ${({ theme }) => theme.space[2]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const TotalRow = styled.div<{ $strong?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme, $strong }) =>
    $strong ? theme.fontSizes.lg : theme.fontSizes.sm};
  font-weight: ${({ theme, $strong }) =>
    $strong ? theme.fontWeights.bold : theme.fontWeights.regular};
  color: ${({ theme, $strong }) =>
    $strong ? theme.colors.black : theme.colors.gray600};
`;

export const SecureNote = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
`;

export const PaymentOptions = styled.div`
  display: grid;
  gap: 0.65rem;
`;

export const PaymentOption = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.85rem 1rem;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray200};
  background: ${({ theme, $active }) =>
    $active ? "rgba(198, 167, 94, 0.08)" : theme.colors.white};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const PaymentRadio = styled.span<{ $active?: boolean }>`
  width: 1rem;
  height: 1rem;
  margin-top: 0.15rem;
  border-radius: 999px;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  box-shadow: ${({ $active, theme }) =>
    $active ? `inset 0 0 0 3px ${theme.colors.white}, inset 0 0 0 6px ${theme.colors.gold}` : "none"};
  flex-shrink: 0;
`;

export const PaymentCopy = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;

  strong {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.black};
  }

  small {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray500};
    line-height: 1.4;
  }
`;

export const CouponRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem;
  align-items: start;
`;

export const CouponApplied = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: rgba(198, 167, 94, 0.1);

  strong {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.black};
  }

  small {
    display: block;
    margin-top: 0.15rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
