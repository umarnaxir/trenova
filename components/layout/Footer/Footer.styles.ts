"use client";

import styled from "styled-components";

export const FooterRoot = styled.footer`
  background:
    radial-gradient(circle at top left, rgba(198, 167, 94, 0.12), transparent 36%),
    ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding-block: 2.5rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`;

export const TopRule = styled.div`
  width: 64px;
  height: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1.5rem;
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
    gap: 1.75rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 2rem;
  }
`;

export const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 360px;
`;

export const BrandText = styled.p`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const ContactList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const ContactItem = styled.div`
  display: grid;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  span {
    color: ${({ theme }) => theme.colors.gold};
    font-size: 10px;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    text-transform: uppercase;
  }
`;

export const ContactLink = styled.a`
  display: grid;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  span {
    color: ${({ theme }) => theme.colors.gold};
    font-size: 10px;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    text-transform: uppercase;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ColTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0.25rem;
`;

export const FooterLink = styled.a`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

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
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const SocialButton = styled.a`
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
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

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const MidBand = styled.div`
  margin-top: 1.5rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray700};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const MidLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
`;

export const FooterBottom = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Credit = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a {
    color: ${({ theme }) => theme.colors.gold};
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.goldLight};
  }
`;

export const MetaLine = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const FooterNewsletterCol = styled.div`
  grid-column: 1 / -1;
  margin-top: 1rem;
  background: #111111;
  border: 1px solid rgba(198, 167, 94, 0.3);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  gap: 0.875rem;
`;

export const FooterNewsletterIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(198, 167, 94, 0.15);
  border: 1px solid #C6A75E;
  display: grid;
  place-items: center;
  color: #C6A75E;
  flex-shrink: 0;
`;

export const FooterNewsletterTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FFFFFF;
`;

export const FooterNewsletterSub = styled.p`
  font-size: 0.75rem;
  color: #A0A0A0;
  margin-top: 2px;
`;

export const FooterNewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 420px;

  input {
    flex: 1;
    height: 40px;
    padding-inline: 0.875rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #FFFFFF;
    color: #0A0A0A;
    font-size: 0.8125rem;

    &::placeholder {
      color: #777777;
    }

    &:focus {
      outline: none;
      border-color: #C6A75E;
    }
  }

  button {
    height: 40px;
    padding-inline: 1.25rem;
    background: #C6A75E;
    color: #0A0A0A;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease;

    &:hover {
      background: #D4AF37;
    }
  }
`;

