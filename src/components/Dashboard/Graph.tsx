// components/Dashboard/Graph.tsx
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

interface Props {
    crop: string | null;
    rate?: MandiRate;
    history: PriceHistoryPoint[];
    loading: boolean;
}

export default function Graph({ crop, rate, history, loading }: Props) {
    const trendConfig = rate
        ? {
              up: { icon: TrendingUp, color: "text-emerald-600" },
              down: { icon: TrendingDown, color: "text-red-500" },
              stable: { icon: Minus, color: "text-gray-400" },
          }[rate.trend]
        : null;
    const TrendIcon = trendConfig?.icon;

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="text-sm font-bold text-green-950">
                        {crop || "Ek pak pasand karo"}
                    </p>
                    {rate && (
                        <p className="text-[11px] text-gray-400">
                            {rate.variety} · {rate.market} · 7 Din no Trend
                        </p>
                    )}
                </div>

                {rate && TrendIcon && (
                    <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-green-800">
                            ₹{rate.modalPrice.toLocaleString("en-IN")}
                            <span className="ml-1 text-xs font-normal text-gray-400">
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
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        Loading chart...
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={history}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#DCFCE7" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: "#6B7280" }}
                                axisLine={{ stroke: "#DCFCE7" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "#6B7280" }}
                                axisLine={{ stroke: "#DCFCE7" }}
                                tickLine={false}
                                width={55}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid #DCFCE7",
                                    fontSize: 12,
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#16A34A"
                                strokeWidth={2.5}
                                dot={{ r: 3, fill: "#16A34A" }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

        </div>
    );
}