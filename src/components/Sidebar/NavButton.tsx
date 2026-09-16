import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import { useTheme } from "../theme/ThemeContext";

export interface NavChildItem {
    label: string;
    path: string;
    icon?: IconType;
}

interface Props {
    icon: IconType;
    label: string;
    isOpen: boolean;
    isActive?: boolean;
    onClick?: () => void;
    children?: NavChildItem[];
    onChildClick?: (path: string) => void;
    activePath?: string;
}

export default function NavButton({
    icon: Icon,
    label,
    isOpen,
    isActive,
    onClick,
    children,
    onChildClick,
    activePath,
}: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [hovered, setHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const hasChildren = !!children?.length;

    useEffect(() => {
        if (!isOpen) setExpanded(false);
    }, [isOpen]);

    const handleRowClick = () => {
        if (hasChildren) {
            setExpanded((e) => !e);
            return;
        }
        onClick?.();
    };

    return (
        <div
            className="relative w-full rounded-2xl select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Main Nav Button */}
            <motion.div
                onClick={handleRowClick}
                whileTap={{ scale: 0.97 }}
                className={`w-full h-12 rounded-[18px] flex items-center ${isOpen ? "gap-3 px-3" : "justify-center px-0"} cursor-pointer transition-all duration-300 ${isActive
                    ? isdark
                        ? "bg-green-600 text-white shadow-md font-medium"
                        : "bg-green-700 text-white shadow-md font-medium"
                    : isdark
                        ? "bg-[#272727] text-gray-300 hover:bg-[#383838] border border-zinc-800/50"
                        : "bg-[#eef2f5] text-gray-800 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/50 border border-white/60"
                    }`}
            >
                <Icon
                    size={isOpen ? 32 : 20}
                    className={`shrink-0 transition-colors duration-200 ${isActive
                        ? "text-white"
                        : isdark
                            ? "text-green-400"
                            : "text-green-700"
                        }`}
                />

                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="whitespace-nowrap text-xs md:text-sm font-semibold flex-1 truncate"
                    >
                        {label}
                    </motion.span>
                )}

                {isOpen && hasChildren && (
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        className={`text-xs ${isActive ? "text-white/80" : isdark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        ▾
                    </motion.span>
                )}
            </motion.div>

            {/* Expanded Child Items Submenu */}
            {isOpen && hasChildren && (
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="relative z-10 overflow-hidden"
                        >
                            <div
                                className={`mt-2 ml-5 flex flex-col gap-1.5 border-l-2 py-1 pl-3 transition-colors duration-300 ${isdark ? "border-zinc-700" : "border-green-600/30"
                                    }`}
                            >
                                {children!.map((child) => {
                                    const ChildIcon = child.icon;
                                    const childActive = activePath === child.path;
                                    return (
                                        <div
                                            key={child.path}
                                            onClick={() => onChildClick?.(child.path)}
                                            className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-xs font-medium cursor-pointer transition-all duration-200 ${childActive
                                                ? "bg-green-700 text-white shadow-sm"
                                                : isdark
                                                    ? "text-gray-400 hover:bg-[#272727] hover:text-white"
                                                    : "text-gray-700 hover:bg-green-100/60"
                                                }`}
                                        >
                                            {ChildIcon && <ChildIcon size={16} className="shrink-0" />}
                                            <span className="truncate">{child.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Hover Tooltip Menu when Sidebar Collapsed */}
            <AnimatePresence>
                {!isOpen && hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute left-full top-0 ml-3 z-50 min-w-44 rounded-[18px] border p-2 ${isdark
                            ? "border-zinc-800 bg-[#272727] text-white shadow-2xl"
                            : "border-white/80 bg-[#eef2f5] text-gray-800 shadow-[8px_8px_16px_#c5c9cc,-8px_-8px_16px_#ffffff]"
                            }`}
                    >
                        {!hasChildren ? (
                            <div className="px-3 py-1.5 text-xs font-semibold whitespace-nowrap">
                                {label}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <div
                                    className={`px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isdark ? "text-gray-400" : "text-green-800"
                                        }`}
                                >
                                    {label}
                                </div>
                                {children!.map((child) => {
                                    const ChildIcon = child.icon;
                                    const childActive = activePath === child.path;
                                    return (
                                        <div
                                            key={child.path}
                                            onClick={() => onChildClick?.(child.path)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${childActive
                                                ? "bg-green-700 text-white"
                                                : isdark
                                                    ? "text-gray-300 hover:bg-[#383838]"
                                                    : "text-gray-700 hover:bg-green-100/60"
                                                }`}
                                        >
                                            {ChildIcon && <ChildIcon size={15} className="shrink-0" />}
                                            {child.label}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}