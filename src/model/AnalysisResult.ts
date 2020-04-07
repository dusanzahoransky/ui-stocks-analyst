import {Statistics} from "./Statistics";
import {StockInfo} from "./StockInfo";

export interface AnalysisResult {
    statisticsAllPeriods: string[];
    statisticsAverage: Statistics;
    stocks: StockInfo[];
}