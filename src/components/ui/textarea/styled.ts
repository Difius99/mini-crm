import styled, { css } from "styled-components";
import { COLORS as _ } from "../../../constants";
import type { InputStatus } from "../input/types";

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Field = styled.div<{ $status: InputStatus }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  width: 100%;

  border-radius: 4px;
  border: 1px solid ${_.lightStroke};
  background: ${_.backgroundPure};

  ${({ $status }) =>
    $status === "error" &&
    css`
      border-color: ${_.warning};
    `}

  &:focus-within {
    border-color: ${_.purple};
    box-shadow: inset 0 0 0 1px ${_.purple};
  }
`;

export const Label = styled.span`
  font-size: 13px;
  color: ${_.secondary};
`;

export const TextareaStyledComponent = styled.textarea`
  width: 100%;
  resize: vertical;
  outline: none;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 15px;
  line-height: 20px;
  color: ${_.primary};

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
