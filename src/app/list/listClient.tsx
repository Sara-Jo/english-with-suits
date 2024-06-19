"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IEpisode } from "@/lib/interface";
import Image from "next/image";

export default function ListClient({ episodes }: { episodes: IEpisode[] }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Season 1</h1>
      <div className={styles.list}>
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className={styles.card}
            onClick={() => router.push(`list/${episode.episode}`)}
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
              <p className={styles.episodeDescription}>{episode.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
