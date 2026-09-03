import { useRef } from "react";
import type { SaleListing } from "../../Section/sall-management/core/types";
import ActionMenu from "../../acation/ActionMenu";
import ImageViewer, { type ImageViewerHandle } from "../commen/Imageviewer";

interface ProductCardProps {
    listing: SaleListing;
    onEdit?: (listing: SaleListing) => void;
    onDelete?: (id: string) => void;
}

export default function ProductCard({ listing, onEdit, onDelete }: ProductCardProps) {
    const images = listing.images ?? [];
    const image = images[0];
    const viewerRef = useRef<ImageViewerHandle>(null);

    const menuItems = [
        ...(onEdit ? [{ label: "Edit", onClick: () => onEdit(listing) }] : []),
        ...(onDelete ? [{ label: "Delete", onClick: () => onDelete(listing.id), danger: true }] : []),
    ];

    return (
        <div className="group relative aspect-3/4 w-full overflow-hidden rounded-xl border border-green-900/10 bg-green-50 shadow-sm">
            {/* Background image — click kare etle wahi thi expand thai ne gallery khule */}
            {image ? (
                <button
                    type="button"
                    onClick={(e) => viewerRef.current?.open(0, e.currentTarget)}
                    className="absolute inset-0 h-full w-full cursor-zoom-in border-0 p-0"
                    aria-label={`View ${listing.cropName} images`}
                >
                    <img
                        src={image}
                        alt={listing.cropName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </button>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-green-700/40">
                    No Image
                </div>
            )}

            {/* Green gradient mask, bottom -> top */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b3d24]/95 via-[#0f5132]/50 to-transparent" />

            {/* Sold badge */}
            {listing.sold && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                    Sold
                </span>
            )}

            {/* Multiple images hoy to count badge */}
            {images.length > 1 && (
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-xs">
                    {images.length} photos
                </span>
            )}

            {/* 3-dot menu, top-right, floating over image */}
            {menuItems.length > 0 && (
                <div className="absolute right-2 top-2 rounded-lg bg-white/90 backdrop-blur-sm">
                    <ActionMenu items={menuItems} />
                </div>
            )}

            {/* Overlay content */}
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
                        <span className="text-emerald-100/60">Quantity</span>
                        <p className="font-semibold">{listing.quantity} {listing.unit}</p>
                    </div>
                    <div>
                        <span className="text-emerald-100/60">Market</span>
                        <p className="truncate font-semibold">{listing.market}</p>
                    </div>
                    {listing.quality && (
                        <div>
                            <span className="text-emerald-100/60">Quality</span>
                            <p className="font-semibold">{listing.quality}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Ek j viewer, badha images ahiya thi j khulse */}
            <ImageViewer ref={viewerRef} images={images} altPrefix={listing.cropName} />
        </div>
    );
}