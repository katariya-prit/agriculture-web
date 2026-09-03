// Section/Profile/SellingAccountModal.tsx
import { useEffect, useState } from "react";
import { X, Store } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { toast } from "sonner";

const theme = {
    forest: "#0B3D26",
    leaf: "#1E8F4E",
    leafSoft: "#EAF6EE",
    ink: "#0F2B1D",
    inkSoft: "#5B6E63",
    line: "#DCE8DF",
} as const;

interface Props {
    open?: boolean;
    onClose: () => void;
    onCreated: (sellingAccount: any) => void;
    /** existing values, jo edit mode hoy (future use) */
    initial?: {
        sellingAccountName?: string;
        mobileNumber?: string;
        shortAddress?: string;
        aadhaarNumber?: string;
    };
}

export default function SellingAccountModal({ open, onClose, onCreated, initial }: Props) {
    const { user } = useAuth();

    const [useProfileInfo, setUseProfileInfo] = useState(true);
    const [sellingAccountName, setSellingAccountName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [shortAddress, setShortAddress] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [loading, setLoading] = useState(false);

    // Modal khule tyare auto-fill (checkbox checked hoy to profile data thi)
    useEffect(() => {
        if (!open) return;

        if (initial) {
            setSellingAccountName(initial.sellingAccountName ?? "");
            setMobileNumber(initial.mobileNumber ?? "");
            setShortAddress(initial.shortAddress ?? "");
            setAadhaarNumber(initial.aadhaarNumber ?? "");
            return;
        }

        if (useProfileInfo) {
            setSellingAccountName(user?.fullName ?? "");
        } else {
            setSellingAccountName("");
        }
    }, [open, useProfileInfo, user, initial]);

    if (!open) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!sellingAccountName || !mobileNumber || !shortAddress || !aadhaarNumber) {
            toast.error("Badha fields bharo.");
            return;
        }

        setLoading(true);
        try {
            const data = await api.createSellingAccount({
                sellingAccountName,
                mobileNumber,
                shortAddress,
                aadhaarNumber,
            });
            toast.success("Selling account banai gayu!");
            onCreated(data?.sellingAccount ?? data);
            onClose();
        } catch (err: any) {
            const message =
                err?.errors?.[0]?.message ||
                err?.message ||
                "Selling account banavva ma error aavi.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div
                    className="flex items-center justify-between border-b px-5 py-4"
                    style={{ borderColor: theme.line }}
                >
                    <div className="flex items-center gap-2.5">
                        <div
                            className="grid h-9 w-9 place-items-center rounded-lg"
                            style={{ background: theme.leafSoft, color: theme.leaf }}
                        >
                            <Store className="h-4.5 w-4.5" />
                        </div>
                        <h2 className="text-base font-semibold" style={{ color: theme.ink }}>
                            Selling Account Banavo
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
                    {/* Checkbox — profile info use karo */}
                    <label
                        className="flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm"
                        style={{ borderColor: theme.line, background: theme.leafSoft }}
                    >
                        <input
                            type="checkbox"
                            checked={useProfileInfo}
                            onChange={(e) => setUseProfileInfo(e.target.checked)}
                            className="h-4 w-4 accent-green-700"
                        />
                        <span style={{ color: theme.ink }}>
                            Mari profile ni maahiti vaparo (naam auto-fill thashe)
                        </span>
                    </label>

                    <div>
                        <label className="mb-1 block text-xs font-medium" style={{ color: theme.inkSoft }}>
                            Selling Account Name
                        </label>
                        <input
                            type="text"
                            value={sellingAccountName}
                            onChange={(e) => setSellingAccountName(e.target.value)}
                            placeholder="Jem ke: Katariya Farms"
                            className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-green-500"
                            style={{ borderColor: theme.line }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium" style={{ color: theme.inkSoft }}>
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="9876543210"
                            className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-green-500"
                            style={{ borderColor: theme.line }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium" style={{ color: theme.inkSoft }}>
                            Short Address
                        </label>
                        <input
                            type="text"
                            value={shortAddress}
                            onChange={(e) => setShortAddress(e.target.value)}
                            placeholder="Village, Taluka, District"
                            className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-green-500"
                            style={{ borderColor: theme.line }}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium" style={{ color: theme.inkSoft }}>
                            Aadhaar Number
                        </label>
                        <input
                            type="text"
                            value={aadhaarNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value)}
                            placeholder="XXXX-XXXX-XXXX"
                            className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-green-500"
                            style={{ borderColor: theme.line }}
                        />
                    </div>

                    <div className="mt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                            style={{ borderColor: theme.line, color: theme.inkSoft }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            style={{ background: theme.leaf }}
                        >
                            {loading ? "Banavi rahyu chhe..." : "Banavo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}