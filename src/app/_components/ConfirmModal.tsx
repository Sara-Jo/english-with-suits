import React from "react";
import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
