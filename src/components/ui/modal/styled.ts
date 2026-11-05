import { styled } from "styled-components";
import { COLORS as _ } from "../../../constants";

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  z-index: 10;
  padding: 16px;
  background: color-mix(in srgb, ${_.black} 45%, transparent);
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div<{ $width: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: ${({ $width }) => $width}px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: ${_.white};
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled.h2`
  font-family: "Stapel Medium", sans-serif;
  font-size: 22px;
  line-height: 28px;
  color: ${_.primary};
`;
