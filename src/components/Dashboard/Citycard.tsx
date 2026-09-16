import { MapPin, Layers } from "lucide-react";
import type { MandiRate } from "./types";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    city: string;
    marketCount: number;
    rates: MandiRate[];
    onClick: () => void;
}

export default function CityCard({ city, marketCount, rates, onClick }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const gainers = rates.filter((rate) => rate.trend === "up").length;
    const losers = rates.filter((rate) => rate.trend === "down").length;
    const topRate = [...rates].sort((a, b) => b.modalPrice - a.modalPrice)[0];

    return (
        <button type="button" onClick={onClick} className="group text-left w-full select-none">
            <div className="relative aspect-video w-full">
                <div
                    className={`absolute inset-x-2.5 -bottom-2 top-3 rounded-xl transition-transform group-hover:translate-y-0.5 ${
                        isDark ? "bg-green-950/40 border border-green-800/30" : "bg-emerald-200/50"
                    }`}
                />
                <div
                    className={`absolute inset-x-1.5 -bottom-1 top-1.5 rounded-xl transition-transform group-hover:translate-y-0.5 ${
                        isDark ? "bg-zinc-800/80 border border-zinc-700/50" : "bg-emerald-100/70"
                    }`}
                />

                <div
                    className={`relative flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl transition-transform group-hover:-translate-y-0.5 ${
                        isDark
                            ? "bg-[#272727] border border-zinc-800 text-white shadow-lg"
                            : "bg-gradient-to-br from-green-100 to-emerald-50 shadow-[4px_4px_10px_#c5c9cc,-4px_-4px_10px_#ffffff] border border-white/60"
                    }`}
                >
                    <MapPin
                        className={`h-7 w-7 ${
                            isDark ? "text-green-400 opacity-90" : "text-green-600 opacity-80"
                        }`}
                    />
                    <span
                        className={`text-[11px] font-bold ${
                            isDark ? "text-green-300" : "text-green-800"
                        }`}
                    >
                        {rates.length} pak tracked
                    </span>

                    <span
                        className={`absolute left-2 top-2 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow-sm ${
                            isDark
                                ? "bg-zinc-900/90 text-green-400 border border-zinc-700"
                                : "bg-white/90 text-green-800"
                        }`}
                    >
                        <Layers className="h-3 w-3" />
                        {marketCount} market
                    </span>

                    <span
                        className={`absolute bottom-2 right-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            isDark
                                ? "bg-black/70 text-gray-200 border border-zinc-700"
                                : "bg-black/75 text-white"
                        }`}
                    >
                        {gainers} up · {losers} down
                    </span>
                </div>
            </div>

            <div className="mt-2.5 px-0.5">
                <p
                    className={`truncate text-sm font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                    }`}
                >
                    {city}
                </p>
                {topRate ? (
                    <p
                        className={`truncate text-[11px] font-medium ${
                            isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                        Top: {topRate.crop} · ₹{topRate.modalPrice.toLocaleString("en-IN")}
                    </p>
                ) : (
                    <p
                        className={`truncate text-[11px] ${
                            isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                    >
                        Koi data nathi
                    </p>
                )}
            </div>
        </button>
    );
}