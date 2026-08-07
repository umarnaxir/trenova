"use client";

import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const NavInner = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 64px;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.space[4]};
    min-height: 72px;
  }
`;

export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`;

export const NavLinks = styled.nav`
  display: none;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`;

export const NavLink = styled.a`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  padding-block: ${({ theme }) => theme.space[2]};

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

export const LoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 ${({ theme }) => theme.space[3]};
  margin-left: ${({ theme }) => theme.space[1]};
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: 10px;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 38px;
    padding: 0 ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
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
`;

export const ActionWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.black};

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
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => `${theme.space[8]} 0`};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`;

export const MegaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MegaColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const MegaTitle = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`;

export const MegaItem = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const MobileMenu = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  max-height: min(70vh, 560px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;
