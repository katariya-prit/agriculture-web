// services/httpClient.ts
import { API_BASE_URL } from "../utils/apiConfig";
import { tokenService } from "./tokenService";

export interface ApiError {
    status: number;
    message?: string;
    errors?: unknown[];
    [key: string]: unknown;
}

let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(handler: () => void) {
    onUnauthorized = handler;
}

interface RequestOptions {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: unknown;
}

async function httpRequest<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = tokenService.get();
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: options.method ?? "GET",
        credentials: "include",
        headers,
        body: isFormData
            ? (options.body as FormData)
            : options.body !== undefined
              ? JSON.stringify(options.body)
              : undefined,
    });

    const data = await res.json().catch(() => null);

    if (res.status === 401) {
        tokenService.clear();
        onUnauthorized?.();
    }

    if (!res.ok) {
        const error: ApiError = { status: res.status, ...(data ?? {}) };
        throw error;
    }

    return data as T;
}

export const httpClient = {
    get: <T = unknown>(path: string) => httpRequest<T>(path, { method: "GET" }),

    post: <T = unknown>(path: string, body?: unknown) => httpRequest<T>(path, { method: "POST", body }),

    patch: <T = unknown>(path: string, body?: unknown) => httpRequest<T>(path, { method: "PATCH", body }),

    put: <T = unknown>(path: string, body?: unknown) => httpRequest<T>(path, { method: "PUT", body }),

    delete: <T = unknown>(path: string) => httpRequest<T>(path, { method: "DELETE" }),
};