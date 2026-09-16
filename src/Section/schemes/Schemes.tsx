import { Landmark, Sprout, ShieldCheck, CreditCard, Wheat, Users, ChevronRight } from "lucide-react";
import { useTheme } from "../../components/theme/ThemeContext";

type SchemeAction = "check-status" | "apply" | "apply-link";

type Scheme = {
    id: string;
    name: string;
    detail: string;
    action: SchemeAction;
    icon: typeof Landmark;
    accent: string;
};

type FpoGroup = {
    id: string;
    name: string;
    members: number;
    status: "Joined" | "Open";
    pooledQtl: number;
    icon: typeof Wheat;
    accent: "emerald" | "amber";
};

const profile = {
    location: "Pune, MH",
    landSize: "3 acres",
    cropType: "Wheat farmer",
};

const schemes: Scheme[] = [
    {
        id: "pm-kisan",
        name: "PM-KISAN Samman Nidhi",
        detail: "₹6,000/year direct to bank · Next: ₹2,000 in 18 days",
        action: "check-status",
        icon: Sprout,
        accent: "bg-emerald-100 text-emerald-700",
    },
    {
        id: "pmfby",
        name: "PMFBY crop insurance",
        detail: "Kharif 2026 deadline: Oct 31 · Premium: ₹600/acre",
        action: "apply",
        icon: ShieldCheck,
        accent: "bg-sky-100 text-sky-700",
    },
    {
        id: "kcc",
        name: "Kisan Credit Card (KCC)",
        detail: "Up to ₹3L credit at 4% interest rate",
        action: "apply-link",
        icon: CreditCard,
        accent: "bg-amber-100 text-amber-700",
    },
];

const fpoGroups: FpoGroup[] = [
    {
        id: "pune-wheat-fpo",
        name: "Pune Wheat FPO",
        members: 42,
        status: "Joined",
        pooledQtl: 420,
        icon: Wheat,
        accent: "emerald",
    },
    {
        id: "mh-soybean-group",
        name: "MH Soybean Group",
        members: 28,
        status: "Open",
        pooledQtl: 310,
        icon: Sprout,
        accent: "amber",
    },
];

const fpoAccentStyles: Record<"emerald" | "amber", string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
};

export default function Schemes() {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    // ---- Neumorphic tokens (theme-aware, same as Transport page) ----
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
    const textPrimary = isdark ? "text-gray-200" : "text-emerald-950";
    const textMuted = isdark ? "text-gray-400" : "text-emerald-900/60";
    const divider = isdark ? "divide-white/5" : "divide-emerald-900/5";

    function SchemeActionButton({ scheme }: { scheme: Scheme }) {
        if (scheme.action === "check-status") {
            return (
                <button
                    type="button"
                    className={`rounded-xl px-3.5 py-2 text-xs font-medium ${bg} ${raisedSm} ${textMuted} transition-all duration-200 active:${pressed}`}
                >
                    Check status
                </button>
            );
        }

        if (scheme.action === "apply") {
            return (
                <button
                    type="button"
                    className={`rounded-xl ${bg} ${raisedSm} px-3.5 py-2 text-xs font-medium text-green-700 transition-all duration-200`}
                >
                    Apply now
                </button>
            );
        }

        return (
            <button
                type="button"
                className="flex items-center gap-0.5 text-xs font-medium text-green-700 hover:underline"
            >
                Apply
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        );
    }

    return (
        <div className={`min-h-full ${bg} p-4 sm:p-6 transition-colors duration-300`}>
            {/* Header */}
            <div className={`mb-6 flex items-center gap-4 rounded-[28px] ${bg} ${raised} px-6 py-5 transition-all duration-300`}>
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] ${bg} ${raisedSm}`}>
                    <Landmark className={`h-6 w-6 ${isdark ? "text-green-400" : "text-green-700"}`} />
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div>
                        <h1 className={`text-lg font-semibold leading-tight ${textPrimary}`}>Govt. Schemes</h1>
                        <p className={`text-sm ${textMuted}`}>
                            Tamara mate eligible yojnao ane FPO groups ahiya male chhe.
                        </p>
                    </div>
                    <span className={`rounded-full ${bg} ${raisedSm} px-3.5 py-1.5 text-xs font-medium ${textPrimary}`}>
                        {schemes.length} eligible
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* Eligible schemes */}
                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <div className={`mb-5 rounded-2xl ${bg} ${pressed} px-4 py-3.5 text-sm ${textPrimary}`}>
                        Based on your profile — {profile.location} · {profile.landSize} · {profile.cropType}
                    </div>

                    <h2 className={`mb-3 text-sm font-semibold ${textPrimary}`}>You are eligible for</h2>

                    <div className={`flex flex-col divide-y ${divider}`}>
                        {schemes.map((scheme) => {
                            const Icon = scheme.icon;
                            return (
                                <div key={scheme.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${raisedSm}`}>
                                        <Icon className={`h-4.5 w-4.5 ${isdark ? "text-green-400" : "text-green-700"}`} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`truncate text-sm font-semibold ${textPrimary}`}>{scheme.name}</p>
                                        <p className={`truncate text-xs ${textMuted}`}>{scheme.detail}</p>
                                    </div>
                                    <SchemeActionButton scheme={scheme} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FPO groups */}
                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <div className="mb-1 flex items-center gap-2">
                        <h2 className={`text-sm font-semibold ${textPrimary}`}>FPO — group selling</h2>
                        <span className={`rounded-full ${bg} ${raisedSm} px-2.5 py-1 text-[10px] font-semibold text-violet-500`}>
                            New
                        </span>
                    </div>
                    <p className={`mb-4 text-xs ${textMuted}`}>
                        Join a Farmer Producer Organisation to sell as a group and get better prices from bulk buyers.
                    </p>

                    <div className={`mb-4 flex flex-col divide-y ${divider}`}>
                        {fpoGroups.map((group) => {
                            const Icon = group.icon;
                            return (
                                <div key={group.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${raisedSm}`}>
                                        <Icon className={`h-4.5 w-4.5 ${isdark ? "text-green-400" : "text-green-700"}`} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`truncate text-sm font-semibold ${textPrimary}`}>{group.name}</p>
                                        <p className={`truncate text-xs ${textMuted}`}>
                                            {group.members} farmers · {group.status}
                                        </p>
                                    </div>
                                    <span className={`shrink-0 text-xs font-medium ${textMuted}`}>
                                        {group.pooledQtl} qtl pooled
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className={`flex w-full items-center justify-center gap-2 rounded-2xl ${bg} ${raisedSm} py-3.5 text-sm font-semibold text-green-700 transition-all duration-200`}
                    >
                        <Users className="h-4 w-4" />
                        Join or create an FPO group
                    </button>
                </div>
            </div>
        </div>
    );
}