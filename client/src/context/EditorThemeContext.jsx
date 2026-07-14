import { createContext, useContext, useEffect, useState, useCallback } from "react";

const EditorThemeContext = createContext();

const EditorThemeProvider = ({ children }) => {
  const [editorTheme, setEditorTheme] = useState(() => {
    return localStorage.getItem("editor-theme") || "light";
  });

  const toggleTheme = useCallback(() => {
    const theme = editorTheme === "dark" ? "light" : "dark";
    setEditorTheme(theme);
    localStorage.setItem("editor-theme", theme);
  }, [editorTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", editorTheme === "dark");
  }, [editorTheme]);

  return (
    <EditorThemeContext.Provider value={{ editorTheme, toggleTheme }}>
      {children}
    </EditorThemeContext.Provider>
  );
};

export default EditorThemeProvider;

export function useEditorTheme() {
  return useContext(EditorThemeContext);
}