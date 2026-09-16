import { useEffect, useRef, useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { LuChevronDown, LuUser, LuSettings, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export interface NavDropdownItem {
    label: string;
    icon?: IconType;
    onClick?: () => void;
    danger?: boolean;
    dividerBefore?: boolean;
}

interface NavDropdownProps {
    trigger: ReactNode;
    items: NavDropdownItem[];
    align?: "left" | "right";
    className?: string;
    triggerClassName?: string;
    panelClassName?: string;
}

export default function NavDropdown({
    trigger,
    items,
    align = "right",
    className = "",
    triggerClassName,
    panelClassName,
}: NavDropdownProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <div ref={containerRef} className={`relative inline-block ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className={
                    triggerClassName ??
                    "flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm transition-colors hover:bg-green-50"
                }
            >
                {trigger}
                <LuChevronDown
                    className={`h-4 w-4 shrink-0 text-green-900/50 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div
                    role="menu"
                    className={`absolute top-full z-50 mt-2 animate-in fade-in slide-in-from-top-1 duration-150 ${
                        panelClassName ??
                        "w-56 overflow-hidden rounded-xl border border-green-900/10 bg-white py-1.5 shadow-lg"
                    } ${align === "right" ? "right-0" : "left-0"}`}
                >
                    {items.map((item) => (
                        <div key={item.label}>
                            {item.dividerBefore && <div className="my-1 border-t border-green-900/10" />}
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    item.onClick?.();
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors ${
                                    item.danger
                                        ? "text-red-600 hover:bg-red-50"
                                        : "text-green-900/80 hover:bg-green-50"
                                }`}
                            >
                                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export function UserProfileDropdown() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const displayName = user?.fullName || user?.username || "User";
    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <NavDropdown
            align="right"
            trigger={
                <>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
                        {initials}
                    </span>
                    <span className="hidden text-sm font-medium text-green-900 sm:inline">{displayName}</span>
                </>
            }
            items={[
                { label: "Profile", icon: LuUser, onClick: () => navigate("/dashboard/profile") },
                { label: "Settings", icon: LuSettings, onClick: () => navigate("/dashboard/settings") },
                { label: "Logout", icon: LuLogOut, danger: true, dividerBefore: true, onClick: handleLogout },
            ]}
        />
    );
}