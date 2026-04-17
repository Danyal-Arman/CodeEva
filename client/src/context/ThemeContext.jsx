import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = useCallback(() => {
    const theme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}