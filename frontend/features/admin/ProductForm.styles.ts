"use client";

import styled from "styled-components";

export const ProductFormRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;

  label {
    gap: 0.3rem;
  }

  input:not([type="color"]),
  textarea,
  select {
    min-height: 38px !important;
    padding: 0.4rem 0.65rem !important;
    font-size: 0.875rem !important;
  }

  textarea {
    min-height: 78px !important;
  }
`;

export const CompactSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid rgba(198, 167, 94, 0.35);
  background: ${({ theme }) => theme.colors.white};
  height: 100%;
`;

export const CompactTitle = styled.h3`
  margin: 0;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 700;
`;

export const CompactHint = styled.p`
  margin: 0;
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.35;
`;

export const CompactGrid = styled.div<{ $cols?: number }>`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, minmax(0, 1fr));
  }
`;

export const SplitRow = styled.div`
  display: grid;
  gap: 0.95rem;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
  }
`;
export const FlagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.35rem 0.65rem;
  overflow-x: auto;
  padding-bottom: 0.15rem;
`;

export const TinyCheck = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.gray700};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  input {
    width: 12px !important;
    height: 12px !important;
    min-height: 12px !important;
    padding: 0 !important;
    accent-color: ${({ theme }) => theme.colors.gold};
  }
`;

export const SizeToggleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.25rem;
  width: 100%;
`;

export const SizeToggle = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-width: 0;
  height: 1.7rem;
  padding: 0 0.1rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.black};
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export const SizeQtyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
`;

export const SizeQtyCell = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;

  span {
    font-size: 0.68rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray700};
    white-space: nowrap;
  }

  input {
    min-width: 0;
  }
`;

export const ColorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ColorRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5.25rem 2rem auto;
  gap: 0.4rem;
  align-items: center;

  @media (max-width: 420px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "name remove"
      "hex picker";

    & > *:nth-child(1) {
      grid-area: name;
    }
    & > *:nth-child(2) {
      grid-area: hex;
    }
    & > *:nth-child(3) {
      grid-area: picker;
    }
    & > *:nth-child(4) {
      grid-area: remove;
    }
  }
`;

export const ColorPickerWrap = styled.label`
  position: relative;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

export const ColorSwatch = styled.span<{ $hex: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ $hex }) => $hex};
  display: inline-block;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  pointer-events: none;
`;

export const HiddenColorInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: 0;
  padding: 0;
  min-height: 0 !important;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.15rem;
`;
