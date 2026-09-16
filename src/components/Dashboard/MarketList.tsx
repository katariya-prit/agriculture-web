import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getMarketRates, getMarketsForCity } from "../../services/market-service";
import MarketCard from "./MarketCard";
import type { MandiRate } from "./types";
import { useTheme } from "../theme/ThemeContext";

export default function MarketList() {
    const { city } = useParams<{ city: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [rates, setRates] = useState<MandiRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getMarketRates();
                setRates(data);
                setError(null);
            } catch (err) {
                setError("Market data load nathi thai shakyu.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const markets = useMemo(() => (city ? getMarketsForCity(city) : []), [city]);

    const ratesByMarket = useMemo(() => {
        const map = new Map<string, MandiRate[]>();
        for (const market of markets) map.set(market, []);
        for (const rate of rates) {
            if (rate.district !== city) continue;
            const list = map.get(rate.market) ?? [];
            list.push(rate);
            map.set(rate.market, list);
        }
        return map;
    }, [rates, markets, city]);

    return (
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-2 md:p-4 select-none">
            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className={`flex w-fit items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isDark
                            ? "bg-[#272727] text-green-400 border border-zinc-800 hover:bg-[#383838]"
                            : "bg-[#eef2f5] text-green-800 border border-white/80 shadow-[3px_3px_6px_#c5c9cc,-3px_-3px_6px_#ffffff] hover:bg-green-50/50"
                    }`}
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Badha Shaher
                </button>

                <div className="mt-1">
                    <h1
                        className={`text-xl font-extrabold sm:text-2xl ${
                            isDark ? "text-gray-100" : "text-green-950"
                        }`}
                    >
                        {city}
                    </h1>
                    <p
                        className={`mt-0.5 text-xs font-medium ${
                            isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                        {city} na market pasand karo
                    </p>
                </div>
            </div>

            {error && (
                <div
                    className={`rounded-xl px-4 py-3 text-xs font-semibold ${
                        isDark
                            ? "bg-red-950/60 text-red-300 border border-red-800/50"
                            : "bg-red-50 text-red-600 border border-red-200"
                    }`}
                >
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div
                                className={`aspect-video rounded-2xl ${
                                    isDark ? "bg-[#272727]" : "bg-gray-200"
                                }`}
                            />
                            <div
                                className={`mt-3 h-3.5 w-2/3 rounded-md ${
                                    isDark ? "bg-[#272727]" : "bg-gray-200"
                                }`}
                            />
                            <div
                                className={`mt-2 h-2.5 w-1/2 rounded-md ${
                                    isDark ? "bg-[#272727]" : "bg-gray-200"
                                }`}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {markets.map((market) => (
                        <MarketCard
                            key={market}
                            market={market}
                            rates={ratesByMarket.get(market) ?? []}
                            onClick={() =>
                                navigate(
                                    `/dashboard/city/${encodeURIComponent(city!)}/${encodeURIComponent(market)}`
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}