"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./layout.module.css";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/supabaseProvider";
import Loading from "../_components/Loading";

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, signOut, loading } = useAuthContext();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  if (loading) {
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
          {user ? (
            <>
              <p className={styles.loginButton}>My Page</p>
              <p onClick={handleLogout} className={styles.loginButton}>
                Logout
              </p>
            </>
          ) : (
            <p
              onClick={() => router.push("/login")}
              className={styles.loginButton}
            >
              Log in
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
