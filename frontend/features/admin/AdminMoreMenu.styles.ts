"use client";

import styled from "styled-components";

export const MoreMenuWrap = styled.div`
  position: relative;
  display: inline-flex;
`;

export const MoreMenuList = styled.div<{ $open?: boolean; $align?: "left" | "right" }>`
  position: absolute;
  top: calc(100% + 6px);
  ${({ $align }) => ($align === "left" ? "left: 0;" : "right: 0;")}
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  min-width: 210px;
  padding: 0.35rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(198, 167, 94, 0.35);
  box-shadow: 0 12px 28px rgba(10, 10, 10, 0.14);
  display: ${({ $open }) => ($open ? "grid" : "none")};
  gap: 0.15rem;
`;

export const MoreMenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 36px;
  padding: 0 0.75rem;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  &[data-divider="true"] {
    margin-top: 0.25rem;
    padding-top: 0.55rem;
    border-top: 1px solid rgba(198, 167, 94, 0.22);
  }

  &[data-danger="true"] {
    color: #b42318;
  }

  &:hover:not(:disabled) {
    background: rgba(198, 167, 94, 0.12);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
