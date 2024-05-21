import styles from "./page.module.css";
import Login from "@/app/_components/login";

export default function Page() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Login />
      </div>
    </div>
  );
}
