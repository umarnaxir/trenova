"use client";

import styled from "styled-components";

export const Form = styled.form<{ $compact?: boolean }>`
  display: flex;
  flex-direction: ${({ $compact }) => ($compact ? "column" : "row")};
  gap: ${({ theme }) => theme.space[3]};
  width: 100%;
  max-width: ${({ $compact }) => ($compact ? "360px" : "560px")};
`;
