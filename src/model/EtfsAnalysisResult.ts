import {StockInfoWithRatios} from "./StockInfoWithRatios";
import {StockInfo} from "./StockInfo";

export interface EtfsAnalysisResult {
    averages: StockInfo;
    stocks: StockInfo[];
}