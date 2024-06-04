"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import supabase from "@/app/auth/supabaseClient";
import Loading from "@/app/_components/Loading";
import Image from "next/image";
import { IEpisode } from "@/lib/interface";

export default function Episode({ params }: { params: { episode: number } }) {
  const router = useRouter();
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("episode", params.episode)
        .single();

      if (error) {
        console.error("Error fetching episode:", error);
      } else {
        setEpisode(data);
        setIsLoading(false);
      }
    };

    fetchEpisodeData();
  }, [params.episode]);

  if (isLoading) {
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
  }

  if (!episode) {
    return <p>Episode not found.</p>;
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.episodeTitle}>
        Episode {params.episode}: {episode.title}
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
            onClick={() => router.push(`${params.episode}/script`)}
          >
            📄 전체 스크립트 보기
          </p>
          <p
            className={styles.element}
            onClick={() => router.push(`${params.episode}/expressions`)}
          >
            ✍️ 주요 표현 공부하기
          </p>
          <p
            className={styles.element}
            onClick={() => router.push(`${params.episode}/quiz`)}
          >
            💯 Quiz
          </p>
        </div>
      </div>
    </div>
  );
}
