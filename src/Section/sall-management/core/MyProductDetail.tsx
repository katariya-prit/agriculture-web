// Section/sall-management/MyProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Calendar, Package, Pencil, Trash2 } from "lucide-react";
import { getSaleListingById, deleteSaleListing } from "../../../lib/salesApi";
import type { SaleListing } from "../core/types";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";

export default function MyProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { confirm, success, error } = useFeedback();

    const [listing, setListing] = useState<SaleListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        (async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getSaleListingById(id);
                setListing(data ?? null);
            } catch (err) {
                console.error(err);
                setListing(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    async function handleDelete() {
        if (!listing) return;
        const ok = await confirm({
            message: "Aa listing delete karvi chhe?",
            confirmLabel: "Delete karo",
            danger: true,
        });
        if (!ok) return;

        try {
            await deleteSaleListing(listing.id);
            success("Listing delete thai gayu.");
            navigate("/dashboard/my-product");
        } catch (err) {
            console.error(err);
            error("Delete karva ma error aavi.");
        }
    }

    if (loading) {
        return (
            <div className="min-h-full bg-[#f2f5f2] p-4 sm:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="aspect-video w-full rounded-2xl bg-emerald-900/10" />
                    <div className="h-6 w-1/3 rounded bg-emerald-900/10" />
                    <div className="h-4 w-1/2 rounded bg-emerald-900/10" />
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="flex min-h-full flex-col items-center justify-center gap-3 bg-[#f2f5f2] p-4 sm:p-6">
                <p className="text-sm text-green-900/60">Aa listing malyu nathi.</p>
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/my-product")}
                    className="flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Maru Listing par pacha jao
                </button>
            </div>
        );
    }

    const images = listing.images ?? [];

    return (
        <div className="min-h-full bg-[#f2f5f2] p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/my-product")}
                    className="flex w-fit items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Maru Listing par pacha jao
                </button>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => console.log("Edit:", listing)}
                        className="flex items-center gap-1.5 rounded-xl border border-green-600 px-3.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-1.5 rounded-xl border border-red-500 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-3">
                    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
                        {images[activeImage] ? (
                            <img
                                src={images[activeImage]}
                                alt={listing.cropName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-green-900/40">
                                No Image
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {images.map((src, i) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${activeImage === i ? "border-green-600" : "border-transparent"
                                        }`}
                                >
                                    <img src={src} alt={`${listing.cropName} ${i + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-green-950 sm:text-2xl">{listing.cropName}</h1>
                            {listing.variety && (
                                <p className="text-sm text-green-700/70">{listing.variety}</p>
                            )}
                        </div>
                        {listing.sold && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                                Sold
                            </span>
                        )}
                    </div>

                    <p className="mb-5 text-2xl font-bold text-green-800">
                        ₹{listing.pricePerUnit}
                        <span className="text-sm font-normal text-green-700/60"> / {listing.unit}</span>
                    </p>

                    <div className="flex flex-col gap-3 border-t border-emerald-900/10 pt-4 text-sm">
                        <div className="flex items-center gap-2.5 text-green-900/80">
                            <MapPin className="h-4 w-4 shrink-0 text-green-600" />
                            <span>{listing.market}</span>
                        </div>

                        {listing.harvestDate && (
                            <div className="flex items-center gap-2.5 text-green-900/80">
                                <Calendar className="h-4 w-4 shrink-0 text-green-600" />
                                <span>Harvest: {listing.harvestDate}</span>
                            </div>
                        )}

                        {listing.contactNumber && (
                            <div className="flex items-center gap-2.5 text-green-900/80">
                                <Phone className="h-4 w-4 shrink-0 text-green-600" />
                                <span>{listing.contactNumber}</span>
                            </div>
                        )}

                        {listing.unit && (
                            <div className="flex items-center gap-2.5 text-green-900/80">
                                <Package className="h-4 w-4 shrink-0 text-green-600" />
                                <span>Unit: {listing.unit}</span>
                            </div>
                        )}
                    </div>

                    {listing.description && (
                        <div className="mt-5 border-t border-emerald-900/10 pt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-700/50">
                                Description
                            </p>
                            <div
                                className="prose prose-sm max-w-none text-green-900/80"
                                dangerouslySetInnerHTML={{ __html: listing.description }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}