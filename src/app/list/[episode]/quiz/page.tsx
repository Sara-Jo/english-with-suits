"use client";

import { EnKo, Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface Word {
  text: string;
  isSelected: boolean;
}

export default function Expressions() {
  const data: Expression = expressions[0];
  const expLength = data.expressions.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] = useState<EnKo>(
    data.expressions[currentIndex]
  );
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  useEffect(() => {
    const trimmedStr: string = currentExpression.en
      .replace(/[.,?!~]/g, "")
      .trim();
    const wordList = trimmedStr.split(" ");
    setWords(
      shuffleArray(wordList).map((w: string) => ({
        text: w,
        isSelected: false,
      }))
    );

    const initialSelectedWords: string[] = wordList.map(() => "_");
    setSelectedWords(initialSelectedWords);
  }, [currentExpression]);

  useEffect(() => {
    setCurrentExpression(data.expressions[currentIndex]);
  }, [currentIndex, data]);

  useEffect(() => {
    if (showPopUp) {
      const timeoutId = setTimeout(() => {
        setShowPopUp(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showPopUp]);

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const onClickWord = (word: Word) => {
    if (word.isSelected) return;

    const index = selectedWords.indexOf("_");

    if (index !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[index] = word.text;
      setSelectedWords(newSelectedWords);
      word.isSelected = true;
    }

    if (index === selectedWords.length - 1) setShowPopUp(true);
  };

  const onClickResetButton = () => {
    setSelectedWords((prev) => prev.map((w) => "_"));
    setWords((prev) => prev.map((w) => ({ ...w, isSelected: false })));
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
            {currentExpression.en.match(/[\w']+|[.,?!~]/g)?.map((word, i) =>
              [".", ",", "?", "!", "~"].includes(word) ? (
                <div className={styles.punctuation} key={i}>
                  {word}
                </div>
              ) : selectedWords[i] === "_" ? (
                <div className={styles.blank} key={i}></div>
              ) : (
                <div className={styles.selectedWord} key={i}>
                  {selectedWords[i]}
                </div>
              )
            )}
          </div>
          <p className={styles.ko}>{currentExpression.ko}</p>

          {showPopUp && <div className={styles.greenCircle}></div>}
        </div>

        {currentExpression.ex && (
          <div className={styles.exWrapper}>
            <p className={styles.exTitle}>💬 Ex</p>
            <p>{currentExpression.ex}</p>
          </div>
        )}

        <div className={styles.wordsWrapper}>
          {words.map((word, i) => (
            <div
              onClick={() => onClickWord(word)}
              className={styles.word}
              key={i}
            >
              {word.text}
            </div>
          ))}
          <div onClick={onClickResetButton} className={styles.resetButton}>
            <RestartAltIcon fontSize="large" />
          </div>
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
