import { useEffect, useState } from "react";
import {
    Mail,
    MapPin,
    Phone,
    FileCheck2,
    User,
    Sprout,
    CheckCircle2,
    Pencil,
    Store,
    Plus,
    Lightbulb,
    type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { sellingAccountService } from "../../services/sellingAccountService";
import SellingAccountModal from "./SellingAccountModal";
import { analyzeProfile, type ChecklistEntry } from "../../services/Profileanalysisservice";
import { useTheme } from "../../components/theme/ThemeContext";

interface SellingAccount {
    id: string;
    userId: string;
    sellingAccountName?: string;
    mobileNumber?: string;
    mobileVerified?: boolean;
    shortAddress?: string;
    aadhaarNumber?: string;
    aadhaarVerified?: boolean;
    photoUrl?: string | null;
    village?: string | null;
    taluka?: string | null;
    district?: string | null;
    state?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    primaryCrops?: string[] | null;
    cropSeason?: string | null;
    farmingType?: string | null;
    soilType?: string | null;
}

interface GetSellingAccountResponse {
    sellingAccount?: SellingAccount;
}

const CHECKLIST_META: Record<string, { icon: LucideIcon }> = {
    quickInfo: { icon: Store },
    identity: { icon: User },
    farm: { icon: MapPin },
    crop: { icon: Sprout },
};

interface ProgressRingProps {
    percent: number;
    size?: number;
    stroke?: number;
    isdark: boolean;
}

function ProgressRing({ percent, size = 120, stroke = 10, isdark }: ProgressRingProps) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference * (1 - clamped / 100);

    const trackColor = isdark ? "#1f2e24" : "#EAF6EE";
    const fillColor = isdark ? "#22c55e" : "#1E8F4E";

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={stroke} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={fillColor}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 700ms ease" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-semibold ${isdark ? "text-emerald-100" : "text-[#0B3D26]"}`}>
                    {clamped}%
                </span>
                <span className={`text-[11px] ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>complete</span>
            </div>
        </div>
    );
}

function ChecklistItem({ item, isdark }: { item: ChecklistEntry; isdark: boolean }) {
    const Icon = CHECKLIST_META[item.key]?.icon ?? FileCheck2;

    return (
        <div
            className={`flex h-full items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${isdark
                    ? item.done
                        ? "border-zinc-800 bg-[#181818]"
                        : "border-amber-500/20 bg-amber-500/5"
                    : item.done
                        ? "border-[#DCE8DF] bg-white"
                        : "border-[#DCE8DF] bg-[#FDF3DC]"
                }`}
        >
            <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${isdark
                        ? item.done
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-[#272727] text-amber-400"
                        : item.done
                            ? "bg-[#EAF6EE] text-[#1E8F4E]"
                            : "bg-white text-[#B4791B]"
                    }`}
            >
                <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium ${isdark ? "text-zinc-200" : "text-[#0F2B1D]"}`}>
                    {item.label}
                </p>
                <p className={`truncate text-xs ${isdark ? "text-zinc-500" : "text-[#5B6E63]"}`}>{item.desc}</p>
            </div>
            {item.done && (
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${isdark ? "text-emerald-400" : "text-[#1E8F4E]"}`} />
            )}
        </div>
    );
}

function ProfileSkeleton({ isdark }: { isdark: boolean }) {
    return (
        <div className={`flex w-full flex-col gap-5 p-4 sm:p-6 ${isdark ? "bg-[#0f0f0f]" : "bg-[#F4F8F5]"}`}>
            <div
                className={`flex w-full animate-pulse items-center gap-4 rounded-2xl border p-5 shadow-sm sm:p-6 ${isdark ? "border-zinc-800 bg-[#181818]" : "border-[#DCE8DF] bg-white"
                    }`}
            >
                <div className={`h-24 w-24 shrink-0 rounded-full ${isdark ? "bg-zinc-800" : "bg-gray-100"}`} />
                <div className="flex flex-1 flex-col gap-2">
                    <div className={`h-5 w-1/3 rounded ${isdark ? "bg-zinc-800" : "bg-gray-100"}`} />
                    <div className={`h-3 w-1/4 rounded ${isdark ? "bg-zinc-800" : "bg-gray-100"}`} />
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [account, setAccount] = useState<SellingAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    async function fetchAccount() {
        setLoading(true);
        try {
            const data = await sellingAccountService.get<GetSellingAccountResponse>();
            setAccount(data?.sellingAccount ?? null);
        } catch {
            setAccount(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAccount();
    }, []);

    const analysis = analyzeProfile(user, account);
    const { percent, checklist, tip } = analysis;
    const remaining = checklist.filter((i) => !i.done);

    const displayName = user?.fullName ?? "";
    const shortName = account?.sellingAccountName ?? user?.username ?? "";
    const address = account?.village
        ? `Village ${account.village}, Ta. ${account.taluka}, ${account.district}, ${account.state}`
        : account?.shortAddress ?? "Address hajun nathi umervayu";

    const initials = (displayName || "?")
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .join("")
        .slice(0, 2)
        .toUpperCase();

    if (loading) return <ProfileSkeleton isdark={isdark} />;

    return (
        <div className={`flex w-full flex-col gap-5 p-4 sm:p-6 ${isdark ? "bg-[#0f0f0f]" : "bg-[#F4F8F5]"}`}>
            {!account && (
                <div
                    className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left ${isdark ? "border-emerald-500/20 bg-emerald-500/5" : "border-[#DCE8DF] bg-[#EAF6EE]"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${isdark ? "bg-[#181818] text-emerald-400" : "bg-white text-[#1E8F4E]"
                                }`}
                        >
                            <Store className="h-5 w-5" />
                        </div>
                        <div>
                            <p className={`text-sm font-semibold ${isdark ? "text-zinc-100" : "text-[#0F2B1D]"}`}>
                                Tame hajun selling account banavyu nathi
                            </p>
                            <p className={`text-xs ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                                Pak vechva mate pahela selling account setup karo.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer ${isdark ? "bg-emerald-600" : "bg-[#1E8F4E]"
                            }`}
                    >
                        <Plus className="h-4 w-4" />
                        Selling Account Banavo
                    </button>
                </div>
            )}

            <div
                className={`flex w-full flex-col gap-6 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 ${isdark ? "border-zinc-800 bg-[#181818]" : "border-[#DCE8DF] bg-white"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`grid h-24 w-24 shrink-0 place-items-center rounded-full p-1 shadow-md ${isdark ? "bg-emerald-600 shadow-emerald-600/30" : "bg-[#1E8F4E] shadow-[#1E8F4E]/40"
                            }`}
                    >
                        <div
                            className={`grid h-full w-full place-items-center overflow-hidden rounded-full ${isdark ? "bg-[#0f0f0f]" : "bg-white"
                                }`}
                        >
                            {account?.photoUrl ? (
                                <img src={account.photoUrl} alt={displayName} className="h-full w-full object-cover" />
                            ) : (
                                <span className={`text-3xl font-bold ${isdark ? "text-emerald-300" : "text-[#0B3D26]"}`}>
                                    {initials}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className={`text-xl font-bold sm:text-2xl ${isdark ? "text-zinc-50" : "text-[#0F2B1D]"}`}>
                            {displayName}
                        </h1>
                        <p className={`text-sm sm:text-base ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                            {shortName}
                        </p>
                        {account && (
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className={`mt-2 flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${isdark
                                        ? "border-zinc-700 text-emerald-300 hover:bg-zinc-800"
                                        : "border-[#DCE8DF] text-[#0B3D26] hover:bg-[#EAF6EE]"
                                    }`}
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Profile edit karo
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                    {user?.email && (
                        <div className={`flex items-center gap-2 text-sm ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                            <Mail className={`h-4 w-4 shrink-0 ${isdark ? "text-emerald-400" : "text-[#1E8F4E]"}`} />
                            <span>{user.email}</span>
                        </div>
                    )}
                    {account?.mobileNumber && (
                        <div className={`flex items-center gap-2 text-sm ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                            <Phone className={`h-4 w-4 shrink-0 ${isdark ? "text-emerald-400" : "text-[#1E8F4E]"}`} />
                            <span>{account.mobileNumber}</span>
                            {account.mobileVerified && (
                                <CheckCircle2 className={`h-3.5 w-3.5 ${isdark ? "text-emerald-400" : "text-[#1E8F4E]"}`} />
                            )}
                        </div>
                    )}
                    <div className={`flex items-center gap-2 text-sm ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                        <MapPin className={`h-4 w-4 shrink-0 ${isdark ? "text-emerald-400" : "text-[#1E8F4E]"}`} />
                        <span>{address}</span>
                    </div>
                </div>
            </div>

            <div
                className={`flex w-full flex-col gap-5 rounded-2xl border p-5 shadow-sm sm:p-6 ${isdark ? "border-zinc-800 bg-[#181818]" : "border-[#DCE8DF] bg-white"
                    }`}
            >
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className={`text-lg font-semibold ${isdark ? "text-zinc-50" : "text-[#0F2B1D]"}`}>
                            Profile completion
                        </h2>
                        <p className={`text-sm ${isdark ? "text-zinc-400" : "text-[#5B6E63]"}`}>
                            Tamari profile complete karo, khareedar ne vadhu bharoso male.
                        </p>
                    </div>
                    <ProgressRing percent={percent} isdark={isdark} />
                </div>

                {percent < 100 && (
                    <p
                        className={`rounded-xl px-4 py-3 text-sm ${isdark ? "bg-emerald-500/10 text-emerald-300" : "bg-[#EAF6EE] text-[#0B3D26]"
                            }`}
                    >
                        {remaining.length} step{remaining.length === 1 ? "" : "s"} baaki chhe — niche list check karo.
                    </p>
                )}

                {tip && (
                    <div
                        className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${isdark ? "border-amber-500/20 bg-amber-500/5" : "border-[#DCE8DF] bg-[#FDF3DC]"
                            }`}
                    >
                        <Lightbulb className={`mt-0.5 h-4 w-4 shrink-0 ${isdark ? "text-amber-400" : "text-[#B4791B]"}`} />
                        <span className={isdark ? "text-zinc-200" : "text-[#0F2B1D]"}>{tip}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                    {checklist.map((item) => (
                        <ChecklistItem key={item.key} item={item} isdark={isdark} />
                    ))}
                </div>
            </div>

            <SellingAccountModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreated={() => {
                    fetchAccount();
                }}
                initial={
                    account
                        ? {
                            sellingAccountName: account.sellingAccountName,
                            mobileNumber: account.mobileNumber,
                            shortAddress: account.shortAddress,
                            aadhaarNumber: account.aadhaarNumber,
                        }
                        : undefined
                }
            />
        </div>
    );
}