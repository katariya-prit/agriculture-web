import { motion } from "motion/react";
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
                className={`shrink-0 w-11 h-11 rounded-xl border cursor-pointer flex justify-center items-center backdrop-blur-sm shadow-sm transition-all duration-200 ${
                    isdark
                        ? "border-gray-700 text-green-300 bg-gray-900/90 hover:bg-gray-800 hover:shadow-md hover:shadow-black/30"
                        : "border-white/30 text-green-700 bg-white/90 hover:bg-white hover:shadow-md"
                } ${!isOpen ? "mx-auto" : ""}`}
            >
                <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <VscLayoutSidebarLeftDock size={20} />
                </motion.div>
            </motion.button>
        </div>
    );
}