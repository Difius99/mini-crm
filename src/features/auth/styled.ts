import styled from "styled-components";
import { COLORS as _ } from "../../constants";

export const Page = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background: ${_.backgroundPrimary};
`;

export const AuthCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 429px;
  padding: 24px;
  background: ${_.backgroundPure};
  border-radius: 8px;
  border: 1px solid ${_.lightStroke};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const ProfileErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 480px;
  margin: 64px auto;
  padding: 24px;
  background: ${_.backgroundPure};
  border-radius: 8px;
`;
