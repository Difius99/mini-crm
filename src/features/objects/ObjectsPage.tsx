import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import { Spinner } from "../../components/ui/spinner/Spinner.styled";
import {
  CardSubTitle,
  CenteredSpinner,
  EmptyState,
  ErrorText,
  PageHeader,
  PageTitle,
} from "../../styled";
import { createObject, getObjects } from "../../api/objects.api";
import type { ObjectInput } from "../../api/types";
import { useRequest } from "../../utils/useRequest";
import { pluralTasks } from "../../utils/format";
import { useAuth } from "../auth/AuthContext";
import ObjectFormModal from "./components/ObjectFormModal";
import {
  Grid,
  ObjectAddress,
  ObjectCard,
  ObjectName,
  TasksCount,
} from "./components/styled";

export default function ObjectsPage() {
  const { isManager } = useAuth();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: objects, error, isLoading } = useRequest(getObjects, []);

  const handleCreate = async (values: ObjectInput) => {
    const created = await createObject(values);
    setIsCreateOpen(false);
    navigate(`/objects/${created.id}`);
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Объекты</PageTitle>
          <CardSubTitle>
            {isManager
              ? "Все строительные объекты компании"
              : "Объекты, на которых у вас есть задачи"}
          </CardSubTitle>
        </div>
        {isManager && (
          <Button onClick={() => setIsCreateOpen(true)}>Добавить объект</Button>
        )}
      </PageHeader>

      {isLoading && (
        <CenteredSpinner>
          <Spinner $size={32} />
        </CenteredSpinner>
      )}
      {error && <ErrorText>{error}</ErrorText>}

      {objects && objects.length === 0 && (
        <EmptyState>
          {isManager ? "Объектов пока нет" : "У вас пока нет задач ни на одном объекте"}
        </EmptyState>
      )}

      {objects && objects.length > 0 && (
        <Grid>
          {objects.map((object) => (
            <li key={object.id}>
              <ObjectCard
                type="button"
                onClick={() => navigate(`/objects/${object.id}`)}
              >
                <ObjectName>{object.name}</ObjectName>
                <ObjectAddress>{object.address}</ObjectAddress>
                <TasksCount>
                  {isManager ? "" : "Ваших: "}
                  {pluralTasks(object.tasks[0]?.count ?? 0)}
                </TasksCount>
              </ObjectCard>
            </li>
          ))}
        </Grid>
      )}

      {isManager && (
        <ObjectFormModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreate}
          title="Новый объект"
          submitLabel="Создать"
        />
      )}
    </>
  );
}
