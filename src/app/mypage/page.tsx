"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/supabaseProvider";
import withAuth from "../auth/withAuth";
import styles from "./page.module.css";

function MyPage() {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      My Page<p>Welcome, {user?.email}</p>
    </div>
  );
}

export default withAuth(MyPage);
