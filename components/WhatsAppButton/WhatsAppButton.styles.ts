"use client";

import styled from "styled-components";

export const WhatsAppLink = styled.a`
  position: fixed;
  right: ${({ theme }) => theme.space[3]};
  bottom: ${({ theme }) => theme.space[3]};
  z-index: ${({ theme }) => theme.zIndices.sticky};
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  background: #25d366;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    right: ${({ theme }) => theme.space[4]};
    bottom: ${({ theme }) => theme.space[4]};
    width: 52px;
    height: 52px;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;
