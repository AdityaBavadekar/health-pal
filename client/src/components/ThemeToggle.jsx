import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-14 h-8 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors"
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md"
                animate={{
                    x: isDark ? 20 : -20,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <MoonIcon className="h-3 w-3 text-primary-foreground" />
                ) : (
                    <SunIcon className="h-3 w-3 text-primary-foreground" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
