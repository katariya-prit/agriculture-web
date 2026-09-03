import { AlertTriangle } from "lucide-react";

type Props = {
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmCard({
    title = "Khatri karo",
    message,
    confirmLabel = "Haa, karo",
    cancelLabel = "Rakhi do",
    danger = true,
    onConfirm,
    onCancel,
}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        danger ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
                    }`}
                >
                    <AlertTriangle className="h-5 w-5" />
                </div>

                <h3 className="mt-3 text-base font-semibold text-emerald-950">{title}</h3>
                <p className="mt-1 text-sm text-emerald-900/60">{message}</p>

                <div className="mt-5 flex gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-emerald-900/10 py-2 text-sm font-medium text-emerald-900/70 hover:bg-emerald-900/5"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`flex-1 rounded-lg py-2 text-sm font-semibold text-white ${
                            danger ? "bg-red-600 hover:bg-red-700" : "bg-[#0f5132] hover:bg-[#0b3d24]"
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}