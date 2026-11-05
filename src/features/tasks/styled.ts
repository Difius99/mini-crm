import styled from "styled-components";
import { COLORS as _ } from "../../constants";

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px 16px;
`;

export const InfoLabel = styled.dt`
  font-size: 14px;
  color: ${_.secondary};
`;

export const InfoValue = styled.dd`
  color: ${_.primary};
`;

export const SectionLabel = styled.span`
  font-size: 14px;
  color: ${_.secondary};
`;

export const Description = styled.p`
  line-height: 22px;
  white-space: pre-wrap;
`;

export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? _.purple : _.lightStroke)};
  background: ${({ $active }) => ($active ? _.backgroundSecondary : _.backgroundPure)};
  color: ${({ $active }) => ($active ? _.purple : _.primary)};
  font-size: 14px;
  cursor: pointer;
`;
