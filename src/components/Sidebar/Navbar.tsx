import { useLocation, useNavigate } from "react-router-dom";
import NavButton, { type NavChildItem } from "./NavButton";
import { MdDashboard } from "react-icons/md";
import type { IconType } from "react-icons";
import { SiSalla } from "react-icons/si";
import { TbShoppingCart } from "react-icons/tb";
import { LuBookUser, LuLock } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onNavigate?: () => void;
}

interface NavItem {
    label: string;
    icon: IconType;
    path: string;
    children?: NavChildItem[];
    requiresSellingAccount?: boolean;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { label: "Create Product", icon: SiSalla, path: "/dashboard/sall-product", requiresSellingAccount: true },
    { label: "Product", icon: TbShoppingCart, path: "/dashboard/products" },
    { label: "My Product", icon: LuBookUser, path: "/dashboard/my-product", requiresSellingAccount: true },
];

export default function Navbar({ isOpen, onNavigate }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const hasSellingAccount = Boolean(user?.sellingAccountId);

    const handleClick = (item: NavItem) => {
        const locked = item.requiresSellingAccount && !hasSellingAccount;

        if (locked) {
            toast.error("Pahela selling account banavo, pachi j aa page khulse.");
            navigate("/dashboard/profile");
            onNavigate?.();
            return;
        }

        navigate(item.path);
        onNavigate?.();
    };

    return (
        <div className="w-full h-auto flex flex-col gap-2 p-0.2">
            {navItems.map((item) => {
                const locked = item.requiresSellingAccount && !hasSellingAccount;

                return (
                    <div key={item.path} className={locked ? "opacity-50 cursor-not-allowed" : ""}>
                        <NavButton
                            icon={locked ? LuLock : item.icon}
                            label={item.label}
                            isOpen={isOpen}
                            isActive={location.pathname === item.path}
                            activePath={location.pathname}
                            onClick={() => handleClick(item)}
                            children={locked ? undefined : item.children}
                            onChildClick={(path) => handleClick({ ...item, path })}
                        />
                    </div>
                );
            })}
        </div>
    );
}