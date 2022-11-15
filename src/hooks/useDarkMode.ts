import { useEffect, useState } from 'react';

const getInitialState = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs) return storedPrefs;
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) return 'dark';
    return 'light';
  }
  return 'light';
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(getInitialState);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme]);

  return [colorTheme, setTheme] as const;
};

export default useDarkMode;
