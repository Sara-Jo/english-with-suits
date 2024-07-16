import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";
import ListClient from "./listClient";
import Head from "next/head";

export default async function List() {
  const episodes = await fetchAllEpisodes();

  return (
    <>
      <Head>
        <title>English with Suits: Season 1</title>
        <meta
          name="description"
          content="Learn business English with English with Suits"
        />
        <meta
          name="keywords"
          content="English with Suits, Season 1, Suits, 미드영어, 슈츠, 슈츠영어"
        />
      </Head>
      <ListClient episodes={episodes} />
    </>
  );
}
