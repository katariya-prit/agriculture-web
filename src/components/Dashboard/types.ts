import type { MandiRate, PriceHistoryPoint, Trend } from "../../../data/mockMarketData";

export type { MandiRate, PriceHistoryPoint, Trend };

export interface DashboardStats {
    cropsTracked?: number;
    marketsCovered?: number;
    gainers?: number;
    losers?: number;
}