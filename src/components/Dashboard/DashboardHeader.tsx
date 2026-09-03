// components/Dashboard/DashboardHeader.tsx
import { RefreshCw } from "lucide-react";

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export default function DashboardHeader({ refreshing, onRefresh }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
                <h1 className="text-lg font-bold text-green-950 sm:text-xl">
                    Mandi Bhav Dashboard
                </h1>
                <p className="mt-0.5 text-xs text-gray-500">
                    Aajna market rates - khedut mate updated bhav
                </p>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-2 text-xs font-semibold text-green-700 shadow-sm transition hover:bg-green-50 disabled:opacity-50"
            >
                <RefreshCw
                    className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
            </button>

        </div>
    );
}