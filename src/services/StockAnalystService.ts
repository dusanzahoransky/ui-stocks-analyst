import {AnalysisResult} from "../model/AnalysisResult";
import {CellData} from "../model/CellData";
import {StockTableColumn} from "../model/StockTableColumn";
import moment from "moment";
import {BackendError} from "../model/BackendError";
import {StockInfo} from "../model/StockInfo";
import resultTest from "./Result-test.json"
import indicesTest from "./Indices-test.json"
import symbolTest from "./Symbols-test.json"
import {IndexTableColumn} from "../model/IndexTableColumn";

export class StockAnalystService {

    async loadAnalysis(watchlist: string, forceRefresh: boolean, mockData: boolean): Promise<AnalysisResult | BackendError> {
        if (watchlist === 'TEST') {
            return Promise.resolve(resultTest)
        } else {
            return fetch(`http://localhost:3000/stocks/watchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&mockData=${mockData}`)
                .then(r => r.json() as unknown as AnalysisResult);
        }
    }

    async loadIndicesAnalysis(watchlist: string, forceRefresh: boolean, mockData: boolean): Promise<AnalysisResult | BackendError> {
        if (watchlist === 'TEST_INDICES') {
            return Promise.resolve(indicesTest)
        } else {
            return fetch(`http://localhost:3000/stocks/indicesWatchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&mockData=${mockData}`)
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

    scoreRow(averages: number[], rowValues: number[] | string[], isIndex: boolean): CellData[] {
        const cellData: CellData[] = []
        rowValues.forEach((value, colIndex) => {
            const score = isIndex ?
                StockAnalystService.scoreIndexData(value, colIndex, rowValues, averages) :
                StockAnalystService.scoreStockData(value, colIndex, rowValues, averages);
            cellData.push({
                value,
                score: score
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

    private static scoreIndexData(value: number | string, colIndex: number, rowValues: number[] | string[], averages: number[]): number {
        if (!value) {
            return 0
        }
        const number: number = value as number
        const string: string = value as string
        const avg = averages[colIndex] as number
        let score

        switch (colIndex) {
            case IndexTableColumn.change: {
                score = number > 5 || number < -5 ? number - 10 : 0
                break
            }
            case IndexTableColumn.yield: {
                score = number - avg
                score *= 5
                break;
            }
            case IndexTableColumn.ytdReturn: {
                score = number - avg
                score *= 3
                break;
            }
            case IndexTableColumn.threeYearAverageReturn: {
                score = number - avg
                score *= 2
                break;
            }
            case IndexTableColumn.fiveYearAverageReturn: {
                score = number - avg
                score *= 2
                break;
            }
            case IndexTableColumn.priceToEarnings: {
                score = avg - number
                score *= 20
                break;
            }
            case IndexTableColumn.priceToBook: {
                score = avg - number
                score *= 1
                break;
            }
            case IndexTableColumn.priceToCashflow: {
                score = avg - number
                score *= 3
                break;
            }
            case IndexTableColumn.priceToSales: {
                score = avg - number
                score *= 3
                break;
            }
            case IndexTableColumn.oneMonth: {
                score = number - avg
                score *= 1
                break;
            }
            case IndexTableColumn.threeMonth: {
                score = number - avg
                score *= 2
                break;
            }
            case IndexTableColumn.oneYear: {
                score = number - avg
                score *= 3
                break;
            }
            case IndexTableColumn.threeYear: {
                score = number - avg
                score *= 5
                break;
            }
            case IndexTableColumn.ytd: {
                score = number - avg
                score *= 3
                break;
            }
            case IndexTableColumn.fiveYear: {
                score = number - avg
                score *= 1
                break;
            }
            case IndexTableColumn.tenYear: {
                score = number - avg
                score *= 1
                break;
            }

            case IndexTableColumn.lastBearMkt: {
                score = number - avg
                score *= 5
                break;
            }
            case IndexTableColumn.lastBullMkt: {
                score = number - avg
                score *= 5
                break;
            }
            case IndexTableColumn.annualHoldingsTurnover: {
                score = avg - number
                score *= 5
                break;
            }
            case IndexTableColumn.annualReportExpenseRatio: {
                score = avg - number
                score *= 10
                break;
            }
            case IndexTableColumn.averageDailyVolume3Month: {
                score = number - avg
                score *= 0.000001
                break;
            }
            case IndexTableColumn.averageDailyVolume10Day: {
                score = number - avg
                score *= 0.000001
                break;
            }
        }

        return score
    }

    private static scoreStockData(value: number | string, colIndex: number, rowValues: number[] | string[], averages: number[]): number {

        if (!value) {
            return 0
        }
        const number: number = value as number
        const string: string = value as string

        let score

        switch (colIndex) {
            case StockTableColumn.change: {
                score = number > 10 || number < -10 ? number - 10 : 0
                break
            }
            case StockTableColumn.totalCashPerSharePercent:
                score = number * 0.1
                break
            case StockTableColumn.trailingPE:
                score = this.peScore(number) * 0.2;
                break;
            case StockTableColumn.forwardPE:
                score = this.peScore(number) * 0.2;
                break;
            case StockTableColumn.priceToSalesTrailing12Months:
                score = 0;
                break;
            case StockTableColumn.enterpriseValueRevenue:
                score = 5 - number
                score *= 1
                break;
            case StockTableColumn.enterpriseValueEBITDA:
                score = this.ratioBatterThan(number, 10, 20)
                score *= 3
                break;
            case StockTableColumn.priceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case StockTableColumn.trailingPriceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case StockTableColumn.belowTargetLowPricePercent:
                score = number
                score *= 1
                break;
            case StockTableColumn.belowTargetMedianPricePercent:
                score = number
                score *= 1
                break;
            case StockTableColumn.exDividendDate:
                const daysToExDivident = -moment().diff(string, 'days')
                const lastDivYield = rowValues[StockTableColumn.trailingAnnualDividendYield] as number
                score = daysToExDivident > 0 && daysToExDivident < 30 ? Math.pow(lastDivYield, 2) : 0
                break;
            case StockTableColumn.fiveYearAvgDividendYield:
                score = number
                score *= 5
                break;
            case StockTableColumn.trailingAnnualDividendYield:
                score = number
                score *= 5
                break;
            case StockTableColumn.heldByInsiders:
                score = number
                score *= 0.5
                break;
            case StockTableColumn.heldByInstitutions:
                score = -number
                score *= 0.05
                break;
            case StockTableColumn.shortToFloat:
                score = 10 - number
                break;
            case StockTableColumn.sharesShortPrevMonthCompare:
                score = 100 - number
                score *= 0.3
                break;
            case StockTableColumn.netIncomeGrowthLastQuarter:
                score = number
                break;
            case StockTableColumn.netIncomeGrowthLast2Quarters:
                score = number
                score *= 0.5
                break;
            case StockTableColumn.netIncomeGrowthLast3Years:
                score = number
                score *= 0.5
                break;
            case StockTableColumn.revenueGrowthLastQuarter:
                score = number
                score *= 0.3
                break;
            case StockTableColumn.revenueGrowthLast2Quarters:
                score = number
                score *= 0.3
                break;
            case StockTableColumn.revenueGrowthLast3Years:
                score = number
                score *= 0.1
                break;
            case StockTableColumn.cashGrowthLastQuarter:
                score = number
                score *= 0.2
                break;
            case StockTableColumn.inventoryGrowthLastQuarter:
                score = number
                score *= -0.1
                break;
            case StockTableColumn.totalShareholdersEquityGrowthLastQuarter:
                score = number
                score *= 0.1
                break;
            case StockTableColumn.totalShareholdersEquityGrowthLastYear:
                score = number
                score *= 0.1
                break;
            case StockTableColumn.totalShareholdersEquityGrowthLast3Years:
                score = number
                score *= 0.1
                break;
            case StockTableColumn.currentLiabilitiesToEquityLastQuarter:
                score = 0.5 - number
                score *= 1
                break;
            case StockTableColumn.currentLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 1
                break;
            case StockTableColumn.totalLiabilitiesToEquityLastQuarter:
                score = StockAnalystService.ratioScore(number)
                score *= 1
                break;
            case StockTableColumn.totalLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 0.1
                break;
            case StockTableColumn.stockGrowthLastQuarter:
                score = number > 10 ? -10 : 0
                break;
            case StockTableColumn.stockGrowthLastYear:
                score = number > 10 ? -10 : 0
                score *= 0.5
                break;
            case StockTableColumn.stockGrowthLast3Years:
                score = number > 10 ? -10 : 0
                score *= 0.5
                break;
            case StockTableColumn.epsGrowthLastQuarter:
                score = number
                score *= 1
                break;
            case StockTableColumn.epsGrowthLast2Quarters:
                score = number
                score *= 0.5
                break;
            case StockTableColumn.epsGrowthLast3Quarters:
                score = number
                score *= 0.5
                break;
            case StockTableColumn.epsGrowthEstimateLastQuarter:
                score = number
                score *= 1
                break;
            case StockTableColumn.epsGrowthLastYear:
                score = number
                score *= 0.3
                break;
            case StockTableColumn.epsGrowthLast2Years:
                score = number
                score *= 0.2
                break;
            case StockTableColumn.epsGrowthLast3Years:
                score = number
                score *= 0.2
                break;
            case StockTableColumn.peGrowthLastQuarter:
                score = -number
                score *= 1
                break;
            case StockTableColumn.peGrowthLast2Quarters:
                score = -number
                score *= 1
                break;
            case StockTableColumn.peGrowthLast3Quarters:
                score = -number
                score *= 0.75
                break;
            case StockTableColumn.peLastQuarter:
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
                score = -maxThreshold * 2
            }

        } else {
            score = -maxThreshold * 3 + ((1 / number) * 100)
        }
        return score;
    }

    static ratioScore(number?: number, maxThreshold: number = 50) {
        let score: number
        if (number > 0) {

            if (number <= maxThreshold) {
                score = -number
            } else {
                score = -maxThreshold * 2
            }

        } else {
            score = -maxThreshold * 3 + ((1 / number) * 100)
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

    filterDisplayableStats(stockInfo: StockInfo, isIndex: boolean): StockInfo {
        const colNames = StockAnalystService.getTableColumnNames(isIndex);

        for (const statName of Object.keys(stockInfo)) {
            if (!colNames.find(colName => colName === statName)) {
                delete stockInfo[statName]
            }
        }
        return stockInfo
    }

    private static getTableColumnNames(isIndex: boolean): string[] {
        const enumNames = []
        if (isIndex) {
            for (const enumMember in IndexTableColumn) {
                if (Number.isNaN(Number.parseInt(enumMember))) {
                    enumNames.push(enumMember)
                }
            }
        } else {
            for (const enumMember in StockTableColumn) {
                if (Number.isNaN(Number.parseInt(enumMember))) {
                    enumNames.push(enumMember)
                }
            }
        }
        return enumNames
    }
}