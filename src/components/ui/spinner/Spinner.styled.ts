import styled, { keyframes } from "styled-components";
import { COLORS as _ } from "../../../constants";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<{ $light?: boolean; $size?: number }>`
  width: ${({ $size = 16 }) => $size}px;
  height: ${({ $size = 16 }) => $size}px;
  border-radius: 50%;
  border: 2px solid
    color-mix(in srgb, ${({ $light }) => ($light ? _.white : _.purple)} 30%, transparent);
  border-top-color: ${({ $light }) => ($light ? _.white : _.purple)};
  animation: ${spin} 0.6s linear infinite;
`;
