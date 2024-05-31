"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import supabase from "@/app/auth/supabaseClient";
import Loading from "@/app/_components/Loading";

export default function Episode({ params }: { params: { episode: number } }) {
  const router = useRouter();
  const [episodeTitle, setEpisodeTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEpisodeTitle = async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("title")
        .eq("episode", params.episode);

      if (error) {
        console.error("Error fetching episodes:", error);
      } else {
        setEpisodeTitle(data[0].title);
        setIsLoading(false);
      }
    };

    fetchEpisodeTitle();
  }, [params.episode]);

  if (isLoading) {
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.episodeTitle}>
        Episode {params.episode}: {episodeTitle}
      </h1>
      <div className={styles.links}>
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
  );
}
