import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Cek preferensi sistem
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        return localStorage.getItem("theme") === "dark" || prefersDarkMode;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;
