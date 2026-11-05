import { supabase } from "./supabase";
import { unwrap } from "./errors";
import type {
  ProfileShort,
  Task,
  TaskDetails,
  TaskHistoryItem,
  TaskInput,
  TaskListItem,
  TaskStatus,
} from "./types";

const TASK_DETAILS_SELECT =
  "*, object:objects(id, name, address), assignee:profiles!assignee_id(id, full_name), author:profiles!author_id(id, full_name)";

export async function getTask(id: string): Promise<TaskDetails> {
  const result = await supabase
    .from("tasks")
    .select(TASK_DETAILS_SELECT)
    .eq("id", id)
    .maybeSingle();
  return unwrap(result) as unknown as TaskDetails;
}

export async function getMyTasks(userId: string): Promise<TaskListItem[]> {
  const result = await supabase
    .from("tasks")
    .select(
      "id, title, status, created_at, assignee:profiles!assignee_id(id, full_name), object:objects(id, name)",
    )
    .eq("assignee_id", userId)
    .order("created_at", { ascending: false });
  return unwrap(result) as unknown as TaskListItem[];
}

export async function getTaskHistory(taskId: string): Promise<TaskHistoryItem[]> {
  const result = await supabase
    .from("task_history")
    .select(
      "id, from_status, to_status, comment, created_at, changed_by_profile:profiles!changed_by(full_name)",
    )
    .eq("task_id", taskId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
  return unwrap(result) as unknown as TaskHistoryItem[];
}

export async function getExecutors(): Promise<ProfileShort[]> {
  const result = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("role", "executor")
    .order("full_name");
  return unwrap(result) as unknown as ProfileShort[];
}

export async function createTask(
  objectId: string,
  input: TaskInput,
): Promise<Task> {
  const result = await supabase
    .from("tasks")
    .insert({ ...input, object_id: objectId })
    .select("*")
    .single();
  return unwrap(result) as unknown as Task;
}

export async function updateTask(id: string, input: TaskInput): Promise<Task> {
  const result = await supabase
    .from("tasks")
    .update(input)
    .eq("id", id)
    .select("*");
  const rows = unwrap(result) as unknown[];
  if (rows.length === 0) throw new Error("Нет прав на изменение задачи");
  return rows[0] as Task;
}

export async function deleteTask(id: string): Promise<void> {
  const result = await supabase.from("tasks").delete().eq("id", id).select("id");
  const rows = unwrap(result) as unknown[];
  if (rows.length === 0) throw new Error("Нет прав на удаление задачи");
}

export async function changeTaskStatus(
  taskId: string,
  to: TaskStatus,
  comment?: string,
): Promise<Task> {
  const result = await supabase.rpc("change_task_status", {
    p_task_id: taskId,
    p_to: to,
    p_comment: comment ?? null,
  });
  return unwrap(result) as unknown as Task;
}
