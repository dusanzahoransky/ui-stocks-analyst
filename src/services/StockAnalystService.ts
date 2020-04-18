import {AnalysisResult} from "../model/AnalysisResult";
import resultUsd from "./Result-usd-2020-04-18.json"
import {TableColumn} from "../model/TableColumn";
import {CellData} from "../model/CellData";

export class StockAnalystService {

    // loadAudAnalysis(): AnalysisResult {
    //     return resultAud as unknown as AnalysisResult
    // }
    // loadChfAnalysis(): AnalysisResult {
    //     return resultChf as unknown as AnalysisResult
    // }
    // loadEurAnalysis(): AnalysisResult {
    //     return resultEur as unknown as AnalysisResult
    // }
    // loadGbpAnalysis(): AnalysisResult {
    //     return resultGbp as unknown as AnalysisResult
    // }
    loadUsdAnalysis(): AnalysisResult {
        return resultUsd as unknown as AnalysisResult
    }
    // loadNasdaq100Analysis(): AnalysisResult {
    //     return result100Nasdaq as unknown as AnalysisResult
    // }

    scoreData(averages: number[], rowValues: number[] | string[]): CellData[] {
        const cellData: CellData[] = []
        for(const value of rowValues){
            cellData.push( {
                value
            } )
        }
        return cellData
    }
}