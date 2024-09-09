"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./layout.module.css";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <div onClick={() => router.back()} className={styles.backButton}>
        <ArrowBackIosIcon fontSize="large" />
      </div>
      {children}
    </section>
  );
}
