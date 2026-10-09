import AsyncStorage from "@react-native-async-storage/async-storage";
import { type SupportedStorage } from "@supabase/supabase-js";

export function getSupabaseStorage(): SupportedStorage {
  return {
    getItem: (key: string) => AsyncStorage.getItem(key),
    setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
    removeItem: (key: string) => AsyncStorage.removeItem(key),
  };
}
