import {Stock} from "./Stock";
import {StockRatiosTimeline} from "./StockRatiosTimeline";

export interface StockWithRatios {
    stock: Stock,
    stockRatiosTimeline: StockRatiosTimeline,
}