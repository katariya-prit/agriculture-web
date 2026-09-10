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
        <div className={`w-screen h-screen select-none flex relative overflow-hidden ${isdark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className={`flex flex-col w-full h-full min-w-0 ${isdark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`w-full h-16 md:h-20 flex items-center px-4 md:px-6 gap-3 ${isdark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-green-100 text-gray-900'}`}
                >
                    <Header isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className={`relative w-full flex-1 min-h-0 scroll rounded-3xl overflow-auto p-4 md:p-6 border ${isdark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-green-50/40 border-green-100 text-gray-900'}`}
                >
                    <AnimatePresence mode="wait">
                        <Outlet />
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}