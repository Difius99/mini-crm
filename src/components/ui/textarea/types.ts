import type { InputStatus } from "../input/types";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    status?: InputStatus;
    helperText?: string;
    label?: string;
    isValidate?: boolean;
  };
