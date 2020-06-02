import {StockInfo} from "./StockInfo";
import {StockRatiosTimeline} from "./StockRatiosTimeline";

export interface StockInfoWithRatios {
    stockInfo: StockInfo,
    stockRatiosTimeline: StockRatiosTimeline,
}