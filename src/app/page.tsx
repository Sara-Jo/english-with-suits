"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.upperWrapper}>
        <p className={styles.loginButton}>Sign in</p>
        <Link href="/login">
          <p className={styles.loginButton}>Login</p>
        </Link>
      </div>
      <div className={styles.body}>
        <h1>English With Suits</h1>
        <div
          onClick={() => router.push("/list")}
          className={styles.startButton}
        >
          START
        </div>
      </div>
    </main>
  );
}
