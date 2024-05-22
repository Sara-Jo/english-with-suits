"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Login from "@/app/_components/login";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.closeButtonWrapper}>
          <div
            onClick={() => {
              router.back();
            }}
            className={styles.closeButton}
          >
            <CloseRoundedIcon />
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}
