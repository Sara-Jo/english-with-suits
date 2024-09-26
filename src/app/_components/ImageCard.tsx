import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image }: { image: string }) {
  return (
    <motion.div className={styles.container}>
      <Image
        src={image}
        alt={image}
        fill
        style={{ objectFit: "cover" }}
      ></Image>
    </motion.div>
  );
}
