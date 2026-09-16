import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMarketRates, CITY_LIST, getMarketsForCity } from "../../services/market-service";
import DashboardHeader from "./DashboardHeader";
import CityCard from "./Citycard";
import type { MandiRate } from "./types";
import { useTheme } from "../theme/ThemeContext";

export default function CityGrid() {
    const [rates, setRates] = useState<MandiRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const loadRates = async () => {
        try {
            const data = await getMarketRates();
            setRates(data);
            setError(null);
        } catch (err) {
            setError("Market rates load nathi thai shakya. Fari try karo.");
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await loadRates();
            setLoading(false);
        })();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadRates();
        setRefreshing(false);
    };

    const ratesByCity = useMemo(() => {
        const map = new Map<string, MandiRate[]>();
        for (const city of CITY_LIST) map.set(city, []);
        for (const rate of rates) {
            const list = map.get(rate.district) ?? [];
            list.push(rate);
            map.set(rate.district, list);
        }
        return map;
    }, [rates]);

    return (
        <div className="flex h-full flex-col gap-5 overflow-y-auto p-2 md:p-4">
            <DashboardHeader refreshing={refreshing} onRefresh={() => void handleRefresh()} />

            {error && (
                <div
                    className={`rounded-xl px-4 py-3 text-xs font-semibold ${isDark
                            ? "bg-red-950/60 text-red-300 border border-red-800/50"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                >
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div
                                className={`aspect-video rounded-xl ${isDark ? "bg-zinc-800" : "bg-gray-200"
                                    }`}
                            />
                            <div
                                className={`mt-3 h-3.5 w-2/3 rounded-md ${isDark ? "bg-zinc-800" : "bg-gray-200"
                                    }`}
                            />
                            <div
                                className={`mt-2 h-3 w-1/2 rounded-md ${isDark ? "bg-zinc-800" : "bg-gray-200"
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p
                        className={`mb-4 text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Shaher Pasand Karo
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 xl:grid-cols-4">
                        {CITY_LIST.map((city) => (
                            <CityCard
                                key={city}
                                city={city}
                                marketCount={getMarketsForCity(city).length}
                                rates={ratesByCity.get(city) ?? []}
                                onClick={() =>
                                    navigate(`/dashboard/city/${encodeURIComponent(city)}`)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}