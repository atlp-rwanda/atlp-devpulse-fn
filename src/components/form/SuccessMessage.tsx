
import React from "react";

interface SuccessMessageProps {
  onNavigate: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onNavigate }) => (
  <div className="text-center">
    <p className="text-green-500 dark:text-green-400 mb-4">
      Your password has been successfully changed!
    </p>
    <button
      onClick={onNavigate}
      className="py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none"
    >
      Go to Login
    </button>
  </div>
);