import styled, { css } from "styled-components";
import type { ButtonStyledProps } from "./types";
import { COLORS as _ } from "../../../constants";

const sizeStyles = {
  s: css`
    min-height: 32px;
    min-width: 70px;
    padding: 0 12px;
    font-size: 14px;
  `,
  m: css`
    min-height: 42px;
    min-width: 70px;
    padding: 0 16px;
    font-size: 15px;
  `,
  l: css`
    min-height: 48px;
    min-width: 142px;
    padding: 0 20px;
    font-size: 15px;
  `,
} as const;

const variantStyles = {
  primary: css`
    background-color: ${_.purple};
    color: ${_.backgroundPure};
    &:hover:not(:disabled) {
      background-color: ${_.darkPurple};
    }
  `,
  secondary: css`
    background-color: ${_.backgroundSecondary};
    color: ${_.primary};
    &:hover:not(:disabled) {
      background-color: ${_.lightStroke};
    }
  `,
  danger: css`
    background-color: ${_.backgroundPure};
    color: ${_.warning};
    box-shadow: inset 0 0 0 1px ${_.warning};
    &:hover:not(:disabled) {
      background-color: #fdebe3;
    }
  `,
} as const;

export const ButtonStyledComponent = styled.button<ButtonStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
  margin: 0;
  border-radius: 4px;
  font-family: "PT Root UI", sans-serif;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;
  outline: none;
  border: none;

  transition: all 0.3s;

  ${({ $size }) => sizeStyles[$size]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: default;
      pointer-events: none;
    `}
  ${({ $variant }) => variantStyles[$variant]};

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      & > svg {
        flex-shrink: 0;
      }
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${_.purple};
    outline-offset: 2px;
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
