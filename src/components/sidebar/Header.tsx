import React from "react";
import { Link } from "react-router-dom";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "../../hooks/darkmode";

const logo = require("../../assets/assets/logo.svg").default;
const LogoWhite = require("../../assets/assets/logoWhite.svg").default;

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => setTheme(!theme);

  return (
    <div className="flex items-center dark:bg-zinc-800">
      <div className="flex items-center justify-between h-[70px] fixed z-50 top-0 border-b border-gray-400 w-screen bg-gray-300 dark:bg-dark-bg">
        <Logo theme={theme} />
        <div className="flex items-center mr-4">
          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
          <SignUpLink />
        </div>
      </div>
    </div>
  );
};

const Logo: React.FC<{ theme: boolean }> = ({ theme }) => (
  <Link to="/" className="flex items-center">
    <img
      className={`cursor-pointer mx-2 ${theme ? 'fill-[blue]' : ''}`}
      src={theme ? logo : LogoWhite}
      alt={theme ? "logo" : "logoWhite"}
      style={theme ? { fill: '#333' } : {}}
    />
    <h1 className="sm-text-1xl mr-12 font-bold font-lexend text-primary md:hidden dark:text-green">
      PULSE
    </h1>
  </Link>
);

const ThemeToggle: React.FC<{ theme: boolean; onToggle: () => void }> = ({ theme, onToggle }) => (
  <div
    className="mx-4 dark:text-zinc-100 rounded-full px-2 text-xl cursor-pointer flex items-center w-9 h-9"
    onClick={onToggle}
  >
    {theme ? (
      <MoonIcon className="w-8" />
    ) : (
      <SunIcon className="w-8 text-dark-text-fill" />
    )}
  </div>
);

const SignUpLink: React.FC = () => (
  <Link to="/signup">
    <span className="flex items-center font-bold text-primary dark:text-white">
      SignUp
    </span>
  </Link>
);