import { toast } from "sonner";

const TOKEN_KEY = "auth_token";

export const tokenService = {
    get(): string | null {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    },

    set(token: string): void {
        try {
            localStorage.setItem(TOKEN_KEY, token);
        } catch {
            toast.error("avalable token")
        }
    },

    clear(): void {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch {
        }
    },

    hasToken(): boolean {
        return Boolean(this.get());
    },
};