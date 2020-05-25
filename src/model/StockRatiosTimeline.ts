import {StockRatiosPeriods} from "./StockRatiosPeriods";

export interface StockRatiosTimeline {
    id: string,
    symbol: String,
    mic: string,
    exchange: string,
    date: string,
    periods: StockRatiosPeriods
}