"use client";

import styled from "styled-components";

export const InstagramRoot = styled.section`
  padding-block: 2.25rem 3rem;
  background: #ffffff;
`;

export const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
`;

export const FollowTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(0.95rem, 1.8vw, 1.125rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: #0a0a0a;
`;

export const InstagramLink = styled.a<{ $icon?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: ${({ $icon }) => ($icon ? "#c6a75e" : "#0a0a0a")};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ $icon }) => ($icon ? "0.8125rem" : "inherit")};
  font-weight: ${({ $icon }) => ($icon ? 600 : "inherit")};
  letter-spacing: 0.04em;
  text-transform: lowercase;
  transition: color 0.2s ease;

  &:hover {
    color: #c6a75e;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(10, 10, 10, 0.18);
  border-radius: 2px;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(9, 1fr);
    gap: 0.75rem;
    background: transparent;
    border-radius: 0;
    overflow: visible;
  }
`;

export const Shot = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.blackMuted};

  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 6px;
  }

  img {
    object-fit: cover;
    object-position: center;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.06);
  }
`;
