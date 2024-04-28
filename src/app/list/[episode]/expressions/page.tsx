"use client";

import { Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Expressions() {
  const data: Expression = expressions[0];
  const expLength = data.expressions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExpression, setCurrentExpression] = useState(
    data.expressions[currentIndex]
  );

  useEffect(() => {
    setCurrentExpression(data.expressions[currentIndex]);
  }, [currentIndex, data]);

  const showPrevExpression = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const showNextExpression = () => {
    if (currentIndex === expLength - 1) return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.index}>
        {currentIndex + 1} / {expLength}
      </div>
      <p className={styles.en}>{currentExpression.en}</p>
      <p className={styles.ko}>{currentExpression.ko}</p>
      <div className={styles.buttonWrapper}>
        <div className={styles.prevNextButton} onClick={showPrevExpression}>
          PREV
        </div>
        <div className={styles.prevNextButton} onClick={showNextExpression}>
          NEXT
        </div>
      </div>
    </div>
  );
}
