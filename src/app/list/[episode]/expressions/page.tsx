import ExpressionClient from "./ExpressionClient";
import { fetchExpressions } from "@/lib/fetchExpressions";
import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";

export async function generateStaticParams() {
  const episode = await fetchAllEpisodes();
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

  return <ExpressionClient expressions={expressions} />;
}
