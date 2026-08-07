"use client";

import styled from "styled-components";

export const SectionRoot = styled.section<{ $tone?: "light" | "dark" | "cream" }>`
  padding-block: ${({ theme }) => theme.space[10]};
  background: ${({ theme, $tone }) =>
    $tone === "dark"
      ? theme.colors.black
      : $tone === "cream"
        ? theme.colors.offWhite
        : theme.colors.white};
  color: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.colors.white : theme.colors.black};

  ${({ theme }) => theme.mediaQueries.md} {
    padding-block: ${({ theme }) => theme.space[12]};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-block: ${({ theme }) => theme.space[14]};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  max-width: 720px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: ${({ theme }) => theme.space[8]};
  }
`;
