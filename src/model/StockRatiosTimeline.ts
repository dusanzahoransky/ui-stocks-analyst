import {Ratios} from "./Ratios";

export interface StockRatiosTimeline {
    id: string,
    symbol: String,
    mic: string,
    exchange: string,
    date: string,
    periods: {[period: string]: Ratios}
}