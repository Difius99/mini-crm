import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS as _ } from "../../constants";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  background: ${_.backgroundPure};
  border-bottom: 1px solid ${_.lightStroke};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 32px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 24px;
`;

export const Brand = styled.span`
  font-family: "Stapel Medium", sans-serif;
  font-size: 20px;
  color: ${_.purple};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 4px;
  flex: 1;
`;

export const NavItem = styled(NavLink)`
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  color: ${_.secondary};
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: ${_.primary};
    background: ${_.backgroundPrimary};
  }

  &.active {
    color: ${_.purple};
    background: ${_.backgroundSecondary};
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserName = styled.span`
  font-weight: 500;
`;

export const RoleChip = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: ${_.purple};
  background: ${_.backgroundSecondary};
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;
