"use client";

import styled from "styled-components";

export const Stat = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;
