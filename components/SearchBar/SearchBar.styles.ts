"use client";

import styled from "styled-components";

export const SearchOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.modal};
  background: ${({ theme }) => theme.colors.overlay};
  display: grid;
  align-content: start;
  padding: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[8]} ${({ theme }) => theme.space[4]};
  }
`;

export const SearchPanel = styled.div`
  position: relative;
  width: min(720px, 100%);
  margin-inline: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[5]};
  padding-top: ${({ theme }) => theme.space[6]};
  animation: ${({ theme }) => theme.animations.slideUp};
`;

export const SearchHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.black};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

export const SearchFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: flex-end;
  }

  button[type="submit"] {
    width: 100%;

    ${({ theme }) => theme.mediaQueries.sm} {
      width: auto;
      flex-shrink: 0;
    }
  }
`;
