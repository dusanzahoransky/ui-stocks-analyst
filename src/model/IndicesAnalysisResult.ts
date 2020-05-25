import {StockInfoWithRatios} from "./StockInfoWithRatios";
import {StockInfo} from "./StockInfo";

export interface IndicesAnalysisResult {
    averages: StockInfo;
    stocks: StockInfo[];
}