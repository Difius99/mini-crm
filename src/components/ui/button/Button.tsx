import { Spinner } from "../spinner/Spinner.styled";
import { ButtonStyledComponent } from "./styled";
import type { ButtonProps } from "./types";

export default function Button({
  size = "m",
  variant = "primary",
  fullWidth = false,
  iconPosition = "start",
  isLoading,
  icon,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <ButtonStyledComponent
      type={type}
      $size={size}
      $variant={variant}
      $fullWidth={fullWidth}
      $iconPosition={iconPosition}
      $isLoading={isLoading}
      $hasIcon={!!icon}
      disabled={disabled || isLoading}
      {...rest}
    >
      {iconPosition === "start" && icon}
      {isLoading ? <Spinner $light={variant === "primary"} /> : children}
      {iconPosition === "end" && icon}
    </ButtonStyledComponent>
  );
}
