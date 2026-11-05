import styled, { css } from "styled-components";
import { COLORS as _ } from "../../../constants";
import type { InputStyledProps } from "./types";

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  width: 100%;
`;
export const InputLabel = styled.span`
  font-size: 13px;
  color: ${_.secondary};
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
`;

export const InputField = styled.div<InputStyledProps>`
  min-height: 62px;
  padding: 10px;
  display: flex;
  align-items: center;

  justify-content: space-between;
  gap: 6px;
  width: 100%;

  border-radius: 4px;
  border: 1px solid ${_.lightStroke};
  background: ${_.backgroundPure};

  ${({ $status }) =>
    $status === "error" &&
    css`
      border-color: ${_.warning};
    `}
  ${({ $status }) =>
    $status === "success" &&
    css`
      border-color: ${_.success};
    `}

  &:has(input:disabled) {
    background: ${_.backgroundPrimary};
  }

  &:focus-within {
    border-color: ${_.purple};
    box-shadow: inset 0 0 0 1px ${_.purple};
  }
`;

export const InputStyledComponent = styled.input<InputStyledProps>`
  flex: 1;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  font-size: 15px;

  color: ${({ $status }) => ($status === "error" ? _.warning : _.primary)};

  &::placeholder {
    color: ${_.secondary};
  }
`;

export const HelperText = styled.span<{ $isError: boolean }>`
  font-size: 13px;
  min-height: 16px;

  color: ${_.warning};
  visibility: ${({ $isError }) => ($isError ? "visible" : "hidden")};
`;
