"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Episode } from "@/lib/interface";
import supabase from "../auth/supabaseClient";
import Image from "next/image";

export default function List() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      const { data, error } = await supabase.from("episodes").select("*");

      if (error) {
        console.error("Error fetching episodes:", error);
      } else {
        setEpisodes(data);
      }
    };

    fetchEpisodesData();
  }, []);

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
                width={300}
                height={150}
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
