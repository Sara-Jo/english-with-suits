import Head from "next/head";
import EspisodeClient from "./EpisodeClient";
import { fetchEpisode } from "@/lib/fetchEpisode";

export default async function Episode({
  params,
}: {
  params: { episode: number };
}) {
  const episode = await fetchEpisode(params.episode);

  return (
    <>
      <Head>
        <title>English with Suits: Season 1 Episode {params.episode}</title>
        <meta
          name="description"
          content="Learn business English with English with Suits"
        />
        <meta
          name="keywords"
          content="English with Suits, Suits, 미드영어, 비즈니스영어, 슈츠, 슈츠영어"
        />
      </Head>
      <EspisodeClient episode={episode} />
    </>
  );
}
