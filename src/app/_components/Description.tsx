"use client";

import { useState } from "react";
import styles from "./Description.module.css";

export default function Description({ description }: { description: string }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={styles.container}>
      <p className={showFullDescription ? styles.full : styles.truncated}>
        {description}
      </p>
      {!showFullDescription && (
        <span
          className={styles.moreButton}
          onClick={() => setShowFullDescription(true)}
        >
          Show more
        </span>
      )}
    </div>
  );
}
