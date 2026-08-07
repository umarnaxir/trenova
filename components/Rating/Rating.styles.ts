"use client";

import styled from "styled-components";

export const RatingRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Stars = styled.div`
  display: inline-flex;
  gap: 2px;
  color: ${({ theme }) => theme.colors.gold};
`;
