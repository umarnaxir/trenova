"use client";

import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 260px 1fr;
  }
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[5]};
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    position: sticky;
    top: 0;
    height: 100vh;
  }
`;

export const SideLink = styled.a<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.gray300};
  padding-block: ${({ theme }) => theme.space[2]};
`;

export const Main = styled.div`
  padding: ${({ theme }) => theme.space[5]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[8]};
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const MenuToggle = styled.div`
  display: inline-flex;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;
