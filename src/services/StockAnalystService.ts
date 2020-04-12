import {AnalysisResult} from "../model/AnalysisResult";
import resultAud from "./Result-aud-2020-04-12.json"
import resultChf from "./Result-chf-2020-04-12.json"
import resultEur from "./Result-eur-2020-04-12.json"
import resultGbp from "./Result-gbp-2020-04-12.json"
import resultUsd from "./Result-usd-2020-04-12.json"
import result100Nasdaq from "./Result-nasdaq100-2020-04-12.json"
import {TableColumn} from "../model/TableColumn";

export class StockAnalystService {

    loadAudAnalysis(): AnalysisResult {
        return resultAud as unknown as AnalysisResult
    }
    loadChfAnalysis(): AnalysisResult {
        return resultChf as unknown as AnalysisResult
    }
    loadEurAnalysis(): AnalysisResult {
        return resultEur as unknown as AnalysisResult
    }
    loadGbpAnalysis(): AnalysisResult {
        return resultGbp as unknown as AnalysisResult
    }
    loadUsdAnalysis(): AnalysisResult {
        return resultUsd as unknown as AnalysisResult
    }
    loadNasdaq100Analysis(): AnalysisResult {
        return result100Nasdaq as unknown as AnalysisResult
    }

    transformData(rowData: any[]): any[] {
        return rowData.map( (value, columnIndex) => {
            const price = rowData[TableColumn.price];
            switch (columnIndex) {
                case TableColumn.week52AboveLow:
                    //transform 52 week low into current price % above the 52 low
                    return (price - value) / price * 100;
                case TableColumn.week52BelowHigh:
                    //transform 52 week high into current price % below the 52 high
                    return (value - price) / price * 100;
                default: return value;
            }
        })
    }
}