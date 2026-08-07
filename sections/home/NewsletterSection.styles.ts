"use client";

import styled from "styled-components";

export const NewsletterRoot = styled.section`
  padding-block: 3rem;
  background: #FFFFFF;
`;

export const NewsletterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 1.75rem 2rem;
  border: 1px solid rgba(198, 167, 94, 0.35);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(198, 167, 94, 0.15);
  border: 1px solid #C6A75E;
  display: grid;
  place-items: center;
  color: #C6A75E;
  flex-shrink: 0;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 0.25rem;
`;

export const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: #A0A0A0;
`;

export const FormWrap = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 480px;

  input {
    flex: 1;
    height: 44px;
    padding-inline: 1rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #FFFFFF;
    color: #0A0A0A;
    font-size: 0.875rem;

    &::placeholder {
      color: #777777;
    }

    &:focus {
      outline: none;
      border-color: #C6A75E;
    }
  }

  button {
    height: 44px;
    padding-inline: 1.75rem;
    background: #C6A75E;
    color: #0A0A0A;
    border: none;
    border-radius: 4px;
    font-size: 0.8125rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease;

    &:hover {
      background: #D4AF37;
    }
  }
`;
