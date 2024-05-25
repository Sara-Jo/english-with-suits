"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "./auth/supabaseProvider";
import Loading from "./_components/Loading";
import ConfirmModal from "./_components/ConfirmModal";

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    setLogoutLoading(true);
    await signOut();
    setLogoutLoading(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  });

  if (loading || logoutLoading) {
    return (
      <div className={styles.loadingMain}>
        <Loading />
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.upperWrapper}>
        {user ? (
          <p onClick={handleLogoutClick} className={styles.loginButton}>
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

      {showLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠어요?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </main>
  );
}
