"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

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

  const showPrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prev: number) => prev - 1);
  };

  const showNextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber((prev: number) => prev + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.downloadButtonWrapper}>
        <div className={styles.downloadButton} onClick={() => downloadPdf()}>
          <p className={styles.downloadText}>스크립트 다운로드</p>
          <CloudDownloadIcon fontSize="medium" />
        </div>
      </div>

      <div className={styles.pageNumWrapper}>
        <div
          className={`${styles.pageButtonWrapper} ${
            pageNumber === 1 ? "disabled" : ""
          }`}
          onClick={showPrevPage}
        >
          이전 페이지
          <div className={styles.prevPageButton}>
            <ArrowCircleLeftRoundedIcon fontSize="medium" />
          </div>
        </div>
        <p className={styles.pageNum}>
          {pageNumber} / {numPages}
        </p>
        <div
          className={`${styles.pageButtonWrapper} ${
            pageNumber === numPages ? "disabled" : ""
          }`}
          onClick={showNextPage}
        >
          <div className={styles.nextPageButton}>
            <ArrowCircleRightRoundedIcon fontSize="medium" />
          </div>
          다음 페이지
        </div>
      </div>

      <div>
        <Document
          file={`/scripts/E${params.episode}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
