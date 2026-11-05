import { supabase } from "./supabase";
import { unwrap } from "./errors";
import type { Profile } from "./types";

export async function getProfile(userId: string): Promise<Profile> {
  const result = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", userId)
    .maybeSingle();
  return unwrap(result) as unknown as Profile;
}
