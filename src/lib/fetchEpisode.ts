import supabase from "@/app/auth/supabaseClient";
import { IEpisode } from "./interface";

export const fetchEpisode = async (
  episode: number
): Promise<IEpisode | null> => {
  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("episode", episode)
    .single();

  if (error) {
    console.error("Error fetching episode:", error);
    return null;
  }

  return data as IEpisode;
};
