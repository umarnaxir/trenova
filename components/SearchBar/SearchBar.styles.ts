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
  max-height: min(80vh, 720px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

export const SearchInputWrap = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    left: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.gray500};
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 48px;
    padding: 0 1rem 0 2.65rem;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-size: 0.9375rem;
    outline: none;
    transition: border-color ${({ theme }) => theme.transitions.fast};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

export const ResultsWrap = styled.div`
  margin-top: 1rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

export const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ResultItem = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};

  &:first-child {
    border-top: 0;
  }
`;

export const ResultLink = styled.a`
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 0.85rem;
  align-items: center;
  padding: 0.75rem 0.25rem;
  text-decoration: none;
  color: inherit;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

export const ResultImage = styled.span`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 6px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray100};

  img {
    object-fit: contain;
  }
`;

export const ResultMeta = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const ResultName = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultCategory = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: capitalize;
`;

export const ResultPrice = styled.span`
  font-size: 0.875rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;

export const EmptyHint = styled.p`
  margin: 0.5rem 0 0;
  padding: 0.75rem 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray500};
`;

export const ViewAllLink = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 0.5rem;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background: transparent;
  color: ${({ theme }) => theme.colors.goldDark};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;
