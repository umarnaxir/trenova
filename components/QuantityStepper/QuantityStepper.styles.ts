"use client";

import styled from "styled-components";

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

export const StepButton = styled.button`
  width: 40px;
  height: 40px;
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
  min-width: 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
