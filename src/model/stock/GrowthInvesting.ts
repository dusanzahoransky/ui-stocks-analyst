import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {StockFields} from "./StockFields";
import {StockData} from "./StockData";

export interface GrowthInvestingFields extends StockFields {
    symbol: FundamentalsCell
    marketCap: FundamentalsCell
    enterpriseValue: FundamentalsCell
    forwardPE: FundamentalsCell
    currentPriceToFreeCashFlow: FundamentalsCell
    priceToFreeCashFlow: FundamentalsCell
    enterpriseValueRevenue: FundamentalsCell
    enterpriseValueEBITDA: FundamentalsCell
    priceEarningGrowth: FundamentalsCell

    growthEstimate5y: FundamentalsCell

    operatingCashFlowQ1: FundamentalsCell
    operatingCashFlow1: FundamentalsCell
    operatingCashFlowGrowthQ1: FundamentalsCell
    operatingCashFlowGrowthQ2: FundamentalsCell
    operatingCashFlowGrowth1: FundamentalsCell
    operatingCashFlowGrowth2: FundamentalsCell
    operatingCashFlowGrowth3: FundamentalsCell

    freeCashFlowQ1: FundamentalsCell
    freeCashFlow1: FundamentalsCell
    freeCashFlowGrowthQ1: FundamentalsCell
    freeCashFlowGrowthQ2: FundamentalsCell
    freeCashFlowGrowth1: FundamentalsCell
    freeCashFlowGrowth2: FundamentalsCell
    freeCashFlowGrowth3: FundamentalsCell

    revenueQ1: FundamentalsCell
    revenue1: FundamentalsCell
    revenueGrowthQ1: FundamentalsCell
    revenueGrowthQ2: FundamentalsCell
    revenueGrowth1: FundamentalsCell
    revenueGrowth2: FundamentalsCell
    revenueGrowth3: FundamentalsCell

    grossIncomeQ1: FundamentalsCell
    grossIncome1: FundamentalsCell
    grossIncomeGrowthQ1: FundamentalsCell
    grossIncomeGrowthQ2: FundamentalsCell
    grossIncomeGrowth1: FundamentalsCell
    grossIncomeGrowth2: FundamentalsCell
    grossIncomeGrowth3: FundamentalsCell

    grossMarginQ1: FundamentalsCell
    grossMargin1: FundamentalsCell
    grossMarginGrowthQ1: FundamentalsCell
    grossMarginGrowthQ2: FundamentalsCell
    grossMarginGrowth1: FundamentalsCell
    grossMarginGrowth2: FundamentalsCell
    grossMarginGrowth3: FundamentalsCell

    netIncomeQ1: FundamentalsCell
    netIncome1: FundamentalsCell
    netIncomeGrowthQ1: FundamentalsCell
    netIncomeGrowthQ2: FundamentalsCell
    netIncomeGrowth1: FundamentalsCell
    netIncomeGrowth2: FundamentalsCell
    netIncomeGrowth3: FundamentalsCell

    capitalExpendituresQ1: FundamentalsCell
    capitalExpenditures1: FundamentalsCell
    capitalExpendituresGrowthQ1: FundamentalsCell
    capitalExpendituresGrowthQ2: FundamentalsCell
    capitalExpendituresGrowth1: FundamentalsCell
    capitalExpendituresGrowth2: FundamentalsCell
    capitalExpendituresGrowth3: FundamentalsCell

    score: FundamentalsCell
}

export class GrowthInvesting extends StockData {

    headerData(): FundamentalsCell[] {
        return [];
    }

    labels(): string[] {
        return [
            'symbol',
            'marketCap',
            'enterpriseValue',
            'forwardPE',
            'currentPriceToFreeCashFlow',
            'priceToFreeCashFlow',
            'enterpriseValueRevenue',
            'enterpriseValueEBITDA',
            'priceEarningGrowth',

            'growthEstimate5y',

            'operatingCashFlowQ1',
            'operatingCashFlow1',
            'operatingCashFlowGrowthQ1',
            'operatingCashFlowGrowthQ2',
            'operatingCashFlowGrowth1',
            'operatingCashFlowGrowth2',
            'operatingCashFlowGrowth3',

            'freeCashFlowQ1',
            'freeCashFlow1',
            'freeCashFlowGrowthQ1',
            'freeCashFlowGrowthQ2',
            'freeCashFlowGrowth1',
            'freeCashFlowGrowth2',
            'freeCashFlowGrowth3',

            'revenueQ1',
            'revenue1',
            'revenueGrowthQ1',
            'revenueGrowthQ2',
            'revenueGrowth1',
            'revenueGrowth2',
            'revenueGrowth3',

            'grossIncomeQ1',
            'grossIncome1',
            'grossIncomeGrowthQ1',
            'grossIncomeGrowthQ2',
            'grossIncomeGrowth1',
            'grossIncomeGrowth2',
            'grossIncomeGrowth3',

            'grossMarginQ1',
            'grossMargin1',
            'grossMarginGrowthQ1',
            'grossMarginGrowthQ2',
            'grossMarginGrowth1',
            'grossMarginGrowth2',
            'grossMarginGrowth3',

            'netIncomeQ1',
            'netIncome1',
            'netIncomeGrowthQ1',
            'netIncomeGrowthQ2',
            'netIncomeGrowth1',
            'netIncomeGrowth2',
            'netIncomeGrowth3',

            'capitalExpendituresQ1',
            'capitalExpenditures1',
            'capitalExpendituresGrowthQ1',
            'capitalExpendituresGrowthQ2',
            'capitalExpendituresGrowth1',
            'capitalExpendituresGrowth2',
            'capitalExpendituresGrowth3',

            'score'
        ]
    }

    fromStock(stock: Stock): GrowthInvestingFields {
        const ratiosFields = {
            symbol: StockData.toCell(stock.symbol, false, false, `Price: ${StockData.toTitle(StockData.lastEntry(stock.price))}`),
            marketCap: StockData.toCell(StockData.last(stock.marketCap)),
            enterpriseValue: StockData.toCell(StockData.last(stock.enterpriseValue), false),
            forwardPE: StockData.toCell(StockData.last(stock.forwardPE), false),
            currentPriceToFreeCashFlow: StockData.toCell(StockData.last(stock.currentPriceToFreeCashFlow), false),
            priceToFreeCashFlow: StockData.toCell(StockData.last(stock.priceToFreeCashFlow), false),
            enterpriseValueRevenue: StockData.toCell(StockData.last(stock.enterpriseValueRevenue), false),
            enterpriseValueEBITDA: StockData.toCell(StockData.last(stock.enterpriseValueEBITDA), false),
            priceEarningGrowth: StockData.toCell(StockData.last(stock.priceEarningGrowth), false),
            growthEstimate5y: StockData.toCell(StockData.last(stock.growthEstimate5y), true),

            operatingCashQ1: StockData.toCell(StockData.last(stock.operatingCashPQ), false, false, StockData.toTitle(stock.operatingCashPQ)),
            operatingCashY1: StockData.toCell(StockData.last(stock.operatingCashP), false, false, StockData.toTitle(stock.operatingCashP)),
            operatingCashGrowthQ1: StockData.toCell(StockData.last(stock.operatingCashGrowthQ), true, true),
            operatingCashGrowthQ2: StockData.toCell(StockData.last(stock.operatingCashGrowthQ, 1), true, true),
            operatingCashGrowth1: StockData.toCell(StockData.last(stock.operatingCashGrowth), true, true),
            operatingCashGrowth2: StockData.toCell(StockData.last(stock.operatingCashGrowth, 1), true, true),
            operatingCashGrowth3: StockData.toCell(StockData.last(stock.operatingCashGrowth, 2), true, true),

            freeCashFlowQ1: StockData.toCell(StockData.last(stock.freeCashFlowPQ), false, false, StockData.toTitle(stock.freeCashFlowPQ)),
            freeCashFlowY1: StockData.toCell(StockData.last(stock.freeCashFlowP), false, false, StockData.toTitle(stock.freeCashFlowP)),
            freeCashFlowGrowthQ1: StockData.toCell(StockData.last(stock.freeCashFlowGrowthQ), true, true),
            freeCashFlowGrowthQ2: StockData.toCell(StockData.last(stock.freeCashFlowGrowthQ, 1), true, true),
            freeCashFlowGrowth1: StockData.toCell(StockData.last(stock.freeCashFlowGrowth), true, true),
            freeCashFlowGrowth2: StockData.toCell(StockData.last(stock.freeCashFlowGrowth, 1), true, true),
            freeCashFlowGrowth3: StockData.toCell(StockData.last(stock.freeCashFlowGrowth, 2), true, true),

            revenueQ1: StockData.toCell(StockData.last(stock.revenuePQ), false, false, StockData.toTitle(stock.revenuePQ)),
            revenueY1: StockData.toCell(StockData.last(stock.revenueP), false, false, StockData.toTitle(stock.revenueP)),
            revenueGrowthQ1: StockData.toCell(StockData.last(stock.revenueGrowthQ), true, true),
            revenueGrowthQ2: StockData.toCell(StockData.last(stock.revenueGrowthQ, 1), true, true),
            revenueGrowth1: StockData.toCell(StockData.last(stock.revenueGrowth), true, true),
            revenueGrowth2: StockData.toCell(StockData.last(stock.revenueGrowth, 1), true, true),
            revenueGrowth3: StockData.toCell(StockData.last(stock.revenueGrowth, 2), true, true),

            grossIncomeQ1: StockData.toCell(StockData.last(stock.grossIncomeQ), false, false, StockData.toTitle(stock.grossIncomeQ)),
            grossIncome1: StockData.toCell(StockData.last(stock.grossIncome), false, false, StockData.toTitle(stock.grossIncome)),
            grossIncomeGrowthQ1: StockData.toCell(StockData.last(stock.grossIncomeGrowthQ), true, true),
            grossIncomeGrowthQ2: StockData.toCell(StockData.last(stock.grossIncomeGrowthQ, 1), true, true),
            grossIncomeGrowth1: StockData.toCell(StockData.last(stock.grossIncomeGrowth), true, true),
            grossIncomeGrowth2: StockData.toCell(StockData.last(stock.grossIncomeGrowth, 1), true, true),
            grossIncomeGrowth3: StockData.toCell(StockData.last(stock.grossIncomeGrowth, 2), true, true),

            grossMarginQ1: StockData.toCell(StockData.last(stock.grossMarginQ), false, false, StockData.toRatioTitle(stock.totalLiabilitiesQ, stock.totalShareholdersEquityQ, stock.grossMarginQ)),
            grossMargin1: StockData.toCell(StockData.last(stock.grossMargin), false, false, StockData.toRatioTitle(stock.totalLiabilities, stock.totalShareholdersEquity, stock.grossMargin)),
            grossMarginGrowthQ1: StockData.toCell(StockData.last(stock.grossMarginGrowthQ), true, true),
            grossMarginGrowthQ2: StockData.toCell(StockData.last(stock.grossMarginGrowthQ, 1), true, true),
            grossMarginGrowth1: StockData.toCell(StockData.last(stock.grossMarginGrowth), true, true),
            grossMarginGrowth2: StockData.toCell(StockData.last(stock.grossMarginGrowth, 1), true, true),
            grossMarginGrowth3: StockData.toCell(StockData.last(stock.grossMarginGrowth, 2), true, true),

            netIncomeQ1: StockData.toCell(StockData.last(stock.netIncomeQ), false, false, StockData.toTitle(stock.netIncomeQ)),
            netIncome1: StockData.toCell(StockData.last(stock.netIncome), false, false, StockData.toTitle(stock.netIncome)),
            netIncomeGrowthQ1: StockData.toCell(StockData.last(stock.netIncomeGrowthQ), true, true),
            netIncomeGrowthQ2: StockData.toCell(StockData.last(stock.netIncomeGrowthQ, 1), true, true),
            netIncomeGrowth1: StockData.toCell(StockData.last(stock.netIncomeGrowth), true, true),
            netIncomeGrowth2: StockData.toCell(StockData.last(stock.netIncomeGrowth, 1), true, true),
            netIncomeGrowth3: StockData.toCell(StockData.last(stock.netIncomeGrowth, 2), true, true),

            capitalExpendituresQ1: StockData.toCell(StockData.last(stock.capitalExpendituresQ), false, false, StockData.toTitle(stock.capitalExpendituresQ)),
            capitalExpenditures1: StockData.toCell(StockData.last(stock.capitalExpenditures), false, false, StockData.toTitle(stock.capitalExpenditures)),
            capitalExpendituresGrowthQ1: StockData.toCell(StockData.last(stock.capitalExpendituresGrowthQ), true, true),
            capitalExpendituresGrowthQ2: StockData.toCell(StockData.last(stock.capitalExpendituresGrowthQ, 1), true, true),
            capitalExpendituresGrowth1: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth), true, true),
            capitalExpendituresGrowth2: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth, 1), true, true),
            capitalExpendituresGrowth3: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth, 2), true, true),

            score: StockData.toCell(0),
        }


        // ratiosFields.enterpriseValue.score = StockData.percentBelow(ratiosFields.enterpriseValue.value, ratiosFields.marketCap.value)
        // ratiosFields.totalCashPerShareP.score = ratiosFields.totalCashPerShareP.value > 10 ? 0.1 * ratiosFields.totalCashPerShareP.value : 0
        // ratiosFields.trailingPE.score = 3 * StockData.ratioBetterThan(ratiosFields.trailingPE.value, 20, 50)
        // ratiosFields.forwardPE.score = 10 * StockData.ratioBetterThan(ratiosFields.forwardPE.value, 20, 50)
        // ratiosFields.priceToSalesTrailing12Months.score = 3 * StockData.ratioBetterThan(ratiosFields.priceToSalesTrailing12Months.value, 6, 50)
        // ratiosFields.priceBook.score = 2 * StockData.ratioBetterThan(ratiosFields.priceBook.value, 2, 50)
        // ratiosFields.currentPriceToFreeCashFlow.score = 5 * StockData.ratioBetterThan(ratiosFields.currentPriceToFreeCashFlow.value, 15, 50)
        // ratiosFields.priceToFreeCashFlow.score = 3 * StockData.ratioBetterThan(ratiosFields.priceToFreeCashFlow.value, 15, 50)
        // ratiosFields.enterpriseValueRevenue.score = StockData.ratioBetterThan(ratiosFields.enterpriseValueRevenue.value, 5, 10)
        // ratiosFields.enterpriseValueEBITDA.score = StockData.ratioBetterThan(ratiosFields.enterpriseValueEBITDA.value, 15, 20)
        // ratiosFields.priceEarningGrowth.score = 25 * StockData.ratioBetterThan(ratiosFields.priceEarningGrowth.value, 5, 10)
        //
        // ratiosFields.roicQ1.score = 2 * ratiosFields.roicQ1.value
        // ratiosFields.roicY1.score = 5 * ratiosFields.roicY1.value
        // ratiosFields.roicGrowthQ1.score = StockData.last(stock.roicPQ, 0) * ratiosFields.roicGrowthQ1.value / 100 * 2
        // ratiosFields.roicGrowthQ2.score = StockData.last(stock.roicPQ, 1) * ratiosFields.roicGrowthQ2.value / 100
        // ratiosFields.roicGrowth1.score = StockData.last(stock.roicP, 0) * ratiosFields.roicGrowth1.value / 100 * 3
        // ratiosFields.roicGrowth2.score = StockData.last(stock.roicP, 1) * ratiosFields.roicGrowth2.value / 100 * 2
        // ratiosFields.roicGrowth3.score = StockData.last(stock.roicP, 2) * ratiosFields.roicGrowth3.value / 100
        //
        // ratiosFields.roaQ1.score = ratiosFields.roaQ1.value
        // ratiosFields.roaY1.score = 2 * ratiosFields.roaY1.value
        // ratiosFields.roaGrowthQ1.score = StockData.last(stock.roaPQ, 0) * ratiosFields.roaGrowthQ1.value / 100 * 2
        // ratiosFields.roaGrowthQ2.score = StockData.last(stock.roaPQ, 1) * ratiosFields.roaGrowthQ2.value / 100
        // ratiosFields.roaGrowth1.score = StockData.last(stock.roaP, 0) * ratiosFields.roaGrowth1.value / 100 * 3
        // ratiosFields.roaGrowth2.score = StockData.last(stock.roaP, 1) * ratiosFields.roaGrowth2.value / 100 * 2
        // ratiosFields.roaGrowth3.score = StockData.last(stock.roaP, 2) * ratiosFields.roaGrowth3.value / 100
        //
        // if (ratiosFields.totalDebtToEquity1.value > 3) {
        //     ratiosFields.roeQ1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
        //     ratiosFields.roeY1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
        // }
        // ratiosFields.roeQ1.score = ratiosFields.roeQ1.value
        // ratiosFields.roeY1.score = 2 * ratiosFields.roeY1.value
        // ratiosFields.roeGrowthQ1.score = StockData.last(stock.roePQ, 0) * ratiosFields.roeGrowthQ1.value / 100 * 2
        // ratiosFields.roeGrowthQ2.score = StockData.last(stock.roePQ, 1) * ratiosFields.roeGrowthQ2.value / 100
        // ratiosFields.roeGrowth1.score = StockData.last(stock.roeP, 0) * ratiosFields.roeGrowth1.value / 100 * 3
        // ratiosFields.roeGrowth2.score = StockData.last(stock.roeP, 1) * ratiosFields.roeGrowth2.value / 100 * 2
        // ratiosFields.roeGrowth3.score = StockData.last(stock.roeP, 2) * ratiosFields.roeGrowth3.value / 100
        //
        //
        // if (ratiosFields.currentRatioQ1.value < 2) {
        //     ratiosFields.currentRatioQ1.score = (ratiosFields.currentRatioQ1.value - 2) * 100
        // }
        // if (ratiosFields.currentRatioQ1.value < 1.25) {
        //     ratiosFields.currentRatioQ1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
        // }
        //
        // ratiosFields.equityGrowthQ1.score = ratiosFields.equityGrowthQ1.value
        // ratiosFields.equityGrowthQ2.score = ratiosFields.equityGrowthQ2.value
        // ratiosFields.equityGrowth1.score = ratiosFields.equityGrowth1.value * 1.5
        // ratiosFields.equityGrowth2.score = ratiosFields.equityGrowth2.value
        // ratiosFields.equityGrowth3.score = ratiosFields.equityGrowth3.value * 0.5
        //
        // ratiosFields.totalDebtToEquityQ1.score = StockData.ratioBetterThan(ratiosFields.totalDebtToEquityQ1.value, 0.8, 10) * 20
        // ratiosFields.totalDebtToEquity1.score = StockData.ratioBetterThan(ratiosFields.totalDebtToEquity1.value, 0.8, 10) * 50
        // ratiosFields.totalDebtToEquityGrowthQ1.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquityQ, 0)) * ratiosFields.totalDebtToEquityGrowthQ1.value * 0.5
        // ratiosFields.totalDebtToEquityGrowthQ2.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquityQ, 1)) * ratiosFields.totalDebtToEquityGrowthQ2.value * 0.25
        // ratiosFields.totalDebtToEquityGrowth1.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 0)) * ratiosFields.totalDebtToEquityGrowth1.value * 0.75
        // ratiosFields.totalDebtToEquityGrowth2.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 1)) * ratiosFields.totalDebtToEquityGrowth2.value * 0.5
        // ratiosFields.totalDebtToEquityGrowth3.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 2)) * ratiosFields.totalDebtToEquityGrowth3.value * 0.25
        //
        // ratiosFields.nonCurrentLiabilitiesToIncomeQ1.score = StockData.ratioBetterThan(ratiosFields.nonCurrentLiabilitiesToIncomeQ1.value, 4, 6) * 2
        // ratiosFields.nonCurrentLiabilitiesToIncome1.score = StockData.ratioBetterThan(ratiosFields.nonCurrentLiabilitiesToIncome1.value, 4, 6) * 5
        // ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ1.score = -StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 0) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ1.value * 0.1
        // ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ2.score = -StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 1) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ2.value * 0.05
        // ratiosFields.nonCurrentLiabilitiesToIncomeGrowth1.score = -StockData.last(stock.nonCurrentLiabilitiesToIncome, 0) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth1.value * 0.15
        // ratiosFields.nonCurrentLiabilitiesToIncomeGrowth2.score = -StockData.last(stock.nonCurrentLiabilitiesToIncome, 1) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth2.value * 0.1
        // ratiosFields.nonCurrentLiabilitiesToIncomeGrowth3.score = -StockData.last(stock.nonCurrentLiabilitiesToIncome, 3) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth3.value * 0.05
        //
        // StockData.removeInfinity(ratiosFields)
        // StockData.capScoreValues(ratiosFields)
        // StockData.buildClasses(ratiosFields)
        // StockData.calcTotalScore(ratiosFields)
        // ratiosFields.symbol.classes.push('symbol')

        //TODO
        // @ts-ignore
        return ratiosFields
    }
}