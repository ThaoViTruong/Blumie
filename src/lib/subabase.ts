import "react-native-url-polyfill/auto";
import { AppState, Platform } from "react-native";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseStorage } from "@/src/lib/supabase-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Thiếu biến môi trường Supabase công khai.");
}

const isWeb = Platform.OS === "web";
const isNative = Platform.OS === "android" || Platform.OS === "ios";
const isBrowser = typeof window !== "undefined";
const storage = getSupabaseStorage();

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    autoRefreshToken: isNative,
    persistSession: Boolean(storage),
    detectSessionInUrl: isWeb && isBrowser,
  },
});

if (isNative) {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
      return;
    }

    supabase.auth.stopAutoRefresh();
  });
}
