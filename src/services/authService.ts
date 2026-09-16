import { httpClient } from "./httpClient";
import { tokenService } from "./tokenService";

export interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    isEmailVerified: boolean;
    sellingAccountId: string | null;
    type?: "farmer" | "buyer" | "admin";
}

interface LoginResponse {
    user: User;
    token: string;
}

interface SignupPayload {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

export const authService = {
    async signup(payload: SignupPayload) {
        return httpClient.post<{ message: string; user: User }>("/auth/signup", payload);
    },

    async verifyEmail(payload: { email: string; token: string }) {
        return httpClient.post<{ message: string; expired?: boolean }>("/auth/verify-email", payload);
    },

    async resendVerification(payload: { email: string }) {
        return httpClient.post<{ message: string }>("/auth/resend-verification", payload);
    },

    async login(payload: { email: string; password: string }) {
        const data = await httpClient.post<LoginResponse>("/auth/login", payload);

        if (data?.token) {
            tokenService.set(data.token);
        }

        return data.user;
    },

    async logout() {
        try {
            await httpClient.delete("/auth/logout");
        } finally {
            tokenService.clear();
        }
    },

    async me() {
        if (!tokenService.hasToken()) return null;
        const data = await httpClient.get<{ user: User }>("/auth/me");
        return data?.user ?? null;
    },
};