"use client";

import { EnKo } from "@/db/expressions";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { Expression } from "@/interface/expression";
import { fetchExpressions } from "@/lib/fetchExpressions";
import Loading from "@/app/_components/Loading";

interface Word {
  text: string;
  isSelected: boolean;
}

const getInitialSelectedWords = (answer: string[]): string[] => {
  return answer.map((word) =>
    [".", ",", "?", "!", "~"].includes(word) ? word : "_"
  );
};

export default function Expressions({
  params,
}: {
  params: { episode: number };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Expression[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] = useState<Expression | null>(
    null
  );
  const [answer, setAnswer] = useState<string[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const expressions = await fetchExpressions(params.episode);
      setData(expressions);
      setCurrentExpression(expressions[0]);
      setIsLoading(false);
    };

    fetchData();
  }, [params.episode]);

  useEffect(() => {
    const trimmedStr: string =
      currentExpression?.en.replace(/[.,?!~]/g, "").trim() ?? "";
    const wordList = trimmedStr.split(" ");
    const answer = currentExpression?.en.match(/[\w']+|[.,?!~]/g) ?? [];
    setAnswer(answer);
    setWords(
      shuffleArray(wordList).map((w: string) => ({
        text: w,
        isSelected: false,
      }))
    );

    setSelectedWords(getInitialSelectedWords(answer));
  }, [currentExpression]);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentExpression(data[currentIndex]);
    }
  }, [currentIndex, data]);

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
    if (currentIndex === data.length - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setShowPopUp(false);
  };

  if (isLoading) {
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.index}>
        {currentIndex + 1} / {data.length}
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
            <p className="ko">{currentExpression?.ko}</p>

            {showPopUp && isCorrect ? (
              <div className={styles.greenCircle}></div>
            ) : showPopUp && !isCorrect ? (
              <div className={styles.xSign}></div>
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
            currentIndex === data.length - 1 ? "disabled" : "active"
          }`}
          onClick={showNextExpression}
        >
          <ArrowCircleRightRoundedIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}
