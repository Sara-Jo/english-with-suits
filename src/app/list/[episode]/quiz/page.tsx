"use client";

import { EnKo, Expression, expressions } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

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
  const [answer, setAnswer] = useState<string[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  useEffect(() => {
    const trimmedStr: string = currentExpression.en
      .replace(/[.,?!~]/g, "")
      .trim();
    const wordList = trimmedStr.split(" ");
    setAnswer([...wordList]);
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
    console.log(selectedWords);
    if (
      selectedWords.length &&
      selectedWords[selectedWords.length - 1] !== "_"
    ) {
      setIsCorrect(true);
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] !== selectedWords[i]) {
          setIsCorrect(false);
          break;
        }
      }
      setShowPopUp(true);
    }
  }, [selectedWords, answer]);

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
  };

  const onClickResetButton = () => {
    setSelectedWords((prev) => prev.map((w) => "_"));
    setWords((prev) => prev.map((w) => ({ ...w, isSelected: false })));
    setShowPopUp(false);
  };

  const showPrevExpression = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setShowPopUp(false);
  };

  const showNextExpression = () => {
    if (currentIndex === expLength - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setShowPopUp(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.index}>
        {currentIndex + 1} / {expLength}
      </div>
      <div className={styles.upperWrapper}>
        <div
          className={`${styles.prevNextButton} ${
            currentIndex === 0 ? styles.disabled : ""
          }`}
          onClick={showPrevExpression}
        >
          <ArrowCircleLeftRoundedIcon fontSize="large" />
        </div>
        <div>
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

            {showPopUp && isCorrect ? (
              <div className={styles.greenCircle}></div>
            ) : showPopUp && !isCorrect ? (
              <div className={styles.xSign}></div>
            ) : (
              ""
            )}
          </div>

          {currentExpression.ex && (
            <div className={styles.exWrapper}>
              <p className={styles.exTitle}>💬 Ex</p>
              <p>{currentExpression.ex}</p>
            </div>
          )}

          <div className={styles.wordsWrapper}>
            <div className={styles.words}>
              {words.map((word, i) => (
                <div
                  onClick={() => onClickWord(word)}
                  className={`${styles.word} ${
                    word.isSelected ? styles.disabled : ""
                  }`}
                  key={i}
                >
                  {word.text}
                </div>
              ))}
            </div>
            <div onClick={onClickResetButton} className={styles.resetButton}>
              <RestartAltIcon fontSize="large" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.prevNextButton} ${
            currentIndex === expLength - 1 ? styles.disabled : ""
          }`}
          onClick={showNextExpression}
        >
          <ArrowCircleRightRoundedIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}
