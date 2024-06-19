import { fetchExpressions } from "@/lib/fetchExpressions";
import QuizClient from "./QuizClient";
import { fetchEpisodesData } from "@/lib/fetchEpisodeData";

export async function generateStaticParams() {
  const episode = await fetchEpisodesData();
  return episode.map((episode) => ({
    episode: episode.episode.toString(),
  }));
}

export default async function Expressions({
  params,
}: {
  params: { episode: number };
}) {
  const expressions = await fetchExpressions(params.episode);

  return <QuizClient expressions={expressions} />;
}
