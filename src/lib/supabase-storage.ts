import { type SupportedStorage } from "@supabase/supabase-js";

export function getSupabaseStorage(): SupportedStorage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.localStorage;
}
