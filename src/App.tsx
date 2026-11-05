import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";
import AuthProvider from "./features/auth/AuthProvider";
import { useAuth } from "./features/auth/AuthContext";
import RequireAuth from "./features/auth/RequireAuth";
import LoginPage from "./features/auth/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import ObjectsPage from "./features/objects/ObjectsPage";
import ObjectPage from "./features/objects/ObjectPage";
import TaskPage from "./features/tasks/TaskPage";
import MyTasksPage from "./features/tasks/MyTasksPage";

function HomeRedirect() {
  const { isManager } = useAuth();
  return <Navigate to={isManager ? "/objects" : "/my-tasks"} replace />;
}

function ExecutorOnly({ children }: { children: React.ReactNode }) {
  const { isManager } = useAuth();
  return isManager ? <Navigate to="/objects" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<HomeRedirect />} />
              <Route path="/objects" element={<ObjectsPage />} />
              <Route path="/objects/:id" element={<ObjectPage />} />
              <Route path="/tasks/:id" element={<TaskPage />} />
              <Route
                path="/my-tasks"
                element={
                  <ExecutorOnly>
                    <MyTasksPage />
                  </ExecutorOnly>
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
