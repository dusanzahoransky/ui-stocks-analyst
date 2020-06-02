import {StockRatiosPeriods} from "./StockRatiosPeriods";

export interface StockRatiosTimeline {
    id: string,
    symbol: String,
    mic: string,
    exchange: string,
    date: string,
    roic1Y?: number,
    roic3Y?: number,

    revenue1Y?: number,
    revenue3Y?: number,
    revenue5Y?: number,
    revenue9Y?: number,

    eps1Y?: number,
    eps3Y?: number,
    eps5Y?: number,
    eps9Y?: number,

    bps1Y?: number,
    bps3Y?: number,
    bps5Y?: number,
    bps9Y?: number,

    //free ?cash flow
    cash1Y?: number,
    cash3Y?: number,
    cash5Y?: number,
    cash9Y?: number,

    periods: StockRatiosPeriods
}