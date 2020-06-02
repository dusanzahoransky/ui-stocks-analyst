import {StockInfoWithRatios} from "./StockInfoWithRatios";
import {StockInfo} from "./StockInfo";

export interface StockAnalysisResult {
    averages: StockInfo;
    stocks: StockInfoWithRatios[];
}