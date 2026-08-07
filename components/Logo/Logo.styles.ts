"use client";

import styled from "styled-components";

export const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  line-height: 0;
`;

export const LogoImageWrap = styled.span<{ $height: number }>`
  position: relative;
  display: block;
  height: ${({ $height }) => $height}px;
  width: auto;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`;
