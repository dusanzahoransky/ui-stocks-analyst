import {AnalysisResult} from "../model/AnalysisResult";
import {CellData} from "../model/CellData";
import {TableColumn} from "../model/TableColumn";
import moment from "moment";
import {BackendError} from "../model/BackendError";
import {StockInfo} from "../model/StockInfo";
import resultTest from "./Result-test.json"
import symbolTest from "./Symbols-test.json"

export class StockAnalystService {

    async loadAnalysis(watchlist: string, forceRefresh: boolean, mockData: boolean): Promise<AnalysisResult | BackendError> {
        if (watchlist === 'TEST') {
            return Promise.resolve(resultTest)
        } else {
            return fetch(`http://localhost:3000/stocks/watchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&mockData=${mockData}`)
                .then(r => r.json() as unknown as AnalysisResult);
        }
    }

    async loadStock(symbol: string, forceRefresh: boolean, mockData: boolean): Promise<StockInfo | BackendError> {
        if (symbol.startsWith('TEST')) {
            return Promise.resolve(symbolTest)
        } else {
            return fetch(`http://localhost:3000/stocks/watchlist?symbol=${symbol}&forceRefresh=${forceRefresh}&mockData=${mockData}`)
                .then(r => r.json() as unknown as StockInfo);
        }
    }

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
                score = this.peScore(number) * 0.2;
                break;
            case TableColumn.forwardPE:
                score = this.peScore(number) * 0.2;
                break;
            case TableColumn.priceToSalesTrailing12Months:
                score = 0;
                break;
            case TableColumn.enterpriseValueRevenue:
                score = 5 - number
                score *= 1
                break;
            case TableColumn.enterpriseValueEBITDA:
                score = this.ratioBatterThan(number, 10, 20)
                score *= 3
                break;
            case TableColumn.priceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case TableColumn.trailingPriceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case TableColumn.belowTargetLowPricePercent:
                score = number
                score *= 1
                break;
            case TableColumn.belowTargetMedianPricePercent:
                score = number
                score *= 1
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
            case TableColumn.netIncomeGrowthLast2Quarters:
                score = number
                score *= 0.5
                break;
            case TableColumn.netIncomeGrowthLast3Years:
                score = number
                score *= 0.5
                break;
            case TableColumn.revenueGrowthLastQuarter:
                score = number
                score *= 0.3
                break;
            case TableColumn.revenueGrowthLast2Quarters:
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
                score = StockAnalystService.ratioScore(number)
                score *= 1
                break;
            case TableColumn.totalLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 0.1
                break;
            case TableColumn.stockGrowthLastQuarter:
                score = number > 10 ? -10 : 0
                break;
            case TableColumn.stockGrowthLastYear:
                score = number > 10 ? -10 : 0
                score *= 0.5
                break;
            case TableColumn.stockGrowthLast3Years:
                score = number > 10 ? -10 : 0
                score *= 0.5
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
            case TableColumn.epsGrowthLastYear:
                score = number
                score *= 0.3
                break;
            case TableColumn.epsGrowthLast2Years:
                score = number
                score *= 0.2
                break;
            case TableColumn.epsGrowthLast3Years:
                score = number
                score *= 0.2
                break;
            case TableColumn.peGrowthLastQuarter:
                score = -number
                score *= 1
                break;
            case TableColumn.peGrowthLast2Quarters:
                score = -number
                score *= 1
                break;
            case TableColumn.peGrowthLast3Quarters:
                score = -number
                score *= 0.75
                break;
            case TableColumn.peLastQuarter:
                score = this.peScore(number);
                break;


        }
        return score;
    }

    static ratioBatterThan(number?: number, positiveLimit?: number, maxThreshold: number = 50) {
        let score: number
        if (number > 0) {

            if (number <= positiveLimit + maxThreshold) {
                score = positiveLimit - number
            } else {
                score = - maxThreshold * 2
            }

        } else {
            score = - maxThreshold * 3 + ((1 / number) * 100)
        }
        return score;
    }

    static ratioScore(number?: number, maxThreshold: number = 50) {
        let score: number
        if (number > 0) {

            if (number <= maxThreshold) {
                score = -number
            } else {
                score = - maxThreshold * 2
            }

        } else {
            score = - maxThreshold * 3 + ((1 / number) * 100)
        }
        return score;
    }

    static peScore(number?: number) {
        let score: number
        if (number > 0) {

            if (number < 200) {
                score = (20 - number - 25) + (1 / Math.log2(1 + number) * 100)
            } else {
                score = -200
            }

        } else {
            score = (number - 300) + (-1 / Math.log1p(-number) * 100)

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

    filterDisplayableStats(stockInfo: StockInfo): StockInfo {
        const colNames = StockAnalystService.getTableColumnNames();

        for (const statName of Object.keys(stockInfo)) {
            if (!colNames.find(colName => colName === statName)) {
                delete stockInfo[statName]
            }
        }
        return stockInfo
    }

    private static getTableColumnNames(): string[] {
        const enumNames = []
        for (const enumMember in TableColumn) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                enumNames.push(enumMember)
            }
        }
        return enumNames
    }
}