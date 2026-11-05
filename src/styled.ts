import styled from "styled-components";
import { COLORS as _ } from "./constants";

export const PageTitle = styled.h1`
  font-family: "Stapel Medium", sans-serif;
  font-size: 28px;
  line-height: 34px;
  color: ${_.primary};
`;

export const CardTitle = styled.h2`
  font-family: "Stapel Medium", sans-serif;
  font-size: 20px;
  line-height: 26px;
  color: ${_.primary};
`;

export const CardSubTitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${_.secondary};
`;

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: ${_.backgroundPure};
  border-radius: 8px;
  border: 1px solid ${_.lightStroke};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Muted = styled.span`
  color: ${_.secondary};
  font-size: 14px;
`;

export const ErrorText = styled.p`
  color: ${_.warning};
  font-size: 14px;
`;

export const EmptyState = styled.p`
  padding: 32px 0;
  text-align: center;
  color: ${_.secondary};
`;

export const CenteredSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px 0;
`;

export const BackLink = styled.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: ${_.purple};

  &:hover {
    text-decoration: underline;
  }
`;
