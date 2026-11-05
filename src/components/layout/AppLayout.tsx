import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { ROLE_LABELS } from "../../constants";
import Button from "../ui/button/Button";
import {
  Brand,
  Content,
  Header,
  HeaderInner,
  Nav,
  NavItem,
  RoleChip,
  User,
  UserName,
} from "./styled";

export default function AppLayout() {
  const { profile, isManager, signOut } = useAuth();

  return (
    <>
      <Header>
        <HeaderInner>
          <Brand>Объекты и задачи</Brand>

          <Nav>
            <NavItem to="/objects">
              Объекты
            </NavItem>
            {!isManager && (
              <NavItem to="/my-tasks">
                Мои задачи
              </NavItem>
            )}
          </Nav>

          {profile && (
            <User>
              <UserName>{profile.full_name}</UserName>
              <RoleChip>{ROLE_LABELS[profile.role]}</RoleChip>
              <Button variant="secondary" size="s" onClick={signOut}>
                Выйти
              </Button>
            </User>
          )}
        </HeaderInner>
      </Header>

      <Content>
        <Outlet />
      </Content>
    </>
  );
}
