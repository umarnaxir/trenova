"use client";

import styled from "styled-components";

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  width: fit-content;
`;

export const StepButton = styled.button`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gray100};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Value = styled.span`
  min-width: 34px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
