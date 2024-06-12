"use client";

import Login from "../_components/login";
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
