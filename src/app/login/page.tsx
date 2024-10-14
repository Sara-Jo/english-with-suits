"use client";

import Loading from "../_components/Loading/Loading";
import Login from "../_components/login";
import useNoAuth from "../auth/useNoAuth";
import styles from "./page.module.css";

function Page() {
  const { user, loading } = useNoAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

export default Page;
