import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { fetchEpisode } from "@/lib/fetchEpisode";
import styles from "./page.module.css";

export default async function Episode({
  params,
}: {
  params: { episode: number };
}) {
  const episode = await fetchEpisode(params.episode);
  if (!episode) {
    return <p>Episode not found.</p>;
  }
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
      <div className={styles.main}>
        <h1 className={styles.episodeTitle}>
          Episode {episode.episode}: {episode.title}
        </h1>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imageWrapper}>
              <Image
                src={episode.image_url}
                alt={episode.title}
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className={styles.image}
              />
            </div>
            <p className={styles.episodeDescription}>{episode.description}</p>
          </div>
          <div className={styles.right}>
            <Link href={`${episode.episode}/script`}>
              <p className={styles.element}>📄 전체 스크립트 보기</p>
            </Link>
            <Link href={`${episode.episode}/expressions`}>
              <p className={styles.element}>✍️ 주요 표현 공부하기</p>
            </Link>
            <Link href={`${episode.episode}/quiz`}>
              <p className={styles.element}>💯 Quiz</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
