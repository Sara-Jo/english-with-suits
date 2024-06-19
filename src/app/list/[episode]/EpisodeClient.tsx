"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import { IEpisode } from "@/lib/interface";

export default function EspisodeClient({ episode }: { episode: IEpisode }) {
  const router = useRouter();

  if (!episode) {
    return <p>Episode not found.</p>;
  }

  return (
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
          <p
            className={styles.element}
            onClick={() => router.push(`${episode.episode}/script`)}
          >
            📄 전체 스크립트 보기
          </p>
          <p
            className={styles.element}
            onClick={() => router.push(`${episode.episode}/expressions`)}
          >
            ✍️ 주요 표현 공부하기
          </p>
          <p
            className={styles.element}
            onClick={() => router.push(`${episode.episode}/quiz`)}
          >
            💯 Quiz
          </p>
        </div>
      </div>
    </div>
  );
}
