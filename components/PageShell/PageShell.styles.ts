"use client";

import styled from "styled-components";

export const PageShellRoot = styled.div<{ $narrow?: boolean; $compact?: boolean }>`
  padding-block: ${({ theme, $compact }) =>
    $compact ? `${theme.space[2]} ${theme.space[6]}` : theme.space[10]};
`;
