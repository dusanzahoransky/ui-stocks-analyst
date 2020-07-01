import {StockWithRatios} from "./StockWithRatios";
import {Stock} from "./Stock";

export interface EtfsAnalysisResult {
    averages: Stock;
    stocks: Stock[];
}