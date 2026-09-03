// components/Sidebar/Sidebar.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Sidebar/Navbar";
import Sidebarhead from "../components/Sidebar/Sidebar-head";

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

    function handleNavigate() {
        if (isMobile) setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                />
            )}

            <motion.div
                animate={{ width: isOpen ? 300 : 98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`h-full flex flex-col items-center gap-4 p-3 fixed md:relative top-0 left-0 z-40 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                } transition-transform duration-300 ease-in-out`}
            >
                <Sidebarhead isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

                <div className="w-full h-full rounded-2xl flex flex-col items-start p-2 inset bg-white">
                    <Navbar isOpen={isOpen} onNavigate={handleNavigate} />
                </div>
            </motion.div>
        </>
    );
}