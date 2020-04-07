import {Statistics} from "./Statistics";
import {StockTicker} from "./StockTicker";

export interface StockInfo {
    ticker: StockTicker,
    statistics: Statistics
}