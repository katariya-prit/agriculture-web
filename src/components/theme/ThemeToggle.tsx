import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      type="button"
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none shrink-0 ${isDark
          ? "bg-[#272727] text-amber-400 border border-zinc-800 hover:bg-[#383838]"
          : "bg-[#eef2f5] text-green-800 border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/50"
        }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={18} className="animate-spin-slow text-amber-400" />
      ) : (
        <Moon size={18} className="text-green-800" />
      )}
    </motion.button>
  );
}