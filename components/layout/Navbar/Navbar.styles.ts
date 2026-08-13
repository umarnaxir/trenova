"use client";

import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  background: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid rgba(198, 167, 94, 0.28);
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

export const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 72px;
    gap: 2rem;
  }
`;

export const MobileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  margin-left: -0.15rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const DesktopLogoWrap = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
  }
`;

export const MobileHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    gap: 0.5rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const DesktopRightGroup = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
`;

export const NavLinks = styled.nav`
  display: none;
  align-items: center;
  gap: 1.25rem;

  ${({ theme }) => theme.mediaQueries.xl} {
    gap: 1.75rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`;

export const NavLink = styled.a<{ $accent?: boolean }>`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  padding-block: ${({ theme }) => theme.space[2]};
  color: ${({ theme, $accent }) =>
    $accent ? theme.colors.gold : theme.colors.white};
  font-weight: ${({ theme, $accent }) =>
    $accent ? theme.fontWeights.semibold : theme.fontWeights.regular};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gold};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    gap: ${({ theme }) => theme.space[1]};
  }
`;

export const DesktopOnlyAction = styled.span`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: inline-flex;
  }
`;

export const CountDot = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 10px;
  display: grid;
  place-items: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const ActionWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: ${({ theme }) => theme.colors.white};

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const MegaPanel = styled.div`
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: #0D0D0D;
  border-bottom: 1px solid rgba(198, 167, 94, 0.35);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
  padding: 2rem 0;
  z-index: 100;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`;

export const MegaHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(198, 167, 94, 0.2);
`;

export const MegaCategoryTitle = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #C6A75E;
  transition: color 0.2s ease;

  &:hover {
    color: #D4AF37;
  }
`;

export const MegaCategorySub = styled.p`
  font-size: 0.8125rem;
  color: #A0A0A0;
`;

export const MegaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export const MegaItemCard = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: #E0E0E0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: all 0.2s ease;

  svg {
    color: #C6A75E;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: #1A1A1A;
    border-color: #C6A75E;
    color: #FFFFFF;

    svg {
      transform: translateX(4px);
    }
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  border-top: 1px solid rgba(198, 167, 94, 0.28);
  background: #0A0A0A;
  max-height: calc(85vh - 72px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9);

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const MobileSectionTitle = styled.div`
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #C6A75E;
  margin-bottom: 0.25rem;
`;

export const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MobileNavLink = styled.a<{ $accent?: boolean }>`
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $accent }) => ($accent ? "#C6A75E" : "#FFFFFF")};
  padding: 0.5rem 0;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #C6A75E;
  }
`;

export const MobileDivider = styled.div`
  height: 1px;
  background: rgba(198, 167, 94, 0.2);
  margin-block: 0.25rem;
`;

export const MobileAccordionItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MobileAccordionHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-block: 0.875rem;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #C6A75E;
  }
`;

export const MobileAccordionBody = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding-left: 0.75rem;
  padding-bottom: 0.75rem;
`;

export const MobileSubLink = styled.a`
  font-size: 0.8125rem;
  color: #C0C0C0;
  padding: 0.375rem 0.5rem;
  border-left: 2px solid rgba(198, 167, 94, 0.3);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #C6A75E;
    border-left-color: #C6A75E;
    background: rgba(198, 167, 94, 0.08);
  }
`;

export const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;
