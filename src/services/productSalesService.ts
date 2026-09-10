// services/productSalesService.ts
import { httpClient } from "./httpClient";

export const productSalesService = {
    create: (formData: FormData) => httpClient.post("/api/product-salls", formData),

    getAll: <T = unknown>() => httpClient.get<T>("/api/product-salls"),

    getMine: <T = unknown>() => httpClient.get<T>("/api/product-salls/my"),

    getById: async (id: string) => {
        try {
            return await httpClient.get(`/api/product-salls/${id}`);
        } catch (err) {
            const apiErr = err as { status?: number };
            if (apiErr?.status === 404) return undefined;
            throw err;
        }
    },

    update: (id: string, formData: FormData) => httpClient.put(`/api/product-salls/${id}`, formData),

    delete: (id: string) => httpClient.delete(`/api/product-salls/${id}`),
};