import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MandiRate } from "./types";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    rates: MandiRate[];
    selectedCrop: string | null;
    onSelectCrop: (crop: string) => void;
}

export default function TopMovers({ rates, selectedCrop, onSelectCrop }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const top3 = [...rates]
        .filter((rate, idx, arr) => arr.findIndex((x) => x.crop === rate.crop) === idx)
        .sort((a, b) => b.modalPrice - a.modalPrice)
        .slice(0, 3);

    if (top3.length === 0) return null;

    return (
        <div className="select-none">
            <div className="mb-2.5 flex items-center gap-1.5 px-0.5">
                <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                    Sauthi Vadhu Bhaav
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {top3.map((rate, index) => {
                    const trendConfig = {
                        up: {
                            icon: TrendingUp,
                            color: isDark ? "text-emerald-400" : "text-emerald-600",
                            bg: isDark ? "bg-emerald-950/60 border border-emerald-800/50" : "bg-emerald-50",
                        },
                        down: {
                            icon: TrendingDown,
                            color: isDark ? "text-red-400" : "text-red-500",
                            bg: isDark ? "bg-red-950/60 border border-red-800/50" : "bg-red-50",
                        },
                        stable: {
                            icon: Minus,
                            color: isDark ? "text-gray-400" : "text-gray-500",
                            bg: isDark ? "bg-zinc-800" : "bg-gray-100",
                        },
                    }[rate.trend];

                    const TrendIcon = trendConfig.icon;
                    const isSelected = rate.crop === selectedCrop;

                    return (
                        <button
                            key={rate.id}
                            type="button"
                            onClick={() => onSelectCrop(rate.crop)}
                            className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                    ? isDark
                                        ? "bg-green-950/40 border-2 border-green-500 shadow-md"
                                        : "bg-green-500/10 border-2 border-green-500 shadow-sm"
                                    : isDark
                                    ? "bg-[#272727] border border-zinc-800 hover:border-zinc-700"
                                    : "bg-[#eef2f5] border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/30"
                            }`}
                        >
                            <span
                                className={`absolute right-3 top-2 text-2xl font-black ${
                                    isDark ? "text-zinc-800" : "text-gray-200/80"
                                }`}
                            >
                                #{index + 1}
                            </span>

                            <p
                                className={`truncate pr-8 text-sm font-bold ${
                                    isDark ? "text-gray-100" : "text-gray-900"
                                }`}
                            >
                                {rate.crop}
                            </p>
                            <p
                                className={`truncate text-[11px] font-medium ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
                                {rate.variety} · {rate.market}
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <p
                                    className={`text-xl font-extrabold ${
                                        isDark ? "text-green-400" : "text-green-800"
                                    }`}
                                >
                                    ₹{rate.modalPrice.toLocaleString("en-IN")}
                                </p>
                                <div
                                    className={`flex items-center gap-1 rounded-lg px-2 py-1 ${trendConfig.bg}`}
                                >
                                    <TrendIcon className={`h-3 w-3 ${trendConfig.color}`} />
                                    <span className={`text-[10px] font-bold ${trendConfig.color}`}>
                                        {rate.changePercent > 0 ? "+" : ""}
                                        {rate.changePercent}%
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}