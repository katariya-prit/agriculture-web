// Section/Profile/Profile.tsx
import { useEffect, useMemo, useState } from "react";
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
    type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import SellingAccountModal from "./SellingAccountModal";

const theme = {
    forest: "#0B3D26",
    leaf: "#1E8F4E",
    leafSoft: "#EAF6EE",
    paper: "#F4F8F5",
    ink: "#0F2B1D",
    inkSoft: "#5B6E63",
    line: "#DCE8DF",
    gold: "#B4791B",
    amberSoft: "#FDF3DC",
} as const;

interface ChecklistEntry {
    key: string;
    label: string;
    done: boolean;
}

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
    profileCompletion?: {
        percent: number;
        checklist: ChecklistEntry[];
    };
}

const CHECKLIST_META: Record<string, { icon: LucideIcon; desc: string }> = {
    basicIdentity: { icon: User, desc: "Photo, janm tarikh, gender" },
    farmAndLandDetails: { icon: MapPin, desc: "Village, taluka, survey number" },
    cropAndProductionInfo: { icon: Sprout, desc: "Pak, season, ane yield details (optional)" },
};

interface ProgressRingProps {
    percent: number;
    size?: number;
    stroke?: number;
}

function ProgressRing({ percent, size = 120, stroke = 10 }: ProgressRingProps) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference * (1 - clamped / 100);

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={theme.leafSoft} strokeWidth={stroke} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={theme.leaf}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 700ms ease" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold" style={{ color: theme.forest }}>
                    {clamped}%
                </span>
                <span className="text-[11px]" style={{ color: theme.inkSoft }}>
                    complete
                </span>
            </div>
        </div>
    );
}

function ChecklistItem({ item }: { item: ChecklistEntry }) {
    const meta = CHECKLIST_META[item.key];
    const Icon = meta?.icon ?? FileCheck2;

    return (
        <div
            className="flex h-full items-center gap-3 rounded-xl border px-3.5 py-3"
            style={{ borderColor: theme.line, background: item.done ? "white" : theme.amberSoft }}
        >
            <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                style={{ background: item.done ? theme.leafSoft : "white", color: item.done ? theme.leaf : theme.gold }}
            >
                <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" style={{ color: theme.ink }}>
                    {item.label}
                </p>
                <p className="truncate text-xs" style={{ color: theme.inkSoft }}>
                    {meta?.desc ?? ""}
                </p>
            </div>
            {item.done && <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: theme.leaf }} />}
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="flex w-full flex-col gap-5 p-4 sm:p-6" style={{ background: theme.paper }}>
            <div className="flex w-full animate-pulse items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm sm:p-6" style={{ borderColor: theme.line }}>
                <div className="h-24 w-24 shrink-0 rounded-full bg-gray-100" />
                <div className="flex flex-1 flex-col gap-2">
                    <div className="h-5 w-1/3 rounded bg-gray-100" />
                    <div className="h-3 w-1/4 rounded bg-gray-100" />
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    const { user } = useAuth();

    const [account, setAccount] = useState<SellingAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); // 👈 modal open/close control

    async function fetchAccount() {
        setLoading(true);
        try {
            const data = await api.getSellingAccount();
            setAccount(data?.sellingAccount ?? data ?? null);
        } catch (err: any) {
            setAccount(null); // 404 = account nathi, e normal chhe
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAccount();
    }, []);

    const percent = account?.profileCompletion?.percent ?? 0;
    const checklist = useMemo<ChecklistEntry[]>(
        () => account?.profileCompletion?.checklist ?? [],
        [account]
    );
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

    if (loading) return <ProfileSkeleton />;

    return (
        <div className="flex w-full flex-col gap-5 p-4 sm:p-6" style={{ background: theme.paper }}>
            {/* Selling account nathi — top banner + CTA */}
            {!account && (
                <div
                    className="flex flex-col items-center gap-3 rounded-2xl border p-5 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left"
                    style={{ borderColor: theme.line, background: theme.leafSoft }}
                >
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: "white", color: theme.leaf }}>
                            <Store className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold" style={{ color: theme.ink }}>
                                Tame hajun selling account banavyu nathi
                            </p>
                            <p className="text-xs" style={{ color: theme.inkSoft }}>
                                Pak vechva mate pahela selling account setup karo.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)} // 👈 aa click e modal khole chhe
                        className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: theme.leaf }}
                    >
                        <Plus className="h-4 w-4" />
                        Selling Account Banavo
                    </button>
                </div>
            )}

            {/* top view */}
            <div
                className="flex w-full flex-col gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
                style={{ borderColor: theme.line }}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="grid h-24 w-24 shrink-0 place-items-center rounded-full p-1 shadow-md"
                        style={{ background: theme.leaf, boxShadow: `0 8px 20px -8px ${theme.leaf}` }}
                    >
                        <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-white">
                            {account?.photoUrl ? (
                                <img src={account.photoUrl} alt={displayName} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold" style={{ color: theme.forest }}>
                                    {initials}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl font-bold sm:text-2xl" style={{ color: theme.ink }}>
                            {displayName}
                        </h1>
                        <p className="text-sm sm:text-base" style={{ color: theme.inkSoft }}>
                            {shortName}
                        </p>
                        {account && (
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)} // 👈 edit pan same modal
                                className="mt-2 flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                                style={{ borderColor: theme.line, color: theme.forest }}
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Profile edit karo
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                    {user?.email && (
                        <div className="flex items-center gap-2 text-sm" style={{ color: theme.inkSoft }}>
                            <Mail className="h-4 w-4 shrink-0" style={{ color: theme.leaf }} />
                            <span>{user.email}</span>
                        </div>
                    )}
                    {account?.mobileNumber && (
                        <div className="flex items-center gap-2 text-sm" style={{ color: theme.inkSoft }}>
                            <Phone className="h-4 w-4 shrink-0" style={{ color: theme.leaf }} />
                            <span>{account.mobileNumber}</span>
                            {account.mobileVerified && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: theme.leaf }} />}
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm" style={{ color: theme.inkSoft }}>
                        <MapPin className="h-4 w-4 shrink-0" style={{ color: theme.leaf }} />
                        <span>{address}</span>
                    </div>
                </div>
            </div>

            {/* profile completion */}
            {account && (
                <div className="flex w-full flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm sm:p-6" style={{ borderColor: theme.line }}>
                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold" style={{ color: theme.ink }}>
                                Profile completion
                            </h2>
                            <p className="text-sm" style={{ color: theme.inkSoft }}>
                                Tamari profile complete karo, khareedar ne vadhu bharoso male.
                            </p>
                        </div>
                        <ProgressRing percent={percent} />
                    </div>

                    {percent < 100 && (
                        <p className="rounded-xl px-4 py-3 text-sm" style={{ background: theme.leafSoft, color: theme.forest }}>
                            {remaining.length} step{remaining.length === 1 ? "" : "s"} baaki chhe — niche list check karo.
                        </p>
                    )}

                    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                        {checklist.map((item) => (
                            <ChecklistItem key={item.key} item={item} />
                        ))}
                    </div>
                </div>
            )}

            {/* 👇 aa j actual create/edit modal chhe — SellingAccountModal.tsx */}
            <SellingAccountModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreated={(newAccount) => setAccount(newAccount)}
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