"use client";

import { Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import Link from "next/link";

export default function Expressions() {
  const data: Expression = expressions[0];
  const expLength = data.expressions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExpression, setCurrentExpression] = useState(
    data.expressions[currentIndex]
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [exLink, setExLink] = useState<string>("");

  useEffect(() => {
    setCurrentExpression(data.expressions[currentIndex]);
  }, [currentIndex, data]);

  useEffect(() => {
    const baseUrl = "https://youglish.com/pronounce/";
    const language = "english";
    const encodedExpression = encodeURIComponent(currentExpression.en);
    const url = `${baseUrl}${encodedExpression}/${language}?`;
    setExLink(url);
  }, [currentExpression]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const showPrevExpression = () => {
    if (currentIndex === 0) return;

    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const showNextExpression = () => {
    if (currentIndex === expLength - 1) return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const speakExpression = async () => {
    if (voices.length > 0) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.voice = await speechSynthesis.getVoices()[1];
      utterance.text = currentExpression.en;
      speechSynthesis.speak(utterance);
    } else {
      console.log("No voices available.");
    }
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
            <div className={styles.exLinkWrapper}>
              <div className={styles.exLinkIcon}>
                <LaunchRoundedIcon fontSize="medium" />
              </div>
              <Link href={exLink} target="_blank">
                <p className={styles.exLinkText}>다른 예문 확인하기</p>
              </Link>
            </div>
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
