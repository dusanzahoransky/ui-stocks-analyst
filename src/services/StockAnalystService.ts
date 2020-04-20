import {AnalysisResult} from "../model/AnalysisResult";
import resultUsd from "./Result-usd-2020-04-18.json"
import resultEur from "./Result-eur-2020-04-19.json"
import resultChf from "./Result-chf-2020-04-19.json"
import resultAud from "./Result-aud-2020-04-19.json"
import resultGbp from "./Result-gbp-2020-04-19.json"
import resultTest from "./Result-test.json"
import {CellData} from "../model/CellData";
import {TableColumn} from "../model/TableColumn";
import moment from "moment";

export class StockAnalystService {

    loadTestAnalysis(): AnalysisResult {
        return resultTest as unknown as AnalysisResult
    }
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

    // loadNasdaq100Analysis(): AnalysisResult {
    //     return result100Nasdaq as unknown as AnalysisResult
    // }

    scoreRow(averages: number[], rowValues: number[] | string[]): CellData[] {
        const cellData: CellData[] = []
        rowValues.forEach((value, colIndex) => {
            cellData.push({
                value,
                score: StockAnalystService.scoreData(value, colIndex, rowValues, averages)
            })
        })

        const totalScore = cellData.map(data => data.score)
            .filter(score => score && !Number.isNaN(score))
            .reduce((prev, curr) => prev + curr, 0);

        cellData.push({
            value: totalScore
        })

        return cellData
    }

    private static scoreData(value: number | string, colIndex: number, rowValues: number[] | string[], averages: number[]): number {

        if(!value){
            return 0
        }
        const number: number = value as number
        const string: string = value as string

        let score

        switch (colIndex) {

            case TableColumn.id:
            case TableColumn.date:
            case TableColumn.symbol:
            case TableColumn.exchange:
            case TableColumn.companyName:
            case TableColumn.enterpriseValue:
            case TableColumn.totalCashPerShare:
            case TableColumn.week52High:
            case TableColumn.week52Low:
            case TableColumn.week52Change:
            case TableColumn.week52AboveLowPercent:
            case TableColumn.week52BelowHighPercent:
            case TableColumn.price:
            case TableColumn.priceBook:
                break;

            case TableColumn.change: {
                score = number > 10 || number < -10 ? number - 10 : 0
                break
            }
            case TableColumn.totalCashPerSharePercent:
                score = number * 0.1
                break
            case TableColumn.totalDebtEquity:
                score = -number
                break;
            case TableColumn.trailingPE:
                score = 20 - number
                break;
            case TableColumn.forwardPE:
                score = 20 - number
                break;
            case TableColumn.priceToSalesTrailing12Months:
                score = 20 - number
                score *= 0.1
                break;
            case TableColumn.enterpriseValueRevenue:
                score = 10 - number
                score *= 0.1
                break;
            case TableColumn.enterpriseValueEBITDA:
                score = 20 - number
                score *= 0.2
                break;
            case TableColumn.yoyQuarterlyEarningsGrowthPercent:
                score = number
                break;
            case TableColumn.yoyQuarterlyRevenueGrowthPercent:
                score = number
                score *= 1
                break;
            case TableColumn.priceEarningGrowth:
                score = 5 - number
                score *= 10
                break;
            case TableColumn.trailingPriceEarningGrowth:
                score = 5 - number
                score *= 5
                break;
            case TableColumn.exDividendDate:
                const daysToExDivident = - moment().diff(string, 'days')
                const lastDivYield = rowValues[TableColumn.trailingAnnualDividendYield] as number
                score = daysToExDivident > 0 && daysToExDivident < 30 ? Math.pow(lastDivYield, 2) : 0
                break;
            case TableColumn.fiveYearAvgDividendYield:
                score = number
                score *= 5
                break;
            case TableColumn.trailingAnnualDividendYield:
                score = number
                score *= 5
                break;
            case TableColumn.belowTargetLowPricePercent:
                score = number
                score *= 5
                break;
            case TableColumn.belowTargetMedianPricePercent:
                score = number
                score *= 10
                break;
            case TableColumn.heldByInsiders:
                score = number
                break;
            case TableColumn.heldByInstitutions:
                score = -number
                score *= 0.1
                break;
            case TableColumn.shortToFloat:
                score = 10 - number
                break;
            case TableColumn.sharesShortPrevMonthCompare:
                score = 100 - number
                score *= 0.3
                break;

        }
        return score;
    }
}