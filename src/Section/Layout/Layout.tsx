// Layout/Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Sidebar";
import Header from "../Header";
// import NatureBackground from "../../components/commen/background";

export default function Layout() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-screen h-screen select-none flex relative bg-linear-to-bl from-green-800 via-green-400 to-green-900 overflow-hidden">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex flex-col w-full h-full min-w-0">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-16 md:h-20 flex items-center px-4 md:px-6 gap-3"
                >
                    <Header isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className="relative w-full inset h-full scroll bg-gray-100 rounded-3xl overflow-auto p-4 md:p-6"
                >
                    <AnimatePresence mode="wait">
                        <Outlet />
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}