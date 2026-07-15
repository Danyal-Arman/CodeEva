import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "codeeva-appearance-theme";

const ThemeContext = createContext(null);

function systemPref() {
  if (typeof window === "undefined") return "dark";

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function apply(resolved) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  root.classList.add("theme-transition");

  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");

  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 320);
}

export function AppearanceProvider({ children }) {
  const [mode, setModeState] = useState("system");
  const [resolved, setResolved] = useState("dark");

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY) || "system";

    setModeState(stored);

    const current =
      stored === "system"
        ? systemPref()
        : stored;

    setResolved(current);

    apply(current);

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    const handleChange = () => {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved || saved === "system") {
        const next = mediaQuery.matches
          ? "light"
          : "dark";

        setResolved(next);

        apply(next);
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  const setMode = (nextMode) => {
    localStorage.setItem(
      STORAGE_KEY,
      nextMode
    );

    setModeState(nextMode);

    const current =
      nextMode === "system"
        ? systemPref()
        : nextMode;

    setResolved(current);

    apply(current);
  };

  const value = useMemo(
    () => ({
      mode,
      resolved,
      setMode,
    }),
    [mode, resolved]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useAppearance must be used inside AppearanceProvider"
    );
  }

  return context;
}

export const themeInitScript = `
(function(){
  try{
    var k='${STORAGE_KEY}';
    var m=localStorage.getItem(k)||'system';
    var r=m==='system'
      ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : m;

    var c=document.documentElement.classList;

    c.toggle('dark', r==='dark');
    c.toggle('light', r==='light');

  }catch(e){
    document.documentElement.classList.add('dark');
  }
})();
`;