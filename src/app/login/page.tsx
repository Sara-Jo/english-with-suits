"use client";

import Login from "../_components/Login";
import withNoAuth from "../auth/withNoAuth";
import styles from "./page.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

export default withNoAuth(Page);
