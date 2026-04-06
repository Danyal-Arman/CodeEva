import { createContext, useContext, useEffect, useState } from "react";


const myThemeContext = createContext();

const themeProvider = ({ children }) => {


    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light")

    const toggleTheme = () => {

        const theme = currentTheme === "dark" ? "light" : "dark"
        setCurrentTheme(theme)
        localStorage.setItem("theme", theme)

    }
    useEffect(() => {
            document.documentElement.classList.toggle("dark", currentTheme === "dark")
        
    }, [currentTheme])

    return (
        <myThemeContext.Provider value={{currentTheme, toggleTheme}}>
            {children}
        </myThemeContext.Provider>
    );
}

export default themeProvider;

export function useTheme(){
     return useContext(myThemeContext)
}