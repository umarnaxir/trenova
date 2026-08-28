"use client";

import styled from "styled-components";

export const EmptyRoot = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[12]} ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;
