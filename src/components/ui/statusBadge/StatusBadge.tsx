import { STATUS_COLORS, STATUS_LABELS } from "../../../constants";
import { Badge } from "./styled";
import type { StatusBadgeProps } from "./types";

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];
  return (
    <Badge $text={colors.text} $bg={colors.bg}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
