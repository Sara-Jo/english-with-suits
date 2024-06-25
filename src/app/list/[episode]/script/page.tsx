"use client";

import styles from "./page.module.css";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf";
import { useEffect, useState, useRef } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Script({ params }: { params: { episode: number } }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfWidth, setPdfWidth] = useState<number>(600);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartPage, setDragStartPage] = useState<number>(1);
  const pdfViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 640 ? window.innerWidth * 0.9 : 600;
      setPdfWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    startDrag(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    continueDrag(event.clientX);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startDrag(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    continueDrag(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  const startDrag = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartPage(pageNumber);
  };

  const continueDrag = (clientX: number) => {
    if (!isDragging) return;

    const dragDistance = dragStartX - clientX;
    const pagesMoved = Math.round(dragDistance / 100);
    const changedPage = dragStartPage + pagesMoved;

    if (changedPage < 1) setPageNumber(1);
    else if (numPages && changedPage > numPages) setPageNumber(numPages);
    else setPageNumber(changedPage);
  };

  const endDrag = () => {
    setIsDragging(false);
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

      <div
        className={styles.pdfViewer}
        ref={pdfViewerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Document
          file={`/scripts/E${params.episode}.pdf`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={true}
            width={pdfWidth}
          />
        </Document>
      </div>
    </div>
  );
}
