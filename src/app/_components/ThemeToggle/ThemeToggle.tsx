import { useTheme } from "../../ThemeContext";
import styles from "./ThemeToggle.module.css";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleContainer} onClick={toggleTheme}>
      <DarkModeRoundedIcon className={styles.icon} fontSize="small" />
      <WbSunnyRoundedIcon className={styles.icon} fontSize="small" />

      <div
        className={`${styles.toggleButton} ${
          theme === "dark" ? styles.dark : ""
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
