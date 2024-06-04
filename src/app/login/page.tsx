import Login from "../_components/Login";
import withoutAuth from "../auth/withoutAuth";
import styles from "./page.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

// export default withoutAuth(Page);
export default Page;
