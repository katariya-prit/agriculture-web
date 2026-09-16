import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useTheme } from "../../components/theme/ThemeContext";

export default function Layout() {
    const [isOpen, setIsOpen] = useState(true);

    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <div className={`w-screen h-screen select-none flex relative overflow-hidden transition-colors duration-300 ${isdark ? 'bg-[#0f0f0f] text-white' : 'bg-[#eef2f5] text-gray-900'}`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className={`flex flex-col w-full h-full min-w-0 transition-colors duration-300 ${isdark ? 'bg-[#0f0f0f] text-white' : 'bg-[#eef2f5] text-gray-900'}`}>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`w-full h-16 md:h-20 flex items-center px-4 md:px-6 gap-3 ${isdark ? 'bg-[#0f0f0f] text-white' : 'bg-[#eef2f5]  text-gray-900'
                        }`}
                >
                    <Header isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
                </motion.div>

                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className={`relative w-full flex-1 min-h-0 rounded-3xl overflow-hidden border transition-all duration-300 ${isdark
                            ? 'bg-[#212121] border-zinc-800 text-white shadow-xl'
                            : 'bg-[#eef2f5] border-white/80 text-gray-900 shadow-[inset_3px_3px_6px_#c5c9cc,inset_-3px_-3px_6px_#ffffff]'
                        }`}
                >
                    <div className="w-full h-full overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <AnimatePresence mode="wait">
                            <Outlet />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}