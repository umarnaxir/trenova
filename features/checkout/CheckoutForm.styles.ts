"use client";

import styled from "styled-components";

export const CheckoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const PageIntro = styled.header`
  display: grid;
  gap: 0.45rem;
`;

export const PageTitle = styled.h1`
  margin: 0.15rem 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.85rem, 4vw, 2.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.black};
`;

export const PageLead = styled.p`
  margin: 0;
  max-width: 36rem;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
  line-height: 1.55;
`;

export const CheckoutLayout = styled.div`
  display: grid;
  gap: 1.25rem;
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
    gap: 1.5rem;
  }
`;

export const FormColumn = styled.div`
  display: grid;
  gap: 1.15rem;
  min-width: 0;
`;

export const SectionCard = styled.section`
  display: grid;
  gap: 1.15rem;
  padding: 1.15rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 1.35rem 1.4rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
`;

export const StepBadge = styled.span`
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const SecurePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.goldDark};
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.85rem;
`;

export const FormRow = styled.div`
  display: grid;
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const FormRowTriple = styled.div`
  display: grid;
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 0.35rem;
  min-width: 0;
`;

export const FieldLabel = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray600};
`;

export const IconInput = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 48px;
  padding: 0 0.85rem;
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gray500};
  }

  input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.black};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
`;

export const FieldError = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const PaymentOptions = styled.div`
  display: grid;
  gap: 0.65rem;
`;

export const PaymentOption = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  width: 100%;
  text-align: left;
  padding: 0.95rem 1rem;
  border: 1.5px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray200};
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? "rgba(198, 167, 94, 0.12)" : theme.colors.white};
  box-shadow: ${({ $active }) =>
    $active ? "0 8px 22px rgba(198, 167, 94, 0.16)" : "none"};
  transform: translateY(${({ $active }) => ($active ? "-1px" : "0")});
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: rgba(198, 167, 94, 0.08);
    box-shadow: 0 8px 20px rgba(198, 167, 94, 0.12);
    transform: translateY(-2px);

    span[aria-hidden="true"] > span {
      border-color: ${({ theme }) => theme.colors.gold};
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(10, 10, 10, 0.08);
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

export const PaymentLeft = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  min-width: 0;
`;

export const PaymentRadio = styled.span<{ $active?: boolean }>`
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
  border-radius: 999px;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `inset 0 0 0 3px ${theme.colors.white}, inset 0 0 0 6px ${theme.colors.gold}`
      : "none"};
  flex-shrink: 0;
`;

export const PaymentCopy = styled.span`
  display: grid;
  gap: 0.15rem;
  min-width: 0;

  strong {
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.black};

    svg {
      color: ${({ theme }) => theme.colors.goldDark};
    }
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray500};
    line-height: 1.4;
  }
`;

export const PayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 52px;
  margin-top: 0.25rem;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blackSoft};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const SecureNote = styled.p`
  margin: 0;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.45;
`;

export const SummaryPanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.lg} {
    position: sticky;
    top: 6.5rem;
  }
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 1rem 1.15rem;
  background: rgba(198, 167, 94, 0.14);
  border-bottom: 1px solid rgba(198, 167, 94, 0.28);

  svg {
    color: ${({ theme }) => theme.colors.goldDark};
  }

  h2 {
    margin: 0;
    font-size: 0.8125rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const SummaryBody = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem 1.15rem 1.2rem;
`;

export const LineList = styled.div`
  display: grid;
  gap: 0.85rem;
`;

export const LineItem = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 0.75rem;
  align-items: start;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const LineThumb = styled.div`
  position: relative;
  width: 64px;
  height: 72px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;

  img {
    object-fit: contain;
  }
`;

export const LineMeta = styled.div`
  display: grid;
  gap: 0.35rem;
  min-width: 0;
`;

export const LineTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const LineName = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const LineDetail = styled.p`
  margin: 0;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.gray500};
`;

export const LinePrice = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const LineActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const QtyControl = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 6px;
  overflow: hidden;
`;

export const QtyButton = styled.button`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gray100};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

export const QtyValue = styled.span`
  min-width: 28px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const CouponRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.45rem;
  align-items: stretch;
`;

export const CouponInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 42px;
  padding: 0 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};

  svg {
    color: ${({ theme }) => theme.colors.gray500};
    flex-shrink: 0;
  }

  input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    font-size: 0.85rem;
  }
`;

export const CouponApply = styled.button`
  min-height: 42px;
  padding: 0 0.95rem;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.goldLight};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const CouponApplied = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  background: rgba(198, 167, 94, 0.1);

  strong {
    font-size: 0.8125rem;
  }

  small {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.gray600};
  }

  button {
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const Totals = styled.div`
  display: grid;
  gap: 0.55rem;
  padding-top: 0.25rem;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};

  strong {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 700;
  }
`;

export const ShippingNote = styled.p`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.success};

  svg {
    flex-shrink: 0;
  }
`;

export const GrandTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.25rem;
  padding: 0.85rem 0.95rem;
  border-radius: 10px;
  background: rgba(198, 167, 94, 0.16);
  border: 1px solid rgba(198, 167, 94, 0.28);

  span {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    font-size: 1.15rem;
    font-weight: 800;
  }
`;

export const TrustBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 1.15rem 1.25rem;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  min-width: 0;

  svg {
    flex-shrink: 0;
    margin-top: 0.1rem;
    color: ${({ theme }) => theme.colors.goldDark};
  }

  strong {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.gray500};
    line-height: 1.3;
  }
`;
