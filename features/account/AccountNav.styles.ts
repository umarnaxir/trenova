"use client";

import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[8]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-bottom: ${({ theme }) => theme.space[4]};
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.gray500};
  border-bottom: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.gold : "transparent")};
  padding-bottom: ${({ theme }) => theme.space[2]};
`;
