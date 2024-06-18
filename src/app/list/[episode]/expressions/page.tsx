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
import { IExpression, IUser } from "@/lib/interface";
import Loading from "@/app/_components/Loading";
import { fetchExpressions } from "@/lib/fetchExpressions";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthContext } from "@/app/auth/supabaseProvider";
import { useRouter } from "next/navigation";
import { fetchEpisodesData } from "@/lib/fetchEpisodeData";

export async function generateStaticParams() {
  const episode = await fetchEpisodesData();
  return episode.map((episode) => ({
    episode: episode.episode.toString(),
  }));
}

export const generateMetadata = (currentExpression: IExpression | null) => {
  const expression = currentExpression?.en || "English With Suits";

  return {
    expression,
  };
};

export default function Expressions({
  params,
}: {
  params: { episode: number };
}) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IExpression[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] =
    useState<IExpression | null>(null);
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
      let availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length === 0) {
        speechSynthesis.addEventListener("voiceschanged", () => {
          availableVoices = speechSynthesis.getVoices();
          setVoices(availableVoices);
        });
      } else {
        setVoices(availableVoices);
      }
    };

    loadVoices();

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

  const speakExpression = () => {
    if (voices.length > 0) {
      const utterance = new SpeechSynthesisUtterance();
      const preferredVoice =
        voices.find((voice) => voice.lang === "en-US") || voices[0];
      utterance.voice = preferredVoice;
      utterance.text = currentExpression?.en || "";
      speechSynthesis.speak(utterance);
    } else {
      console.log("No voices available.");
    }
  };

  const handleBookmarkClick = async () => {
    if (!userData) {
      router.push("/login", { scroll: false });
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
          <div
            className={`prevNextButtonSmall ${
              currentIndex === 0 ? "disabled" : "active"
            }`}
            onClick={showPrevExpression}
          >
            <ArrowCircleLeftRoundedIcon sx={{ fontSize: 30 }} />
          </div>
          {currentIndex + 1} / {data.length || 0}
          <div
            className={`prevNextButtonSmall ${
              currentIndex === data.length - 1 ? "disabled" : "active"
            }`}
            onClick={showNextExpression}
          >
            <ArrowCircleRightRoundedIcon sx={{ fontSize: 30 }} />
          </div>
        </div>
        <div
          onClick={handleBookmarkClick}
          className={styles.bookmarkButtonWrapper}
        >
          {isBookmarked ? (
            <BookmarkRoundedIcon
              className={styles.bookmarkIcon}
              fontSize="large"
            />
          ) : (
            <BookmarkBorderRoundedIcon
              className={styles.bookmarkIcon}
              fontSize="large"
            />
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
