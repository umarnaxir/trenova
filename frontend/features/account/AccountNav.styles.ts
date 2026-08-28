"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";

const panelIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AccountLayoutGrid = styled.div`
  display: grid;
  gap: 1rem;
  align-items: start;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 1.5rem;
  }
`;

export const AccountMain = styled.div`
  min-width: 0;
  animation: ${panelIn} 0.28s ease;
`;

export const Sidebar = styled.aside`
  display: grid;
  grid-template-rows: auto 1fr auto;
  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: 16px;
  background: linear-gradient(
    165deg,
    ${({ theme }) => theme.colors.blackSoft} 0%,
    ${({ theme }) => theme.colors.black} 48%,
    #0f0d0a 100%
  );
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(10, 10, 10, 0.18);

  ${({ theme }) => theme.mediaQueries.lg} {
    position: sticky;
    top: 5.75rem;
    align-self: start;
    max-height: calc(100vh - 6.5rem);
    min-height: min(70vh, 640px);
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.05rem 1.1rem;
  background:
    linear-gradient(135deg, rgba(198, 167, 94, 0.22), rgba(247, 245, 242, 0.06)),
    ${({ theme }) => theme.colors.blackMuted};
  border-bottom: 1px solid rgba(198, 167, 94, 0.28);
`;

export const SidebarAvatar = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  flex-shrink: 0;
`;

export const SidebarUser = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 0.88rem;
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.goldLight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 0.4rem;
  padding: 0.65rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: column;
    overflow: visible;
    padding: 0.75rem;
    gap: 0.35rem;
  }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 42px;
  padding: 0 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black : "rgba(255, 255, 255, 0.78)"};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : "transparent"};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : "rgba(198, 167, 94, 0.18)"};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gold};
  }

  &:hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.white};
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.goldLight : "rgba(198, 167, 94, 0.14)"};
  }
`;

export const SidebarFooter = styled.div`
  display: none;
  gap: 0.45rem;
  padding: 0.75rem;
  border-top: 1px solid rgba(198, 167, 94, 0.28);
  background: rgba(247, 245, 242, 0.04);

  ${({ theme }) => theme.mediaQueries.lg} {
    display: grid;
  }
`;

export const SidebarShopLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(198, 167, 94, 0.55);
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;
