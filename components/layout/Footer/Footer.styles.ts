"use client";

import styled from "styled-components";

export const FooterRoot = styled.footer`
  background: #000000;
  color: ${({ theme }) => theme.colors.white};
  padding-block: 1.75rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};

  ${({ theme }) => theme.mediaQueries.md} {
    padding-block: 2.5rem 1.5rem;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.15rem 1rem;

  > *:nth-child(1) {
    order: 4;
  }

  > *:nth-child(2) {
    order: 1;
  }

  > *:nth-child(3) {
    order: 2;
  }

  > *:nth-child(4) {
    order: 3;
  }

  > *:nth-child(5) {
    order: 5;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
    gap: 1.75rem;

    /* Reset mobile reordering so brand leads: Logo → Shop → Help → Company */
    > *:nth-child(1),
    > *:nth-child(2),
    > *:nth-child(3),
    > *:nth-child(4),
    > *:nth-child(5) {
      order: 0;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 2rem;
  }
`;

export const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: none;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.75rem;
    max-width: 360px;
  }
`;

export const BrandIdentity = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`;

export const BrandText = styled.p`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.5rem;
  }
`;

export const ColTitle = styled.h3<{ $compact?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ $compact, theme }) =>
    $compact ? "0.75rem" : theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-top: 0;
  margin-bottom: 0.25rem;

  ${({ theme, $compact }) =>
    $compact
      ? `
    ${theme.mediaQueries.md} {
      margin-top: 0.75rem;
    }
  `
      : ""}
`;

export const FooterLink = styled.a`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: 0.8125rem;
  transition: color ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.5rem;
  }
`;

export const SocialButton = styled.a`
  min-width: 32px;
  height: 32px;
  padding: 0 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray600};
  color: ${({ theme }) => theme.colors.gray300};
  font-size: 10px;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 36px;
    height: 36px;
    padding: 0 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const MidBand = styled.div`
  margin-top: 1.15rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray700};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.55rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 1.5rem;
    padding: 0.875rem 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }
`;

export const MidLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 0.625rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const FooterBottom = styled.div`
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  align-items: center;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr auto 1fr;
    text-align: left;
  }
`;

export const Credit = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 0.6875rem;
  margin: 0;
  text-align: center;
  justify-self: center;
  line-height: 1.4;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.gold};
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`;

export const MetaLine = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  text-transform: none;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-self: start;
  }
`;

export const BackToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0;
  padding: 0.45rem 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  justify-self: center;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    justify-self: end;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const FooterNewsletterCol = styled.div`
  grid-column: 1 / -1;
  margin-top: 0.35rem;
  background: #111111;
  border: 1px solid rgba(198, 167, 94, 0.3);
  border-radius: 8px;
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 1rem;
    padding: 1.25rem 1.5rem;
    gap: 1rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-column: 1 / -1;
    margin-top: 1rem;
    padding: 1.25rem 2rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FooterNewsletterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.875rem;
  }
`;

export const FooterNewsletterIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(198, 167, 94, 0.15);
  border: 1px solid #c6a75e;
  display: grid;
  place-items: center;
  color: #c6a75e;
  flex-shrink: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 40px;
    height: 40px;
  }
`;

export const FooterNewsletterTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.875rem;
  }
`;

export const FooterNewsletterSub = styled.p`
  display: none;
  font-size: 0.75rem;
  color: #a0a0a0;
  margin-top: 2px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;

export const FooterNewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  max-width: 420px;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.5rem;
  }

  input {
    flex: 1;
    min-width: 0;
    height: 36px;
    padding-inline: 0.75rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #ffffff;
    color: #0a0a0a;
    font-size: 0.75rem;

    ${({ theme }) => theme.mediaQueries.md} {
      height: 40px;
      padding-inline: 0.875rem;
      font-size: 0.8125rem;
    }

    &::placeholder {
      color: #777777;
    }

    &:focus {
      outline: none;
      border-color: #c6a75e;
    }
  }

  button {
    height: 36px;
    padding-inline: 0.85rem;
    background: #c6a75e;
    color: #0a0a0a;
    border: none;
    border-radius: 4px;
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease;

    ${({ theme }) => theme.mediaQueries.md} {
      height: 40px;
      padding-inline: 1.25rem;
      font-size: 0.75rem;
    }

    &:hover {
      background: #d4af37;
    }
  }
`;

