import styled from "styled-components";

import { COLORS as _ } from "../../../constants";
import ChevronDownBase from "../../icons/ChevronDown";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Control = styled.button<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  min-height: 62px;
  width: 100%;
  gap: 6px;

  font-family: inherit;
  text-align: left;
  cursor: pointer;

  border-radius: 4px;
  border: 1px solid ${({ $isError }) => ($isError ? _.warning : _.lightStroke)};
  background: ${_.backgroundPure};

  &:disabled {
    cursor: not-allowed;
    background: ${_.backgroundPrimary};
  }

  &:focus-visible,
  &[data-open="true"] {
    outline: none;
    border-color: ${_.purple};
    box-shadow: inset 0 0 0 1px ${_.purple};
  }
`;

export const ControlWrapper = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ControlLabel = styled.span`
  font-size: 13px;
  color: ${_.secondary};
`;

export const ControlValue = styled.span<{ $isPlaceholder: boolean }>`
  font-size: 15px;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? _.secondary : _.primary)};
`;

export const Menu = styled.ul`
  z-index: 20;
  display: flex;
  flex-direction: column;
  max-height: 240px;
  overflow-y: auto;

  background: ${_.backgroundPure};
  border: 1px solid ${_.lightStroke};
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 4px 12px 0px ${_.shadow};

  &:focus-visible {
    outline: none;
  }
`;

export const MenuItem = styled.li<{
  $selected?: boolean;
  $disabled?: boolean;
  $active?: boolean;
}>`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 6px 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $disabled }) => ($disabled ? _.tertiary : _.primary)};

  background: ${({ $selected, $active }) =>
    $selected ? _.lightStroke : $active ? _.backgroundPrimary : _.backgroundPure};

  &:focus-visible {
    outline: none;
  }
`;

export const HelperText = styled.span<{ $isError: boolean }>`
  font-size: 13px;
  min-height: 16px;
  color: ${_.warning};
  visibility: ${({ $isError }) => ($isError ? "visible" : "hidden")};
`;

export const ChevronDown = styled(ChevronDownBase)<{ $isOpen: boolean }>`
  flex-shrink: 0;
  color: ${_.secondary};
  transition: transform 0.3s;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
