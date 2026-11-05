const KNOWN_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Неверный email или пароль",
  "Email not confirmed": "Email не подтверждён",
  "Failed to fetch": "Нет соединения с сервером",
};

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string" && message) {
      return KNOWN_MESSAGES[message] ?? message;
    }
  }

  if (typeof error === "string") return error;

  return "Неизвестная ошибка";
}

export function unwrap<T>(result: { data: T | null; error: unknown }): T {
  if (result.error) throw result.error;
  if (result.data === null) throw new Error("Данные не найдены");
  return result.data;
}
