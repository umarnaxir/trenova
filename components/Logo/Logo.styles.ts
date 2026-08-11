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
  max-height: ${({ $height }) => $height}px;
  width: auto;
  max-width: ${({ $height }) => Math.round($height * 1.03)}px;
  flex-shrink: 0;
  overflow: hidden;

  img {
    display: block;
    height: ${({ $height }) => $height}px !important;
    width: auto !important;
    max-height: ${({ $height }) => $height}px !important;
    object-fit: contain;
  }
`;
