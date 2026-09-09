// components/Dashboard/CityGrid.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMarketRates, CITY_LIST, getMarketsForCity } from "../../services/market-service";
import DashboardHeader from "./DashboardHeader";
import CityCard from "./Citycard";
import type { MandiRate } from "./types";

export default function CityGrid() {
    const [rates, setRates] = useState<MandiRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
        <div className="flex h-full flex-col gap-5 overflow-y-auto p-1">
            <DashboardHeader refreshing={refreshing} onRefresh={() => void handleRefresh()} />

            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="aspect-video rounded-xl bg-gray-100" />
                            <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />
                            <div className="mt-1.5 h-2.5 w-1/2 rounded bg-gray-100" />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                        Shaher Pasand Karo
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
                        {CITY_LIST.map((city) => (
                            <CityCard
                                key={city}
                                city={city}
                                marketCount={getMarketsForCity(city).length}
                                rates={ratesByCity.get(city) ?? []}
                                onClick={() => navigate(`/dashboard/city/${encodeURIComponent(city)}`)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}