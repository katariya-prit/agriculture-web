// components/Dashboard/TopMovers.tsx
import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MandiRate } from "./types";

interface Props {
    rates: MandiRate[];
    selectedCrop: string | null;
    onSelectCrop: (crop: string) => void;
}

const RANK_BORDER = [
    "border-amber-300 ring-1 ring-amber-100",
    "border-gray-200",
    "border-orange-100",
];

export default function TopMovers({ rates, selectedCrop, onSelectCrop }: Props) {
    const top3 = [...rates]
        .filter((rate, idx, arr) => arr.findIndex((x) => x.crop === rate.crop) === idx)
        .sort((a, b) => b.modalPrice - a.modalPrice)
        .slice(0, 3);

    if (top3.length === 0) return null;

    return (
        <div>
            <div className="mb-2 flex items-center gap-1.5 px-0.5">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Sauthi Vadhu Bhaav
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {top3.map((rate, index) => {
                    const trendConfig = {
                        up: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                        down: { icon: TrendingDown, color: "text-red-500", bg: "bg-red-50" },
                        stable: { icon: Minus, color: "text-gray-400", bg: "bg-gray-50" },
                    }[rate.trend];
                    const TrendIcon = trendConfig.icon;
                    const isSelected = rate.crop === selectedCrop;

                    return (
                        <button
                            key={rate.id}
                            type="button"
                            onClick={() => onSelectCrop(rate.crop)}
                            className={`relative overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-sm transition ${
                                isSelected
                                    ? "border-green-400 ring-2 ring-green-100"
                                    : RANK_BORDER[index]
                            }`}
                        >
                            <span className="absolute right-3 top-2 text-2xl font-black text-gray-100">
                                #{index + 1}
                            </span>

                            <p className="truncate pr-8 text-sm font-bold text-green-950">
                                {rate.crop}
                            </p>
                            <p className="truncate text-[11px] text-gray-400">
                                {rate.variety} · {rate.market}
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <p className="text-xl font-bold text-green-800">
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