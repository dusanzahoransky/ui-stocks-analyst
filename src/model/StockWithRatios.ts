import {Stock} from "./Stock";
import {StockRatiosTimeline} from "./StockRatiosTimeline";

export interface StockWithRatios {
    stockInfo: Stock,
    stockRatiosTimeline: StockRatiosTimeline,
}