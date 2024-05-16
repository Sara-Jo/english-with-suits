"use client";

import { Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

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

  const speakExpression = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices()[1];
    utterance.text = currentExpression.en;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={styles.main}>
      <div className={styles.index}>
        {currentIndex + 1} / {expLength}
      </div>

      <div onClick={speakExpression} className={styles.speakButton}>
        <VolumeUpRoundedIcon fontSize="large" />
      </div>

      <div className={styles.upperWrapper}>
        <div className={styles.expressionWrapper}>
          <p className={styles.en}>{currentExpression.en}</p>
          <p className={styles.ko}>{currentExpression.ko}</p>
        </div>

        {currentExpression.ex && (
          <div className={styles.exWrapper}>
            <p className={styles.exTitle}>💬 Ex</p>
            <p>{currentExpression.ex}</p>
          </div>
        )}
      </div>
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
