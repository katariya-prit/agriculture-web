// Section/sall-management/Products.tsx
import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, Table as TableIcon, Store } from "lucide-react";
import { getSaleListings } from "../../lib/salesApi";
import type { SaleListing } from "./core/types";
import ProductCard from "../../components/cards/ProductCard";
import ProductTable from "../../components/commen/Table";
import NotFound from "../../components/feedback/NotFound";
import SearchBar from "../../components/commen/SearchBar";

type ViewMode = "card" | "table";

export default function Products() {
    const [listings, setListings] = useState<SaleListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [view, setView] = useState<ViewMode>("card");

    async function fetchListings() {
        setLoading(true);
        try {
            const data = await getSaleListings();
            setListings(data);
        } catch (err) {
            console.error(err);
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
                item.cropName.toLowerCase().includes(q) ||
                item.market.toLowerCase().includes(q)
        );
    }, [listings, search]);

    return (
        <div className="min-h-full bg-[#f2f5f2] p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-4 rounded-2xl bg-linear-to-r from-[#0b3d24] via-[#0f5132] to-[#15803d] px-6 py-5 text-white shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Store className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold leading-tight">Pak Marketplace</h1>
                    <p className="text-sm text-emerald-100/80">
                        Badha khedut o e vechva mukela pak ahiya dekhay chhe.
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SearchBar value={search} onChange={setSearch} placeholder="Pak shodho..." />

                    <div className="flex w-fit items-center gap-1 rounded-lg border border-emerald-900/10 bg-[#f2f5f2] p-1">
                        <button
                            type="button"
                            onClick={() => setView("card")}
                            aria-pressed={view === "card"}
                            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${view === "card"
                                ? "bg-[#0f5132] text-white shadow-sm"
                                : "text-emerald-900/50 hover:text-emerald-900/80"
                                }`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("table")}
                            aria-pressed={view === "table"}
                            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${view === "table"
                                ? "bg-[#0f5132] text-white shadow-sm"
                                : "text-emerald-900/50 hover:text-emerald-900/80"
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
                            <div key={i} className="animate-pulse">
                                <div className="aspect-video rounded-xl bg-emerald-900/10" />
                                <div className="mt-2 h-3 w-2/3 rounded bg-emerald-900/10" />
                                <div className="mt-1.5 h-3 w-1/3 rounded bg-emerald-900/10" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <NotFound title="Koi pak nathi malyu" message="Aalag keyword try karo." />
                ) : view === "card" ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((listing) => (
                            <ProductCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <ProductTable listings={filtered} />
                )}
            </div>
        </div>
    );
}