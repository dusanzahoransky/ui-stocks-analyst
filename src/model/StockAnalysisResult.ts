import {StockWithRatios} from "./StockWithRatios";
import {Stock} from "./Stock";

export interface StockAnalysisResult {
    averages: Stock;
    stocks: StockWithRatios[];
}