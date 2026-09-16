import { Truck, MapPin, Phone, Star } from "lucide-react";
import type { TransportListing } from "./types";

type Props = {
    listing: TransportListing;
    onEdit?: (listing: TransportListing) => void;
    onDelete?: (id: string) => void;
    getDetailPath?: (listing: TransportListing) => string;
};

const availabilityStyles: Record<TransportListing["availability"], string> = {
    available: "bg-emerald-100 text-emerald-700",
    busy: "bg-amber-100 text-amber-700",
    offline: "bg-gray-100 text-gray-500",
};

const availabilityLabel: Record<TransportListing["availability"], string> = {
    available: "Available",
    busy: "Busy",
    offline: "Offline",
};

export default function TransportCard({ listing, onEdit, onDelete, getDetailPath }: Props) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-emerald-900/10 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-video w-full overflow-hidden bg-emerald-900/5">
                {listing.imageUrl ? (
                    <img
                        src={listing.imageUrl}
                        alt={listing.providerName}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Truck className="h-10 w-10 text-emerald-900/20" />
                    </div>
                )}
                <span
                    className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${availabilityStyles[listing.availability]}`}
                >
                    {availabilityLabel[listing.availability]}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-3">
                <h3 className="truncate text-sm font-semibold text-emerald-950">
                    {listing.providerName}
                </h3>

                <p className="flex items-center gap-1 text-xs text-emerald-900/60">
                    <Truck className="h-3.5 w-3.5" />
                    {listing.vehicleType} · {listing.capacityTon} Ton
                </p>

                <p className="flex items-center gap-1 text-xs text-emerald-900/60">
                    <MapPin className="h-3.5 w-3.5" />
                    {listing.area}
                </p>

                <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0f5132]">
                        ₹{listing.ratePerKm}/km
                    </span>
                    <span className="flex items-center gap-1 text-xs text-emerald-900/60">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {listing.rating.toFixed(1)}
                    </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <a
                        href={`tel:${listing.contactNumber}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0f5132] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0b3d24]"
                    >
                        <Phone className="h-3.5 w-3.5" />
                        Call karo
                    </a>
                    {getDetailPath && (
                        <a
                            href={getDetailPath(listing)}
                            className="flex-1 rounded-lg border border-emerald-900/10 px-3 py-1.5 text-center text-xs font-medium text-emerald-900/70 hover:bg-emerald-900/5"
                        >
                            Details
                        </a>
                    )}
                </div>

                {(onEdit || onDelete) && (
                    <div className="mt-1 flex items-center gap-2">
                        {onEdit && (
                            <button
                                type="button"
                                onClick={() => onEdit(listing)}
                                className="flex-1 rounded-lg border border-emerald-900/10 px-3 py-1.5 text-xs font-medium text-emerald-900/70 hover:bg-emerald-900/5"
                            >
                                Edit karo
                            </button>
                        )}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={() => onDelete(listing.id)}
                                className="flex-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                            >
                                Delete karo
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}