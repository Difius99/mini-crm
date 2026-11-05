import { supabase } from "./supabase";
import { unwrap } from "./errors";
import type {
  CrmObject,
  CrmObjectWithCount,
  ObjectInput,
  TaskListItem,
} from "./types";

export async function getObjects(): Promise<CrmObjectWithCount[]> {
  const result = await supabase
    .from("objects")
    .select("id, name, address, created_at, tasks(count)")
    .order("created_at", { ascending: true });
  return unwrap(result) as unknown as CrmObjectWithCount[];
}

export async function getObject(id: string): Promise<CrmObject> {
  const result = await supabase
    .from("objects")
    .select("id, name, address, created_at")
    .eq("id", id)
    .maybeSingle();
  return unwrap(result) as unknown as CrmObject;
}

export async function getObjectTasks(objectId: string): Promise<TaskListItem[]> {
  const result = await supabase
    .from("tasks")
    .select(
      "id, title, status, created_at, assignee:profiles!assignee_id(id, full_name), object:objects(id, name)",
    )
    .eq("object_id", objectId)
    .order("created_at", { ascending: false });
  return unwrap(result) as unknown as TaskListItem[];
}

export async function createObject(input: ObjectInput): Promise<CrmObject> {
  const result = await supabase
    .from("objects")
    .insert(input)
    .select("id, name, address, created_at")
    .single();
  return unwrap(result) as unknown as CrmObject;
}

export async function updateObject(
  id: string,
  input: ObjectInput,
): Promise<CrmObject> {
  const result = await supabase
    .from("objects")
    .update(input)
    .eq("id", id)
    .select("id, name, address, created_at");
  const rows = unwrap(result) as unknown[];
  if (rows.length === 0) throw new Error("Нет прав на изменение объекта");
  return rows[0] as CrmObject;
}

export async function deleteObject(id: string): Promise<void> {
  const result = await supabase
    .from("objects")
    .delete()
    .eq("id", id)
    .select("id");
  const rows = unwrap(result) as unknown[];
  if (rows.length === 0) throw new Error("Нет прав на удаление объекта");
}
