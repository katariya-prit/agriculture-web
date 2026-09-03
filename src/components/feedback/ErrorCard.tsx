import { XCircle, X } from "lucide-react";

type Props = {
    title?: string;
    message: string;
    onClose: () => void;
};

export default function ErrorCard({ title = "Error aavi", message, onClose }: Props) {
    return (
        <div className="flex w-80 items-start gap-3 rounded-xl border border-red-900/10 bg-white p-3 shadow-lg">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <XCircle className="h-4 w-4" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-red-950">{title}</p>
                <p className="text-xs text-red-900/60">{message}</p>
            </div>
            <button type="button" onClick={onClose} className="text-red-900/30 hover:text-red-900/60">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}