"use client";

import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.modal};
  background: rgba(10, 10, 10, 0.42);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space[4]};
  overflow: auto;
`;

export const Dialog = styled.div<{ $wide?: boolean }>`
  position: relative;
  width: min(${({ $wide }) => ($wide ? "640px" : "480px")}, 100%);
  max-height: min(calc(100% - 16px), 760px);
  overflow: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[6]};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${({ theme }) => theme.animations.scaleIn};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[8]};
    border-radius: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const CloseWrap = styled.div`
  align-self: flex-end;
  margin: -0.35rem -0.35rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    align-self: flex-start;
    margin: 0;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[5]};
`;

export const FieldRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a,
  button {
    color: ${({ theme }) => theme.colors.gray600};
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  a:hover,
  button:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[5]};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export const PhoneBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  align-content: start;
`;

export const OtpShell = styled.div<{ $error?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  min-height: 48px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.gray300};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.gold};
  }
`;

export const OtpSlots = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 ${({ theme }) => theme.space[3]};
`;

export const OtpSlot = styled.span<{ $filled?: boolean }>`
  width: 0.7em;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $filled }) =>
    $filled ? theme.colors.black : theme.colors.gray400};
`;

export const OtpHidden = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: 0;
  cursor: text;
`;

export const OtpVerify = styled.button`
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.gray200};
  background: transparent;
  padding: 0 ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.goldDark};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SelectedPhone = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  min-height: 48px;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.offWhite};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const GhostButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  color: ${({ theme }) => theme.colors.gray600};
  cursor: pointer;
  text-align: left;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.goldDark};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
