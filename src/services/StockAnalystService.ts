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
import {ScoreAdditionalInfo} from "../model/ScoreAdditionalInfo";
import {CellTag} from "../model/CellTag";

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

    scoreRow(averages: number[], rowValues: CellData[], isEtf: boolean): CellData[] {
        const cellData: CellData[] = []

        rowValues.forEach((toScore, column) => {
            const scoredData = isEtf ?
                StockAnalystService.scoreEtfData(toScore, column, rowValues, averages) :
                StockAnalystService.scoreStockData(toScore, column, rowValues, averages);
            cellData.push(scoredData)
        })

        const dataToScore = cellData
            .filter((data, index) => index < StockFields.roic1Y)
            .filter(data => data.score && !Number.isNaN(data.score));

        const totalScore = dataToScore.map(data => data.score)
            .reduce((prev, curr) => prev + curr, 0);
        cellData.push({value: totalScore})

        if (!isEtf) {
            const rule1Score = cellData.map(data => data.score)
                .filter((score, index) => index >= StockFields.roic1Y)
                .filter(score => score && !Number.isNaN(score))
                .reduce((prev, curr) => prev + curr, 0);

            cellData.push({
                value: rule1Score
            })

            const taggedDataToScore = dataToScore.filter(data => data.tags)

            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.LastQuarter)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.Last2Quarters)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.LastYear)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.Last4Years)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.ratios)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.stock)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.dividends)})
            cellData.push({value: StockAnalystService.calcTotal(taggedDataToScore, CellTag.analysts)})

            cellData.push({value: StockAnalystService.calcValueScore(cellData)})
        }

        return cellData
    }

    /**
     * Calculate value investing score
     */
    private static calcValueScore(data: CellData[]): number {
        let totalScore = 0

        for (let column = 0; column < data.length; column++) {
            const value = data[column].value as number
            if(!value){
                continue
            }
            let score = undefined
            switch (column) {
                case StockFields.trailingPE:
                    if(value < 0){
                        score = -100
                    }
                    score = (10 - value) * 5
                    break;
                case StockFields.priceBook:
                    score = (2 - value) * 3
                    break;
                case StockFields.priceToSalesTrailing12Months:
                    score = (3 - value) * 2
                    break;
                case StockFields.roicLastYear:
                    score = (value - 10) * 5
                    break;
                case StockFields.roic1Y:
                    score = (value - 10) * 5
                    score = Math.min(score, 50)
                    score = Math.max(score, -50)
                    break;
            }
            if(score) {
                totalScore += score
                data[column].score = score
            }
        }

        return totalScore
    }

    private static calcTotal(data: CellData[], filterTag: CellTag): number {
        return data
            .filter(data => data.tags.includes(filterTag))
            .map(data => data.score)
            .reduce((prev, curr) => prev + curr, 0)
    }

    private static scoreEtfData(dataToScore: CellData, colEtf: number, rowValues: CellData[] | string[], averages: number[]): CellData {
        if (!dataToScore.value) {
            return dataToScore
        }
        const number: number = dataToScore.value as number
        const avg = averages[colEtf] as number
        let score

        switch (colEtf) {
            case EtfTableColumn.change: {
                if (number > 5 || number < -5) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
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
                score *= 5
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
                score *= 5
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
        dataToScore.score = score
        return dataToScore
    }

    private static scoreStockData(dataToScore: CellData, colEtf: number, rowValues: CellData[], averages: number[]): CellData {

        if (!dataToScore.value) {
            return dataToScore
        }
        const number: number = dataToScore.value as number
        const string: string = dataToScore.value as string

        const lastQuarterCoefficient = 3
        const last2QuartersCoefficient = 2
        const lastYearCoefficient = 5
        const last4YearCoefficient = 1

        const revenueGrowthCoefficient = 0.5
        const grossIncomeGrowthCoefficient = 0.1
        const netIncomeGrowthCoefficient = 0.3
        const ebitGrowthCoefficient = 0.2
        const freeCashFlowGrowthCoefficient = 1

        const cashGrowthCoefficient = 0.1
        const inventoryGrowthCoefficient = 0.1

        const currentRatioGrowthCoefficient = 1

        const totalShareholdersEquityGrowthCoefficient = 0.5
        const totalLiabilitiesToEquityGrowthCoefficient = 0.5

        const totalLiabilitiesToEquityCoefficient = 10

        const stockGrowthCoefficient = 0.5
        const stockRepurchaseGrowthCoefficient = 0.5

        const epsGrowthCoefficient = 10

        let score

        switch (colEtf) {
            case StockFields.change: {
                if (number > 5 || number < -5) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break
            }
            case StockFields.totalCashPerSharePercent:
                score = number * 0.1
                break
            case StockFields.trailingPE:
                score = this.ratioBatterThan(number, 20, 100);
                score *= 10
                break;
            case StockFields.forwardPE:
                score = this.ratioBatterThan(number, 20, 100);
                score *= 8
                break;
            case StockFields.priceToSalesTrailing12Months:
                score = 10 - number;
                score *= 5
                break;
            case StockFields.priceBook:
                score = this.ratioBatterThan(number, 2, 20)
                score *= 5
                break;
            case StockFields.enterpriseValueRevenue:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 1
                break;
            case StockFields.enterpriseValueEBITDA:
                score = this.ratioBatterThan(number, 20, 20)
                score *= 3
                break;
            case StockFields.priceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 10
                break;
            case StockFields.trailingPriceEarningGrowth:
                score = this.ratioBatterThan(number, 5, 10)
                score *= 2
                break;
            case StockFields.belowTargetLowPricePercent:
                score = number * 0.1
                break;
            case StockFields.belowTargetMedianPricePercent:
                score = number * 5
                break;
            case StockFields.exDividendDate:
                const daysToExDividend = -moment().diff(string, 'days')
                const fiveYearAvgDividendYield = rowValues[StockFields.fiveYearAvgDividendYield] as number
                score = daysToExDividend > 0 && daysToExDividend < 30 ? fiveYearAvgDividendYield : 0
                break;
            case StockFields.fiveYearAvgDividendYield:
                score = number * 5
                break;
            case StockFields.trailingAnnualDividendYield:
                score = number * 10
                break;
            case StockFields.payoutRatio:
                score = 60 - number
                const trailingAnnualDividendYield = rowValues[StockFields.trailingAnnualDividendYield] as number
                score *= trailingAnnualDividendYield / 3
                score = Math.max(score, 0)
                break;
            case StockFields.heldByInsiders:
                score = number * 0.5
                break;
            case StockFields.heldByInstitutions:
                score = -number * 0.05
                break;
            case StockFields.buyPercentInsiderShares:
                const sellPercentInsiderShares = rowValues[StockFields.sellPercentInsiderShares].value as number
                score = (number - sellPercentInsiderShares) * 20
                break;
            case StockFields.sellPercentInsiderShares:
                if (number > 5) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.shortToFloat:
                score = 10 - number
                if (number > 20) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.sharesShortPrevMonthCompare:
                if (number > 100) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;

            case StockFields.revenueGrowthLastQuarter:
                score = number * revenueGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFields.revenueGrowthLast2Quarters:
                score = number * revenueGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFields.revenueGrowthLastYear:
                score = number * revenueGrowthCoefficient * lastYearCoefficient
                break
            case StockFields.revenueGrowthLast4Years:
                score = number * revenueGrowthCoefficient * last4YearCoefficient
                break
            case StockFields.grossIncomeGrowthLastQuarter:
                score = number * grossIncomeGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFields.grossIncomeGrowthLast2Quarters:
                score = number * grossIncomeGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFields.grossIncomeGrowthLastYear:
                score = number * grossIncomeGrowthCoefficient * lastYearCoefficient
                break
            case StockFields.grossIncomeGrowthLast4Years:
                score = number * grossIncomeGrowthCoefficient * last4YearCoefficient
                break
            case StockFields.ebitGrowthLastQuarter:
                score = number * ebitGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFields.ebitGrowthLast2Quarters:
                score = number * ebitGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFields.ebitGrowthLastYear:
                score = number * ebitGrowthCoefficient * lastYearCoefficient
                break
            case StockFields.ebitGrowthLast4Years:
                score = number * ebitGrowthCoefficient * last4YearCoefficient
                break
            case StockFields.netIncomeGrowthLastQuarter:
                score = number * netIncomeGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFields.netIncomeGrowthLast2Quarters:
                score = number * netIncomeGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFields.netIncomeGrowthLastYear:
                score = number * netIncomeGrowthCoefficient * lastYearCoefficient
                break
            case StockFields.netIncomeGrowthLast4Years:
                score = number * netIncomeGrowthCoefficient * last4YearCoefficient
                break
            case StockFields.freeCashFlowGrowthLastQuarter:
                score = number * freeCashFlowGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFields.freeCashFlowGrowthLast2Quarters:
                score = number * freeCashFlowGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFields.freeCashFlowGrowthLastYear:
                score = number * freeCashFlowGrowthCoefficient * lastYearCoefficient
                break
            case StockFields.freeCashFlowGrowthLast4Years:
                score = number * freeCashFlowGrowthCoefficient * last4YearCoefficient
                break

            case StockFields.cashGrowthLastQuarter:
                score = number * cashGrowthCoefficient * lastQuarterCoefficient
                break;


            case StockFields.currentRatioLastQuarter:
                score = (number - 2) * 100
                if (number < 2) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.currentRatioLastYear:
                score = (number - 2) * 50
                if (number < 2) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.currentRatioGrowthLastQuarter:
                score = score = number * currentRatioGrowthCoefficient * lastQuarterCoefficient
                break;
            case StockFields.currentRatioGrowthLast2Quarters:
                score = score = number * currentRatioGrowthCoefficient * last2QuartersCoefficient
                break;
            case StockFields.currentRatioGrowthLastYear:
                score = score = number * currentRatioGrowthCoefficient * lastYearCoefficient
                break;
            case StockFields.currentRatioGrowthLast4Years:
                score = score = number * currentRatioGrowthCoefficient * last4YearCoefficient
                break;

            case StockFields.inventoryGrowthLastQuarter:
                score = number * lastQuarterCoefficient * inventoryGrowthCoefficient
                break;
            case StockFields.totalShareholdersEquityGrowthLastQuarter:
                score = number * lastQuarterCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFields.totalShareholdersEquityGrowthLast2Quarters:
                score = number * last2QuartersCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFields.totalShareholdersEquityGrowthLastYear:
                score = number * lastYearCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFields.totalShareholdersEquityGrowthLast4Years:
                score = number * last4YearCoefficient * totalShareholdersEquityGrowthCoefficient
                break;

            case StockFields.totalLiabilitiesToEquityLastQuarter:
                score = StockAnalystService.ratioScore(number) * lastQuarterCoefficient * totalLiabilitiesToEquityCoefficient
                break;
            case StockFields.totalLiabilitiesToEquityLastYear:
                score = StockAnalystService.ratioScore(number) * lastYearCoefficient * totalLiabilitiesToEquityCoefficient
                break;

            case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                score = -number * lastQuarterCoefficient * totalLiabilitiesToEquityGrowthCoefficient
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLast2Quarters:
                score = -number * last2QuartersCoefficient * totalLiabilitiesToEquityGrowthCoefficient
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                score = -number * lastYearCoefficient * totalLiabilitiesToEquityGrowthCoefficient
                break;
            case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                score = -number * last4YearCoefficient * totalLiabilitiesToEquityGrowthCoefficient
                break;
            case StockFields.stockGrowthLastQuarter:
                score = -number
                score *= lastQuarterCoefficient * stockGrowthCoefficient
                break;
            case StockFields.stockGrowthLast2Quarters:
                score = -number
                score *= 0.5 * last2QuartersCoefficient * stockGrowthCoefficient
                break;
            case StockFields.stockGrowthLastYear:
                score = -number
                score *= 0.5 * lastYearCoefficient * stockGrowthCoefficient
                break;
            case StockFields.stockGrowthLast4Years:
                score = -number
                score *= 0.5 * last4YearCoefficient * stockGrowthCoefficient
                break;
            case StockFields.stockRepurchasedGrowthLastQuarter:
                score = number * lastQuarterCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 50) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.stockRepurchasedGrowthLast2Quarters:
                score = number * last2QuartersCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 50) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.stockRepurchasedGrowthLastYear:
                score = number * lastYearCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 50) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFields.stockRepurchasedGrowthLast4Years:
                score = number * last4YearCoefficient * stockRepurchaseGrowthCoefficient
                break;
            case StockFields.epsGrowthLastQuarter:
                score = number * lastQuarterCoefficient * epsGrowthCoefficient
                break;
            case StockFields.epsGrowthLast2Quarters:
                score = number * last2QuartersCoefficient * epsGrowthCoefficient
                break;
            case StockFields.epsGrowthLastYear:
                score = number * lastYearCoefficient * epsGrowthCoefficient
                break;
            case StockFields.epsGrowthLast4Years:
                score = number * last4YearCoefficient * epsGrowthCoefficient
                break;
            case StockFields.peLastQuarter:
                score = this.ratioBatterThan(number, 20, 100);
                score *= 10
                break;
            case StockFields.growthEstimate5y:
                score = this.signPow(number, 2)
                break;
            case StockFields.roic1Y:
                score = StockAnalystService.rule1Score(number, 10)
                break;
            case StockFields.roic3Y:
                score = StockAnalystService.rule1Score(number, 8)
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

        dataToScore.score = score
        return dataToScore
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
        return this.ratioBatterThan(number, 0, maxThreshold)
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

    getScoreLabels(isEtf: boolean): string[] {
        const labels = []
        labels.push('Score')
        if (!isEtf) {
            labels.push('1Q Score')
            labels.push('2Q Score')
            labels.push('1Y Score')
            labels.push('4Y Score')
            labels.push('Ratios Score')
            labels.push('Stocks Score')
            labels.push('Dividends Score')
            labels.push('Analysts Score')
            labels.push('Rule 1 Score')
            labels.push('Value Investment Score')
        }
        return labels;
    }


}