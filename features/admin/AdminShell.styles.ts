"use client";

import styled, { css } from "styled-components";

const SIDEBAR_EXPANDED = "260px";
const SIDEBAR_COLLAPSED = "80px";

export const Shell = styled.div<{ $collapsed?: boolean }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.offWhite};
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: ${({ $collapsed }) =>
      $collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED};
    transition: padding-left ${({ theme }) => theme.transitions.slow};
  }
`;

export const Overlay = styled.button<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndices.overlay};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const Sidebar = styled.aside<{ $open?: boolean; $collapsed?: boolean }>`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.space[5]} ${theme.space[3]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  position: fixed;
  inset: 0 auto 0 0;
  width: min(280px, 86vw);
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};
  transform: translateX(${({ $open }) => ($open ? "0" : "-105%")});
  transition: transform ${({ theme }) => theme.transitions.slow},
    width ${({ theme }) => theme.transitions.slow};
  overflow-x: hidden;
  overflow-y: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ $collapsed }) =>
      $collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED};
    transform: none;
    z-index: ${({ theme }) => theme.zIndices.sticky};
    padding: ${({ theme, $collapsed }) =>
      $collapsed
        ? `${theme.space[5]} ${theme.space[2]}`
        : `${theme.space[5]} ${theme.space[4]}`};
  }
`;

export const BrandBlock = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `0 ${theme.space[2]} ${theme.space[3]}`};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: ${({ theme }) => theme.space[2]};
  align-items: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  flex: 1;
`;

const sideItemStyles = css<{ $active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  width: 100%;
  min-height: 42px;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : "transparent"};
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.white};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.blackMuted};
  }

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding-inline: 0;
      gap: 0;
    `}

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const SideLink = styled.a<{ $active?: boolean; $collapsed?: boolean }>`
  ${sideItemStyles}
`;

export const SideButton = styled.button<{
  $active?: boolean;
  $collapsed?: boolean;
}>`
  ${sideItemStyles}
`;

export const SideFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  padding-top: ${({ theme }) => theme.space[3]};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: auto;
`;

export const CollapseButton = styled.button<{ $collapsed?: boolean }>`
  display: none;
  position: fixed;
  top: 28px;
  left: ${({ $collapsed }) =>
    $collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED};
  z-index: ${({ theme }) => theme.zIndices.sticky + 1};
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.pill};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transform: translateX(-50%);
  transition: left ${({ theme }) => theme.transitions.slow},
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-flex;
  }
`;

export const Main = styled.div`
  min-width: 0;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[5]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[8]};
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const MenuToggle = styled.div`
  display: inline-flex;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;
