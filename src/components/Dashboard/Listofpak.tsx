import { Search, TrendingUp, TrendingDown, Minus, Sprout } from "lucide-react";
import type { MandiRate } from "./types";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    market: string;
    search: string;
    onSearchChange: (value: string) => void;
    rates: MandiRate[];
    selectedCrop: string | null;
    onSelectCrop: (crop: string) => void;
}

export default function ListOfPak({
    market,
    search,
    onSearchChange,
    rates,
    selectedCrop,
    onSelectCrop,
}: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex h-full flex-col select-none">
            <p
                className={`mb-2.5 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-500"
                }`}
            >
                {market} - Pak Sale List
            </p>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search
                    className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Pak search karo..."
                    className={`w-full rounded-2xl py-2.5 pl-10 pr-3 text-sm font-medium transition-all duration-200 outline-none ${
                        isDark
                            ? "bg-[#272727] text-white placeholder-gray-500 border border-zinc-800 focus:border-green-500"
                            : "bg-[#eef2f5] text-gray-800 placeholder-gray-400 border border-white/60 shadow-[inset_2px_2px_4px_#c5c9cc,inset_-2px_-2px_4px_#ffffff] focus:border-green-500"
                    }`}
                />
            </div>

            {/* Crop List */}
            <div className="flex flex-col gap-2.5 overflow-y-auto pr-1">
                {rates.length === 0 ? (
                    <p
                        className={`py-8 text-center text-xs font-medium ${
                            isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                    >
                        Koi pak na madyo.
                    </p>
                ) : (
                    rates.map((rate) => {
                        const trendConfig = {
                            up: { icon: TrendingUp, color: isDark ? "text-emerald-400" : "text-emerald-600" },
                            down: { icon: TrendingDown, color: isDark ? "text-red-400" : "text-red-500" },
                            stable: { icon: Minus, color: isDark ? "text-gray-500" : "text-gray-400" },
                        }[rate.trend];
                        const TrendIcon = trendConfig.icon;
                        const isSelected = rate.crop === selectedCrop;

                        return (
                            <button
                                key={rate.id}
                                type="button"
                                onClick={() => onSelectCrop(rate.crop)}
                                className={`flex items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? isDark
                                            ? "bg-green-950/60 border border-green-600/50 text-white shadow-md"
                                            : "bg-green-500/10 border border-green-500 text-green-950 shadow-sm"
                                        : isDark
                                        ? "bg-[#272727] border border-zinc-800/80 hover:bg-[#323232]"
                                        : "bg-[#eef2f5] border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/50"
                                }`}
                            >
                                <div
                                    className={`flex h-12 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                        isSelected
                                            ? isDark
                                                ? "bg-green-600 text-white"
                                                : "bg-green-600 text-white"
                                            : isDark
                                            ? "bg-zinc-800 text-green-400"
                                            : "bg-white text-green-700 shadow-sm"
                                    }`}
                                >
                                    <Sprout className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p
                                        className={`truncate text-xs font-bold ${
                                            isDark ? "text-gray-100" : "text-gray-900"
                                        }`}
                                    >
                                        {rate.crop}
                                    </p>
                                    <p
                                        className={`truncate text-[10.5px] font-medium ${
                                            isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        {rate.variety}
                                    </p>
                                    <div className="mt-1 flex items-center gap-1.5">
                                        <span
                                            className={`text-[11px] font-bold ${
                                                isDark ? "text-green-400" : "text-green-700"
                                            }`}
                                        >
                                            ₹{rate.modalPrice.toLocaleString("en-IN")}
                                        </span>
                                        <TrendIcon className={`h-3 w-3 ${trendConfig.color}`} />
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}