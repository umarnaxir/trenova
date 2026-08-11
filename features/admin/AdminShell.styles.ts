"use client";

import styled, { css } from "styled-components";

const SIDEBAR_EXPANDED = "260px";
const SIDEBAR_COLLAPSED = "80px";

export const Shell = styled.div<{ $collapsed?: boolean }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
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
  padding-bottom: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const TopBarLeft = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
`;

export const MenuToggle = styled.div`
  display: inline-flex;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  flex-shrink: 0;
`;

export const ProfileMenuWrap = styled.div`
  position: relative;
`;

export const ProfileTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  padding: 0.35rem 0.65rem 0.35rem 0.35rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  max-width: min(100%, 240px);
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.offWhite};
  }
`;

export const ProfileAvatar = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

export const ProfileMeta = styled.span`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }

  strong {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
  }

  small {
    font-size: 0.6875rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const ProfileDropdown = styled.div<{ $open?: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  width: min(260px, 80vw);
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const ProfileDropdownHeader = styled.div`
  padding: 0.65rem 0.75rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  margin-bottom: 0.25rem;

  strong {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  small {
    display: block;
    margin-top: 0.15rem;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 0.75rem;
  }
`;

export const ProfileDropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.65rem 0.75rem;
  text-align: left;
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.md};

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }

  &[data-danger="true"] {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ProfileDropdownLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;
