// components/Dashboard/MarketDetail.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getMarketRates, getPriceHistory } from "../../services/market-service";
import Graph from "./Graph";
import ListOfPak from "./Listofpak";
import CommentSection from "./Commentsection";
import type { MandiRate, PriceHistoryPoint } from "./types";

export default function MarketDetail() {
    const { city, market } = useParams<{ city: string; market: string }>();
    const navigate = useNavigate();

    const [rates, setRates] = useState<MandiRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
    const [sidebarSearch, setSidebarSearch] = useState("");
    const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

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

    const marketRates = useMemo(
        () => rates.filter((rate) => rate.market === market),
        [rates, market]
    );

    useEffect(() => {
        if (marketRates.length === 0) return;
        setSelectedCrop((prev) =>
            prev && marketRates.some((r) => r.crop === prev) ? prev : marketRates[0].crop
        );
    }, [marketRates]);

    useEffect(() => {
        if (!selectedCrop) return;
        (async () => {
            setHistoryLoading(true);
            try {
                const data = await getPriceHistory(selectedCrop);
                setHistory(data);
            } catch (err) {
                console.error(err);
            } finally {
                setHistoryLoading(false);
            }
        })();
    }, [selectedCrop]);

    const sidebarRates = useMemo(() => {
        return marketRates.filter((rate) =>
            rate.crop.toLowerCase().includes(sidebarSearch.trim().toLowerCase())
        );
    }, [marketRates, sidebarSearch]);

    const selectedRate = useMemo(
        () => marketRates.find((rate) => rate.crop === selectedCrop),
        [marketRates, selectedCrop]
    );

    return (
        <div className="flex h-full flex-col gap-5 overflow-y-auto p-1">
            <button
                type="button"
                onClick={() => navigate(`/dashboard/city/${encodeURIComponent(city!)}`)}
                className="flex w-fit items-center gap-1.5 text-xs font-semibold text-green-700 hover:underline"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                {city} na Market
            </button>

            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
            ) : (
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex min-w-0 flex-1 flex-col gap-5">
                        <Graph
                            crop={selectedCrop}
                            rate={selectedRate}
                            history={history}
                            loading={historyLoading}
                        />

                        <CommentSection
                            key={`${market}-${selectedCrop}`}
                            cropLabel={selectedCrop}
                            marketLabel={market ?? null}
                        />
                    </div>

                    <aside className="w-full shrink-0 lg:w-80">
                        <ListOfPak
                            market={market ?? ""}
                            search={sidebarSearch}
                            onSearchChange={setSidebarSearch}
                            rates={sidebarRates}
                            selectedCrop={selectedCrop}
                            onSelectCrop={setSelectedCrop}
                        />
                    </aside>
                </div>
            )}
        </div>
    );
}