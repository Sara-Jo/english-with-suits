"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { IEpisode } from "@/lib/interface";
import Image from "next/image";
import Loading from "../_components/Loading";
import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";

export default function List() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEpisodeData = async () => {
      const episodesData = await fetchAllEpisodes();
      setEpisodes(episodesData);
      setIsLoading(false);
    };

    getEpisodeData();
  }, []);

  if (isLoading) {
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
  }

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
