import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../theme/ThemeContext";

export default function ProfileMenu() {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const isdark = theme === "dark";

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    async function handleLogout() {
        setLoggingOut(true);
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <div className="relative select-none" ref={menuRef}>
            {/* Trigger Button */}
            <motion.button
                ref={triggerRef}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpen(!open)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="profile-menu-panel"
                className={`flex items-center gap-2.5 h-10 max-w-50 px-2 cursor-pointer rounded-full transition-all duration-200 ${isdark
                        ? "bg-[#272727] border border-zinc-800 text-white hover:bg-[#383838]"
                        : "bg-[#eef2f5] border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] text-gray-900 hover:bg-green-50/50"
                    }`}
            >
                <FaUserCircle
                    size={28}
                    aria-hidden="true"
                    className={`shrink-0 ${isdark ? "text-green-400" : "text-green-700"}`}
                />
                <span className="text-xs font-bold truncate max-w-[100px]">
                    {user?.fullName || "Account"}
                </span>
                <motion.div
                    className={`shrink-0 ${isdark ? "text-gray-400" : "text-green-800"}`}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FiChevronDown size={16} aria-hidden="true" />
                </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="profile-menu-panel"
                        role="menu"
                        aria-label="Account"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 top-full mt-3 w-64 rounded-2xl overflow-hidden z-50 transition-all duration-200 ${isdark
                                ? "bg-[#272727] border border-zinc-800 text-white shadow-2xl"
                                : "bg-[#eef2f5] border border-white/80 shadow-[6px_6px_16px_#c5c9cc,-6px_-6px_16px_#ffffff] text-gray-900"
                            }`}
                    >
                        {/* Profile Info Header */}
                        <div
                            className={`flex flex-col items-center gap-1.5 p-4 border-b ${isdark
                                    ? "bg-zinc-900/50 border-zinc-800"
                                    : "bg-green-50/50 border-white/60"
                                }`}
                        >
                            <FaUserCircle
                                size={48}
                                className={isdark ? "text-green-400" : "text-green-800"}
                                aria-hidden="true"
                            />
                            <div className="text-center max-w-full">
                                <p className="font-bold text-sm truncate">
                                    {user?.fullName || "User"}
                                </p>
                                <p
                                    className={`text-[11px] font-medium truncate max-w-48 ${isdark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    title={user?.email || ""}
                                >
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>

                        {/* Actions List */}
                        <div className="flex flex-col p-2 gap-1">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/dashboard/profile");
                                }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${isdark
                                        ? "hover:bg-zinc-800 text-gray-200"
                                        : "hover:bg-green-100/70 text-gray-800"
                                    }`}
                            >
                                <CgProfile size={16} aria-hidden="true" />
                                View profile
                            </button>

                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/dashboard/settings");
                                }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${isdark
                                        ? "hover:bg-zinc-800 text-gray-200"
                                        : "hover:bg-green-100/70 text-gray-800"
                                    }`}
                            >
                                <MdSettings size={16} aria-hidden="true" />
                                Settings
                            </button>

                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                aria-busy={loggingOut}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isdark
                                        ? "hover:bg-red-950/50 text-red-400"
                                        : "hover:bg-red-50 text-red-600"
                                    }`}
                            >
                                <MdLogout size={16} aria-hidden="true" />
                                {loggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}