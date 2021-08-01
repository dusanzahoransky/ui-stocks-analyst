import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {StockFields} from "./StockFields";
import {StockData} from "./StockData";
import {StockAnalystService} from "../../services/StockAnalystService";

export interface GrowthInvestingFields extends StockFields {
    marketCap: FundamentalsCell
    enterpriseValue: FundamentalsCell
    forwardPE: FundamentalsCell
    priceToSalesTrailing12Months: FundamentalsCell
    currentPriceToFreeCashFlow: FundamentalsCell
    priceToFreeCashFlow: FundamentalsCell
    enterpriseValueRevenue: FundamentalsCell
    enterpriseValueEBIT: FundamentalsCell
    priceEarningGrowth: FundamentalsCell

    growthEstimate5y: FundamentalsCell

    revenueQ1: FundamentalsCell
    revenueY1: FundamentalsCell
    revenueGrowthQ1: FundamentalsCell
    revenueGrowthQ2: FundamentalsCell
    revenueGrowth1: FundamentalsCell
    revenueGrowth2: FundamentalsCell
    revenueGrowth3: FundamentalsCell

    grossMarginY1: FundamentalsCell
    grossMarginGrowth1: FundamentalsCell
    grossMarginGrowth2: FundamentalsCell
    grossMarginGrowth3: FundamentalsCell

    netIncomeQ1: FundamentalsCell
    netIncomeY1: FundamentalsCell
    netIncomeGrowthQ1: FundamentalsCell
    netIncomeGrowthQ2: FundamentalsCell
    netIncomeGrowth1: FundamentalsCell
    netIncomeGrowth2: FundamentalsCell
    netIncomeGrowth3: FundamentalsCell

    operatingCashFlowQ1: FundamentalsCell
    operatingCashFlowY1: FundamentalsCell
    operatingCashFlowGrowthQ1: FundamentalsCell
    operatingCashFlowGrowthQ2: FundamentalsCell
    operatingCashFlowGrowth1: FundamentalsCell
    operatingCashFlowGrowth2: FundamentalsCell
    operatingCashFlowGrowth3: FundamentalsCell

    capitalExpendituresQ1: FundamentalsCell
    capitalExpendituresY1: FundamentalsCell
    capitalExpendituresGrowthQ1: FundamentalsCell
    capitalExpendituresGrowthQ2: FundamentalsCell
    capitalExpendituresGrowth1: FundamentalsCell
    capitalExpendituresGrowth2: FundamentalsCell
    capitalExpendituresGrowth3: FundamentalsCell
}

export class GrowthInvesting extends StockData {

    headerData(stock: Stock): undefined {
        return undefined
    }

    labels(): string[] {
        return [
            'symbol',
            'marketCap',
            'enterpriseValue',
            'forwardPE',
            'priceToSalesTrailing12Months',
            'currentPriceToFreeCashFlow',
            'priceToFreeCashFlow',
            'enterpriseValueRevenue',
            'enterpriseValueEBIT',
            'priceEarningGrowth',

            'growthEstimate5y',

            'revenueQ1',
            'revenueY1',
            'revenueGrowthQ1',
            'revenueGrowthQ2',
            'revenueGrowth1',
            'revenueGrowth2',
            'revenueGrowth3',

            'grossMarginY1',
            'grossMarginGrowth1',
            'grossMarginGrowth2',
            'grossMarginGrowth3',

            'netIncomeQ1',
            'netIncomeY1',
            'netIncomeGrowthQ1',
            'netIncomeGrowthQ2',
            'netIncomeGrowth1',
            'netIncomeGrowth2',
            'netIncomeGrowth3',

            'operatingCashFlowQ1',
            'operatingCashFlowY1',
            'operatingCashFlowGrowthQ1',
            'operatingCashFlowGrowthQ2',
            'operatingCashFlowGrowth1',
            'operatingCashFlowGrowth2',
            'operatingCashFlowGrowth3',

            'capitalExpendituresQ1',
            'capitalExpendituresY1',
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
            symbol: StockData.toCell(stock.symbol, false, false, `${stock.companyName}, price ${StockData.toTitle(StockData.lastEntry(stock.price))}`),
            marketCap: StockData.toCell(StockData.last(stock.marketCap)),
            enterpriseValue: StockData.toCell(StockData.last(stock.enterpriseValue), false),
            forwardPE: StockData.toCell(StockData.last(stock.forwardPE), false),
            priceToSalesTrailing12Months: StockData.toCell(StockData.last(stock.priceToSalesTrailing12Months), false),
            currentPriceToFreeCashFlow: StockData.toCell(StockData.last(stock.currentPriceToFreeCashFlow), false),
            priceToFreeCashFlow: StockData.toCell(StockData.last(stock.priceToFreeCashFlow), false),
            enterpriseValueRevenue: StockData.toCell(StockData.last(stock.enterpriseValueRevenue), false),
            enterpriseValueEBIT: StockData.toCell(StockData.last(stock.enterpriseValueEBIT), false),
            priceEarningGrowth: StockData.toCell(StockData.last(stock.priceEarningGrowth), false),
            growthEstimate5y: StockData.toCell(StockData.last(stock.growthEstimate5y), true),

            revenueQ1: StockData.toCell(StockData.last(stock.revenueQ), false, false, StockData.toTitle(stock.revenueQ)),
            revenueY1: StockData.toCell(StockData.last(stock.revenue), false, false, StockData.toTitle(stock.revenue)),
            revenueGrowthQ1: StockData.toCell(StockData.last(stock.revenueGrowthQ), true, true),
            revenueGrowthQ2: StockData.toCell(StockData.last(stock.revenueGrowthQ, 1), true, true),
            revenueGrowth1: StockData.toCell(StockData.last(stock.revenueGrowth), true, true),
            revenueGrowth2: StockData.toCell(StockData.last(stock.revenueGrowth, 1), true, true),
            revenueGrowth3: StockData.toCell(StockData.last(stock.revenueGrowth, 2), true, true),

            grossMarginY1: StockData.toCell(StockData.last(stock.grossMargin), true, false, StockData.toTitle(stock.grossMargin)),
            grossMarginGrowth1: StockData.toCell(StockData.last(stock.grossMarginGrowth), true, true),
            grossMarginGrowth2: StockData.toCell(StockData.last(stock.grossMarginGrowth, 1), true, true),
            grossMarginGrowth3: StockData.toCell(StockData.last(stock.grossMarginGrowth, 2), true, true),

            netIncomeQ1: StockData.toCell(StockData.last(stock.netIncomeQ), false, false, StockData.toTitle(stock.netIncomeQ)),
            netIncomeY1: StockData.toCell(StockData.last(stock.netIncome), false, false, StockData.toTitle(stock.netIncome)),
            netIncomeGrowthQ1: StockData.toCell(StockData.last(stock.netIncomeGrowthQ), true, true),
            netIncomeGrowthQ2: StockData.toCell(StockData.last(stock.netIncomeGrowthQ, 1), true, true),
            netIncomeGrowth1: StockData.toCell(StockData.last(stock.netIncomeGrowth), true, true),
            netIncomeGrowth2: StockData.toCell(StockData.last(stock.netIncomeGrowth, 1), true, true),
            netIncomeGrowth3: StockData.toCell(StockData.last(stock.netIncomeGrowth, 2), true, true),

            operatingCashFlowQ1: StockData.toCell(StockData.last(stock.operatingCashFlowQ), false, false, StockData.toTitle(stock.operatingCashFlowQ)),
            operatingCashFlowY1: StockData.toCell(StockData.last(stock.operatingCashFlow), false, false, StockData.toTitle(stock.operatingCashFlow)),
            operatingCashFlowGrowthQ1: StockData.toCell(StockData.last(stock.operatingCashFlowGrowthQ), true, true),
            operatingCashFlowGrowthQ2: StockData.toCell(StockData.last(stock.operatingCashFlowGrowthQ, 1), true, true),
            operatingCashFlowGrowth1: StockData.toCell(StockData.last(stock.operatingCashFlowGrowth), true, true),
            operatingCashFlowGrowth2: StockData.toCell(StockData.last(stock.operatingCashFlowGrowth, 1), true, true),
            operatingCashFlowGrowth3: StockData.toCell(StockData.last(stock.operatingCashFlowGrowth, 2), true, true),

            capitalExpendituresQ1: StockData.toCell(StockData.last(stock.capitalExpendituresQ), false, false, StockData.toTitle(stock.capitalExpendituresQ)),
            capitalExpendituresY1: StockData.toCell(StockData.last(stock.capitalExpenditures), false, false, StockData.toTitle(stock.capitalExpenditures)),
            capitalExpendituresGrowthQ1: StockData.toCell(StockData.last(stock.capitalExpendituresGrowthQ), true, true),
            capitalExpendituresGrowthQ2: StockData.toCell(StockData.last(stock.capitalExpendituresGrowthQ, 1), true, true),
            capitalExpendituresGrowth1: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth), true, true),
            capitalExpendituresGrowth2: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth, 1), true, true),
            capitalExpendituresGrowth3: StockData.toCell(StockData.last(stock.capitalExpendituresGrowth, 2), true, true),

            score: StockData.toCell(0),
        }


        if(ratiosFields.enterpriseValue.value > 0) {
            ratiosFields.enterpriseValue.score = StockData.percentBelow(ratiosFields.enterpriseValue.value, ratiosFields.marketCap.value)
            ratiosFields.enterpriseValueRevenue.score = 5 * StockAnalystService.ratioBetterThan(ratiosFields.enterpriseValueRevenue.value, 10, 50)
            ratiosFields.enterpriseValueEBIT.score = 2 * StockAnalystService.ratioBetterThan(ratiosFields.enterpriseValueEBIT.value, 20, 10)
        }
        ratiosFields.forwardPE.score = 3 * StockAnalystService.ratioBetterThan(ratiosFields.forwardPE.value, 30, 10)
        ratiosFields.priceToSalesTrailing12Months.score = 10 * StockAnalystService.ratioBetterThan(ratiosFields.priceToSalesTrailing12Months.value, 6, 50)
        ratiosFields.currentPriceToFreeCashFlow.score = 2 * StockAnalystService.ratioBetterThan(ratiosFields.currentPriceToFreeCashFlow.value, 25, 10)
        ratiosFields.priceToFreeCashFlow.score = StockAnalystService.ratioBetterThan(ratiosFields.priceToFreeCashFlow.value, 25, 10)
        ratiosFields.growthEstimate5y.score = ratiosFields.growthEstimate5y.value * 5
        ratiosFields.revenueGrowthQ1.score = ratiosFields.revenueGrowthQ1.value / StockData.last(stock.priceToSalesTrailing12Months, 0, 5) * 15
        ratiosFields.revenueGrowthQ2.score = ratiosFields.revenueGrowthQ2.value / StockData.last(stock.priceToSalesTrailing12Months0, 0, 5) * 10
        ratiosFields.revenueGrowth1.score = ratiosFields.revenueGrowth1.value / StockData.last(stock.priceToSalesTrailing12Months, 0, 5) * 15
        ratiosFields.revenueGrowth2.score = ratiosFields.revenueGrowth2.value / StockData.last(stock.priceToSalesTrailing12Months, 0, 5) * 10
        ratiosFields.revenueGrowth3.score = ratiosFields.revenueGrowth3.value / StockData.last(stock.priceToSalesTrailing12Months, 0, 5) * 5

        ratiosFields.grossMarginY1.score = ratiosFields.grossMarginY1.value * 1
        ratiosFields.grossMarginGrowth1.score = StockData.last(stock.grossMargin, 0) * ratiosFields.grossMarginGrowth1.value * 0.3
        ratiosFields.grossMarginGrowth2.score = StockData.last(stock.grossMargin, 1) * ratiosFields.grossMarginGrowth2.value * 0.2
        ratiosFields.grossMarginGrowth3.score = StockData.last(stock.grossMargin, 2) * ratiosFields.grossMarginGrowth3.value * 0.1

        ratiosFields.netIncomeGrowthQ1.score = ratiosFields.netIncomeGrowthQ1.value * 1
        if(GrowthInvesting.last(stock.netIncomeQ) < 0) ratiosFields.netIncomeGrowthQ1.score *= -1
        ratiosFields.netIncomeGrowthQ2.score = ratiosFields.netIncomeGrowthQ2.value * 0.5
        if(GrowthInvesting.last(stock.netIncomeQ, 1) < 0) ratiosFields.netIncomeGrowthQ2.score *= -1
        ratiosFields.netIncomeGrowth1.score = ratiosFields.netIncomeGrowth1.value * 1
        if(GrowthInvesting.last(stock.netIncome) < 0) ratiosFields.netIncomeGrowth1.score *= -1
        ratiosFields.netIncomeGrowth2.score = ratiosFields.netIncomeGrowth2.value * 0.5
        if(GrowthInvesting.last(stock.netIncome, 1) < 0) ratiosFields.netIncomeGrowth2.score *= -1
        ratiosFields.netIncomeGrowth3.score = ratiosFields.netIncomeGrowth3.value * 0.25
        if(GrowthInvesting.last(stock.netIncome, 2) < 0) ratiosFields.netIncomeGrowth3.score *= -1

        ratiosFields.operatingCashFlowGrowthQ1.score = ratiosFields.operatingCashFlowGrowthQ1.value * 4
        if(GrowthInvesting.last(stock.operatingCashFlowQ) < 0) ratiosFields.operatingCashFlowGrowthQ1.score *= -1
        ratiosFields.operatingCashFlowGrowthQ2.score = ratiosFields.operatingCashFlowGrowthQ2.value * 2
        if(GrowthInvesting.last(stock.operatingCashFlowQ, 1) < 0) ratiosFields.operatingCashFlowGrowthQ2.score *= -1
        ratiosFields.operatingCashFlowGrowth1.score = ratiosFields.operatingCashFlowGrowth1.value * 4
        if(GrowthInvesting.last(stock.operatingCashFlow) < 0) ratiosFields.operatingCashFlowGrowth1.score *= -1
        ratiosFields.operatingCashFlowGrowth2.score = ratiosFields.operatingCashFlowGrowth2.value * 2
        if(GrowthInvesting.last(stock.operatingCashFlow, 1) < 0) ratiosFields.operatingCashFlowGrowth2.score *= -1
        ratiosFields.operatingCashFlowGrowth3.score = ratiosFields.operatingCashFlowGrowth3.value * 1
        if(GrowthInvesting.last(stock.operatingCashFlow, 2) < 0) ratiosFields.operatingCashFlowGrowth3.score *= -1

        ratiosFields.capitalExpendituresGrowthQ1.score = -ratiosFields.capitalExpendituresGrowthQ1.value * 2
        ratiosFields.capitalExpendituresGrowthQ2.score = -ratiosFields.capitalExpendituresGrowthQ2.value * 1
        ratiosFields.capitalExpendituresGrowth1.score = -ratiosFields.capitalExpendituresGrowth1.value * 2
        ratiosFields.capitalExpendituresGrowth2.score = -ratiosFields.capitalExpendituresGrowth2.value * 1
        ratiosFields.capitalExpendituresGrowth3.score = -ratiosFields.capitalExpendituresGrowth3.value * 0.5

        StockData.removeInfinity(ratiosFields)
        StockData.capScoreValues(ratiosFields, 200)
        StockData.buildClasses(ratiosFields)
        StockData.calcTotalScore(ratiosFields)
        ratiosFields.symbol.classes.push('symbol')

        return ratiosFields
    }
}