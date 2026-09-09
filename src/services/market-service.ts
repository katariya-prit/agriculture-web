// services/market-service.ts

export type Trend = "up" | "down" | "stable";

export interface MandiRate {
    id: string;
    crop: string;
    variety: string;
    market: string;
    district: string;
    state: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    unit: string;
    trend: Trend;
    changePercent: number;
    updatedAt: string;
}

export interface PriceHistoryPoint {
    day: string;
    price: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";

export async function getMarketRates(): Promise<MandiRate[]> {
    const response = await fetch(`${API_BASE_URL}/api/market-rates`);
    if (!response.ok) throw new Error(`Failed to fetch market rates: ${response.status}`);
    const json = await response.json();
    return json.data as MandiRate[];
}

export async function getPriceHistory(crop: string): Promise<PriceHistoryPoint[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/price-history?crop=${encodeURIComponent(crop)}`
    );
    if (!response.ok) throw new Error(`Failed to fetch price history: ${response.status}`);
    const json = await response.json();
    return json.data as PriceHistoryPoint[];
}

// --- Reference data (markets/cities) ---
// Jo aa backend thi dynamic aavvu hoy to niche wala 2 ne bhi
// fetch(`${API_BASE_URL}/api/markets`) thi replace kari shakay.

const MARKETS: { market: string; district: string; state: string }[] = [
    { market: "Ahmedabad APMC", district: "Ahmedabad", state: "Gujarat" },
    { market: "Rajkot APMC", district: "Rajkot", state: "Gujarat" },
    { market: "Unjha APMC", district: "Mehsana", state: "Gujarat" },
    { market: "Gondal APMC", district: "Rajkot", state: "Gujarat" },
    { market: "Deesa APMC", district: "Banaskantha", state: "Gujarat" },
    { market: "Surat APMC", district: "Surat", state: "Gujarat" },
];

export const CITY_LIST = Array.from(new Set(MARKETS.map((item) => item.district)));

export function getMarketsForCity(city: string): string[] {
    return MARKETS.filter((item) => item.district === city).map((item) => item.market);
}