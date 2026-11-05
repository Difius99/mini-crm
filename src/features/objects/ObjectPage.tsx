import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import { Spinner } from "../../components/ui/spinner/Spinner.styled";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import {
  Actions,
  BackLink,
  CardSubTitle,
  CardTitle,
  CenteredSpinner,
  ErrorText,
  PageHeader,
  PageTitle,
} from "../../styled";
import {
  deleteObject,
  getObject,
  getObjectTasks,
  updateObject,
} from "../../api/objects.api";
import { createTask, getExecutors } from "../../api/tasks.api";
import type { ObjectInput } from "../../api/types";
import { useRequest } from "../../utils/useRequest";
import { useAuth } from "../auth/AuthContext";
import ObjectFormModal from "./components/ObjectFormModal";
import TaskList from "../tasks/components/TaskList";
import TaskFormModal from "../tasks/components/TaskFormModal";
import type { TaskFormValues } from "../tasks/components/types";

export default function ObjectPage() {
  const { id = "" } = useParams();
  const { isManager } = useAuth();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const objectReq = useRequest(() => getObject(id), [id]);
  const tasksReq = useRequest(() => getObjectTasks(id), [id]);
  const executorsReq = useRequest(
    () => (isManager ? getExecutors() : Promise.resolve([])),
    [isManager],
  );

  const object = objectReq.data;

  const objectInitial = useMemo<ObjectInput | undefined>(
    () => (object ? { name: object.name, address: object.address } : undefined),
    [object],
  );

  const handleUpdate = async (values: ObjectInput) => {
    await updateObject(id, values);
    setIsEditOpen(false);
    objectReq.reload();
  };

  const handleDelete = async () => {
    await deleteObject(id);
    navigate("/objects", { replace: true });
  };

  const handleCreateTask = async (values: TaskFormValues) => {
    await createTask(id, values);
    setIsTaskOpen(false);
    tasksReq.reload();
  };

  if (objectReq.isLoading) {
    return (
      <CenteredSpinner>
        <Spinner $size={32} />
      </CenteredSpinner>
    );
  }

  if (objectReq.error || !object) {
    return (
      <>
        <BackLink onClick={() => navigate("/objects")}>← Все объекты</BackLink>
        <ErrorText>Объект не найден или у вас нет к нему доступа.</ErrorText>
      </>
    );
  }

  return (
    <>
      <BackLink onClick={() => navigate("/objects")}>← Все объекты</BackLink>

      <PageHeader>
        <div>
          <PageTitle>{object.name}</PageTitle>
          <CardSubTitle>{object.address}</CardSubTitle>
        </div>
        {isManager && (
          <Actions>
            <Button onClick={() => setIsTaskOpen(true)}>Добавить задачу</Button>
            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
              Изменить
            </Button>
            <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
              Удалить
            </Button>
          </Actions>
        )}
      </PageHeader>

      <CardTitle>{isManager ? "Задачи" : "Ваши задачи на объекте"}</CardTitle>

      {tasksReq.isLoading && (
        <CenteredSpinner>
          <Spinner $size={24} />
        </CenteredSpinner>
      )}
      {tasksReq.error && <ErrorText>{tasksReq.error}</ErrorText>}
      {tasksReq.data && (
        <TaskList
          tasks={tasksReq.data}
          showAssignee={isManager}
          emptyText="На объекте пока нет задач"
        />
      )}

      {isManager && (
        <>
          <ObjectFormModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSubmit={handleUpdate}
            initialValues={objectInitial}
            title="Изменить объект"
            submitLabel="Сохранить"
          />

          <TaskFormModal
            isOpen={isTaskOpen}
            onClose={() => setIsTaskOpen(false)}
            onSubmit={handleCreateTask}
            executors={executorsReq.data ?? []}
            title="Новая задача"
            submitLabel="Создать"
          />

          <ConfirmModal
            isOpen={isDeleteOpen}
            title="Удалить объект?"
            text={
              <>
                Объект «{object.name}» будет удалён вместе со всеми его
                задачами и их историей. Действие нельзя отменить.
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
