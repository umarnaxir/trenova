"use client";

import styled from "styled-components";

export const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  line-height: 0;
`;

export const LogoImageWrap = styled.span<{ $height: number; $aspect: number }>`
  position: relative;
  display: block;
  height: ${({ $height }) => $height}px;
  max-height: ${({ $height }) => $height}px;
  width: auto;
  max-width: ${({ $height, $aspect }) => Math.round($height * $aspect)}px;
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
