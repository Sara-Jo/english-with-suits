import { IExpression } from "@/lib/interface";
import { fetchEpisodesData } from "@/lib/fetchEpisodeData";
import ExpressionClient from "./ExpressionClient";
import { fetchExpressions } from "@/lib/fetchExpressions";

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

  return <ExpressionClient expressions={expressions} />;
}
