import supabase from "@/app/auth/supabaseClient";
import EspisodeClient from "./EpisodeClient";
import { fetchEpisode } from "@/lib/fetchEpisode";

export default async function Episode({
  params,
}: {
  params: { episode: number };
}) {
  const episode = await fetchEpisode(params.episode);

  return <EspisodeClient episode={episode} />;
}
