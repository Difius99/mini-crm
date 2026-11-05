import type { TaskStatus, UserRole } from "../../api/types";

export type Transition = {
  from: TaskStatus;
  to: TaskStatus;
  role: UserRole;
  label: string;
  needsComment?: boolean;
};

export const TRANSITIONS: Transition[] = [
  { from: "new", to: "in_progress", role: "executor", label: "Взять в работу" },
  { from: "in_progress", to: "review", role: "executor", label: "Отправить на проверку" },
  { from: "review", to: "accepted", role: "manager", label: "Принять" },
  {
    from: "review",
    to: "rework",
    role: "manager",
    label: "Вернуть на доработку",
    needsComment: true,
  },
  { from: "rework", to: "in_progress", role: "executor", label: "Взять в работу" },
];

export function getAvailableTransitions(params: {
  status: TaskStatus;
  role: UserRole;
  isAssignee: boolean;
}): Transition[] {
  const { status, role, isAssignee } = params;
  return TRANSITIONS.filter(
    (t) =>
      t.from === status &&
      t.role === role &&
      (role === "manager" || isAssignee),
  );
}
