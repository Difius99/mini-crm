import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../components/ui/statusBadge/StatusBadge";
import { EmptyState, Muted } from "../../../styled";
import { formatDate } from "../../../utils/format";
import { List, Row, RowMain, RowMeta, RowTitle } from "./styled";
import type { TaskListProps } from "./types";

export default function TaskList({
  tasks,
  showObject = false,
  showAssignee = true,
  emptyText = "Задач пока нет",
}: TaskListProps) {
  const navigate = useNavigate();

  if (tasks.length === 0) return <EmptyState>{emptyText}</EmptyState>;

  return (
    <List>
      {tasks.map((task) => (
        <Row key={task.id}>
          <RowMain
            type="button"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <RowTitle>{task.title}</RowTitle>
            <RowMeta>
              {showObject && task.object && <Muted>{task.object.name}</Muted>}
              {showAssignee && task.assignee && (
                <Muted>Исполнитель: {task.assignee.full_name}</Muted>
              )}
              <Muted>от {formatDate(task.created_at)}</Muted>
            </RowMeta>
          </RowMain>
          <StatusBadge status={task.status} />
        </Row>
      ))}
    </List>
  );
}
