"use client";

import styled from "styled-components";

export const FooterRoot = styled.footer`
  background:
    radial-gradient(circle at top left, rgba(198, 167, 94, 0.12), transparent 36%),
    ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding-block: ${({ theme }) => theme.space[12]} ${({ theme }) => theme.space[8]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
`;

export const TopRule = styled.div`
  width: 64px;
  height: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.space[6]};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: ${({ theme }) => theme.space[10]};
  }
`;

export const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
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
  gap: ${({ theme }) => theme.space[3]};
`;

export const ColTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space[2]};
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
  gap: ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const SocialButton = styled.a`
  min-width: 40px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.space[3]};
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
  margin-top: ${({ theme }) => theme.space[10]};
  padding: ${({ theme }) => theme.space[5]} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray700};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

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
  margin-top: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};

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
