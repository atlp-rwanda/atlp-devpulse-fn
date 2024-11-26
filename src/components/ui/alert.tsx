import React from 'react';

type AlertProps = {
  message?: string; // Optional message prop
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  children?: React.ReactNode; // Optional children prop to allow custom content inside the alert
  className?: string; // Optional className for custom styling
};

const Alert: React.FC<AlertProps> = ({ message, type, onClose, children, className }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return '';
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-lg shadow-md ${getAlertStyles()} ${className}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {children && <div>{children}</div>} {/* Render children if passed */}
        <button
          onClick={onClose}
          className="text-xl font-bold text-opacity-70 hover:text-opacity-100"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
