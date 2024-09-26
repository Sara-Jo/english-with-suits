"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "./auth/supabaseProvider";
import Loading from "./_components/Loading";
import ConfirmModal from "./_components/ConfirmModal";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import TextAnimation from "./_components/TextAnimation";
import { animate, motion, useAnimation, useMotionValue } from "framer-motion";
import ImageCard from "./_components/ImageCard";
import useMeasure from "react-use-measure";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { user, loading, signOut } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const buttonControls = useAnimation();

  let [ref1, { height: height1 }] = useMeasure();
  let [ref2, { height: height2 }] = useMeasure();
  const yTranslation1 = useMotionValue(0);
  const yTranslation2 = useMotionValue(0);

  const images1 = [
    "/image/home/S1/1.jpg",
    "/image/home/S1/2.jpg",
    "/image/home/S1/3.jpg",
    "/image/home/S1/4.jpg",
    "/image/home/S1/5.jpg",
    "/image/home/S1/6.jpg",
    "/image/home/S1/7.jpg",
    "/image/home/S1/8.jpg",
    "/image/home/S1/9.jpg",
    "/image/home/S1/10.jpg",
    "/image/home/S1/11.jpg",
    "/image/home/S1/12.jpg",
  ];

  const images2 = [
    "/image/home/S2/1.jpg",
    "/image/home/S2/2.jpg",
    "/image/home/S2/3.jpg",
    "/image/home/S2/4.jpg",
    "/image/home/S2/5.jpg",
    "/image/home/S2/6.jpg",
    "/image/home/S2/7.jpg",
    "/image/home/S2/8.jpg",
    "/image/home/S2/9.jpg",
    "/image/home/S2/10.jpg",
    "/image/home/S2/11.jpg",
    "/image/home/S2/12.jpg",
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    setLogoutLoading(true);
    await signOut();
    setLogoutLoading(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  });

  useEffect(() => {
    let controls;
    let finalPosition1 = -height1 / 2 - 8;

    controls = animate(yTranslation1, [0, finalPosition1], {
      ease: "linear",
      duration: 24,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [yTranslation1, height1]);

  useEffect(() => {
    let controls;
    let finalPosition2 = -height2 / 2 - 8;

    controls = animate(yTranslation2, [0, finalPosition2], {
      ease: "linear",
      duration: 24,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [yTranslation2, height2]);

  useEffect(() => {
    if (isAnimationComplete) {
      buttonControls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: {
          opacity: { duration: 0.5, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        },
      });
    }
  }, [isAnimationComplete, buttonControls]);

  if (loading || logoutLoading) {
    return <Loading />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.menuWrapper}>
          {user ? (
            <>
              <Link href="/mypage" className={styles.loginButton}>
                My Page
              </Link>
              <p onClick={handleLogoutClick} className={styles.loginButton}>
                Logout
              </p>
            </>
          ) : (
            <Link href="/login" scroll={false}>
              <p className={styles.loginButton}>Sign in</p>
            </Link>
          )}
        </div>
        <div className={styles.titleWrapper}>
          <TextAnimation text="English with" />
          <TextAnimation
            text="Suits"
            delayFactor={0.15}
            startDelay={1.2}
            fontSize="5rem"
            color="var(--red)"
            onAnimationComplete={() => setIsAnimationComplete(true)}
          />
          <motion.div
            onClick={() => router.push("/list")}
            className={styles.startButton}
            animate={buttonControls}
            initial={{ opacity: 0, y: 20 }}
          >
            <DoubleArrowRoundedIcon fontSize="large" />
            <p className={styles.startButtonText}>START</p>
          </motion.div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <motion.div
          className={`${styles.imageContainer} ${styles.imageContainerFirst}`}
          ref={ref1}
          style={{ y: yTranslation1 }}
        >
          {[...images1, ...images1].map((item, idx) => (
            <ImageCard image={item} key={idx} />
          ))}
        </motion.div>

        <motion.div
          className={`${styles.imageContainer} ${styles.imageContainerSecond}`}
          ref={ref2}
          style={{ y: yTranslation2 }}
        >
          {[...images2, ...images2].map((item, idx) => (
            <ImageCard image={item} key={idx} />
          ))}
        </motion.div>
      </div>

      {showLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠어요?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </main>
  );
}
