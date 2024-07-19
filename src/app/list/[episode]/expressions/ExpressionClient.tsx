"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Link from "next/link";
import supabase from "@/app/auth/supabaseClient";
import { IExpression, IUser } from "@/lib/interface";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthContext } from "@/app/auth/supabaseProvider";
import { useRouter } from "next/navigation";

const preferredVoices = ["Aaron", "Google US English", "Samantha", "Reed"];

export default function ExpressionClient({
  expressions,
}: {
  expressions: IExpression[];
}) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentExpression, setCurrentExpression] =
    useState<IExpression | null>(expressions[0]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [exLink, setExLink] = useState<string>("");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
    if (expressions.length > 0) {
      setCurrentExpression(expressions[currentIndex]);
    }
  }, [currentIndex, expressions]);

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
          const enUsVoices = availableVoices.filter(
            (voice) => voice.lang === "en-US"
          );
          setVoices(enUsVoices);
          if (enUsVoices.length > 0) {
            setInitialVoice(enUsVoices);
          }
        });
      } else {
        const enUsVoices = availableVoices.filter(
          (voice) => voice.lang === "en-US"
        );
        setVoices(enUsVoices);
        if (enUsVoices.length > 0) {
          setInitialVoice(enUsVoices);
        }
      }
    };

    const setInitialVoice = (enUsVoices: SpeechSynthesisVoice[]) => {
      for (const voiceName of preferredVoices) {
        const voice = enUsVoices.find((v) => v.name.includes(voiceName));
        if (voice) {
          setSelectedVoice(voice);
          return;
        }
      }
      setSelectedVoice(enUsVoices[0]);
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
    if (currentIndex === expressions.length - 1) return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const speakExpression = () => {
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.voice = selectedVoice;
      utterance.text = currentExpression?.en || "";
      speechSynthesis.speak(utterance);
    } else {
      console.log("No voices available.");
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    const voice = voices.find((v) => v.name === voiceName);
    setSelectedVoice(voice || null);
    setIsDropdownOpen(false);
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
          {currentIndex + 1} / {expressions.length || 0}
          <div
            className={`prevNextButtonSmall ${
              currentIndex === expressions.length - 1 ? "disabled" : "active"
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

      <div className={styles.speakButton}>
        <div onClick={speakExpression}>
          <VolumeUpRoundedIcon fontSize="large" />
        </div>
        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <ArrowDropDownRoundedIcon fontSize="large" />
        </div>
        {isDropdownOpen && (
          <div className={styles.voiceOptions}>
            {voices.map((voice) => (
              <div
                key={voice.name}
                className={`${styles.voiceOption} ${
                  voice.name === selectedVoice?.name ? styles.selectedVoice : ""
                }`}
                onClick={() => handleVoiceChange(voice.name)}
              >
                {voice.name}
                {voice.name === selectedVoice?.name && (
                  <DoneRoundedIcon
                    className={styles.checkIcon}
                    fontSize="small"
                  />
                )}
              </div>
            ))}
          </div>
        )}
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
