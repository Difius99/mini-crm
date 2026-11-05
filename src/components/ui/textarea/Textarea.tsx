import React from "react";
import {
  Container,
  Field,
  HelperText,
  Label,
  TextareaStyledComponent,
} from "./styled";
import type { TextareaProps } from "./types";

function TextareaInner(
  {
    label,
    helperText,
    status = "default",
    isValidate = false,
    rows = 4,
    ...rest
  }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <Container>
      <Field $status={status}>
        {label && <Label>{label}</Label>}
        <TextareaStyledComponent ref={ref} rows={rows} {...rest} />
      </Field>
      {isValidate && (
        <HelperText $isError={status === "error"}>
          {helperText || " "}
        </HelperText>
      )}
    </Container>
  );
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  TextareaInner,
);
