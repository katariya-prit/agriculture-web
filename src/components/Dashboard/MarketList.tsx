// components/Dashboard/MarketList.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getMarketRates, getMarketsForCity } from "../../services/market-service";
import MarketCard from "./MarketCard";
import type { MandiRate } from "./types";

export default function MarketList() {
    const { city } = useParams<{ city: string }>();
    const navigate = useNavigate();
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
        <div className="flex h-full flex-col gap-5 overflow-y-auto p-1">
            <div>
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="flex w-fit items-center gap-1.5 text-xs font-semibold text-green-700 hover:underline"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Badha Shaher
                </button>
                <h1 className="mt-2 text-lg font-bold text-green-950 sm:text-xl">{city}</h1>
                <p className="mt-0.5 text-xs text-gray-500">{city} na market pasand karo</p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="aspect-video rounded-xl bg-gray-100" />
                            <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />
                            <div className="mt-1.5 h-2.5 w-1/2 rounded bg-gray-100" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
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