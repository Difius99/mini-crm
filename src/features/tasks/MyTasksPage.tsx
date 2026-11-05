import { useMemo, useState } from "react";
import { Spinner } from "../../components/ui/spinner/Spinner.styled";
import {
  CardSubTitle,
  CenteredSpinner,
  ErrorText,
  PageHeader,
  PageTitle,
} from "../../styled";
import { getMyTasks } from "../../api/tasks.api";
import type { TaskStatus } from "../../api/types";
import { STATUS_LABELS } from "../../constants";
import { useRequest } from "../../utils/useRequest";
import { useAuth } from "../auth/AuthContext";
import TaskList from "./components/TaskList";
import { Tab, Tabs } from "./styled";

type Filter = "active" | "all" | TaskStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "active", label: "Активные" },
  { value: "new", label: STATUS_LABELS.new },
  { value: "in_progress", label: STATUS_LABELS.in_progress },
  { value: "rework", label: STATUS_LABELS.rework },
  { value: "review", label: STATUS_LABELS.review },
  { value: "accepted", label: STATUS_LABELS.accepted },
  { value: "all", label: "Все" },
];

export default function MyTasksPage() {
  const { profile } = useAuth();
  const userId = profile?.id ?? "";
  const [filter, setFilter] = useState<Filter>("active");

  const { data, error, isLoading } = useRequest(() => getMyTasks(userId), [userId]);

  const tasks = useMemo(() => {
    if (!data) return [];
    if (filter === "all") return data;
    if (filter === "active") return data.filter((t) => t.status !== "accepted");
    return data.filter((t) => t.status === filter);
  }, [data, filter]);

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Мои задачи</PageTitle>
          <CardSubTitle>Задачи, назначенные вам, по всем объектам</CardSubTitle>
        </div>
      </PageHeader>

      <Tabs>
        {FILTERS.map((f) => (
          <Tab
            key={f.value}
            type="button"
            $active={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Tab>
        ))}
      </Tabs>

      {isLoading && (
        <CenteredSpinner>
          <Spinner $size={32} />
        </CenteredSpinner>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      {data && (
        <TaskList
          tasks={tasks}
          showObject
          showAssignee={false}
          emptyText="Задач с таким статусом нет"
        />
      )}
    </>
  );
}
