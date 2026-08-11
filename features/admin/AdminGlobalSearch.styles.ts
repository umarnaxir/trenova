"use client";

import styled from "styled-components";

export const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export const SearchInputShell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 40px;
  padding: 0 0.75rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(198, 167, 94, 0.45);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 4px 14px rgba(10, 10, 10, 0.04);

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0 !important;
    outline: none;
    background: transparent !important;
    min-height: 38px !important;
    padding: 0 !important;
    font-size: 0.875rem !important;
    color: ${({ theme }) => theme.colors.black};
  }

  input::-webkit-search-cancel-button,
  input::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const ClearButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.15rem 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: inherit;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ResultsPanel = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  max-height: min(60vh, 420px);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 12px 32px rgba(10, 10, 10, 0.12);
`;

export const ResultGroup = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  &:last-child {
    border-bottom: 0;
  }
`;

export const ResultGroupTitle = styled.p`
  margin: 0;
  padding: 0.35rem 0.85rem;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 700;
`;

export const ResultItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.55rem 0.85rem;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }

  strong {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export const ResultsEmpty = styled.p`
  margin: 0;
  padding: 1rem 0.85rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const ResultsLoading = styled.p`
  margin: 0;
  padding: 1rem 0.85rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
`;
