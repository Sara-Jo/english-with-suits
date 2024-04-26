import styles from "./page.module.css";

export default function List() {
  return (
    <main className={styles.main}>
      <h1>Season 1</h1>
      <div className={styles.list}>
        <p className={styles.episode}>Episode 1: Pilot Part 1 & 2</p>
        <p className={styles.episode}>Episode 2: Errors and Omissions</p>
        <p className={styles.episode}>Episode 3: Inside Track</p>
        <p className={styles.episode}>Episode 4: Dirty Little Secrets</p>
        <p className={styles.episode}>Episode 5: Bail Out</p>
        <p className={styles.episode}>Episode 6: Tricks of the Trade</p>
        <p className={styles.episode}>Episode 7: Play the Man</p>
        <p className={styles.episode}>Episode 8: Identity Crisis</p>
        <p className={styles.episode}>Episode 9: Undefeated</p>
        <p className={styles.episode}>Episode 10: The Shelf Life</p>
        <p className={styles.episode}>Episode 11: Rules of the Game</p>
        <p className={styles.episode}>Episode 12: Dog Fight</p>
      </div>
    </main>
  );
}
