"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "./auth/supabaseProvider";
import Loading from "./_components/Loading";
import ConfirmModal from "./_components/ConfirmModal";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import TextAnimation from "./_components/TextAnimation";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const buttonControls = useAnimation();

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

  useEffect(() => {
    if (isAnimationComplete) {
      buttonControls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: {
          opacity: { duration: 0.5, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        },
      });
    }
  }, [isAnimationComplete, buttonControls]);

  if (loading || logoutLoading) {
    return <Loading />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.upperWrapper}>
        {user ? (
          <>
            <Link href="/mypage" className={styles.loginButton}>
              My Page
            </Link>
            <p onClick={handleLogoutClick} className={styles.loginButton}>
              Logout
            </p>
          </>
        ) : (
          <Link href="/login" scroll={false}>
            <p className={styles.loginButton}>Sign in</p>
          </Link>
        )}
      </div>
      <div className={styles.body}>
        <TextAnimation text="English with" />
        <TextAnimation
          text="Suits"
          delayFactor={0.15}
          startDelay={1.2}
          fontSize="5rem"
          color="var(--red)"
          onAnimationComplete={() => setIsAnimationComplete(true)}
        />

        <motion.div
          onClick={() => router.push("/list")}
          className={styles.startButton}
          animate={buttonControls}
          initial={{ opacity: 0, y: 20 }}
        >
          <DoubleArrowRoundedIcon fontSize="large" />
          <p className={styles.startButtonText}>START</p>
        </motion.div>
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
