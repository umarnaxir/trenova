"use client";

import styled from "styled-components";

export const SelectRoot = styled.select`
  width: 100%;
  min-height: 48px;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.white};
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #0a0a0a 50%),
    linear-gradient(135deg, #0a0a0a 50%, transparent 50%);
  background-position:
    calc(100% - 18px) calc(50% - 3px),
    calc(100% - 12px) calc(50% - 3px);
  background-size: 6px 6px;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;
