import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Input } from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { CardSubTitle, ErrorText, PageTitle } from "../../styled";
import { getApiErrorMessage } from "../../api/errors";
import { useAuth } from "./AuthContext";
import { AuthCard, Form, Page } from "./styled";
import type { LoginFormValues } from "./types";

export default function LoginPage() {
  const { session, signIn } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  if (session) return <Navigate to="/" replace />;

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      await signIn(values.email.trim(), values.password);
    } catch (e) {
      setServerError(getApiErrorMessage(e));
    }
  };

  return (
    <Page>
      <AuthCard>
        <PageTitle>Объекты и задачи</PageTitle>
        <CardSubTitle>
          Войдите по email и паролю. Учётные записи выдаёт администратор.
        </CardSubTitle>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            status={errors.email ? "error" : "default"}
            helperText={errors.email?.message}
            isValidate
            {...register("email", { required: "Введите email" })}
          />
          <Input
            label="Пароль"
            type="password"
            autoComplete="current-password"
            status={errors.password ? "error" : "default"}
            helperText={errors.password?.message}
            isValidate
            {...register("password", { required: "Введите пароль" })}
          />

          {serverError && <ErrorText>{serverError}</ErrorText>}

          <Button type="submit" fullWidth size="l" isLoading={isSubmitting}>
            Войти
          </Button>
        </Form>
      </AuthCard>
    </Page>
  );
}
