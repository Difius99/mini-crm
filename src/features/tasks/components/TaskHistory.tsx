import StatusBadge from "../../../components/ui/statusBadge/StatusBadge";
import { EmptyState, Muted } from "../../../styled";
import { formatDateTime } from "../../../utils/format";
import {
  Arrow,
  Comment,
  Timeline,
  TimelineHead,
  TimelineItem,
} from "./styled";
import type { TaskHistoryProps } from "./types";

export default function TaskHistory({ items }: TaskHistoryProps) {
  if (items.length === 0) return <EmptyState>История пуста</EmptyState>;

  return (
    <Timeline>
      {items.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineHead>
            {item.from_status ? (
              <>
                <StatusBadge status={item.from_status} />
                <Arrow>→</Arrow>
              </>
            ) : (
              <Muted>Создана →</Muted>
            )}
            <StatusBadge status={item.to_status} />
          </TimelineHead>
          <Muted>
            {item.changed_by_profile?.full_name ?? "Неизвестный пользователь"} ·{" "}
            {formatDateTime(item.created_at)}
          </Muted>
          {item.comment && <Comment>{item.comment}</Comment>}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
