"use client";

import styled from "styled-components";

export const ReviewRoot = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.white};
`;
