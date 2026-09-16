import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, Table as TableIcon, Truck, Search } from "lucide-react";
import { transportService } from "../../services/Transportservice";
import type { TransportListing } from "./core/types";
import TransportCard from "./core/Transportcard";
import TransportTable from "./core/Transporttable";
import NotFound from "../../components/feedback/NotFound";
import { useTheme } from "../../components/theme/ThemeContext";

type ViewMode = "card" | "table";

export default function Transparent() {
    const { theme } = useTheme();
    const isdark = theme === "dark";
    const [listings, setListings] = useState<TransportListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [view, setView] = useState<ViewMode>("card");

    async function fetchListings() {
        setLoading(true);
        try {
            const data = await transportService.getAll<TransportListing[]>();
            setListings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setListings([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchListings();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return listings;
        return listings.filter(
            (item) =>
                item.providerName.toLowerCase().includes(q) ||
                item.area.toLowerCase().includes(q) ||
                item.vehicleType.toLowerCase().includes(q)
        );
    }, [listings, search]);

    // ---- Neumorphic tokens (theme-aware) ----
    const bg = isdark ? "bg-[#272727]" : "bg-[#eef2f5]";
    const raised = isdark
        ? "shadow-[6px_6px_14px_#1c1c1c,-6px_-6px_14px_#323232]"
        : "shadow-[6px_6px_14px_#c5c9cc,-6px_-6px_14px_#ffffff]";
    const raisedSm = isdark
        ? "shadow-[4px_4px_10px_#1c1c1c,-4px_-4px_10px_#323232]"
        : "shadow-[4px_4px_10px_#c5c9cc,-4px_-4px_10px_#ffffff]";
    const pressed = isdark
        ? "shadow-[inset_4px_4px_10px_#1c1c1c,inset_-4px_-4px_10px_#323232]"
        : "shadow-[inset_4px_4px_10px_#c5c9cc,inset_-4px_-4px_10px_#ffffff]";
    const textPrimary = isdark ? "text-gray-200" : "text-gray-800";
    const textMuted = isdark ? "text-gray-400" : "text-gray-500";

    return (
        <div className={`min-h-full ${bg} p-4 sm:p-6 transition-colors duration-300`}>
            {/* Header */}
            <div className={`mb-6 flex items-center gap-4 rounded-[28px] ${bg} ${raised} px-6 py-5 transition-all duration-300`}>
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] ${bg} ${raisedSm}`}>
                    <Truck size={28} className={isdark ? "text-green-400" : "text-green-700"} />
                </div>
                <div>
                    <h1 className={`text-lg font-semibold leading-tight ${textPrimary}`}>Transport Marketplace</h1>
                    <p className={`text-sm ${textMuted}`}>
                        Najik na truck ane transport providers ahiya dekhay chhe.
                    </p>
                </div>
            </div>

            {/* Content panel */}
            <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Neumorphic search input — pressed/inset look */}
                    <div className={`relative w-full sm:w-72 rounded-2xl ${bg} ${pressed}`}>
                        <Search className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${textMuted}`} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Transport shodho..."
                            className={`w-full bg-transparent rounded-2xl py-3 pl-11 pr-4 text-sm outline-none ${textPrimary} placeholder:${textMuted}`}
                        />
                    </div>

                    {/* Neumorphic toggle — active tab looks pressed-in */}
                    <div className={`flex w-fit items-center gap-1.5 rounded-2xl ${bg} ${pressed} p-1.5`}>
                        <button
                            type="button"
                            onClick={() => setView("card")}
                            aria-pressed={view === "card"}
                            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${textPrimary} ${view === "card" ? `${bg} ${raisedSm}` : "opacity-60"
                                }`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("table")}
                            aria-pressed={view === "table"}
                            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${textPrimary} ${view === "table" ? `${bg} ${raisedSm}` : "opacity-60"
                                }`}
                        >
                            <TableIcon className="h-4 w-4" />
                            Table
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`animate-pulse rounded-2xl ${bg} ${raisedSm} p-3`}>
                                <div className={`aspect-video rounded-xl ${bg} ${pressed}`} />
                                <div className={`mt-3 h-3 w-2/3 rounded-full ${bg} ${pressed}`} />
                                <div className={`mt-2 h-3 w-1/3 rounded-full ${bg} ${pressed}`} />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className={`rounded-2xl ${bg} ${pressed} py-10`}>
                        <NotFound title="Koi transport provider nathi malyu" message="Aalag keyword try karo." />
                    </div>
                ) : view === "card" ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((listing) => (
                            <TransportCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <TransportTable listings={filtered} />
                )}
            </div>
        </div>
    );
}