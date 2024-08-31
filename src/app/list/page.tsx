import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";
import styles from "./page.module.css";

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
      <div className={styles.container}>
        <h1 className={styles.title}>Season 1</h1>
        <div className={styles.list}>
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`list/${episode.episode}`}
              className={styles.card}
            >
              <div className={styles.imagePlaceholder}>
                <Image
                  src={episode.image_url}
                  alt={episode.title}
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.episodeTitle}>
                  Episode {episode.episode}: {episode.title}
                </h2>
                <p className={styles.episodeDescription}>
                  {episode.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
