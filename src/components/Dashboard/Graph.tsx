import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MandiRate, PriceHistoryPoint } from "./types";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    crop: string | null;
    rate?: MandiRate;
    history: PriceHistoryPoint[];
    loading: boolean;
}

export default function Graph({ crop, rate, history, loading }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const trendConfig = rate
        ? {
              up: { icon: TrendingUp, color: isDark ? "text-green-400" : "text-emerald-600" },
              down: { icon: TrendingDown, color: "text-red-500" },
              stable: { icon: Minus, color: isDark ? "text-gray-500" : "text-gray-400" },
          }[rate.trend]
        : null;
    const TrendIcon = trendConfig?.icon;

    return (
        <div
            className={`rounded-2xl p-4 transition-all duration-300 ${
                isDark
                    ? "bg-[#272727] border border-zinc-800 text-white shadow-xl"
                    : "bg-[#eef2f5] border border-white/80 shadow-[6px_6px_12px_#c5c9cc,-6px_-6px_12px_#ffffff]"
            }`}
        >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p
                        className={`text-sm font-extrabold ${
                            isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                        {crop || "Ek pak pasand karo"}
                    </p>
                    {rate && (
                        <p
                            className={`text-[11px] font-medium ${
                                isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                            {rate.variety} · {rate.market} · 7 Din no Trend
                        </p>
                    )}
                </div>

                {rate && TrendIcon && (
                    <div className="flex items-center gap-3">
                        <p
                            className={`text-lg font-black ${
                                isDark ? "text-green-400" : "text-green-800"
                            }`}
                        >
                            ₹{rate.modalPrice.toLocaleString("en-IN")}
                            <span
                                className={`ml-1 text-xs font-normal ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
                                /{rate.unit}
                            </span>
                        </p>
                        <div className="flex items-center gap-1">
                            <TrendIcon className={`h-3.5 w-3.5 ${trendConfig!.color}`} />
                            <span className={`text-xs font-bold ${trendConfig!.color}`}>
                                {rate.changePercent > 0 ? "+" : ""}
                                {rate.changePercent}%
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="h-64 w-full sm:h-80">
                {loading ? (
                    <div
                        className={`flex h-full items-center justify-center text-xs font-medium ${
                            isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                    >
                        Loading chart...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={history}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={isDark ? "#383838" : "#d1d5db"}
                            />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: isDark ? "#a1a1aa" : "#6B7280" }}
                                axisLine={{ stroke: isDark ? "#383838" : "#e5e7eb" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: isDark ? "#a1a1aa" : "#6B7280" }}
                                axisLine={{ stroke: isDark ? "#383838" : "#e5e7eb" }}
                                tickLine={false}
                                width={55}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
                                    borderRadius: "12px",
                                    border: isDark ? "1px solid #383838" : "1px solid #e5e7eb",
                                    color: isDark ? "#ffffff" : "#000000",
                                    fontSize: "12px",
                                    boxShadow: isDark
                                        ? "0 10px 15px -3px rgba(0,0,0,0.5)"
                                        : "0 4px 6px -1px rgba(0,0,0,0.1)",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke={isDark ? "#4ade80" : "#16A34A"}
                                strokeWidth={2.5}
                                dot={{ r: 3, fill: isDark ? "#4ade80" : "#16A34A" }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}