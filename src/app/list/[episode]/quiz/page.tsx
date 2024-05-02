"use client";

import { EnKo, Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Expressions() {
  const data: Expression = expressions[0];
  const expLength = data.expressions.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] = useState<EnKo>(
    data.expressions[currentIndex]
  );
  const [words, setWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    const trimmedStr: string = currentExpression.en.replace(/[.,?]/g, "");
    const wordList = trimmedStr.split(" ");
    setWords(shuffleArray(wordList));

    const initialSelectedWords: string[] = wordList.map(() => "_");
    setSelectedWords(initialSelectedWords);
  }, [currentExpression]);

  useEffect(() => {
    setCurrentExpression(data.expressions[currentIndex]);
  }, [currentIndex, data]);

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
      <div className={styles.upperWrapper}>
        <div className={styles.expressionWrapper}>
          <div className={styles.blankWrapper}>
            {currentExpression.en.match(/[\w']+|[.,?!]/g)?.map((word, i) =>
              [".", ",", "?", "!"].includes(word) ? (
                <div className={styles.punctuation} key={i}>
                  {word}
                </div>
              ) : selectedWords[i] === "_" ? (
                <div className={styles.blank} key={i}></div>
              ) : (
                <div>{selectedWords[i]}</div>
              )
            )}
          </div>
          <p className={styles.ko}>{currentExpression.ko}</p>
        </div>

        {currentExpression.ex && (
          <div className={styles.exWrapper}>
            <p className={styles.exTitle}>💬 Ex</p>
            <p>{currentExpression.ex}</p>
          </div>
        )}

        <div className={styles.wordsWrapper}>
          {words.map((word, i) => (
            <div className={styles.word} key={i}>
              {word}
            </div>
          ))}
        </div>
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
