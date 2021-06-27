import {Stock} from '../Stock'
import {FundamentalsCell} from '../table/FundamentalsCell'
import {StockFields} from './StockFields'
import {StockData} from './StockData'

export interface BasicInfoFields extends StockFields {
    symbol: FundamentalsCell,
    chartLastUpdated: FundamentalsCell,
    financialsLastUpdated: FundamentalsCell,
    analysisLastUpdated: FundamentalsCell,
    statisticsLastUpdated: FundamentalsCell,
    holdersLastUpdated: FundamentalsCell,
    krfLastUpdated: FundamentalsCell,
    companyName: FundamentalsCell,
    exchange: FundamentalsCell,
    currency: FundamentalsCell,
    financialCurrency: FundamentalsCell,
    currentPrice: FundamentalsCell,
    currentPriceLocal: FundamentalsCell,
    lastReportedQuarter: FundamentalsCell,
    lastReportedYear: FundamentalsCell,
    marketCap: FundamentalsCell,
    enterpriseValue: FundamentalsCell,
    heldByInsidersP: FundamentalsCell,
    heldByInstitutionsP: FundamentalsCell,
    buyPercentInsiderShares: FundamentalsCell,
    sellPercentInsiderShares: FundamentalsCell,
    shortToFloatP: FundamentalsCell,
    sharesShortPrevMonthCompareP: FundamentalsCell,

    trailingAnnualDividendYield: FundamentalsCell,
    exDividendDate: FundamentalsCell,
    fiveYearAvgDividendYield: FundamentalsCell,
    payoutRatioP: FundamentalsCell,
    dividends: FundamentalsCell,
    dividendsGrowth: FundamentalsCell,

    currentShares: FundamentalsCell,
    sharesY1: FundamentalsCell,
    sharesGrowthY1g: FundamentalsCell,
    sharesGrowthY2g: FundamentalsCell,
    sharesGrowthY3g: FundamentalsCell,

    stockRepurchasedQ1: FundamentalsCell,
    stockRepurchasedY1: FundamentalsCell,
    stockRepurchasedGrowthQ1g: FundamentalsCell,
    stockRepurchasedGrowthQ2g: FundamentalsCell,
    stockRepurchasedGrowthY1g: FundamentalsCell,
    stockRepurchasedGrowthY2g: FundamentalsCell,
    stockRepurchasedGrowthY3g: FundamentalsCell,

    score: FundamentalsCell
}

export class BasicInfo extends StockData {

    headerData(stock: Stock): undefined {
        return undefined
    }

    labels(): string[] {
        return [
            'symbol',
            'chartLastUpdated',
            'financialsLastUpdated',
            'analysisLastUpdated',
            'statisticsLastUpdated',
            'holdersLastUpdated',
            'krfLastUpdated',
            'companyName',
            'exchange',
            'currency',
            'financialCurrency',
            'currentPrice',
            'currentPriceLocal',
            'lastReportedQuarter',
            'lastReportedYear',
            'marketCap',
            'EV',
            'heldByInsidersP',
            'heldByInstitutionsP',
            'buyPercentInsiderShares',
            'sellPercentInsiderShares',
            'shortToFloatP',
            'sharesShortPrevMonthCompareP',

            'trailingAnnualDividendYield',
            'exDividendDate',
            'fiveYearAvgDividendYield',
            'payoutRatioP',
            'dividends',
            'dividendsGrowth',

            'currentShares',
            'shares Y1',
            'sharesGrowth Y1g',
            'sharesGrowth Y2g',
            'sharesGrowth Y3g',

            'stockRepurchased Q1',
            'stockRepurchased Y1',
            'stockRepurchasedGrowth Q1g',
            'stockRepurchasedGrowth Q2g',
            'stockRepurchasedGrowth Y1g',
            'stockRepurchasedGrowth Y2g',
            'stockRepurchasedGrowth Y3g',

            'score'
        ]
    }

    fromStock(stock: Stock): BasicInfoFields {
        const ratiosFields = {
            symbol: StockData.toCell(stock.symbol),
            chartLastUpdated: StockData.toCell(stock.chartLastUpdated),
            financialsLastUpdated: StockData.toCell(stock.financialsLastUpdated),
            analysisLastUpdated: StockData.toCell(stock.analysisLastUpdated),
            statisticsLastUpdated: StockData.toCell(stock.statisticsLastUpdated),
            holdersLastUpdated: StockData.toCell(stock.holdersLastUpdated),
            krfLastUpdated: StockData.toCell(stock.krfLastUpdated),

            companyName: StockData.toCell(stock.companyName),
            exchange: StockData.toCell(stock.exchange),
            currency: StockData.toCell(stock.currency),
            financialCurrency: StockData.toCell(stock.financialCurrency),
            currentPrice: StockData.toCell(stock.currentPrice),
            currentPriceLocal: StockData.toCell(stock.currentPriceLocal),
            lastReportedQuarter: StockData.toCell(stock.lastReportedQuarter),
            lastReportedYear: StockData.toCell(stock.lastReportedYear),

            marketCap: StockData.toCell(BasicInfo.last(stock.marketCap)),
            enterpriseValue: StockData.toCell(BasicInfo.last(stock.enterpriseValue)),
            heldByInsidersP: StockData.toCell(BasicInfo.last(stock.heldByInsidersP), true),
            heldByInstitutionsP: StockData.toCell(BasicInfo.last(stock.heldByInstitutionsP), true),
            buyPercentInsiderShares: StockData.toCell(BasicInfo.last(stock.buyPercentInsiderShares)),
            sellPercentInsiderShares: StockData.toCell(BasicInfo.last(stock.sellPercentInsiderShares)),
            shortToFloatP: StockData.toCell(BasicInfo.last(stock.shortToFloatP), true),
            sharesShortPrevMonthCompareP: StockData.toCell(BasicInfo.last(stock.sharesShortPrevMonthCompareP), true),

            trailingAnnualDividendYield: StockData.toCell(BasicInfo.last(stock.trailingAnnualDividendYield), true),
            exDividendDate: StockData.toCell(BasicInfo.last(stock.exDividendDate)),
            fiveYearAvgDividendYield: StockData.toCell(BasicInfo.last(stock.fiveYearAvgDividendYield), true),
            payoutRatioP: StockData.toCell(BasicInfo.last(stock.payoutRatioP), true),
            dividends: StockData.toCell(BasicInfo.last(stock.dividends)),
            dividendsGrowth: StockData.toCell(BasicInfo.last(stock.dividendsGrowth)),

            currentShares: StockData.toCell(BasicInfo.last(stock.currentShares)),
            sharesY1: StockData.toCell(BasicInfo.last(stock.shares), false, false, BasicInfo.toTitle(stock.shares)),
            sharesGrowthY1g: StockData.toCell(BasicInfo.last(stock.sharesGrowth, 0)),
            sharesGrowthY2g: StockData.toCell(BasicInfo.last(stock.sharesGrowth, 1)),
            sharesGrowthY3g: StockData.toCell(BasicInfo.last(stock.sharesGrowth, 2)),

            stockRepurchasedQ1: StockData.toCell(BasicInfo.last(stock.stockRepurchasedQ)),
            stockRepurchasedY1: StockData.toCell(BasicInfo.last(stock.stockRepurchased)),
            stockRepurchasedGrowthQ1g: StockData.toCell(BasicInfo.last(stock.stockRepurchasedGrowthQ, 0)),
            stockRepurchasedGrowthQ2g: StockData.toCell(BasicInfo.last(stock.stockRepurchasedGrowthQ, 1)),
            stockRepurchasedGrowthY1g: StockData.toCell(BasicInfo.last(stock.stockRepurchasedGrowth, 0)),
            stockRepurchasedGrowthY2g: StockData.toCell(BasicInfo.last(stock.stockRepurchasedGrowth, 1)),
            stockRepurchasedGrowthY3g: StockData.toCell(BasicInfo.last(stock.stockRepurchasedGrowth, 2)),

            score: StockData.toCell(0),
        }

        StockData.removeInfinity(ratiosFields)
        StockData.capScoreValues(ratiosFields)
        StockData.buildClasses(ratiosFields)
        StockData.calcTotalScore(ratiosFields)
        ratiosFields.symbol.classes.push('symbol')

        return ratiosFields
    }
}