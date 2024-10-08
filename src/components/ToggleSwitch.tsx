import React from "react";

interface ToggleSwitchProps {
  isEnabled: boolean;
  toggle: () => void;
  theme: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, toggle, theme }) => {
  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors focus:outline-none ${
        isEnabled ? "bg-gray-700" : "bg-gray-700"
      }`}
      aria-pressed={isEnabled}
      aria-label="Toggle"
    >
      <span
        className={`transform transition-transform inline-block w-5 h-5 rounded-full ${
          isEnabled ? "bg-green bg-opacity-90 translate-x-6" : "bg-white bg-opacity-80 translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
