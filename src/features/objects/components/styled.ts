import styled from "styled-components";
import { COLORS as _ } from "../../../constants";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const ObjectCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: left;
  cursor: pointer;

  background: ${_.backgroundPure};
  border: 1px solid ${_.lightStroke};
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: ${_.purple};
    box-shadow: 0 4px 12px ${_.shadow};
  }

  &:focus-visible {
    outline: 2px solid ${_.purple};
    outline-offset: 2px;
  }
`;

export const ObjectName = styled.span`
  font-family: "Stapel Medium", sans-serif;
  font-size: 18px;
  line-height: 24px;
  color: ${_.primary};
`;

export const ObjectAddress = styled.span`
  color: ${_.secondary};
  font-size: 14px;
`;

export const TasksCount = styled.span`
  margin-top: auto;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${_.purple};
`;
