import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {CellData} from "../model/table/CellData";
import {StockFlattenFields} from "../model/StockFlattenFields";
import moment from "moment";
import {Stock} from "../model/Stock";
import resultTest from "./Stocks-test.json"
import etfsTest from "./Etfs-test.json"
import {EtfFields} from "../model/EtfFields";
import {ScoreAdditionalInfo} from "../model/table/ScoreAdditionalInfo";
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

    async loadEtfsAnalysis(watchlist: string, refreshDynamicData: boolean, mockData: boolean): Promise<EtfsAnalysisResult> {
        if (watchlist === 'TEST_INDICES') {
            return Promise.resolve(etfsTest)
        } else {
            return HttpClient.fetch(`http://localhost:3000/stocks/etfWatchlist?watchlist=${watchlist}&refreshDynamicData=${refreshDynamicData}&mockData=${mockData}`);
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
            case StockFlattenFields.enterpriseValueEBIT:
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