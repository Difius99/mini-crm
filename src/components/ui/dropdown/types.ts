export type DropdownOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type DropdownProps<T extends string = string> = {
  label?: string;
  placeholder?: string;
  value?: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  status?: "default" | "error";
  helperText?: string;
};
