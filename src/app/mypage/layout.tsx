"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./layout.module.css";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/supabaseProvider";
import Loading from "../_components/Loading";
import { useState } from "react";
import ConfirmModal from "../_components/ConfirmModal";

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { signOut, loading } = useAuthContext();
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
    router.replace("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (loading || logoutLoading) {
    return (
      <div className={styles.loadingMain}>
        <Loading />
      </div>
    );
  }

  return (
    <section>
      <div className={styles.container}>
        <div onClick={() => router.back()} className={styles.backButton}>
          <ArrowBackIosIcon fontSize="large" />
        </div>
        <div className={styles.loginButtonWrapper}>
          <p onClick={handleLogoutClick} className={styles.loginButton}>
            Logout
          </p>
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
