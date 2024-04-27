import styles from "./page.module.css";

export default function Episode({ params }: { params: { episode: number } }) {
  return (
    <div className={styles.main}>
      <p className={styles.element}>📄 전체 스크립트 보기</p>
      <p className={styles.element}>✍️ 주요 표현 공부하기</p>
      <p className={styles.element}>💯 Quiz</p>
    </div>
  );
}
