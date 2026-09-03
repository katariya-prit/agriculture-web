import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import ConfirmCard from "./ConfirmCard";
import SuccessCard from "./SuccessCard";
import ErrorCard from "./ErrorCard";

type ConfirmOptions = {
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
};

type ToastItem = {
    id: number;
    type: "success" | "error";
    title?: string;
    message: string;
};

type FeedbackContextType = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
};

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function useFeedback() {
    const ctx = useContext(FeedbackContext);
    if (!ctx) throw new Error("useFeedback must be used inside <FeedbackProvider>");
    return ctx;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
    type ConfirmState = (ConfirmOptions & { resolve: (value: boolean) => void }) | null;

    const [confirmState, setConfirmState] = useState<ConfirmState>(null);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const idRef = useRef(0);

    const confirm = useCallback((options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setConfirmState({ ...options, resolve });
        });
    }, []);

    const closeConfirm = (result: boolean) => {
        confirmState?.resolve(result);
        setConfirmState(null);
    };

    const addToast = useCallback((type: ToastItem["type"], message: string, title?: string) => {
        const id = idRef.current++;
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const success = useCallback((message: string, title?: string) => addToast("success", message, title), [addToast]);
    const error = useCallback((message: string, title?: string) => addToast("error", message, title), [addToast]);

    return (
        <FeedbackContext.Provider value={{ confirm, success, error }}>
            {children}

            {confirmState && (
                <ConfirmCard
                    title={confirmState.title}
                    message={confirmState.message}
                    confirmLabel={confirmState.confirmLabel}
                    cancelLabel={confirmState.cancelLabel}
                    danger={confirmState.danger}
                    onConfirm={() => closeConfirm(true)}
                    onCancel={() => closeConfirm(false)}
                />
            )}

            <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
                {toasts.map((t) =>
                    t.type === "success" ? (
                        <SuccessCard
                            key={t.id}
                            title={t.title}
                            message={t.message}
                            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                        />
                    ) : (
                        <ErrorCard
                            key={t.id}
                            title={t.title}
                            message={t.message}
                            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                        />
                    )
                )}
            </div>
        </FeedbackContext.Provider>
    );
}