import React, { useState, useEffect } from "react";
import "./CustomToast.css";

interface CustomToastProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

export const Toasty = ({ message, type, onClose }: CustomToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastClasses = `custom-toast ${type} ${visible ? "visible" : "hidden"}`;

  return (
    <div className={toastClasses}>
      <div className="toast-content">{message}</div>
    </div>
  );
};
