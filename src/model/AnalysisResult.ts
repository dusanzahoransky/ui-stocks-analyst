import {StockInfo} from "./StockInfo";

export interface AnalysisResult {
    averages: StockInfo;
    stocks: StockInfo[];
}