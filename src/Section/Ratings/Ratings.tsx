import { Star, Package, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { useTheme } from "../../components/theme/ThemeContext";

type StarBreakdown = {
    stars: number;
    count: number;
};

type Review = {
    id: string;
    name: string;
    location: string;
    rating: number;
    comment: string;
    initials: string;
    accent: "emerald" | "amber" | "sky";
};

const sellerScore = 4.8;
const reviewCount = 12;

const breakdown: StarBreakdown[] = [
    { stars: 5, count: 9 },
    { stars: 4, count: 2 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
];

const stats = {
    dealsDone: 12,
    onTimePercent: 100,
    aadhaarVerified: true,
};

const reviews: Review[] = [
    {
        id: "anil-kumar",
        name: "Anil Kumar",
        location: "Delhi",
        rating: 5.0,
        comment: "Wheat quality was exactly as listed. Payment was smooth via UPI. Will buy again.",
        initials: "AK",
        accent: "emerald",
    },
    {
        id: "priya-vendors",
        name: "Priya Vendors",
        location: "Mumbai",
        rating: 4.0,
        comment: "Good grade A quality. Delivery was 1 day late but farmer communicated well.",
        initials: "PV",
        accent: "amber",
    },
    {
        id: "raj-stores",
        name: "Raj Stores",
        location: "Pune",
        rating: 5.0,
        comment: "Best direct purchase experience. No middlemen, honest price.",
        initials: "RS",
        accent: "sky",
    },
];

const avatarAccentText: Record<Review["accent"], string> = {
    emerald: "text-green-700",
    amber: "text-amber-600",
    sky: "text-sky-600",
};

export default function Ratings() {
    const { theme } = useTheme();
    const isdark = theme === "dark";
    const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

    const bg = isdark ? "bg-[#272727]" : "bg-[#eef2f5]";
    const raised = isdark
        ? "shadow-[6px_6px_14px_#1c1c1c,-6px_-6px_14px_#323232]"
        : "shadow-[6px_6px_14px_#c5c9cc,-6px_-6px_14px_#ffffff]";
    const raisedSm = isdark
        ? "shadow-[4px_4px_10px_#1c1c1c,-4px_-4px_10px_#323232]"
        : "shadow-[4px_4px_10px_#c5c9cc,-4px_-4px_10px_#ffffff]";
    const pressed = isdark
        ? "shadow-[inset_3px_3px_7px_#1c1c1c,inset_-3px_-3px_7px_#323232]"
        : "shadow-[inset_3px_3px_7px_#c5c9cc,inset_-3px_-3px_7px_#ffffff]";
    const textPrimary = isdark ? "text-gray-200" : "text-emerald-950";
    const textMuted = isdark ? "text-gray-400" : "text-emerald-900/60";
    const textFaint = isdark ? "text-gray-500" : "text-emerald-900/50";
    const divider = isdark ? "divide-white/5" : "divide-emerald-900/5";

    function StarRow({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
        const filled = Math.round(rating);
        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`${size} ${i < filled ? "fill-amber-400 text-amber-400" : isdark ? "text-white/10" : "text-emerald-900/15"}`}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={`min-h-full ${bg} p-4 sm:p-6 transition-colors duration-300`}>
            <div className={`mb-6 flex items-center gap-4 rounded-[28px] ${bg} ${raised} px-6 py-5 transition-all duration-300`}>
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] ${bg} ${raisedSm}`}>
                    <Star className={`h-6 w-6 ${isdark ? "text-amber-400" : "text-amber-500"}`} />
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div>
                        <h1 className={`text-lg font-semibold leading-tight ${textPrimary}`}>Ratings & Trust</h1>
                        <p className={`text-sm ${textMuted}`}>
                            Tamari seller reputation ane buyer reviews ahiya male chhe.
                        </p>
                    </div>
                    <span className={`flex items-center gap-1.5 rounded-full ${bg} ${raisedSm} px-3.5 py-1.5 text-xs font-medium ${textPrimary}`}>
                        <BadgeCheck className={`h-3.5 w-3.5 ${isdark ? "text-green-400" : "text-green-700"}`} />
                        Verified seller
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <h2 className={`mb-4 text-sm font-semibold ${textPrimary}`}>Your seller score</h2>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex shrink-0 flex-col items-center gap-1 sm:items-start">
                            <p className={`text-4xl font-bold ${textPrimary}`}>{sellerScore.toFixed(1)}</p>
                            <StarRow rating={sellerScore} />
                            <p className={`text-xs ${textFaint}`}>{reviewCount} reviews</p>
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                            {breakdown.map((row) => (
                                <div key={row.stars} className="flex items-center gap-2">
                                    <span className={`w-3 shrink-0 text-xs ${textFaint}`}>{row.stars}</span>
                                    <div className={`h-2 flex-1 overflow-hidden rounded-full ${bg} ${pressed}`}>
                                        <div
                                            className="h-full rounded-full bg-amber-400 transition-all duration-500"
                                            style={{ width: `${(row.count / maxCount) * 100}%` }}
                                        />
                                    </div>
                                    <span className={`w-4 shrink-0 text-right text-xs ${textFaint}`}>{row.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div className={`flex flex-col items-center gap-1.5 rounded-2xl ${bg} ${raisedSm} py-4`}>
                            <Package className={`h-4 w-4 ${isdark ? "text-green-400" : "text-green-700"}`} />
                            <span className={`text-sm font-semibold ${textPrimary}`}>{stats.dealsDone}</span>
                            <span className={`text-[11px] ${textMuted}`}>Deals done</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1.5 rounded-2xl ${bg} ${raisedSm} py-4`}>
                            <Clock className={`h-4 w-4 ${isdark ? "text-green-400" : "text-green-700"}`} />
                            <span className={`text-sm font-semibold ${textPrimary}`}>{stats.onTimePercent}%</span>
                            <span className={`text-[11px] ${textMuted}`}>On time</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1.5 rounded-2xl ${bg} ${raisedSm} py-4`}>
                            <ShieldCheck className={`h-4 w-4 ${isdark ? "text-green-400" : "text-green-700"}`} />
                            <span className={`text-sm font-semibold ${textPrimary}`}>
                                {stats.aadhaarVerified ? "Verified" : "Pending"}
                            </span>
                            <span className={`text-[11px] ${textMuted}`}>Aadhaar verified</span>
                        </div>
                    </div>
                </div>

                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <h2 className={`mb-4 text-sm font-semibold ${textPrimary}`}>Reviews from buyers</h2>

                    <div className={`flex flex-col divide-y ${divider}`}>
                        {reviews.map((review) => (
                            <div key={review.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${raisedSm} text-xs font-semibold ${avatarAccentText[review.accent]}`}
                                >
                                    {review.initials}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`truncate text-sm font-semibold ${textPrimary}`}>
                                            {review.name} · {review.location}
                                        </p>
                                        <span className={`shrink-0 text-sm font-semibold ${textPrimary}`}>
                                            {review.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    <StarRow rating={review.rating} size="h-3.5 w-3.5" />
                                    <p className={`mt-1 text-xs ${textMuted}`}>{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}