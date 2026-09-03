// components/Dashboard/ListOfPak.tsx
import { Search, TrendingUp, TrendingDown, Minus, Sprout } from "lucide-react";
import type { MandiRate } from "./types";

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
    return (
        <div className="flex h-full flex-col">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                {market} - Pak Sale List
            </p>

            <div className="relative mb-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Pak search karo..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-green-400"
                />
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
                {rates.length === 0 ? (
                    <p className="py-8 text-center text-xs text-gray-400">
                        Koi pak na madyo.
                    </p>
                ) : (
                    rates.map((rate) => {
                        const trendConfig = {
                            up: { icon: TrendingUp, color: "text-emerald-600" },
                            down: { icon: TrendingDown, color: "text-red-500" },
                            stable: { icon: Minus, color: "text-gray-400" },
                        }[rate.trend];
                        const TrendIcon = trendConfig.icon;
                        const isSelected = rate.crop === selectedCrop;

                        return (
                            <button
                                key={rate.id}
                                type="button"
                                onClick={() => onSelectCrop(rate.crop)}
                                className={`flex items-center gap-2.5 rounded-xl border p-2 text-left transition ${
                                    isSelected
                                        ? "border-green-400 bg-green-50"
                                        : "border-transparent hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-green-50">
                                    <Sprout className="h-5 w-5 text-green-600" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-bold text-green-950">
                                        {rate.crop}
                                    </p>
                                    <p className="truncate text-[10.5px] text-gray-400">
                                        {rate.variety}
                                    </p>
                                    <div className="mt-0.5 flex items-center gap-1.5">
                                        <span className="text-[11px] font-semibold text-green-700">
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