import { createContext, ReactElement, useContext, useEffect, useState, SetStateAction } from "react";

interface ThemeContextProps {
  children: ReactElement;
}

type ThemeContextData = {
  theme: boolean;
  setTheme: React.Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext({} as ThemeContextData )

// result.matches==true?localStorage.theme === 'dark':localStorage.theme === 'light'
export function ThemeContextProvider({ children }: ThemeContextProps) {
 const result = window.matchMedia('(prefers-color-scheme: dark)');
  console.log(result.matches);
  const [theme, setTheme] = useState(() => localStorage.theme === 'light')
  console.log(theme,"iiiiiii")
  useEffect(() => {
    const rootElement = window.document.documentElement
    const currentTheme = theme
    
    const prevTheme = currentTheme ? 'dark' : 'light'
    rootElement.classList.remove(prevTheme)
    
    const nextTheme = currentTheme ? 'light' : 'dark'
    rootElement.classList.add(nextTheme)

    localStorage.setItem('theme', nextTheme)
  }, [theme])


  return (
    <ThemeContext.Provider value={{ theme, setTheme }} >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)