import { motion } from "framer-motion";
import styles from "./TextAnimation.module.css";

export default function TextAnimation({
  text,
  delayFactor = 0.1,
  startDelay = 0,
  fontSize = "3rem",
  color = "white",
}: {
  text: string;
  delayFactor?: number;
  startDelay?: number;
  fontSize?: string;
  color?: string;
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
          style={{ fontSize }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
