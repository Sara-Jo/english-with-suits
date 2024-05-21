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
        <p className={styles.loginButton}>Login</p>
      </div>
      <div className={styles.body}>
        <h1>English With Suits</h1>
        {/* <Link href="/list"> */}
        <div
          onClick={() => router.push("/list")}
          className={styles.startButton}
        >
          START
        </div>
        {/* </Link> */}
      </div>
    </main>
  );
}
