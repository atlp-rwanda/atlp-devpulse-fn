import React from "react";

interface DropdownButtonProps {
  label: string;
  isOpen: boolean;
  toggle: () => void;
  theme: boolean;
  ariaLabel: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  isOpen,
  toggle,
  theme,
  ariaLabel,
}) => {
  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center px-3 py-2 border rounded transition-colors focus:outline-none ${
        theme ? "bg-gray-200 border-gray-300" : "bg-gray-800 border-gray-600"
      }`}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
    >
      <span>{label}</span>
      <span
        className={`ml-2 transform transition-transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        ▼
      </span>
    </button>
  );
};

export default DropdownButton;
