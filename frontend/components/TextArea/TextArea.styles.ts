"use client";

import styled from "styled-components";

export const TextAreaRoot = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 140px;
  padding: ${({ theme }) => theme.space[4]};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.gray300};
  background: ${({ theme }) => theme.colors.white};
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;
