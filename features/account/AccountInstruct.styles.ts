"use client";

import styled from "styled-components";
import Link from "next/link";

export const InstructPage = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: none;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray600};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const InstructHero = styled.header`
  display: grid;
  gap: 0.35rem;

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

export const InstructCard = styled.section<{ $danger?: boolean }>`
  display: grid;
  gap: 0.85rem;
  padding: 1.15rem 1.2rem;
  border-radius: 14px;
  border: 1px solid
    ${({ theme, $danger }) =>
      $danger ? "rgba(180, 35, 24, 0.28)" : "rgba(198, 167, 94, 0.35)"};
  background: ${({ theme, $danger }) =>
    $danger
      ? "linear-gradient(180deg, rgba(180, 35, 24, 0.05), #fff)"
      : "linear-gradient(180deg, rgba(198, 167, 94, 0.1), #fff)"};
`;

export const InstructList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.65rem;

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 0.55rem;
    align-items: start;
    font-size: 0.84rem;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.gray700};

    svg {
      margin-top: 0.15rem;
      color: ${({ theme }) => theme.colors.goldDark};
      flex-shrink: 0;
    }
  }
`;

export const AgreeBox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem 0.95rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.offWhite};
  cursor: pointer;
  font-size: 0.82rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.gray700};

  input {
    margin-top: 0.15rem;
    accent-color: ${({ theme }) => theme.colors.gold};
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const VerifyBlock = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const ForgotLink = styled(Link)`
  justify-self: start;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.goldDark};

  &:hover {
    text-decoration: underline;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-end;
  }
`;

export const ErrorNote = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.error};
`;
