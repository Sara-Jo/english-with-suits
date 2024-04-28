"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Episode, episodeData } from "@/db/episodes";

export default function List() {
  const router = useRouter();
  const episodes: Episode[] = episodeData;

  return (
    <div className={styles.container}>
      <h1>Season 1</h1>
      <div className={styles.list}>
        {episodes.map((episode) => (
          <p
            key={episode.index}
            onClick={() => router.push(`list/${episode.index}`)}
            className={styles.episode}
          >
            Episode {episode.index}: {episode.title}
          </p>
        ))}
      </div>
    </div>
  );
}
