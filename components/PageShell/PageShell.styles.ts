"use client";

import styled from "styled-components";

export const PageShellRoot = styled.div<{ $narrow?: boolean }>`
  padding-block: ${({ theme }) => theme.space[10]};
`;
