"use client";

import styled from "styled-components";

export const ContainerRoot = styled.div<{ $narrow?: boolean }>`
  width: 100%;
  max-width: ${({ theme, $narrow }) =>
    $narrow ? theme.containers.lg : theme.containers.xxl};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding-inline: ${({ theme }) => theme.space[6]};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-inline: ${({ theme }) => theme.space[8]};
  }
`;
