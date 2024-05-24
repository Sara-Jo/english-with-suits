"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      const session = await supabase.auth.getSession();
      if (session.data.session !== null) {
        setIsLoggedIn(true);
        router.replace("/");
      }
    };
    getUser();
  }, [supabase]);

  return (
    <main className={styles.main}>
      <div className={styles.upperWrapper}>
        {isLoggedIn ? (
          <p onClick={logout} className={styles.loginButton}>
            Logout
          </p>
        ) : (
          <Link href="/login">
            <p className={styles.loginButton}>Sign in</p>
          </Link>
        )}
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
