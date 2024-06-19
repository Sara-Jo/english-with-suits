import supabase from "@/app/auth/supabaseClient";
import EspisodeClient from "./EpisodeClient";
import { IEpisode } from "@/lib/interface";

export default async function Episode({
  params,
}: {
  params: { episode: number };
}) {
  const { data: episode } = await supabase
    .from("episodes")
    .select("*")
    .eq("episode", params.episode)
    .single();

  return <EspisodeClient episode={episode} />;
}
