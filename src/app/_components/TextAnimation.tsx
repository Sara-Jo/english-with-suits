import { motion } from "framer-motion";
import styles from "./TextAnimation.module.css";

export default function TextAnimation({
  text,
  delayFactor = 0.1,
  startDelay = 0,
  color = "white",
  onAnimationComplete = () => {},
}: {
  text: string;
  delayFactor?: number;
  startDelay?: number;
  color?: string;
  onAnimationComplete?: () => void;
}) {
  const letters = text.split("");

  const variants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: startDelay + i * delayFactor,
        type: "spring",
        stiffness: 100,
        onComplete: () => {
          if (i === letters.length - 1) {
            onAnimationComplete();
          }
        },
      },
    }),
  };

  return (
    <div
      className={`${styles.textContainer} ${styles.responsiveText}`}
      style={{ color }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={styles.letter}
          variants={variants}
          initial="initial"
          animate="animate"
          custom={index}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
