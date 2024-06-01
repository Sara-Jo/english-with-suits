import supabase from "@/app/auth/supabaseClient";
import { IExpression } from "@/lib/interface";

export const fetchExpressions = async (
  episode: number
): Promise<IExpression[]> => {
  const { data, error } = await supabase
    .from("expressions")
    .select("*")
    .eq("episode", episode)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching expressions:", error);
    return [];
  }

  return data as IExpression[];
};
