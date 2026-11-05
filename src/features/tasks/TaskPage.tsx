import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import { Spinner } from "../../components/ui/spinner/Spinner.styled";
import StatusBadge from "../../components/ui/statusBadge/StatusBadge";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import {
  Actions,
  BackLink,
  Card,
  CardTitle,
  CenteredSpinner,
  ErrorText,
  Muted,
  PageHeader,
  PageTitle,
} from "../../styled";
import {
  deleteTask,
  getExecutors,
  getTask,
  getTaskHistory,
  updateTask,
} from "../../api/tasks.api";
import { useRequest } from "../../utils/useRequest";
import { formatDateTime } from "../../utils/format";
import { useAuth } from "../auth/AuthContext";
import TaskActions from "./components/TaskActions";
import TaskHistory from "./components/TaskHistory";
import TaskFormModal from "./components/TaskFormModal";
import type { TaskFormValues } from "./components/types";
import {
  Columns,
  Description,
  InfoGrid,
  InfoLabel,
  InfoValue,
  SectionLabel,
  TitleRow,
} from "./styled";

export default function TaskPage() {
  const { id = "" } = useParams();
  const { isManager } = useAuth();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const taskReq = useRequest(() => getTask(id), [id]);
  const historyReq = useRequest(() => getTaskHistory(id), [id]);
  const executorsReq = useRequest(
    () => (isManager ? getExecutors() : Promise.resolve([])),
    [isManager],
  );

  const task = taskReq.data;

  const formInitial = useMemo<TaskFormValues | undefined>(
    () =>
      task
        ? {
            title: task.title,
            description: task.description ?? "",
            assignee_id: task.assignee_id,
          }
        : undefined,
    [task],
  );

  const reloadAll = () => {
    taskReq.reload();
    historyReq.reload();
  };

  const backToObject = () =>
    task ? navigate(`/objects/${task.object_id}`) : navigate("/objects");

  const handleUpdate = async (values: TaskFormValues) => {
    await updateTask(id, values);
    setIsEditOpen(false);
    taskReq.reload();
  };

  const handleDelete = async () => {
    await deleteTask(id);
    backToObject();
  };

  if (taskReq.isLoading && !task) {
    return (
      <CenteredSpinner>
        <Spinner $size={32} />
      </CenteredSpinner>
    );
  }

  if (taskReq.error || !task) {
    return (
      <>
        <BackLink onClick={() => navigate(-1)}>← Назад</BackLink>
        <ErrorText>Задача не найдена или у вас нет к ней доступа.</ErrorText>
      </>
    );
  }

  return (
    <>
      <BackLink onClick={backToObject}>
        ← {task.object?.name ?? "К объекту"}
      </BackLink>

      <PageHeader>
        <TitleRow>
          <PageTitle>{task.title}</PageTitle>
          <StatusBadge status={task.status} />
        </TitleRow>
        {isManager && (
          <Actions>
            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
              Изменить
            </Button>
            <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
              Удалить
            </Button>
          </Actions>
        )}
      </PageHeader>

      <Columns>
        <Card>
          <CardTitle>Данные задачи</CardTitle>
          <InfoGrid>
            <InfoLabel>Объект</InfoLabel>
            <InfoValue>
              {task.object ? `${task.object.name}, ${task.object.address}` : "—"}
            </InfoValue>

            <InfoLabel>Исполнитель</InfoLabel>
            <InfoValue>{task.assignee?.full_name ?? "—"}</InfoValue>

            <InfoLabel>Автор</InfoLabel>
            <InfoValue>{task.author?.full_name ?? "—"}</InfoValue>

            <InfoLabel>Создана</InfoLabel>
            <InfoValue>{formatDateTime(task.created_at)}</InfoValue>
          </InfoGrid>

          <SectionLabel>Описание</SectionLabel>
          {task.description ? (
            <Description>{task.description}</Description>
          ) : (
            <Muted>Без описания</Muted>
          )}

          <CardTitle>Действия</CardTitle>
          <TaskActions task={task} onChanged={reloadAll} />
        </Card>

        <Card>
          <CardTitle>История</CardTitle>
          {historyReq.isLoading && !historyReq.data && <Spinner $size={24} />}
          {historyReq.error && <ErrorText>{historyReq.error}</ErrorText>}
          {historyReq.data && <TaskHistory items={historyReq.data} />}
        </Card>
      </Columns>

      {isManager && (
        <>
          <TaskFormModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSubmit={handleUpdate}
            executors={executorsReq.data ?? []}
            initialValues={formInitial}
            title="Изменить задачу"
            submitLabel="Сохранить"
          />
          <ConfirmModal
            isOpen={isDeleteOpen}
            title="Удалить задачу?"
            text={
              <>
                Задача «{task.title}» будет удалена вместе с историей. Действие
                нельзя отменить.
              </>
            }
            onConfirm={handleDelete}
            onClose={() => setIsDeleteOpen(false)}
          />
        </>
      )}
    </>
  );
}
