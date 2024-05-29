import supabase from "@/app/auth/supabaseClient";
import { User } from "./interface";

export const fetchUserData = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
  return data as User;
};
