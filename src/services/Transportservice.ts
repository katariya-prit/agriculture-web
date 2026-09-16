import axios from "axios";
import type { TransportListing } from "../Section/Transparent/core/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const transportService = {
    async getAll<T = TransportListing[]>() {
        const res = await axios.get<T>(`${API_BASE}/transport`);
        return res.data;
    },
    async getMine<T = TransportListing[]>() {
        const res = await axios.get<T>(`${API_BASE}/transport/mine`);
        return res.data;
    },
    async getById(id: string) {
        const res = await axios.get<TransportListing>(`${API_BASE}/transport/${id}`);
        return res.data;
    },
    async create(payload: Partial<TransportListing>) {
        const res = await axios.post<TransportListing>(`${API_BASE}/transport`, payload);
        return res.data;
    },
    async update(id: string, payload: Partial<TransportListing>) {
        const res = await axios.put<TransportListing>(`${API_BASE}/transport/${id}`, payload);
        return res.data;
    },
    async delete(id: string) {
        await axios.delete(`${API_BASE}/transport/${id}`);
    },
};