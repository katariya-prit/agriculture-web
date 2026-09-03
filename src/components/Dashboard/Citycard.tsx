// components/Dashboard/CityCard.tsx
import { MapPin, Layers } from "lucide-react";
import type { MandiRate } from "./types";

interface Props {
    city: string;
    marketCount: number;
    rates: MandiRate[];
    onClick: () => void;
}

export default function CityCard({ city, marketCount, rates, onClick }: Props) {
    const gainers = rates.filter((rate) => rate.trend === "up").length;
    const losers = rates.filter((rate) => rate.trend === "down").length;
    const topRate = [...rates].sort((a, b) => b.modalPrice - a.modalPrice)[0];

    return (
        <button type="button" onClick={onClick} className="group text-left">
            <div className="relative aspect-video">
                {/* stacked layers peeche — "bundle of markets" effect */}
                <div className="absolute inset-x-2.5 -bottom-2 top-3 rounded-xl bg-emerald-200/50 transition-transform group-hover:translate-y-0.5" />
                <div className="absolute inset-x-1.5 -bottom-1 top-1.5 rounded-xl bg-emerald-100/70 transition-transform group-hover:translate-y-0.5" />

                <div className="relative flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 shadow-sm ring-1 ring-emerald-900/5 transition-transform group-hover:-translate-y-0.5">
                    <MapPin className="h-8 w-8 text-green-600 opacity-70" />
                    <span className="text-[11px] font-semibold text-green-700">
                        {rates.length} pak tracked
                    </span>

                    <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded bg-white/85 px-1.5 py-0.5 text-[10px] font-bold text-green-800 shadow-sm">
                        <Layers className="h-3 w-3" />
                        {marketCount} market
                    </span>

                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {gainers} up · {losers} down
                    </span>
                </div>
            </div>

            <div className="mt-2">
                <p className="truncate text-sm font-bold text-green-950">{city}</p>
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