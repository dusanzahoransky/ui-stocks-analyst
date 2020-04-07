import {AnalysisResult} from "../model/AnalysisResult";
import output from "./output.json"

export class StockAnalystService {

    loadAnalysis(): AnalysisResult {
        return output as unknown as AnalysisResult
    }

}