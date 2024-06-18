import supabase from "@/app/auth/supabaseClient";
import { IEpisode } from "./interface";

export const fetchEpisodesData = async (): Promise<IEpisode[]> => {
  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }

  return data;
};
