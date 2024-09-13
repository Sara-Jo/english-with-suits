"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import styles from "./layout.module.css";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/supabaseProvider";
import Loading from "../_components/Loading";
import { useState } from "react";
import ConfirmModal from "../_components/ConfirmModal";
import ThemeToggle from "../_components/ThemeToggle";
import Link from "next/link";

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, signOut, loading } = useAuthContext();
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

  if (loading || logoutLoading) {
    return <Loading />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.routeButtonWrapper}>
          <div onClick={() => router.back()} className={styles.backButton}>
            <ArrowBackIosIcon
              className={styles.backButtonIcon}
              fontSize="large"
            />
          </div>
          <Link href="/" className={styles.homeButton}>
            <HomeOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.loginButtonWrapper}>
          <ThemeToggle />
          {user ? (
            <>
              <Link href="/mypage" scroll className={styles.loginButton}>
                My Page
              </Link>
              <p onClick={handleLogoutClick} className={styles.loginButton}>
                Logout
              </p>
            </>
          ) : (
            <Link href="/login" scroll={false} className={styles.loginButton}>
              Sign in
            </Link>
          )}
        </div>
      </div>
      {children}

      {showLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠어요?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </section>
  );
}
