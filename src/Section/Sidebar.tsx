import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Sidebar/Navbar";
import Sidebarhead from "../components/Sidebar/Sidebar-head";
import { useTheme } from "../components/theme/ThemeContext";

interface Props {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

function useIsMobile(breakpointPx = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < breakpointPx : false
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpointPx);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpointPx]);

    return isMobile;
}

export default function Sidebar({ isOpen, setIsOpen }: Props) {
    const isMobile = useIsMobile();
    const { theme } = useTheme();
    const isdark = theme === "dark";

    function handleNavigate() {
        if (isMobile) setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                />
            )}

            <motion.div
                animate={{ width: isOpen ? 300 : 98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`h-full flex flex-col items-center px-3 fixed md:relative top-0 left-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    } transition-transform duration-300 ease-in-out ${isdark ? "bg-[#0f0f0f]" : "bg-[#eef2f5]"
                    }`}
            >
                <Sidebarhead isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

                <div
                    className={`w-full flex-1 min-h-0 rounded-2xl flex flex-col items-start p-2 border transition-colors duration-300 ${isdark
                            ? "bg-[#181818] border-zinc-800 text-white"
                            : "bg-[#eef2f5] border-white/80 shadow-[inset_3px_3px_6px_#c5c9cc,inset_-3px_-3px_6px_#ffffff]"
                        }`}
                >
                    <Navbar isOpen={isOpen} onNavigate={handleNavigate} />
                </div>
            </motion.div>
        </>
    );
}