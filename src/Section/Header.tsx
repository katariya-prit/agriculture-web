import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import ProfileMenu from "../components/commen/ProfileMenu";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useTheme } from "../components/theme/ThemeContext";

interface Props {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Header({ isOpen, toggleSidebar }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <header className="w-full flex items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-3">
                {!isOpen && (
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleSidebar}
                        className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${isdark
                                ? "bg-[#272727] text-green-400 border border-zinc-800 hover:bg-[#383838]"
                                : "bg-[#eef2f5] text-green-800 border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/50"
                            }`}
                        aria-label="Toggle Sidebar"
                    >
                        <HiMenuAlt2 size={22} />
                    </motion.button>
                )}

                <div className="relative hidden sm:flex items-center h-12 md:h-14 pointer-events-none">
                    <svg
                        width="90"
                        height="56"
                        viewBox="0 0 90 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-auto h-full"
                    >
                        <ellipse
                            cx="45"
                            cy="52"
                            rx="42"
                            ry="4"
                            fill={isdark ? "#166534" : "#15803d"}
                            opacity="0.15"
                        />
                        {[
                            { x: 8, h: 30, c: isdark ? "#4ade80" : "#16a34a", delay: 0 },
                            { x: 16, h: 40, c: isdark ? "#22c55e" : "#15803d", delay: 0.15 },
                            { x: 24, h: 24, c: isdark ? "#86efac" : "#22c55e", delay: 0.3 },
                            { x: 32, h: 36, c: isdark ? "#4ade80" : "#16a34a", delay: 0.1 },
                            { x: 40, h: 46, c: isdark ? "#22c55e" : "#15803d", delay: 0.25 },
                            { x: 48, h: 28, c: isdark ? "#86efac" : "#22c55e", delay: 0.05 },
                            { x: 56, h: 38, c: isdark ? "#4ade80" : "#16a34a", delay: 0.2 },
                            { x: 64, h: 22, c: isdark ? "#22c55e" : "#15803d", delay: 0.35 },
                            { x: 72, h: 32, c: isdark ? "#86efac" : "#22c55e", delay: 0.15 },
                            { x: 80, h: 26, c: isdark ? "#4ade80" : "#16a34a", delay: 0.3 },
                        ].map((blade, i) => (
                            <motion.path
                                key={i}
                                d={`M${blade.x},52 Q${blade.x - 3},${52 - blade.h / 2} ${blade.x},${52 - blade.h}`}
                                stroke={blade.c}
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                style={{ transformOrigin: `${blade.x}px 52px` }}
                                animate={{ rotate: [-6, 6, -6] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: blade.delay,
                                }}
                            />
                        ))}
                    </svg>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <ProfileMenu />
            </div>
        </header>
    );
}