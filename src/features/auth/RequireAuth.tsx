import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Spinner } from "../../components/ui/spinner/Spinner.styled";
import { CenteredSpinner, ErrorText } from "../../styled";
import Button from "../../components/ui/button/Button";
import { ProfileErrorBox } from "./styled";

export default function RequireAuth() {
  const { session, profile, isLoading, profileError, signOut } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <CenteredSpinner>
        <Spinner $size={32} />
      </CenteredSpinner>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!profile) {
    return (
      <ProfileErrorBox>
        <ErrorText>
          Не удалось загрузить профиль пользователя
          {profileError ? `: ${profileError}` : ""}. Обратитесь к
          администратору.
        </ErrorText>
        <Button variant="secondary" onClick={signOut}>
          Выйти
        </Button>
      </ProfileErrorBox>
    );
  }

  return <Outlet />;
}
