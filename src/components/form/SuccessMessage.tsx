import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SuccessMessageProps {
  message: string;
  onNavigate: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onNavigate }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="text-center">
      <p className="text-xl font-bold text-green-600 dark:text-gray-300">{message}</p>
      <p className="mt-2 text-gray-200 dark:text-gray-300">
        Redirecting to login in 3 seconds...
      </p>
    </div>
  );
};
