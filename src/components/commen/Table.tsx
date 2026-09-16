import { useNavigate } from "react-router-dom";
import type { SaleListing } from "../../Section/sall-management/core/types";
import ActionMenu from "../../acation/ActionMenu";
import NotFound from "../feedback/NotFound";

interface ProductTableProps {
    listings: SaleListing[];
    onEdit?: (listing: SaleListing) => void;
    onDelete?: (id: string) => void;
    getDetailPath?: (listing: SaleListing) => string;
}

export default function ProductTable({
    listings,
    onEdit,
    onDelete,
    getDetailPath = (l) => `/dashboard/products/${l.id}`,
}: ProductTableProps) {
    const navigate = useNavigate();

    if (listings.length === 0) {
        return <NotFound title="Koi listing nathi" message="Table ma dekhadva mate koi data nathi." />;
    }

    function goToDetail(listing: SaleListing) {
        navigate(getDetailPath(listing));
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-green-900/10">
            <table className="w-full text-sm">
                <thead className="bg-green-50 text-left text-xs uppercase text-green-700/60">
                    <tr>
                        <th className="px-4 py-3">Crop</th>
                        <th className="px-4 py-3">Market</th>
                        <th className="px-4 py-3">Price/Unit</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-green-900/5">
                    {listings.map((listing) => {
                        const menuItems = [
                            { label: "View Details", onClick: () => goToDetail(listing) },
                            ...(onEdit ? [{ label: "Edit", onClick: () => onEdit(listing) }] : []),
                            ...(onDelete ? [{ label: "Delete", onClick: () => onDelete(listing.id), danger: true }] : []),
                        ];

                        return (
                            <tr
                                key={listing.id}
                                onClick={() => goToDetail(listing)}
                                className="cursor-pointer hover:bg-green-50/50"
                            >
                                <td className="px-4 py-3 font-medium text-green-950">{listing.cropName}</td>
                                <td className="px-4 py-3 text-green-700/70">{listing.market}</td>
                                <td className="px-4 py-3 font-medium text-green-800">₹{listing.pricePerUnit}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${listing.sold ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                                            }`}
                                    >
                                        {listing.sold ? "Sold" : "Active"}
                                    </span>
                                </td>
                                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-end">
                                        <ActionMenu items={menuItems} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}