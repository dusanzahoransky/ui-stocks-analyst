import {StockAnalysisResult} from "../model/StockAnalysisResult";
import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {CellData} from "../model/CellData";
import {StockFields} from "../model/StockFields";
import moment from "moment";
import {BackendError} from "../model/BackendError";
import {Stock} from "../model/Stock";
import resultTest from "./Stocks-test.json"
import etfsTest from "./Etfs-test.json"
import {EtfTableColumn} from "../model/EtfTableColumn";

export class StockAnalystService {

    async loadAnalysis(watchlist: string, forceRefresh: boolean, forceRefreshRatios: boolean, mockData: boolean): Promise<StockAnalysisResult | BackendError> {
        if (watchlist === 'TEST') {
            return Promise.resolve(resultTest)
        } else {
            return fetch(`http://localhost:3000/stocks/watchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&forceRefreshRatios=${forceRefreshRatios}&mockData=${mockData}`)
                .then(r => r.json() as unknown as StockAnalysisResult);
        }
    }

    async loadEtfsAnalysis(watchlist: string, forceRefresh: boolean, mockData: boolean): Promise<EtfsAnalysisResult | BackendError> {
        if (watchlist === 'TEST_INDICES') {
            return Promise.resolve(etfsTest)
        } else {
            return fetch(`http://localhost:3000/stocks/etfWatchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&mockData=${mockData}`)
                .then(r => r.json() as unknown as EtfsAnalysisResult);
        }
    }

    scoreRow(averages: number[], rowValues: number[] | string[], isEtf: boolean): CellData[] {
        const cellData: CellData[] = []

        rowValues.forEach((value, colEtf) => {
            const score = isEtf ?
                StockAnalystService.scoreEtfData(value, colEtf, rowValues, averages) :
                StockAnalystService.scoreStockData(value, colEtf, rowValues, averages);
            cellData.push({
                value,
                score: score
            })
        })

        const totalScore = cellData.map(data => data.score)
            .filter((score, index) => index < StockFields.roic1Y)
            .filter(score => score && !Number.isNaN(score))
            .reduce((prev, curr) => prev + curr, 0);

        cellData.push({
            value: totalScore
        })

        if(!isEtf) {
            const rule1Score = cellData.map(data => data.score)
                .filter((score, index) => index >= StockFields.roic1Y)
                .filter(score => score && !Number.isNaN(score))
                .reduce((prev, curr) => prev + curr, 0);

            cellData.push({
                value: rule1Score
            })
        }

        return cellData
    }

    private static scoreEtfData(value: number | string, colEtf: number, rowValues: number[] | string[], averages: number[]): number {
        if (!value) {
            return 0
        }
        const number: number = value as number
        const avg = averages[colEtf] as number
        let score

        switch (colEtf) {
            case EtfTableColumn.change: {
                score = number > 5 || number < -5 ? number - 10 : 0
                break
            }
            case EtfTableColumn.yield: {
                //dividends are already included in the returns
                //dividends are tax deductible, including foreign taxes, which makes them a worse option than gain growth
                score = number
                score *= -1
                break;
            }
            case EtfTableColumn.ytdReturn: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfTableColumn.threeYearAverageReturn: {
                score = number - avg
                score *= 5
                break;
            }
            case EtfTableColumn.fiveYearAverageReturn: {
                score = number - avg
                score *= 10
                break;
            }
            case EtfTableColumn.priceToEarnings: {
                score = avg - number
                score *= 10
                break;
            }
            case EtfTableColumn.priceToBook: {
                score = avg - number
                score *= 5
                break;
            }
            case EtfTableColumn.priceToCashflow: {
                score = avg - number
                score *= 3
                break;
            }
            case EtfTableColumn.priceToSales: {
                score = avg - number
                score *= 3
                break;
            }
            case EtfTableColumn.oneMonth: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfTableColumn.threeMonth: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfTableColumn.oneYear: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfTableColumn.threeYear: {
                score = number - avg
                score *= 10
                break;
            }
             case EtfTableColumn.fiveYear: {
                score = number - avg
                score *= 10
                break;
            }
            case EtfTableColumn.tenYear: {
                score = number - avg
                score *= 10
                break;
            }


            case EtfTableColumn.averageDailyVolume3Month: {
                score = number - avg
                score *= 0.00001
                break;
            }
            case EtfTableColumn.averageDailyVolume10Day: {
                score = number - avg
                score *= 0.00001
                break;
            }
        }

        return score
    }

    private static scoreStockData(value: number | string, colEtf: number, rowValues: number[] | string[], averages: number[]): number {

        if (!value) {
            return 0
        }
        const number: number = value as number
        const string: string = value as string

        let score

        switch (colEtf) {
            case StockFields.change: {
                score = number > 10 || number < -10 ? number - 10 : 0
                break
            }
            case StockFields.totalCashPerSharePercent:
                score = number * 0.1
                break
            case StockFields.trailingPE:
                score = this.peScore(number);
                break;
            case StockFields.forwardPE:
                score = this.peScore(number);
                break;
            case StockFields.priceToSalesTrailing12Months:
                score = 10 - number;
                score *= 2
                break;
            case StockFields.priceBook:
                score = 2 - number;
                break;
            case StockFields.enterpriseValueRevenue:
                score = 5 - number
                score *= 1
                break;
            case StockFields.enterpriseValueEBITDA:
                score = this.ratioBatterThan(number, 10, 20)
                score *= 3
                break;
            case StockFields.priceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case StockFields.trailingPriceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case StockFields.belowTargetLowPricePercent:
                score = number
                score *= 1
                break;
            case StockFields.belowTargetMedianPricePercent:
                score = number
                score *= 1
                break;
            case StockFields.exDividendDate:
                const daysToExDividend = -moment().diff(string, 'days')
                const fiveYearAvgDividendYield = rowValues[StockFields.fiveYearAvgDividendYield] as number
                score = daysToExDividend > 0 && daysToExDividend < 30 ? fiveYearAvgDividendYield : 0
                break;
            case StockFields.fiveYearAvgDividendYield:
                score = number
                score *= 5
                break;
            case StockFields.trailingAnnualDividendYield:
                score = number
                score *= 5
                break;
            case StockFields.payoutRatio:
                score = 70 - number
                const trailingAnnualDividendYield = rowValues[StockFields.trailingAnnualDividendYield] as number
                score *= trailingAnnualDividendYield / 3
                score = Math.max(score, 0)
                break;
            case StockFields.heldByInsiders:
                score = number
                score *= 0.5
                break;
            case StockFields.heldByInstitutions:
                score = -number
                score *= 0.05
                break;
            case StockFields.shortToFloat:
                score = 10 - number
                break;
            case StockFields.sharesShortPrevMonthCompare:
                score = 100 - number
                score *= 0.3
                break;
            case StockFields.netIncomeGrowthLastQuarter:
                score = number
                score *= 2
                break;
            case StockFields.netIncomeGrowthLast2Quarters:
                score = number
                score *= 1
                break;
            case StockFields.netIncomeGrowthLast4Years:
                score = number
                score *= 1
                break;
            case StockFields.grossIncomeGrowthLastQuarter:
                score = number
                score *= 1
                break;
            case StockFields.grossIncomeGrowthLast2Quarters:
                score = number
                score *= 1
                break;
            case StockFields.grossIncomeGrowthLast4Years:
                score = number
                score *= 1
                break;
            case StockFields.revenueGrowthLastQuarter:
                score = number
                score *= 1
                break;
            case StockFields.revenueGrowthLast2Quarters:
                score = number
                score *= 1
                break;
            case StockFields.revenueGrowthLast4Years:
                score = number
                score *= 1
                break;
            case StockFields.cashGrowthLastQuarter:
                score = number
                score *= 0.2
                break;
            case StockFields.totalLiabilitiesGrowthLastQuarter:
                score = -number
                score *= 0.05
                break;
            case StockFields.totalLiabilitiesGrowthLastYear:
                score = -number
                score *= 0.02
                break;
            case StockFields.totalLiabilitiesGrowthLast4Years:
                score = -number
                score *= 0.02
                break;
            case StockFields.inventoryGrowthLastQuarter:
                score = number
                score *= -0.1
                break;
            case StockFields.totalShareholdersEquityGrowthLastQuarter:
                score = number
                score *= 0.1
                break;
            case StockFields.totalShareholdersEquityGrowthLastYear:
                score = number
                score *= 0.1
                break;
            case StockFields.totalShareholdersEquityGrowthLast4Years:
                score = number
                score *= 0.1
                break;
            case StockFields.totalLiabilitiesToEquityLastQuarter:
                score = StockAnalystService.ratioScore(number)
                score *= 20
                break;
            case StockFields.totalLiabilitiesToEquityLastYear:
                score = StockAnalystService.ratioScore(number)
                score *= 20
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                score = -number
                score *= 0.01
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                score = -number
                score *= 0.05
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                score = -number
                score *= 0.05
                break;
            case StockFields.stockGrowthLastQuarter:
                score = number > 10 ? -10 : 0
                break;
            case StockFields.stockGrowthLastYear:
                score = number > 10 ? -10 : 0
                score *= 0.5
                break;
            case StockFields.stockGrowthLast4Years:
                score = number > 10 ? -10 : 0
                score *= 0.5
                break;
            case StockFields.epsGrowthLastQuarter:
                score = number
                score *= 1
                break;
            case StockFields.epsGrowthLast2Quarters:
                score = number
                score *= 0.5
                break;
            case StockFields.epsGrowthLastYear:
                score = number
                score *= 0.3
                break;
            case StockFields.epsGrowthLast4Years:
                score = number
                score *= 0.2
                break;
            case StockFields.peGrowthLastQuarter:
                score = -number
                score *= 1
                break;
            case StockFields.peGrowthLast2Quarters:
                score = -number
                score *= 1
                break;
            case StockFields.peGrowthLast3Quarters:
                score = -number
                score *= 0.75
                break;
            case StockFields.peLastQuarter:
                score = this.peScore(number);
                break;
            case StockFields.growthEstimate5y:
                score = this.signPow(number, 2)
                break;
           case StockFields.roic1Y:
                score = StockAnalystService.rule1Score(number, 5)
                break;
            case StockFields.roic3Y:
                score = StockAnalystService.rule1Score(number, 3)
                break;
            case StockFields.revenue1Y:
                score = StockAnalystService.rule1Score(number, 3)
                break;
            case StockFields.revenue3Y:
                score = StockAnalystService.rule1Score(number, 2)
                break;
            case StockFields.revenue5Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFields.revenue9Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFields.eps1Y:
                score = StockAnalystService.rule1Score(number, 3)
                break;
            case StockFields.eps3Y:
                score = StockAnalystService.rule1Score(number, 2)
                break;
            case StockFields.eps5Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFields.eps9Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFields.bps1Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFields.bps3Y:
                score = StockAnalystService.rule1Score(number, 0.7)
                break;
            case StockFields.bps5Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFields.bps9Y:
                score = StockAnalystService.rule1Score(number, 0.25)
                break;
            case StockFields.cash1Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFields.cash3Y:
                score = StockAnalystService.rule1Score(number, 0.7)
                break;
            case StockFields.cash5Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFields.cash9Y:
                score = StockAnalystService.rule1Score(number, 0.25)
                break;
            case StockFields.belowStickerPrice15pc:
                score = number * 10
                break;
            case StockFields.belowStickerPrice5pc:
                score = number
                break;
        }
        return score;
    }

    static rule1Score(number?: number, weight?: number) {
        let minusExpectedGrowth = number - 10;
        minusExpectedGrowth = Math.max(-50, minusExpectedGrowth)
        minusExpectedGrowth = Math.min(50, minusExpectedGrowth)
        return minusExpectedGrowth * weight;
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

    filterDisplayableStats(stock: Stock, isEtf: boolean): Stock {
        const colNames = StockAnalystService.getTableColumnNames(isEtf);

        for (const statName of Object.keys(stock)) {
            if (!colNames.find(colName => colName === statName)) {
                delete stock[statName]
            }
        }
        return stock
    }

    private static getTableColumnNames(isEtf: boolean): string[] {
        const enumNames = []
        if (isEtf) {
            for (const enumMember in EtfTableColumn) {
                if (Number.isNaN(Number.parseInt(enumMember))) {
                    enumNames.push(enumMember)
                }
            }
        } else {
            for (const enumMember in StockFields) {
                if (Number.isNaN(Number.parseInt(enumMember))) {
                    enumNames.push(enumMember)
                }
            }
        }
        return enumNames
    }
}