"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { episodeData } from "@/db/episodes";

export default function Episode({ params }: { params: { episode: number } }) {
  const router = useRouter();
  const episodeTitle = episodeData[params.episode - 1].title;

  return (
    <div className={styles.main}>
      <p className={styles.episodeTitle}>
        Episode {params.episode}: {episodeTitle}
      </p>
      <p className={styles.element}>📄 전체 스크립트 보기</p>
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
  );
}
