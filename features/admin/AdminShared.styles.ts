"use client";

import styled from "styled-components";

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

export const SearchField = styled.div`
  flex: 1;
  min-width: min(100%, 240px);
  max-width: 360px;
`;

export const ActionGroup = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[2]};
  flex-wrap: wrap;
`;

export const RowActions = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[2]};
  align-items: center;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.offWhite};
`;

export const FormSectionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray600};
`;

export const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[3]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray700};
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const FieldHint = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const StatusPill = styled.span<{
  $tone?: "neutral" | "success" | "warning" | "danger";
}>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  background: ${({ theme, $tone = "neutral" }) => {
    if ($tone === "success") return "rgba(2, 122, 72, 0.1)";
    if ($tone === "warning") return "rgba(181, 71, 8, 0.12)";
    if ($tone === "danger") return "rgba(180, 35, 24, 0.1)";
    return theme.colors.gray100;
  }};
  color: ${({ theme, $tone = "neutral" }) => {
    if ($tone === "success") return theme.colors.success;
    if ($tone === "warning") return theme.colors.warning;
    if ($tone === "danger") return theme.colors.error;
    return theme.colors.gray600;
  }};
`;

