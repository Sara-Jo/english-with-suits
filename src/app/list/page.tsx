"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function List() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div onClick={() => router.back()} className={styles.backButton}>
        <ArrowBackIosIcon fontSize="large" />
      </div>
      <div className={styles.container}>
        <h1>Season 1</h1>
        <div className={styles.list}>
          <p onClick={() => router.push("1")} className={styles.episode}>
            Episode 1: Pilot Part 1 & 2
          </p>
          <p onClick={() => router.push("2")} className={styles.episode}>
            Episode 2: Errors and Omissions
          </p>
          <p onClick={() => router.push("3")} className={styles.episode}>
            Episode 3: Inside Track
          </p>
          <p onClick={() => router.push("4")} className={styles.episode}>
            Episode 4: Dirty Little Secrets
          </p>
          <p onClick={() => router.push("5")} className={styles.episode}>
            Episode 5: Bail Out
          </p>
          <p onClick={() => router.push("6")} className={styles.episode}>
            Episode 6: Tricks of the Trade
          </p>
          <p onClick={() => router.push("7")} className={styles.episode}>
            Episode 7: Play the Man
          </p>
          <p onClick={() => router.push("8")} className={styles.episode}>
            Episode 8: Identity Crisis
          </p>
          <p onClick={() => router.push("9")} className={styles.episode}>
            Episode 9: Undefeated
          </p>
          <p onClick={() => router.push("10")} className={styles.episode}>
            Episode 10: The Shelf Life
          </p>
          <p onClick={() => router.push("11")} className={styles.episode}>
            Episode 11: Rules of the Game
          </p>
          <p onClick={() => router.push("12")} className={styles.episode}>
            Episode 12: Dog Fight
          </p>
        </div>
      </div>
    </main>
  );
}
