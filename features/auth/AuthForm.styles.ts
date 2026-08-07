"use client";

import styled from "styled-components";

export const AuthCard = styled.div`
  width: min(440px, 100%);
  margin-inline: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[6]};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

export const AuthLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a {
    color: ${({ theme }) => theme.colors.gray600};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
