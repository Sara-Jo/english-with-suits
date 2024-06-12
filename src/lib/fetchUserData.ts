import supabase from "@/app/auth/supabaseClient";
import { IUser } from "./interface";

export const fetchUserData = async (userId: string): Promise<IUser | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
  return data as IUser;
};
