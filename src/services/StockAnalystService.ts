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
import {PriceEpsData} from "../model/PriceEpsData";
import {StockInfo} from "../model/StockInfo";

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

        if (!value) {
            return 0
        }
        const number: number = value as number
        const string: string = value as string

        let score

        switch (colIndex) {
            case TableColumn.change: {
                score = number > 10 || number < -10 ? number - 10 : 0
                break
            }
            case TableColumn.totalCashPerSharePercent:
                score = number * 0.1
                break
            case TableColumn.trailingPE:
                score = 20 - number + (1 / Math.log1p(number))
                score *= 10
                break;
            case TableColumn.forwardPE:
                score = 20 - number + (1 / Math.log1p(number))
                score *= 10
                break;
            case TableColumn.priceToSalesTrailing12Months:
                score = 0;
                break;
            case TableColumn.enterpriseValueRevenue:
                score = 5 - number
                score *= 1
                break;
            case TableColumn.enterpriseValueEBITDA:
                score = 10 - number
                score *= 2
                break;
            case TableColumn.yoyQuarterlyRevenueGrowthPercent:
                score = number
                score *= 2
                break;
            case TableColumn.priceEarningGrowth:
                score = 5 - number
                score *= 2
                break;
            case TableColumn.trailingPriceEarningGrowth:
                score = 5 - number
                score *= 1
                break;
            case TableColumn.belowTargetLowPricePercent:
                score = number
                score *= 5
                break;
            case TableColumn.belowTargetMedianPricePercent:
                score = number
                score *= 5
                break;
            case TableColumn.exDividendDate:
                const daysToExDivident = -moment().diff(string, 'days')
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
            case TableColumn.heldByInsiders:
                score = number
                score *= 0.5
                break;
            case TableColumn.heldByInstitutions:
                score = -number
                score *= 0.05
                break;
            case TableColumn.shortToFloat:
                score = 10 - number
                break;
            case TableColumn.sharesShortPrevMonthCompare:
                score = 100 - number
                score *= 0.3
                break;
            case TableColumn.netIncomeGrowthLastQuarter:
                score = number
                break;
            case TableColumn.netIncomeGrowthLastYear:
                score = number
                break;
            case TableColumn.netIncomeGrowthLast3Years:
                score = number
                score *= 0.5
                break;
             case TableColumn.revenueGrowthLastQuarter:
                score = number
                score *= 0.3
                break;
           case TableColumn.revenueGrowthLastYear:
                score = number
                score *= 0.3
                break;
            case TableColumn.revenueGrowthLast3Years:
                score = number
                score *= 0.1
                break;
            case TableColumn.cashGrowthLastQuarter:
                score = number
                score *= 0.2
                break;
            case TableColumn.inventoryGrowthLastQuarter:
                score = number
                score *= -0.1
                break;
            case TableColumn.totalShareholdersEquityGrowthLastQuarter:
                score = number
                score *= 0.1
                break;
            case TableColumn.totalShareholdersEquityGrowthLastYear:
                score = number
                score *= 0.1
                break;
            case TableColumn.totalShareholdersEquityGrowthLast3Years:
                score = number
                score *= 0.1
                break;
            case TableColumn.currentLiabilitiesToEquityLastQuarter:
                score = 0.5 - number
                score *= 1
                break;
            case TableColumn.currentLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 1
                break;
            case TableColumn.totalLiabilitiesToEquityLastQuarter:
                score = 1 - number
                score *= 1
                break;
            case TableColumn.totalLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 0.1
                break;
            case TableColumn.stockGrowthLastQuarter:
                score = number
                score *= -0.1
                break;
            case TableColumn.stockGrowthLastYear:
                score = number
                score *= -0.1
                break;
            case TableColumn.stockGrowthLast3Years:
                score = number
                score *= -0.1
                break;
            case TableColumn.epsGrowthLastQuarter:
                score = number
                score *= 1
                break;
            case TableColumn.epsGrowthLast2Quarters:
                score = number
                score *= 0.5
                break;
            case TableColumn.epsGrowthLast3Quarters:
                score = number
                score *= 0.5
                break;
            case TableColumn.epsGrowthEstimateLastQuarter:
                score = number
                score *= 1
                break;
        }
        return score;
    }

    /**
     * Number to the exponent power, keeping the sign.
     * E.g. signPow(-2, 2) == -4
     */
    private static signPow(number: number, exponent: number) {
        let absPow = Math.pow(Math.abs(number), 1.3);
        return absPow * Math.sign(number);
    }
}