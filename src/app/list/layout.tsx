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
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
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
          <div onClick={() => router.push("/")} className={styles.homeButton}>
            <HomeOutlinedIcon fontSize="large" />
          </div>
        </div>
        <div className={styles.loginButtonWrapper}>
          <ThemeToggle />
          {user ? (
            <>
              <p
                onClick={() => router.push("/mypage")}
                className={styles.loginButton}
              >
                My Page
              </p>
              <p onClick={handleLogoutClick} className={styles.loginButton}>
                Logout
              </p>
            </>
          ) : (
            <p
              onClick={() => router.push("/login", { scroll: false })}
              className={styles.loginButton}
            >
              Sign in
            </p>
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
