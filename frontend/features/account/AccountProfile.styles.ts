"use client";

import styled from "styled-components";
import Link from "next/link";

export const Page = styled.div`
  display: grid;
  gap: 1.15rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Subtitle = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.875rem;
`;

export const Section = styled.section`
  display: grid;
  gap: 0.9rem;
  padding: 1.15rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
`;

export const SectionHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;

  h2 {
    margin: 0;
    font-size: 0.95rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FormFull = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / -1;
  }
`;
export const AddressGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const AddressCard = styled.article`
  display: grid;
  gap: 0.45rem;
  padding: 0.95rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.offWhite};
`;

export const AddressTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;

  strong {
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 0.55rem;
  border-radius: 999px;
  background: rgba(198, 167, 94, 0.18);
  color: ${({ theme }) => theme.colors.goldDark};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const AddressLine = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.45;
`;

export const DetailRow = styled.div`
  display: grid;
  gap: 0.15rem;

  span {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  strong {
    font-size: 0.88rem;
    font-weight: 600;
  }
`;

export const DetailsList = styled.div`
  display: grid;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const EmptyNote = styled.p`
  margin: 0;
  padding: 0.85rem 0.95rem;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.82rem;
`;

export const SectionLink = styled(Link)`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.goldDark};

  &:hover {
    text-decoration: underline;
  }
`;

export const ShipBlock = styled.div`
  display: grid;
  gap: 0.2rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  span {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray700};
    line-height: 1.45;
  }
`;

export const DangerSection = styled.section`
  display: grid;
  gap: 0.9rem;
  padding: 1.15rem 1.2rem;
  border: 1px solid rgba(180, 35, 24, 0.28);
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(180, 35, 24, 0.04),
    ${({ theme }) => theme.colors.white}
  );
`;

export const ActionStack = styled.div`
  display: grid;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }
`;

export const ActionRow = styled.div`
  display: grid;
  gap: 0.65rem;
  align-content: start;
  padding: 0.85rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};

  > div {
    min-width: 0;

    strong {
      display: block;
      font-size: 0.8rem;
      letter-spacing: 0.03em;
    }

    p {
      margin: 0.25rem 0 0;
      font-size: 0.72rem;
      color: ${({ theme }) => theme.colors.gray600};
      line-height: 1.35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const ControlButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  min-height: 34px;
  padding: 0 0.7rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $danger }) =>
      $danger ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $danger }) =>
    $danger ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.white : theme.colors.black};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $danger }) =>
      $danger ? theme.colors.gold : "rgba(198, 167, 94, 0.14)"};
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const AccordionList = styled.div`
  display: grid;
  gap: 0.65rem;
`;

export const Accordion = styled.div<{ $open?: boolean }>`
  border: 1px solid
    ${({ theme, $open }) =>
      $open ? theme.colors.gold : theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.fast};
`;

export const AccordionTrigger = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;

  > div {
    min-width: 0;
  }

  strong {
    display: block;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  span {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.gray500};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.goldDark};
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`;

export const AccordionBody = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 0.95rem 1rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const DefaultCheck = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const ControlLink = styled(Link)<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  min-height: 34px;
  padding: 0 0.7rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $danger }) =>
      $danger ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $danger }) =>
    $danger ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.white : theme.colors.black};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $danger }) =>
      $danger ? theme.colors.gold : "rgba(198, 167, 94, 0.14)"};
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  }
`;
