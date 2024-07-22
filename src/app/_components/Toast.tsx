import React, { useEffect } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
