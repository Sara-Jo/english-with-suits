"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Link from "next/link";
import supabase from "@/app/auth/supabaseClient";
import { Expression, User } from "@/lib/interface";
import Loading from "@/app/_components/Loading";
import { fetchExpressions } from "@/lib/fetchExpressions";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthContext } from "@/app/auth/supabaseProvider";
import { useRouter } from "next/navigation";

export default function Expressions({
  params,
}: {
  params: { episode: number };
}) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Expression[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] = useState<Expression | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [exLink, setExLink] = useState<string>("");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        const fetchedUser = await fetchUserData(user.id);
        setUserData(fetchedUser);
      }
    };
    fetchUser();
  }, [user]);

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
    if (data.length > 0) {
      setCurrentExpression(data[currentIndex]);
    }
  }, [currentIndex, data]);

  useEffect(() => {
    const baseUrl = "https://youglish.com/pronounce/";
    const language = "english";
    const encodedExpression = encodeURIComponent(currentExpression?.en || "");
    const url = `${baseUrl}${encodedExpression}/${language}?`;
    setExLink(url);

    if (userData && currentExpression) {
      setIsBookmarked(userData.bookmarks.includes(currentExpression.id));
    }
  }, [currentExpression, userData]);

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
    if (currentIndex === data.length - 1) return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const speakExpression = async () => {
    if (voices.length > 0) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.voice = await speechSynthesis.getVoices()[1];
      utterance.text = currentExpression?.en || "";
      speechSynthesis.speak(utterance);
    } else {
      console.log("No voices available.");
    }
  };

  const handleBookmarkClick = async () => {
    if (!userData) {
      router.push("/login");
    }

    if (userData && currentExpression) {
      const updatedUser = { ...userData };
      if (!updatedUser.bookmarks) {
        updatedUser.bookmarks = [];
      }

      if (isBookmarked) {
        updatedUser.bookmarks = updatedUser.bookmarks.filter(
          (id) => id !== currentExpression.id
        );
      } else {
        updatedUser.bookmarks.push(currentExpression.id);
      }

      await supabase.from("users").upsert(updatedUser);
      setUserData(updatedUser);
      setIsBookmarked(!isBookmarked);
    }
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
      <div className={styles.upperWrapper}>
        <div></div>
        <div className={styles.index}>
          {currentIndex + 1} / {data.length || 0}
        </div>
        <div
          onClick={handleBookmarkClick}
          className={styles.bookmarkButtonWrapper}
        >
          {isBookmarked ? (
            <BookmarkRoundedIcon fontSize="large" />
          ) : (
            <BookmarkBorderRoundedIcon fontSize="large" />
          )}

          <p className={styles.bookmarkButtontext}>Bookmark</p>
        </div>
      </div>

      <div onClick={speakExpression} className={styles.speakButton}>
        <VolumeUpRoundedIcon fontSize="large" />
      </div>

      <div className={styles.lowerWrapper}>
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
            <p className="en">{currentExpression?.en}</p>
            <p className="ko">{currentExpression?.ko}</p>
          </div>

          {currentExpression?.ex && (
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
