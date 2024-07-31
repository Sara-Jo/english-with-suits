import ExpressionClient from "./ExpressionClient";
import { fetchExpressions } from "@/lib/fetchExpressions";
import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";
import Head from "next/head";

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
  const firstExpression = expressions[0];

  return (
    <>
      <Head>
        <title>English with Suits: {firstExpression.en}</title>
        <meta name="description" content={firstExpression.ko} />
        <meta
          name="keywords"
          content="English with Suits, Suits, 미드영어, 비즈니스영어, 슈츠, 슈츠영어"
        />
      </Head>
      <ExpressionClient expressions={expressions} />
    </>
  );
}
