"use client";

import styled from "styled-components";

const Mark = styled.span<{ $pad?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 26px;
  padding: ${({ $pad }) => ($pad ? "0 0.35rem" : "0")};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  svg {
    display: block;
    width: 100%;
    height: 16px;
  }
`;

const Marks = styled.span`
  display: none;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.35rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: inline-flex;
  }
`;

function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#1A1F71" />
      <text
        x="24"
        y="11.5"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#000" />
      <circle cx="19" cy="8" r="5" fill="#EB001B" />
      <circle cx="29" cy="8" r="5" fill="#F79E1B" />
      <path
        d="M24 4.2a5 5 0 0 1 0 7.6 5 5 0 0 1 0-7.6Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function RupayMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#0B3B7A" />
      <text
        x="24"
        y="11"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="6.5"
        fontWeight="700"
      >
        RuPay
      </text>
    </svg>
  );
}

function AmexMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#2E77BC" />
      <text
        x="24"
        y="11"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="6"
        fontWeight="700"
        letterSpacing="0.4"
      >
        AMEX
      </text>
    </svg>
  );
}

function GPayMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#fff" />
      <text x="6" y="11.2" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">le</tspan>
        <tspan fill="#5F6368"> Pay</tspan>
      </text>
    </svg>
  );
}

function PhonePeMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#5F259F" />
      <circle cx="9" cy="8" r="4.2" fill="#fff" opacity="0.95" />
      <path
        d="M8.2 5.8h1.7c.9 0 1.5.5 1.5 1.3 0 .7-.4 1.2-1.1 1.3l1.3 2.1h-1.1L9.3 8.5H8.8v2h-.6V5.8Zm.6.55v1.6h.9c.5 0 .8-.25.8-.8s-.3-.8-.85-.8H8.8Z"
        fill="#5F259F"
      />
      <text
        x="30"
        y="11"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="6.2"
        fontWeight="700"
      >
        PhonePe
      </text>
    </svg>
  );
}

function PaytmMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#00BAF2" />
      <text
        x="24"
        y="11"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="7"
        fontWeight="800"
      >
        paytm
      </text>
    </svg>
  );
}

function UpiMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#fff" stroke="#E8E8E8" />
      <text
        x="24"
        y="11"
        textAnchor="middle"
        fill="#097939"
        fontFamily="Arial, sans-serif"
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="0.8"
      >
        UPI
      </text>
    </svg>
  );
}

function CodMark() {
  return (
    <svg viewBox="0 0 48 16" aria-hidden>
      <rect width="48" height="16" rx="2" fill="#0A0A0A" />
      <rect x="7" y="4.2" width="14" height="7.6" rx="1.2" fill="#C6A75E" />
      <circle cx="14" cy="8" r="1.6" fill="#0A0A0A" />
      <text
        x="34"
        y="11"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="6.5"
        fontWeight="700"
      >
        COD
      </text>
    </svg>
  );
}

export function UpiBrandMarks() {
  return (
    <Marks aria-hidden>
      <Mark $pad>
        <GPayMark />
      </Mark>
      <Mark $pad>
        <PhonePeMark />
      </Mark>
      <Mark $pad>
        <PaytmMark />
      </Mark>
      <Mark $pad>
        <UpiMark />
      </Mark>
    </Marks>
  );
}

export function CardBrandMarks() {
  return (
    <Marks aria-hidden>
      <Mark>
        <VisaMark />
      </Mark>
      <Mark>
        <MastercardMark />
      </Mark>
      <Mark>
        <RupayMark />
      </Mark>
      <Mark>
        <AmexMark />
      </Mark>
    </Marks>
  );
}

export function CodBrandMarks() {
  return (
    <Marks aria-hidden>
      <Mark $pad>
        <CodMark />
      </Mark>
    </Marks>
  );
}
