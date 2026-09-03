// components/Dashboard/MarketCard.tsx
import { MapPin, Play } from "lucide-react";
import type { MandiRate } from "./types";

interface Props {
    market: string;
    rates: MandiRate[];
    onClick: () => void;
}

export default function MarketCard({ market, rates, onClick }: Props) {
    const gainers = rates.filter((rate) => rate.trend === "up").length;
    const losers = rates.filter((rate) => rate.trend === "down").length;
    const topRate = [...rates].sort((a, b) => b.modalPrice - a.modalPrice)[0];

    return (
        <button type="button" onClick={onClick} className="group text-left">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-linear-to-br from-green-100 to-emerald-50">
                <div className="flex h-full flex-col items-center justify-center gap-1.5">
                    <MapPin className="h-8 w-8 text-green-600 opacity-70" />
                    <span className="text-[11px] font-semibold text-green-700">
                        {rates.length} pak tracked
                    </span>
                </div>

                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {gainers} up · {losers} down
                </span>

                <div className="absolute inset-0 hidden items-center justify-center bg-black/20 group-hover:flex">
                    <Play className="h-8 w-8 fill-white text-white" />
                </div>
            </div>

            <div className="mt-2">
                <p className="truncate text-sm font-bold text-green-950">{market}</p>
                {topRate ? (
                    <p className="truncate text-[11px] text-gray-400">
                        Top: {topRate.crop} · ₹{topRate.modalPrice.toLocaleString("en-IN")}
                    </p>
                ) : (
                    <p className="truncate text-[11px] text-gray-400">Koi data nathi</p>
                )}
            </div>
        </button>
    );
}