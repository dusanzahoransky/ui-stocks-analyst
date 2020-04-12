import {Statistics} from "./Statistics";
import {StockTicker} from "./StockTicker";

export interface StockInfo {
    id?: string,
    timestamp?: string,
    symbol: string,
    exchange: string,
    companyName: string,
    statistics: Statistics
}