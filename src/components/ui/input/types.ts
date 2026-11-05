export type InputStatus = "default" | "error" | "success";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  status?: InputStatus;
  helperText?: string;
  label?: string;
  icon?: React.ReactNode;
  isValidate?: boolean;
};

export type InputStyledProps = {
  $status?: InputStatus;
};
