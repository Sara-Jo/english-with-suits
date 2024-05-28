import supabase from "@/app/auth/supabaseClient";
import { Expression } from "@/interface/expression";

export const fetchExpressions = async (
  episode: number
): Promise<Expression[]> => {
  const { data, error } = await supabase
    .from("expressions")
    .select("*")
    .eq("episode", episode)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching expressions:", error);
    return [];
  }

  return data as Expression[];
};
