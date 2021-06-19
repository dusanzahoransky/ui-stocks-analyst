import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {CellData} from "../model/table/CellData";
import {StockFlattenFields} from "../model/StockFlattenFields";
import moment from "moment";
import {Stock} from "../model/Stock";
import resultTest from "./Stocks-test.json"
import etfsTest from "./Etfs-test.json"
import {EtfFields} from "../model/EtfFields";
import {ScoreAdditionalInfo} from "../model/table/ScoreAdditionalInfo";
import {Etf} from "../model/Etf";
import {StockDisplayableFields} from "../model/StockDisplayableFields";
import {FieldDisplayType} from "../model/FieldDisplayType";
import {Timeline} from "../model/Timeline";
import HttpClient from "./HttpClient";

export interface IntrinsicValueResult {
    intrinsicValue: number,
    futureValue: number,
    discountValue: number,
    cashTakenOut: number
}

export interface IntrinsicValueDiscountedFCFResult {
    intrinsicValue: number,
    finalFutureValue: number,
    finalDiscountValue: number
}

export class StockAnalystService {

    async loadAnalysis(watchlist: string, refreshDynamicData: boolean, refreshFinancials: boolean, mockData: boolean): Promise<Stock[]> {
        if (watchlist === 'TEST') {
            return Promise.resolve(resultTest)
        } else {
            return HttpClient.fetch(`http://localhost:3000/stocks/watchlist?watchlist=${watchlist}&refreshDynamicData=${refreshDynamicData}&refreshFinancials=${refreshFinancials}&mockData=${mockData}`);
        }
    }

    async loadEtfsAnalysis(watchlist: string, forceRefresh: boolean, mockData: boolean): Promise<EtfsAnalysisResult> {
        if (watchlist === 'TEST_INDICES') {
            return Promise.resolve(etfsTest)
        } else {
            return HttpClient.fetch(`http://localhost:3000/stocks/etfWatchlist?watchlist=${watchlist}&forceRefresh=${forceRefresh}&mockData=${mockData}`);
        }
    }


    scoreRow(averages: CellData[], rowValues: CellData[], isEtf: boolean): CellData[] {
        const cellData: CellData[] = []

        rowValues.forEach((toScore, column) => {
            const scoredData = isEtf ?
                StockAnalystService.scoreEtfData(toScore, column, averages) :
                StockAnalystService.scoreStockData(toScore, column, rowValues);
            cellData.push(scoredData)
        })

        const dataToScore = cellData
            .filter((data, index) => index < StockFlattenFields.roic1Y)
            .filter(data => data.score && !Number.isNaN(data.score));

        const totalScore = dataToScore.map(data => data.score)
            .reduce((prev, curr) => prev + curr, 0);
        cellData.push({value: totalScore})

        if (!isEtf) {
            cellData.push({value: StockAnalystService.calcFutureYield(rowValues[StockFlattenFields.trailingPE].value as number, rowValues[StockFlattenFields.growthEstimate5y].value as number, 5)})
            cellData.push({value: StockAnalystService.calcFutureYield(rowValues[StockFlattenFields.trailingPE].value as number, rowValues[StockFlattenFields.growthEstimate5y].value as number, 10)})

            const rule1Score = cellData.map(data => data.score)
                .filter((score, index) => index >= StockFlattenFields.roic1Y)
                .filter(score => score && !Number.isNaN(score))
                .reduce((prev, curr) => prev + curr, 0);

            cellData.push({
                value: rule1Score
            })
        }

        return cellData
    }

    private static scoreEtfData(dataToScore: CellData, colEtf: number, averages: CellData[]): CellData {
        if (!dataToScore.value) {
            return dataToScore
        }
        const number: number = dataToScore.value as number
        const avg = averages[colEtf].value as number
        let score

        switch (colEtf) {
            case EtfFields.change: {
                if (number > 5 || number < -5) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break
            }
            case EtfFields.yield: {
                //dividends are already included in the returns
                //dividends are tax deductible, including foreign taxes, which makes them a worse option than gain timelineGrowth
                score = number
                score *= -1
                break;
            }
            case EtfFields.ytdReturn: {
                score = number - avg
                score *= 0.05
                break;
            }
            case EtfFields.threeYearAverageReturn: {
                score = number - avg
                score *= 0.5
                break;
            }
            case EtfFields.fiveYearAverageReturn: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfFields.priceToEarnings: {
                score = avg - number
                score *= 5
                break;
            }
            case EtfFields.priceToBook: {
                score = avg - number
                score *= 10
                break;
            }
            case EtfFields.priceToCashflow: {
                score = avg - number
                score *= 5
                break;
            }
            case EtfFields.priceToSales: {
                score = avg - number
                score *= 3
                break;
            }
            case EtfFields.oneMonth: {
                score = number - avg
                score *= 0.05
                break;
            }
            case EtfFields.threeMonth: {
                score = number - avg
                score *= 0.1
                break;
            }
            case EtfFields.oneYear: {
                score = number - avg
                score *= 0.2
                break;
            }
            case EtfFields.threeYear: {
                score = number - avg
                score *= 0.5
                break;
            }
            case EtfFields.fiveYear: {
                score = number - avg
                score *= 1
                break;
            }
            case EtfFields.tenYear: {
                score = number - avg
                score *= 5
                break;
            }


            case EtfFields.averageDailyVolume3Month: {
                score = number - avg
                score *= 0.00001
                score = this.absLessThan(score, 2)
                break;
            }
            case EtfFields.averageDailyVolume10Day: {
                score = number - avg
                score *= 0.00001
                score = this.absLessThan(score, 2)
                break;
            }
        }
        dataToScore.score = score
        return dataToScore
    }

    private static scoreStockData(dataToScore: CellData, colEtf: number, rowValues: CellData[]): CellData {

        if (!dataToScore.value) {
            return dataToScore
        }
        const number: number = dataToScore.value as number
        const string: string = dataToScore.value as string

        const lastQuarterCoefficient = 3
        const last2QuartersCoefficient = lastQuarterCoefficient / 2
        const lastYearCoefficient = 5
        const last2YearCoefficient = lastYearCoefficient / 2
        const last3YearCoefficient = lastYearCoefficient / 5

        const revenueGrowthCoefficient = 0.2
        const grossIncomeGrowthCoefficient = revenueGrowthCoefficient / 5
        const netIncomeGrowthCoefficient = revenueGrowthCoefficient * 5
        const ebitGrowthCoefficient = revenueGrowthCoefficient * 3

        const grossMarginGrowthCoefficient = 0.2
        const profitMarginGrowthCoefficient = grossMarginGrowthCoefficient * 5
        const operatingMarginGrowthCoefficient = grossMarginGrowthCoefficient * 1.5

        const grossMarginCoefficient = 0.8
        const profitMarginCoefficient = grossMarginCoefficient * 5
        const operatingMarginCoefficient = grossMarginCoefficient * 1.5

        const operatingCashFlowGrowthCoefficient = 1
        const freeCashFlowGrowthCoefficient = operatingCashFlowGrowthCoefficient

        const cashGrowthCoefficient = 0.05
        const inventoryGrowthCoefficient = 0.05

        const totalShareholdersEquityGrowthCoefficient = 1
        const retainedEarningsGrowthCoefficient = 1

        const totalDebtToEquityCoefficient = 5
        const totalDebtToEquityGrowthCoefficient = 0.1
        const currentRatioGrowthCoefficient = 0.2
        const nonCurrentLiabilitiesToIncomeCoefficient = 15
        const nonCurrentLiabilitiesToIncomeGrowthCoefficient = 0.1

        const stockGrowthCoefficient = 0.3
        const stockRepurchaseGrowthCoefficient = 0.1

        const epsGrowthCoefficient = 0.5
        const bpsGrowthCoefficient = 0.2
        const fcpsGrowthCoefficient = 0.8

        const roicCoefficient = 10

        let score

        let latestCurrentRatio = rowValues[StockFlattenFields.currentRatioQ1].value ?
            rowValues[StockFlattenFields.currentRatioQ1].value as number :
            rowValues[StockFlattenFields.currentRatio1].value as number
        if (Number.isNaN(latestCurrentRatio) || latestCurrentRatio === 0) {
            latestCurrentRatio = 1
        }

        switch (colEtf) {
            case StockFlattenFields.enterpriseValue: {
                if (number < 300000000) { //300 mil - MicroCap company
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break
            }
            case StockFlattenFields.totalCashPerShareP:
                score = number * 0.1
                break
            case StockFlattenFields.trailingPE:
                score = this.ratioBetterThan(number, 20, 100);
                score *= 5
                break;
            case StockFlattenFields.forwardPE:
                score = this.ratioBetterThan(number, 20, 100);
                score *= 15
                break;
            case StockFlattenFields.priceToSalesTrailing12Months:
                score = this.ratioBetterThan(number, 10, 100);
                score *= 5
                break;
            case StockFlattenFields.currentPriceToFreeCashFlow:
                score = this.ratioBetterThan(number, 15, 100);
                score *= 10
                break;
            case StockFlattenFields.priceToFreeCashFlow:
                score = this.ratioBetterThan(number, 15, 100);
                score *= 5
                break;
            case StockFlattenFields.priceBook:
                score = this.ratioBetterThan(number, 2, 20)
                score *= 5
                break;
            case StockFlattenFields.enterpriseValueRevenue:
                score = this.ratioBetterThan(number, 5, 10)
                score *= 1
                break;
            case StockFlattenFields.enterpriseValueEBITDA:
                score = this.ratioBetterThan(number, 20, 20)
                score *= 0
                break;
            case StockFlattenFields.priceEarningGrowth:
                score = this.ratioBetterThan(number, 5, 10)
                score *= 25
                break;
            case StockFlattenFields.belowTargetMedianPriceP:
                score = number
                break;
            case StockFlattenFields.exDividendDate:
                const daysToExDividend = -moment().diff(string, 'days')
                const fiveYearAvgDividendYield = rowValues[StockFlattenFields.fiveYearAvgDividendYield].value as number
                score = daysToExDividend > 0 && daysToExDividend < 30 ? fiveYearAvgDividendYield : 0
                break;
            case StockFlattenFields.fiveYearAvgDividendYield:
                score = number * 5
                break;
            case StockFlattenFields.trailingAnnualDividendYield:
                score = number * 10
                break;
            case StockFlattenFields.payoutRatioP:
                score = 60 - number
                const trailingAnnualDividendYield = rowValues[StockFlattenFields.trailingAnnualDividendYield].value as number
                score *= trailingAnnualDividendYield / 3
                score = Math.max(score, 0)
                break;
            case StockFlattenFields.heldByInsidersP:
                score = number * 0.5
                break;
            case StockFlattenFields.heldByInstitutionsP:
                score = -number * 0.05
                break;
            case StockFlattenFields.buyPercentInsiderShares:
                const sellPercentInsiderShares = rowValues[StockFlattenFields.sellPercentInsiderShares].value as number
                score = (number - sellPercentInsiderShares) * 50
                break;
            case StockFlattenFields.sellPercentInsiderShares:
                if (number > 2) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.shortToFloatP:
                score = 10 - number
                if (number > 20) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.sharesShortPrevMonthCompareP:
                if (number > 100) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;

            case StockFlattenFields.revenueGrowthQ1:
                score = number * revenueGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.revenueGrowthQ2:
                score = number * revenueGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.revenueGrowth1:
                score = number * revenueGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.revenueGrowth2:
                score = number * revenueGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.revenueGrowth3:
                score = number * revenueGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.grossIncomeGrowthQ1:
                score = number * grossIncomeGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.grossIncomeGrowthQ2:
                score = number * grossIncomeGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.grossIncomeGrowth1:
                score = number * grossIncomeGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.grossIncomeGrowth2:
                score = number * grossIncomeGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.grossIncomeGrowth3:
                score = number * grossIncomeGrowthCoefficient * last3YearCoefficient
                break


            case StockFlattenFields.grossMargin1:
                score = (number - 40) * grossMarginCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.grossMargin2:
                score = (number - 40) * grossMarginCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.grossMargin3:
                score = (number - 40) * grossMarginCoefficient * last3YearCoefficient
                break
            case StockFlattenFields.grossMarginGrowth1:
                score = number * grossMarginGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.grossMarginGrowth2:
                score = number * grossMarginGrowthCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.grossMarginGrowth3:
                score = number * grossMarginGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.ebitGrowth1:
                score = number * ebitGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.ebitGrowth2:
                score = number * ebitGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.ebitGrowth3:
                score = number * ebitGrowthCoefficient * last3YearCoefficient
                break


            case StockFlattenFields.operatingMargin1:
                score = (number - 20) * operatingMarginCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.operatingMargin2:
                score = (number - 20) * operatingMarginCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.operatingMargin3:
                score = (number - 20) * operatingMarginCoefficient * last3YearCoefficient
                break
            case StockFlattenFields.operatingMarginGrowth1:
                score = number * operatingMarginGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.operatingMarginGrowth2:
                score = number * operatingMarginGrowthCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.operatingMarginGrowth3:
                score = number * operatingMarginGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.netIncomeGrowthQ1:
                score = number * netIncomeGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.netIncomeGrowthQ2:
                score = number * netIncomeGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.netIncomeGrowth1:
                score = number * netIncomeGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.netIncomeGrowth2:
                score = number * netIncomeGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.netIncomeGrowth3:
                score = number * netIncomeGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.profitMarginPQ1:
                score = (number - 15) * profitMarginCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.profitMarginPQ2:
                score = (number - 15) * profitMarginCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.profitMarginP1:
                score = (number - 15) * profitMarginCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.profitMarginP2:
                score = (number - 15) * profitMarginCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.profitMarginP3:
                score = (number - 15) * profitMarginCoefficient * last3YearCoefficient
                break
            case StockFlattenFields.profitMarginGrowthQ1:
                score = number * profitMarginGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.profitMarginGrowthQ2:
                score = number * profitMarginGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.profitMarginGrowth1:
                score = number * profitMarginGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.profitMarginGrowth2:
                score = number * profitMarginGrowthCoefficient * last2YearCoefficient
                break
            case StockFlattenFields.profitMarginGrowth3:
                score = number * profitMarginGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.freeCashFlowGrowthQ1:
                score = number * freeCashFlowGrowthCoefficient * lastQuarterCoefficient
                break
            case StockFlattenFields.freeCashFlowGrowthQ2:
                score = number * freeCashFlowGrowthCoefficient * last2QuartersCoefficient
                break
            case StockFlattenFields.freeCashFlowGrowth1:
                score = number * freeCashFlowGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.freeCashFlowGrowth2:
                score = number * freeCashFlowGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.freeCashFlowGrowth3:
                score = number * freeCashFlowGrowthCoefficient * last3YearCoefficient
                break

            case StockFlattenFields.operatingCashFlowGrowth1:
                score = number * operatingCashFlowGrowthCoefficient * lastYearCoefficient
                break
            case StockFlattenFields.operatingCashFlowGrowth2:
                score = number * operatingCashFlowGrowthCoefficient * last2YearCoefficient
                break

            case StockFlattenFields.operatingCashFlowGrowth3:
                score = number * freeCashFlowGrowthCoefficient * last3YearCoefficient
                break


            case StockFlattenFields.cashGrowthQ1:
                score = number * cashGrowthCoefficient * lastQuarterCoefficient
                break;


            case StockFlattenFields.currentRatioQ1:
                score = (number - 2) * 100
                if (number < 2) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.currentRatio1:
                score = (number - 2) * 50
                if (number < 2) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.currentRatioGrowthQ1:
                score = score = number * currentRatioGrowthCoefficient * lastQuarterCoefficient * (1 / latestCurrentRatio)
                break;
            case StockFlattenFields.currentRatioGrowthQ2:
                score = score = number * currentRatioGrowthCoefficient * last2QuartersCoefficient * (1 / latestCurrentRatio)
                break;
            case StockFlattenFields.currentRatioGrowth1:
                score = score = number * currentRatioGrowthCoefficient * lastYearCoefficient * (1 / latestCurrentRatio)
                break;
            case StockFlattenFields.currentRatioGrowth2:
                score = score = number * currentRatioGrowthCoefficient * last2YearCoefficient * (1 / latestCurrentRatio)
                break;

            case StockFlattenFields.currentRatioGrowth3:
                score = score = number * currentRatioGrowthCoefficient * last3YearCoefficient * (1 / latestCurrentRatio)
                break;


            case StockFlattenFields.inventoryGrowthQ1:
                score = number * lastQuarterCoefficient * inventoryGrowthCoefficient
                break;
            case StockFlattenFields.totalShareholdersEquityGrowthQ1:
                score = number * lastQuarterCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalShareholdersEquityGrowthQ2:
                score = number * last2QuartersCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalShareholdersEquityGrowth1:
                score = number * lastYearCoefficient * totalShareholdersEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalShareholdersEquityGrowth2:
                score = number * last2YearCoefficient * totalShareholdersEquityGrowthCoefficient
                break;

            case StockFlattenFields.totalShareholdersEquityGrowth3:
                score = number * last3YearCoefficient * totalShareholdersEquityGrowthCoefficient
                break;

            case StockFlattenFields.retainedEarningsGrowthQ1:
                score = number * lastQuarterCoefficient * retainedEarningsGrowthCoefficient
                break;
            case StockFlattenFields.retainedEarningsGrowthQ2:
                score = number * last2QuartersCoefficient * retainedEarningsGrowthCoefficient
                break;
            case StockFlattenFields.retainedEarningsGrowth1:
                score = number * lastYearCoefficient * retainedEarningsGrowthCoefficient
                break;
            case StockFlattenFields.retainedEarningsGrowth2:
                score = number * last2YearCoefficient * retainedEarningsGrowthCoefficient
                break;

            case StockFlattenFields.retainedEarningsGrowth3:
                score = number * last3YearCoefficient * retainedEarningsGrowthCoefficient
                break;


            case StockFlattenFields.totalDebtToEquityQ1:
                score = this.ratioBetterThan(number, 0.8, 10) * lastQuarterCoefficient * totalDebtToEquityCoefficient
                score = this.absLessThan(score, 200)
                break;
            case StockFlattenFields.totalDebtToEquity1:
                score = this.ratioBetterThan(number, 0.8, 10) * lastYearCoefficient * totalDebtToEquityCoefficient
                score = this.absLessThan(score, 200)
                break;

            case StockFlattenFields.totalDebtToEquityGrowthQ1:
                score = -number * lastQuarterCoefficient * totalDebtToEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalDebtToEquityGrowthQ2:
                score = -number * last2QuartersCoefficient * totalDebtToEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalDebtToEquityGrowth1:
                score = -number * lastYearCoefficient * totalDebtToEquityGrowthCoefficient
                break;
            case StockFlattenFields.totalDebtToEquityGrowth2:
                score = -number * last2YearCoefficient * totalDebtToEquityGrowthCoefficient
                break;

            case StockFlattenFields.totalDebtToEquityGrowth3:
                score = -number * last3YearCoefficient * totalDebtToEquityGrowthCoefficient
                break;


            case StockFlattenFields.nonCurrentLiabilitiesToIncomeQ1:
                score = this.ratioBetterThan(number, 4, 6) * lastQuarterCoefficient * nonCurrentLiabilitiesToIncomeCoefficient
                score = this.absLessThan(score, 100)
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeQ2:
                score = this.ratioBetterThan(number, 4, 6) * last2QuartersCoefficient * nonCurrentLiabilitiesToIncomeCoefficient
                score = this.absLessThan(score, 100)
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncome1:
                score = this.ratioBetterThan(number, 4, 6) * lastYearCoefficient * nonCurrentLiabilitiesToIncomeCoefficient
                score = this.absLessThan(score, 100)
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncome2:
                score = this.ratioBetterThan(number, 4, 6) * last2YearCoefficient * nonCurrentLiabilitiesToIncomeCoefficient
                score = this.absLessThan(score, 100)
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncome3:
                score = this.ratioBetterThan(number, 4, 6) * last3YearCoefficient * nonCurrentLiabilitiesToIncomeCoefficient
                score = this.absLessThan(score, 100)
                break;

            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowthQ1:
                score = -number * lastQuarterCoefficient * nonCurrentLiabilitiesToIncomeGrowthCoefficient
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowthQ2:
                score = -number * last2QuartersCoefficient * nonCurrentLiabilitiesToIncomeGrowthCoefficient
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth1:
                score = -number * lastYearCoefficient * nonCurrentLiabilitiesToIncomeGrowthCoefficient
                break;
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth2:
                score = -number * last2YearCoefficient * nonCurrentLiabilitiesToIncomeGrowthCoefficient
                break;

            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth3:
                score = -number * last3YearCoefficient * nonCurrentLiabilitiesToIncomeGrowthCoefficient
                break;

            case StockFlattenFields.sharesGrowth1:
                score = -number
                score *= lastYearCoefficient * stockGrowthCoefficient
                break;
            case StockFlattenFields.sharesGrowth2:
                score = -number
                score *= 0.5 * last3YearCoefficient * stockGrowthCoefficient
                break;
            case StockFlattenFields.stockRepurchasedGrowthQ1:
                score = number * lastQuarterCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 100) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.stockRepurchasedGrowthQ2:
                score = number * last2QuartersCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 100) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.stockRepurchasedGrowth1:
                score = number * lastYearCoefficient * stockRepurchaseGrowthCoefficient
                if (number > 100) {
                    dataToScore.additionalInfo = ScoreAdditionalInfo.ManualCheckRequired
                }
                break;
            case StockFlattenFields.stockRepurchasedGrowth2:
                score = number * last2YearCoefficient * stockRepurchaseGrowthCoefficient
                break;

            case StockFlattenFields.stockRepurchasedGrowth3:
                score = number * last3YearCoefficient * stockRepurchaseGrowthCoefficient
                break;

            case StockFlattenFields.epsGrowthQ1:
                score = number * lastQuarterCoefficient * epsGrowthCoefficient
                break;
            case StockFlattenFields.epsGrowthQ2:
                score = number * last2QuartersCoefficient * epsGrowthCoefficient
                break;
            case StockFlattenFields.epsGrowth1:
                score = number * lastYearCoefficient * epsGrowthCoefficient
                break;
            case StockFlattenFields.epsGrowth2:
                score = number * last2YearCoefficient * epsGrowthCoefficient
                break;
            case StockFlattenFields.epsGrowth3:
                score = number * last3YearCoefficient * epsGrowthCoefficient
                break;

            case StockFlattenFields.bookValuePerShareGrowth1:
                score = number * lastYearCoefficient * bpsGrowthCoefficient
                break;
            case StockFlattenFields.bookValuePerShareGrowth2:
                score = number * last2YearCoefficient * bpsGrowthCoefficient
                break;
            case StockFlattenFields.bookValuePerShareGrowth3:
                score = number * last3YearCoefficient * bpsGrowthCoefficient
                break;

            case StockFlattenFields.freeCashFlowPerShareGrowth1:
                score = number * lastYearCoefficient * fcpsGrowthCoefficient
                break;
            case StockFlattenFields.freeCashFlowPerShareGrowth2:
                score = number * last2YearCoefficient * fcpsGrowthCoefficient
                break;
            case StockFlattenFields.freeCashFlowPerShareGrowth3:
                score = number * last3YearCoefficient * fcpsGrowthCoefficient
                break;

            case StockFlattenFields.roicP1:
                score = (number - 10) * lastYearCoefficient * roicCoefficient
                break;
            case StockFlattenFields.roicP2:
                score = (number - 10) * last2YearCoefficient * roicCoefficient
                break;
            case StockFlattenFields.roicP3:
                score = (number - 10) * last3YearCoefficient * roicCoefficient
                break;

            case StockFlattenFields.peQ1:
                score = this.ratioBetterThan(number, 20, 100);
                score *= 10
                break;
            case StockFlattenFields.growthEstimate5y:
                score = this.signPow(number, 2)
                break;
            case StockFlattenFields.roic1Y:
                score = StockAnalystService.rule1Score(number, 10)
                break;
            case StockFlattenFields.roic3Y:
                score = StockAnalystService.rule1Score(number, 8)
                break;
            case StockFlattenFields.revenue1Y:
                score = StockAnalystService.rule1Score(number, 3)
                break;
            case StockFlattenFields.revenue3Y:
                score = StockAnalystService.rule1Score(number, 2)
                break;
            case StockFlattenFields.revenue5Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFlattenFields.revenue9Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFlattenFields.eps1Y:
                score = StockAnalystService.rule1Score(number, 3)
                break;
            case StockFlattenFields.eps3Y:
                score = StockAnalystService.rule1Score(number, 2)
                break;
            case StockFlattenFields.eps5Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFlattenFields.eps9Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFlattenFields.bps1Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFlattenFields.bps3Y:
                score = StockAnalystService.rule1Score(number, 0.7)
                break;
            case StockFlattenFields.bps5Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFlattenFields.bps9Y:
                score = StockAnalystService.rule1Score(number, 0.25)
                break;
            case StockFlattenFields.cash1Y:
                score = StockAnalystService.rule1Score(number, 1)
                break;
            case StockFlattenFields.cash3Y:
                score = StockAnalystService.rule1Score(number, 0.7)
                break;
            case StockFlattenFields.cash5Y:
                score = StockAnalystService.rule1Score(number, 0.5)
                break;
            case StockFlattenFields.cash9Y:
                score = StockAnalystService.rule1Score(number, 0.25)
                break;
            case StockFlattenFields.belowStickerPrice15P:
                score = number * 10
                break;
            case StockFlattenFields.belowStickerPrice5P:
                score = number
                break;
        }

        score = this.absLessThan(score, 100)

        dataToScore.score = score
        return dataToScore
    }

    static rule1Score(number?: number, weight?: number) {
        let minusExpectedGrowth = number - 10;
        minusExpectedGrowth = this.absLessThan(minusExpectedGrowth, 50)
        return minusExpectedGrowth * weight;
    }

    static ratioBetterThan(number?: number, positiveLimit?: number, maxThreshold: number = 50) {
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
        return this.ratioBetterThan(number, 0, maxThreshold)
    }

    /**
     * Number to the exponent power, keeping the sign.
     * E.g. signPow(-2, 2) == -4
     */
    private static signPow(number: number, exponent: number) {
        let absPow = Math.pow(Math.abs(number), exponent);
        return absPow * Math.sign(number);
    }

    filterDisplayableEtfStats(etf: Etf): Etf {
        const colNames = []
        for (const enumMember in EtfFields) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                colNames.push(enumMember)
            }
        }
        for (const statName of Object.keys(etf)) {
            if (!colNames.find(colName => colName === statName)) {
                delete etf[statName]
            }
        }
        return etf
    }

    filterDisplayableStockStats(stock: Stock): Stock {
        const colNames = []
        for (const enumMember in StockDisplayableFields) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                colNames.push(enumMember)
            }
        }

        for (const statName of Object.keys(stock)) {
            if (!colNames.find(colName => colName === statName)) {
                delete stock[statName]
            }
        }
        return stock
    }

    getScoreLabels(isEtf: boolean): string[] {
        const labels = []
        labels.push('Score')
        if (!isEtf) {
            labels.push('Next 5Y Yield')
            labels.push('Next 10Y Yield')
            labels.push('1Q Score')
            labels.push('2Q Score')
            labels.push('1Y Score')
            labels.push('3Y Score')
            labels.push('Ratios Score')
            labels.push('Stocks Score')
            labels.push('Dividends Score')
            labels.push('Analysts Score')
            labels.push('Intrinsic value Score')
            labels.push('Value Investment Score')
            labels.push('Growth Investment Score')
        }
        return labels;
    }


    flattenStockData(stock: Stock): { [stat: string]: string | number } {
        const quartersToDisplay = 2
        const yearsToDisplay = 3
        const flatten = {}

        const stockFields = Object.keys(stock);
        for (const field of stockFields) {
            switch (StockAnalystService.getFieldDisplayType(field)) {
                case FieldDisplayType.SingleValue:
                    //copy a simple value
                    flatten[field] = stock[field]
                    break
                case FieldDisplayType.LatestOnly:
                    //get the latest value only
                    const value = stock[field] as Timeline
                    flatten[field] = Object.values(value).reverse()[0]
                    break
                case FieldDisplayType.Quarter:
                    //get the latest quartersToDisplay quarterly values
                    const quarters = stock[field] as Timeline
                    const quartersLatestFirst = Object.values(quarters).reverse();
                    for (let i = 0; i < quartersToDisplay; i++) {
                        const fieldName = `${field.substr(0, field.length - 1)} Q${i + 1}`
                        flatten[fieldName] = quartersLatestFirst[i]
                    }
                    break
                case FieldDisplayType.Year:
                    //get the latest yearsToDisplay yearly values
                    const years = stock[field] as Timeline
                    const yearsLatestFirst = Object.values(years)
                        .reverse();
                    for (let i = 0; i < yearsToDisplay; i++) {
                        const fieldName = `${field} Y${i + 1}`
                        flatten[fieldName] = yearsLatestFirst[i]
                    }
                    break
                case FieldDisplayType.WholeTimeline:
                    //copy the whole timeline
                    const timeline = stock[field] as Timeline
                    flatten[field] = timeline
                    break
            }
        }

        //uncomment to dump the current stock fields
        // console.log(Object.keys(flatten).join(',\n'))

        return flatten
    }

    private static getFieldDisplayType(field: string): FieldDisplayType {
        switch (field) {
            case "symbol":
                return FieldDisplayType.SingleValue
            case "exchange":
                return FieldDisplayType.SingleValue
            case "chartLastUpdated":
                return FieldDisplayType.SingleValue
            case "financialsLastUpdated":
                return FieldDisplayType.SingleValue
            case "analysisLastUpdated":
                return FieldDisplayType.SingleValue
            case "statisticsLastUpdated":
                return FieldDisplayType.SingleValue
            case "holdersLastUpdated":
                return FieldDisplayType.SingleValue
            case "krfLastUpdated":
                return FieldDisplayType.SingleValue
            case "lastReportedQuarter":
                return FieldDisplayType.SingleValue
            case "companyName":
                return FieldDisplayType.SingleValue
            case "change":
                return FieldDisplayType.SingleValue
            case "currentPrice":
                return FieldDisplayType.SingleValue
            case "marketCap":
                return FieldDisplayType.LatestOnly
            case "enterpriseValue":
                return FieldDisplayType.LatestOnly
            case "totalCashPerShareP":
                return FieldDisplayType.LatestOnly
            case "trailingPE":
                return FieldDisplayType.LatestOnly
            case "forwardPE":
                return FieldDisplayType.LatestOnly
            case "priceToSalesTrailing12Months":
                return FieldDisplayType.LatestOnly
            case "priceToFreeCashFlow":
                return FieldDisplayType.LatestOnly
            case "currentPriceToFreeCashFlow":
                return FieldDisplayType.LatestOnly
            case "priceBook":
                return FieldDisplayType.LatestOnly
            case "enterpriseValueRevenue":
                return FieldDisplayType.LatestOnly
            case "enterpriseValueEBITDA":
                return FieldDisplayType.LatestOnly
            case "priceEarningGrowth":
                return FieldDisplayType.LatestOnly
            case "week52ChangeP":
                return FieldDisplayType.LatestOnly
            case "week52AboveLowP":
                return FieldDisplayType.LatestOnly
            case "week52BelowHighP":
                return FieldDisplayType.LatestOnly
            case "targetLowPrice":
                return FieldDisplayType.LatestOnly
            case "belowTargetLowPriceP":
                return FieldDisplayType.LatestOnly
            case "targetMedianPrice":
                return FieldDisplayType.LatestOnly
            case "belowTargetMedianPriceP":
                return FieldDisplayType.LatestOnly
            case "heldByInsidersP":
                return FieldDisplayType.LatestOnly
            case "heldByInstitutionsP":
                return FieldDisplayType.LatestOnly
            case "buyPercentInsiderShares":
                return FieldDisplayType.LatestOnly
            case "sellPercentInsiderShares":
                return FieldDisplayType.LatestOnly
            case "shortToFloatP":
                return FieldDisplayType.LatestOnly
            case "sharesShortPrevMonthCompareP":
                return FieldDisplayType.LatestOnly
            case "exDividendDate":
                return FieldDisplayType.LatestOnly
            case "fiveYearAvgDividendYield":
                return FieldDisplayType.LatestOnly
            case "trailingAnnualDividendYield":
                return FieldDisplayType.LatestOnly
            case "payoutRatioP":
                return FieldDisplayType.LatestOnly
            case "dividendsGrowth":
                return FieldDisplayType.Year
            case "revenue":
                return FieldDisplayType.Year
            case "revenueQ":
                return FieldDisplayType.Quarter
            case "revenueGrowth":
                return FieldDisplayType.Year
            case "revenueGrowthQ":
                return FieldDisplayType.Quarter
            case "grossIncome":
                return FieldDisplayType.Year
            case "grossIncomeQ":
                return FieldDisplayType.Quarter
            case "grossIncomeGrowth":
                return FieldDisplayType.Year
            case "grossIncomeGrowthQ":
                return FieldDisplayType.Quarter
            case "ebit":
                return FieldDisplayType.Year
            case "ebitQ":
                return FieldDisplayType.Quarter
            case "ebitGrowth":
                return FieldDisplayType.Year
            case "ebitGrowthQ":
                return FieldDisplayType.Quarter
            case "interestExpenseToOperativeIncomeP":
                return FieldDisplayType.Year
            case "interestExpenseToOperativeIncomePQ":
                return FieldDisplayType.Quarter
            case "interestExpenseToOperativeIncomeGrowth":
                return FieldDisplayType.Year
            case "interestExpenseToOperativeIncomeGrowthQ":
                return FieldDisplayType.Quarter
            case "netIncome":
                return FieldDisplayType.Year
            case "netIncomeQ":
                return FieldDisplayType.Quarter
            case "netIncomeGrowth":
                return FieldDisplayType.Year
            case "netIncomeGrowthQ":
                return FieldDisplayType.Quarter
            case "profitMarginP":
                return FieldDisplayType.Year
            case "profitMarginPQ":
                return FieldDisplayType.Quarter
            case "profitMarginGrowth":
                return FieldDisplayType.Year
            case "profitMarginGrowthQ":
                return FieldDisplayType.Quarter
            case "totalCashFromOperatingActivities":
                return FieldDisplayType.Year
            case "totalCashFromOperatingActivitiesQ":
                return FieldDisplayType.Quarter
            case "totalCashFromOperatingActivitiesGrowth":
                return FieldDisplayType.Year
            case "totalCashFromOperatingActivitiesGrowthQ":
                return FieldDisplayType.Quarter
            case "capitalExpenditures":
                return FieldDisplayType.Year
            case "capitalExpendituresQ":
                return FieldDisplayType.Quarter
            case "capitalExpendituresGrowth":
                return FieldDisplayType.Year
            case "capitalExpendituresGrowthQ":
                return FieldDisplayType.Quarter
            case "freeCashFlow":
                return FieldDisplayType.Year
            case "freeCashFlowQ":
                return FieldDisplayType.Quarter
            case "freeCashFlowGrowth":
                return FieldDisplayType.Year
            case "freeCashFlowGrowthQ":
                return FieldDisplayType.Quarter
            case "cash":
                return FieldDisplayType.Year
            case "cashQ":
                return FieldDisplayType.Quarter
            case "cashGrowth":
                return FieldDisplayType.Year
            case "cashGrowthQ":
                return FieldDisplayType.Quarter
            case "inventory":
                return FieldDisplayType.Year
            case "inventoryQ":
                return FieldDisplayType.Quarter
            case "inventoryGrowth":
                return FieldDisplayType.Year
            case "inventoryGrowthQ":
                return FieldDisplayType.Quarter
            case "currentAssets":
                return FieldDisplayType.Year
            case "currentAssetsQ":
                return FieldDisplayType.Quarter
            case "currentAssetsGrowth":
                return FieldDisplayType.Year
            case "currentAssetsGrowthQ":
                return FieldDisplayType.Quarter
            case "currentLiabilities":
                return FieldDisplayType.Year
            case "currentLiabilitiesQ":
                return FieldDisplayType.Quarter
            case "currentLiabilitiesGrowth":
                return FieldDisplayType.Year
            case "currentLiabilitiesGrowthQ":
                return FieldDisplayType.Quarter
            case "currentRatio":
                return FieldDisplayType.Year
            case "currentRatioQ":
                return FieldDisplayType.Quarter
            case "currentRatioGrowth":
                return FieldDisplayType.Year
            case "currentRatioGrowthQ":
                return FieldDisplayType.Quarter
            case "totalLiabilities":
                return FieldDisplayType.Year
            case "totalLiabilitiesQ":
                return FieldDisplayType.Quarter
            case "totalLiabilitiesGrowth":
                return FieldDisplayType.Year
            case "totalLiabilitiesGrowthQ":
                return FieldDisplayType.Quarter
            case "totalDebtToEquity":
                return FieldDisplayType.Year
            case "totalDebtToEquityQ":
                return FieldDisplayType.Quarter
            case "totalDebtToEquityGrowth":
                return FieldDisplayType.Year
            case "totalDebtToEquityGrowthQ":
                return FieldDisplayType.Quarter
            case "nonCurrentLiabilitiesToIncome":
                return FieldDisplayType.Year
            case "nonCurrentLiabilitiesToIncomeQ":
                return FieldDisplayType.Quarter
            case "nonCurrentLiabilitiesToIncomeGrowth":
                return FieldDisplayType.Year
            case "nonCurrentLiabilitiesToIncomeGrowthQ":
                return FieldDisplayType.Quarter
            case "totalAssets":
                return FieldDisplayType.Year
            case "totalAssetsQ":
                return FieldDisplayType.Quarter
            case "totalAssetsGrowth":
                return FieldDisplayType.Year
            case "totalAssetsGrowthQ":
                return FieldDisplayType.Quarter
            case "totalShareholdersEquity":
                return FieldDisplayType.Year
            case "totalShareholdersEquityQ":
                return FieldDisplayType.Quarter
            case "totalShareholdersEquityGrowth":
                return FieldDisplayType.Year
            case "totalShareholdersEquityGrowthQ":
                return FieldDisplayType.Quarter
            case "retainedEarnings":
                return FieldDisplayType.Year
            case "retainedEarningsQ":
                return FieldDisplayType.Quarter
            case "retainedEarningsGrowth":
                return FieldDisplayType.Year
            case "retainedEarningsGrowthQ":
                return FieldDisplayType.Quarter
            case "stockRepurchased":
                return FieldDisplayType.Year
            case "stockRepurchasedQ":
                return FieldDisplayType.Quarter
            case "stockRepurchasedGrowth":
                return FieldDisplayType.Year
            case "stockRepurchasedGrowthQ":
                return FieldDisplayType.Quarter
            case "eps":
                return FieldDisplayType.Year
            case "epsQ":
                return FieldDisplayType.Quarter
            case "epsGrowth":
                return FieldDisplayType.Year
            case "epsGrowthQ":
                return FieldDisplayType.Quarter
            case "pe":
                return FieldDisplayType.Year
            case "peQ":
                return FieldDisplayType.Quarter
            case "peGrowth":
                return FieldDisplayType.Year
            case "peGrowthQ":
                return FieldDisplayType.Quarter
            case "bookValuePerShare":
                return FieldDisplayType.Year
            case "bookValuePerShareGrowth":
                return FieldDisplayType.Year
            case "capSpending":
                return FieldDisplayType.Year
            case "capSpendingGrowth":
                return FieldDisplayType.Year
            case "freeCashFlowPerShare":
                return FieldDisplayType.Year
            case "freeCashFlowPerShareGrowth":
                return FieldDisplayType.Year
            case "grossMargin":
                return FieldDisplayType.Year
            case "grossMarginGrowth":
                return FieldDisplayType.Year
            case "operatingCashFlow":
                return FieldDisplayType.Year
            case "operatingCashFlowGrowth":
                return FieldDisplayType.Year
            case "operatingMargin":
                return FieldDisplayType.Year
            case "operatingMarginGrowth":
                return FieldDisplayType.Year
            case "shares":
                return FieldDisplayType.Year
            case "sharesGrowth":
                return FieldDisplayType.Year
            case "workingCapital":
                return FieldDisplayType.Year
            case "workingCapitalQ":
                return FieldDisplayType.Quarter
            case "workingCapitalGrowth":
                return FieldDisplayType.Year
            case "workingCapitalGrowthQ":
                return FieldDisplayType.Quarter
            case "growthEstimate5y":
                return FieldDisplayType.LatestOnly
            case "roicP":
                return FieldDisplayType.Year
            case "roic1Y":
                return FieldDisplayType.LatestOnly
            case "roic3Y":
                return FieldDisplayType.LatestOnly
            case "revenue1Y":
                return FieldDisplayType.LatestOnly
            case "revenue3Y":
                return FieldDisplayType.LatestOnly
            case "revenue5Y":
                return FieldDisplayType.LatestOnly
            case "revenue9Y":
                return FieldDisplayType.LatestOnly
            case "eps1Y":
                return FieldDisplayType.LatestOnly
            case "eps3Y":
                return FieldDisplayType.LatestOnly
            case "eps5Y":
                return FieldDisplayType.LatestOnly
            case "eps9Y":
                return FieldDisplayType.LatestOnly
            case "bps1Y":
                return FieldDisplayType.LatestOnly
            case "bps3Y":
                return FieldDisplayType.LatestOnly
            case "bps5Y":
                return FieldDisplayType.LatestOnly
            case "bps9Y":
                return FieldDisplayType.LatestOnly
            case "cash1Y":
                return FieldDisplayType.LatestOnly
            case "cash3Y":
                return FieldDisplayType.LatestOnly
            case "cash5Y":
                return FieldDisplayType.LatestOnly
            case "cash9Y":
                return FieldDisplayType.LatestOnly
            case "pe1Y":
                return FieldDisplayType.LatestOnly
            case "pe3Y":
                return FieldDisplayType.LatestOnly
            case "pe5Y":
                return FieldDisplayType.LatestOnly
            case "pe9Y":
                return FieldDisplayType.LatestOnly
            case "rule1GrowthRate":
                return FieldDisplayType.LatestOnly
            case "defaultPE":
                return FieldDisplayType.LatestOnly
            case "historicalPE":
                return FieldDisplayType.LatestOnly
            case "rule1PE":
                return FieldDisplayType.LatestOnly
            case "currentEps":
                return FieldDisplayType.LatestOnly
            case "futureEPS10Years":
                return FieldDisplayType.LatestOnly
            case "futurePrice10Years":
                return FieldDisplayType.LatestOnly
            case "stickerPrice15pcGrowth":
                return FieldDisplayType.LatestOnly
            case "stickerPrice5pcGrowth":
                return FieldDisplayType.LatestOnly
            case "belowStickerPrice15P":
                return FieldDisplayType.LatestOnly
            case "belowStickerPrice5P":
                return FieldDisplayType.LatestOnly
            case "price":
                return FieldDisplayType.WholeTimeline
            default:
                throw new Error(`Unsupported field display type ${field}`)
        }
    }

    private static absLessThan(value: number, absValueThreshold: number) {
        if (value > absValueThreshold) {
            return absValueThreshold
        } else if (value < -absValueThreshold) {
            return -absValueThreshold
        } else {
            return value
        }
    }

    public static calcFutureYield(currentYield: number, growthEstimate: number, years: number): number | undefined {
        if (!currentYield) {
            return undefined
        }
        const pv = 100 / currentYield
        const growthEstimateP = growthEstimate / 100
        return this.futureValue(pv, growthEstimateP, years);
    }

    public static calcIntrinsicValue(dividendsValue: number, pv: number, growthEstimate: number, discountRate: number, years: number): IntrinsicValueResult {
        growthEstimate = growthEstimate / 100
        discountRate = discountRate / 100
        const futureValue = this.futureValue(pv, growthEstimate, years)
        const discountValue = this.futureValue(1, discountRate, years)
        const cashTakenOut =  dividendsValue * (1 - ( 1 / this.futureValue(1, discountRate, years))) / discountRate
        const intrinsicValue = cashTakenOut + futureValue / discountValue
        return {intrinsicValue, futureValue, discountValue, cashTakenOut}
    }

    public static calcIntrinsicValueDiscountedCashFlow(pv: number, growthEstimate: number, discountRate: number, years: number): IntrinsicValueDiscountedFCFResult {
        growthEstimate = growthEstimate / 100
        discountRate = discountRate / 100

        let intrinsicValue = 0
        let futureValue = 0
        let discountValue = 0
        for(let i=0; i<years; i++) {
            futureValue = this.futureValue(pv, growthEstimate, i)
            discountValue = this.futureValue(1, discountRate, i)
            const discountedCashFlow = futureValue / discountValue
            intrinsicValue += discountedCashFlow
        }

        return {intrinsicValue, finalFutureValue: futureValue, finalDiscountValue: discountValue}
    }

    static futureValue(presentValue: number, growth: number, years: number) {
        return presentValue * Math.pow(1 + growth, years);
    }

}