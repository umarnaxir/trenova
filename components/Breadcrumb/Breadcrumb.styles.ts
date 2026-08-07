"use client";

import styled from "styled-components";

export const CrumbList = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const CrumbLink = styled.a`
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const CrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.black};
`;
