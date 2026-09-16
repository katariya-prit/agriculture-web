import { RefreshCw } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export default function DashboardHeader({ refreshing, onRefresh }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1
                    className={`text-lg font-extrabold sm:text-xl capitalize ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Market View
                </h1>
                <p
                    className={`mt-0.5 text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Aajna market rates - khedut mate updated bhav
                </p>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer disabled:opacity-50 ${isDark
                        ? "bg-[#272727] text-green-400 border border-zinc-800 hover:bg-[#383838] active:bg-[#1f1f1f]"
                        : "bg-[#eef2f5] text-green-700 border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#c5c9cc,inset_-2px_-2px_4px_#ffffff]"
                    }`}
            >
                <RefreshCw
                    className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
            </button>
        </div>
    );
}