import { CheckCircle2, X } from "lucide-react";

type Props = {
    title?: string;
    message: string;
    onClose: () => void;
};

export default function SuccessCard({ title = "Thai gayu!", message, onClose }: Props) {
    return (
        <div className="flex w-80 items-start gap-3 rounded-xl border border-emerald-900/10 bg-white p-3 shadow-lg">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-950">{title}</p>
                <p className="text-xs text-emerald-900/60">{message}</p>
            </div>
            <button type="button" onClick={onClose} className="text-emerald-900/30 hover:text-emerald-900/60">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}