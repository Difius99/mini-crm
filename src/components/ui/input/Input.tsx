import React from "react";
import {
  Container,
  InputLabel,
  InputField,
  InputStyledComponent,
  HelperText,
  InputWrapper,
} from "./styled";
import type { InputProps } from "./types";

function InputInner(
  {
    label,
    helperText,
    status = "default",
    icon,
    disabled,
    isValidate = false,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Container>
      <InputField $status={status}>
        <InputWrapper>
          {label && <InputLabel>{label}</InputLabel>}
          <InputStyledComponent
            ref={ref}
            disabled={disabled}
            $status={status}
            {...rest}
          />
        </InputWrapper>
        {icon}
      </InputField>
      {isValidate && (
        <HelperText $isError={status === "error"}>
          {helperText || " "}
        </HelperText>
      )}
    </Container>
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(InputInner);
