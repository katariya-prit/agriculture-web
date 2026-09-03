// components/commen/Header.tsx
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import ProfileMenu from "../components/commen/ProfileMenu";
interface Props {
    isOpen: boolean;
    toggleSidebar: () => void;
}
export default function Header({ isOpen, toggleSidebar }: Props) {
    return (
        <div className="w-full flex items-center justify-between gap-3 relative">
            <div className="flex items-center gap-3 relative">
                <div className="relative hidden sm:flex items-end h-14 md:h-16 -mb-1 pointer-events-none select-none">
                    <svg
                        width="90"
                        height="56"
                        viewBox="0 0 90 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse cx="45" cy="52" rx="42" ry="4" fill="#15803d" opacity="0.15" />
                        {[
                            { x: 8, h: 30, c: "#16a34a", delay: 0 },
                            { x: 16, h: 40, c: "#15803d", delay: 0.15 },
                            { x: 24, h: 24, c: "#22c55e", delay: 0.3 },
                            { x: 32, h: 36, c: "#16a34a", delay: 0.1 },
                            { x: 40, h: 46, c: "#15803d", delay: 0.25 },
                            { x: 48, h: 28, c: "#22c55e", delay: 0.05 },
                            { x: 56, h: 38, c: "#16a34a", delay: 0.2 },
                            { x: 64, h: 22, c: "#15803d", delay: 0.35 },
                            { x: 72, h: 32, c: "#22c55e", delay: 0.15 },
                            { x: 80, h: 26, c: "#16a34a", delay: 0.3 },
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
                {!isOpen && (
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleSidebar}
                        className="md:hidden w-11 h-11 rounded-xl bg-linear-to-br from-green-600 to-emerald-700 text-white flex items-center justify-center shadow-lg shadow-green-900/20 shrink-0"
                    >
                        <HiMenuAlt2 size={22} />
                    </motion.button>
                )}
            </div>
            <ProfileMenu />
        </div>
    );
}