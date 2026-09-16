import { Phone, Star } from "lucide-react";
import type { TransportListing } from "./types";

type Props = {
    listings: TransportListing[];
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

export default function TransportTable({ listings, onEdit, onDelete, getDetailPath }: Props) {
    return (
        <div className="overflow-x-auto rounded-xl border border-emerald-900/10">
            <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-[#f2f5f2] text-xs uppercase tracking-wide text-emerald-900/50">
                    <tr>
                        <th className="px-4 py-3">Provider</th>
                        <th className="px-4 py-3">Vehicle</th>
                        <th className="px-4 py-3">Area</th>
                        <th className="px-4 py-3">Rate</th>
                        <th className="px-4 py-3">Rating</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/5">
                    {listings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-emerald-900/[0.03]">
                            <td className="px-4 py-3 font-medium text-emerald-950">
                                {getDetailPath ? (
                                    <a href={getDetailPath(listing)} className="hover:underline">
                                        {listing.providerName}
                                    </a>
                                ) : (
                                    listing.providerName
                                )}
                            </td>
                            <td className="px-4 py-3 text-emerald-900/70">
                                {listing.vehicleType} · {listing.capacityTon} Ton
                            </td>
                            <td className="px-4 py-3 text-emerald-900/70">{listing.area}</td>
                            <td className="px-4 py-3 font-semibold text-[#0f5132]">
                                ₹{listing.ratePerKm}/km
                            </td>
                            <td className="px-4 py-3">
                                <span className="flex items-center gap-1 text-emerald-900/70">
                                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    {listing.rating.toFixed(1)}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${availabilityStyles[listing.availability]}`}
                                >
                                    {availabilityLabel[listing.availability]}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-2">
                                    <a
                                        href={`tel:${listing.contactNumber}`}
                                        className="rounded-lg bg-[#0f5132] p-1.5 text-white hover:bg-[#0b3d24]"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                    </a>
                                    {onEdit && (
                                        <button
                                            type="button"
                                            onClick={() => onEdit(listing)}
                                            className="rounded-lg border border-emerald-900/10 px-2 py-1 text-xs font-medium text-emerald-900/70 hover:bg-emerald-900/5"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            type="button"
                                            onClick={() => onDelete(listing.id)}
                                            className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}