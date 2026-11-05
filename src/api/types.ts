export type UserRole = "manager" | "executor";
export type TaskStatus =
  | "new"
  | "in_progress"
  | "review"
  | "accepted"
  | "rework";

export type Profile = {
  id: string;
  full_name: string;
  role: UserRole;
};

export type ProfileShort = Pick<Profile, "id" | "full_name">;

export type CrmObject = {
  id: string;
  name: string;
  address: string;
  created_at: string;
};

export type CrmObjectWithCount = CrmObject & {
  tasks: { count: number }[];
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  object_id: string;
  assignee_id: string;
  author_id: string;
  status: TaskStatus;
  created_at: string;
};

export type TaskListItem = Pick<Task, "id" | "title" | "status" | "created_at"> & {
  assignee: ProfileShort | null;
  object: Pick<CrmObject, "id" | "name"> | null;
};

export type TaskDetails = Task & {
  object: Pick<CrmObject, "id" | "name" | "address"> | null;
  assignee: ProfileShort | null;
  author: ProfileShort | null;
};

export type TaskHistoryItem = {
  id: number;
  from_status: TaskStatus | null;
  to_status: TaskStatus;
  comment: string | null;
  created_at: string;
  changed_by_profile: Pick<Profile, "full_name"> | null;
};

export type ObjectInput = Pick<CrmObject, "name" | "address">;

export type TaskInput = {
  title: string;
  description: string;
  assignee_id: string;
};
