// components/Sidebar/Sidebar-head.tsx
import { motion } from "motion/react";
import Logo from "../commen/Logo";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

interface Props {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebarhead({ isOpen, toggleSidebar }: Props) {
    return (
        <div className="w-full h-16 flex items-center justify-between gap-2 px-1">
            {isOpen && (
                <div className="flex-1 min-w-0 overflow-hidden">
                    <Logo />
                </div>
            )}

            <motion.button
                type="button"
                onClick={toggleSidebar}
                whileTap={{ scale: 0.92 }}
                className={`shrink-0 w-11 h-11 rounded-xl border border-white/30 cursor-pointer flex justify-center items-center text-green-700 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 ${
                    !isOpen ? "mx-auto" : ""
                }`}
            >
                <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <VscLayoutSidebarLeftDock size={20} />
                </motion.div>
            </motion.button>
        </div>
    );
}