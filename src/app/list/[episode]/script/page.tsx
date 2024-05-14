"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

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

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className={styles.main}>
      <div
        className={styles.downloadButtonWrapper}
        onClick={() => downloadPdf()}
      >
        <p className={styles.downloadText}>스크립트 다운로드</p>
        <div>
          <CloudDownloadIcon fontSize="large" />
        </div>
      </div>

      <div onClick={() => setPageNumber((prev: number) => prev - 1)}>prev</div>
      <div onClick={() => setPageNumber((prev: number) => prev + 1)}>next</div>

      <div>
        <Document file="/scripts/E1.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
}
