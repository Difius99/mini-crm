import type {
  ProfileShort,
  TaskDetails,
  TaskHistoryItem,
  TaskListItem,
} from "../../../api/types";

export type TaskListProps = {
  tasks: TaskListItem[];
  showObject?: boolean;
  showAssignee?: boolean;
  emptyText?: string;
};

export type TaskHistoryProps = {
  items: TaskHistoryItem[];
};

export type TaskActionsProps = {
  task: TaskDetails;
  onChanged: () => void;
};

export type TaskFormValues = {
  title: string;
  description: string;
  assignee_id: string;
};

export type TaskFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  executors: ProfileShort[];
  initialValues?: TaskFormValues;
  title: string;
  submitLabel: string;
};
