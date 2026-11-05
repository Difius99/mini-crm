import styled from "styled-components";
import { COLORS as _ } from "../../../constants";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${_.lightStroke};
  border-radius: 8px;
  overflow: hidden;
  background: ${_.backgroundPure};
`;

export const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 16px;
  transition: background 0.2s;

  & + & {
    border-top: 1px solid ${_.lightStroke};
  }

  &:hover {
    background: ${_.backgroundPrimary};
  }
`;

export const RowMain = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${_.purple};
    outline-offset: -2px;
  }
`;

export const RowTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${_.primary};
`;

export const RowMeta = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
`;

export const Timeline = styled.ol`
  display: flex;
  flex-direction: column;
`;

export const TimelineItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 0 20px 24px;

  &::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${_.purple};
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 18px;
    bottom: 0;
    width: 2px;
    background: ${_.lightStroke};
  }
`;

export const TimelineHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const Arrow = styled.span`
  color: ${_.secondary};
`;

export const Comment = styled.p`
  padding: 8px 12px;
  border-radius: 4px;
  background: ${_.backgroundPrimary};
  border-left: 3px solid ${_.warning};
  white-space: pre-wrap;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
