import styled from "styled-components";

export const Badge = styled.span<{ $text: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  color: ${({ $text }) => $text};
  background: ${({ $bg }) => $bg};
`;
