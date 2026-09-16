import { motion } from "framer-motion";
import Logo from "../commen/Logo";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebarhead({ isOpen, toggleSidebar }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between gap-2 px-1 shrink-0">
            {isOpen && (
                <div className="flex-1 min-w-0 overflow-hidden">
                    <Logo />
                </div>
            )}

            <motion.button
                type="button"
                onClick={toggleSidebar}
                whileTap={{ scale: 0.92 }}
                className={`shrink-0 w-11 h-11 rounded-2xl border cursor-pointer flex justify-center items-center transition-all duration-300 ${
                    isdark
                        ? "border-zinc-800 text-green-400 bg-[#272727] hover:bg-[#383838] active:bg-[#1f1f1f]"
                        : "border-white/60 text-green-700 bg-[#eef2f5] shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#c5c9cc,inset_-2px_-2px_4px_#ffffff]"
                } ${!isOpen ? "mx-auto" : ""}`}
            >
                <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <VscLayoutSidebarLeftDock size={20} />
                </motion.div>
            </motion.button>
        </div>
    );
}