// components/common/ProfileMenu.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdSettings, MdLogout } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenu() {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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
        <div className="relative" ref={menuRef}>
            <motion.button
                ref={triggerRef}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpen(!open)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="profile-menu-panel"
                className="flex items-center gap-2.5 h-13 max-w-50 pl-2 pr-3.5 cursor-pointer rounded-full border border-white/40 hover:border-white/70 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-white/95 backdrop-blur-sm transition-all duration-300"
            >
                <FaUserCircle size={34} aria-hidden="true" className="text-green-700 shrink-0" />
                <span className="text-sm font-semibold text-green-950 truncate">
                    {user?.fullName || "Account"}
                </span>
                <motion.div
                    className="shrink-0 text-green-700/70"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FiChevronDown size={18} aria-hidden="true" />
                </motion.div>
            </motion.button>

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
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-green-900/10 overflow-hidden z-99999"
                    >
                        {/* Profile info */}
                        <div className="flex flex-col items-center gap-2 p-5 bg-green-50 border-b border-green-900/10">
                            <FaUserCircle size={56} className="text-green-800" aria-hidden="true" />
                            <div className="text-center max-w-full">
                                <p className="font-semibold text-green-900">
                                    {user?.fullName || "User"}
                                </p>
                                <p
                                    className="text-xs text-green-700/70 truncate max-w-50"
                                    title={user?.email || ""}
                                >
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col p-2">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/dashboard/profile");
                                }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-100 focus-visible:bg-green-100 focus-visible:outline-none text-green-900 text-sm font-medium transition-colors"
                            >
                                <CgProfile size={18} aria-hidden="true" />
                                View profile
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/dashboard/settings");
                                }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-100 focus-visible:bg-green-100 focus-visible:outline-none text-green-900 text-sm font-medium transition-colors"
                            >
                                <MdSettings size={18} aria-hidden="true" />
                                Settings
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                aria-busy={loggingOut}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none text-red-600 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MdLogout size={18} aria-hidden="true" />
                                {loggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}