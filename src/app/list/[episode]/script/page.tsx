"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function Script({ params }: { params: { episode: number } }) {
  const router = useRouter();

  const downloadPdf = () => {
    const filePath = `/scripts/E${params.episode}.pdf`;

    const link = document.createElement("a");
    link.href = filePath;
    link.target = "_blank";
    link.download = `Suits E${params.episode} script.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className={styles.main}>
      <div className={styles.downloadButton} onClick={() => downloadPdf()}>
        <CloudDownloadIcon fontSize="large" />
      </div>
    </div>
  );
}
