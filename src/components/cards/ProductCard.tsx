import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { SaleListing } from "../../Section/sall-management/core/types";
import ActionMenu from "../../acation/ActionMenu";
import ImageViewer, { type ImageViewerHandle } from "../commen/Imageviewer";

interface ProductCardProps {
    listing: SaleListing;
    onEdit?: (listing: SaleListing) => void;
    onDelete?: (id: string) => void;
    /** Kaya route par navigate karvu — default marketplace detail route */
    getDetailPath?: (listing: SaleListing) => string;
}

export default function ProductCard({
    listing,
    onEdit,
    onDelete,
    getDetailPath = (l) => `/dashboard/products/${l.id}`,
}: ProductCardProps) {
    const images = listing.images ?? [];
    const image = images[0];
    const viewerRef = useRef<ImageViewerHandle>(null);
    const navigate = useNavigate();

    function goToDetail() {
        navigate(getDetailPath(listing));
    }

    const menuItems = [
        { label: "View Details", onClick: goToDetail },
        ...(onEdit ? [{ label: "Edit", onClick: () => onEdit(listing) }] : []),
        ...(onDelete ? [{ label: "Delete", onClick: () => onDelete(listing.id), danger: true }] : []),
    ];

    return (
        <div
            onClick={goToDetail}
            className="group relative aspect-3/4 w-full cursor-pointer overflow-hidden rounded-xl border border-green-900/10 bg-green-50 shadow-sm"
        >
            {image ? (
                <img
                    src={image}
                    alt={listing.cropName}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-green-700/40">
                    No Image
                </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b3d24]/95 via-[#0f5132]/50 to-transparent" />

            {listing.sold && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                    Sold
                </span>
            )}

            {images.length > 1 && (
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-xs">
                    {images.length} photos
                </span>
            )}

            <div
                className="absolute right-2 top-2 rounded-lg bg-white/90 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <ActionMenu items={menuItems} />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <h3 className="text-sm font-semibold leading-tight sm:text-base">{listing.cropName}</h3>
                {listing.variety && (
                    <p className="text-xs text-emerald-100/80">{listing.variety}</p>
                )}

                <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 border-t border-white/15 pt-2 text-[11px] sm:text-xs">
                    <div>
                        <span className="text-emerald-100/60">Price</span>
                        <p className="font-semibold">₹{listing.pricePerUnit}/{listing.unit}</p>
                    </div>
                    <div>
                        <span className="text-emerald-100/60">Market</span>
                        <p className="truncate font-semibold">{listing.market}</p>
                    </div>
                </div>
            </div>

            <ImageViewer ref={viewerRef} images={images} altPrefix={listing.cropName} />
        </div>
    );
}