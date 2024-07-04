"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { IExpression } from "@/lib/interface";

interface Word {
  text: string;
  isSelected: boolean;
}

const punctuations = [".", ",", "?", "!", "~"];

const getInitialSelectedWords = (answer: string[]): string[] => {
  return answer.map((word) => (punctuations.includes(word) ? word : "_"));
};

export default function QuizClient({
  expressions,
}: {
  expressions: IExpression[];
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] =
    useState<IExpression | null>(expressions[0]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [words, setWords] = useState<Word[]>([]); // 단어 선택지 리스트
  const [selectedWords, setSelectedWords] = useState<string[]>([]); // 현재까지 완성된 문장
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  useEffect(() => {
    const trimmedStr: string =
      currentExpression?.en.replace(/[.,?!~]/g, "").trim() ?? "";
    const wordList = trimmedStr.split(" ");
    const answerArr = currentExpression?.en.match(/[\w'-]+|[.,?!~]/g) ?? [];

    setAnswer(answerArr);
    setWords(
      shuffleArray(wordList).map((w: string) => ({
        text: w,
        isSelected: false,
      }))
    );

    setSelectedWords(getInitialSelectedWords(answerArr));
  }, [currentExpression]);

  useEffect(() => {
    if (expressions.length > 0) {
      setCurrentExpression(expressions[currentIndex]);
    }
  }, [currentIndex, expressions]);

  useEffect(() => {
    if (selectedWords.length && !selectedWords.includes("_")) {
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
    setSelectedWords(getInitialSelectedWords(answer));
    setWords((prev) => prev.map((w) => ({ ...w, isSelected: false })));
    setShowPopUp(false);
  };

  const showPrevExpression = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setShowPopUp(false);
  };

  const showNextExpression = () => {
    if (currentIndex === expressions.length - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setShowPopUp(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.index}>
        <div
          className={`prevNextButtonSmall ${
            currentIndex === 0 ? "disabled" : "active"
          }`}
          onClick={showPrevExpression}
        >
          <ArrowCircleLeftRoundedIcon sx={{ fontSize: 30 }} />
        </div>
        {currentIndex + 1} / {expressions.length}
        <div
          className={`prevNextButtonSmall ${
            currentIndex === expressions.length - 1 ? "disabled" : "active"
          }`}
          onClick={showNextExpression}
        >
          <ArrowCircleRightRoundedIcon sx={{ fontSize: 30 }} />
        </div>
      </div>
      <div className={styles.upperWrapper}>
        <div
          className={`prevNextButton ${
            currentIndex === 0 ? "disabled" : "active"
          }`}
          onClick={showPrevExpression}
        >
          <ArrowCircleLeftRoundedIcon fontSize="large" />
        </div>
        <div>
          <div className={styles.expressionWrapper}>
            <div className={styles.blankWrapper}>
              {answer.map((word, i) =>
                punctuations.includes(word) ? (
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
            <p className="ko">{currentExpression?.ko}</p>

            {showPopUp && isCorrect ? (
              <div className={styles.correctPopup}>
                <p className={styles.correctText}>Correct Answer!</p>
                <div className={styles.greenCircle}>
                  <CheckRoundedIcon
                    className={styles.correctIcon}
                    sx={{ color: "green", fontSize: 100 }}
                  />
                </div>
              </div>
            ) : showPopUp && !isCorrect ? (
              <div className={styles.incorrectPopup}>
                <p className={styles.incorrectText}>Incorrect Answer!</p>
                <div className={styles.xSign}>
                  <ClearRoundedIcon
                    className={styles.incorrectIcon}
                    sx={{ color: "red", fontSize: 100 }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.wordsWrapper}>
            <div className={styles.words}>
              {words.map((word, i) => (
                <div
                  onClick={() => onClickWord(word)}
                  className={`${styles.word} ${
                    word.isSelected ? "disabled" : ""
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
          className={`prevNextButton ${
            currentIndex === expressions.length - 1 ? "disabled" : "active"
          }`}
          onClick={showNextExpression}
        >
          <ArrowCircleRightRoundedIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}
