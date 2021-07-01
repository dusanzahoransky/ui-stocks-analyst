import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {StockFields} from "./StockFields";
import {StockData} from "./StockData";
import {StockAnalystService} from "../../services/StockAnalystService";

export interface ValueInvestingFields extends StockFields {
    marketCap: FundamentalsCell
    enterpriseValue: FundamentalsCell
    totalCashPerShareP: FundamentalsCell
    trailingPE: FundamentalsCell
    forwardPE: FundamentalsCell
    priceToSalesTrailing12Months: FundamentalsCell
    priceBook: FundamentalsCell
    currentPriceToFreeCashFlow: FundamentalsCell
    priceToFreeCashFlow: FundamentalsCell
    enterpriseValueRevenue: FundamentalsCell
    enterpriseValueEBIT: FundamentalsCell
    acquirersMultiple: FundamentalsCell
    priceEarningGrowth: FundamentalsCell

    roicQ1: FundamentalsCell
    roicY1: FundamentalsCell
    roicGrowthQ1: FundamentalsCell
    roicGrowthQ2: FundamentalsCell
    roicGrowth1: FundamentalsCell
    roicGrowth2: FundamentalsCell
    roicGrowth3: FundamentalsCell

    roaQ1: FundamentalsCell
    roaY1: FundamentalsCell
    roaGrowthQ1: FundamentalsCell
    roaGrowthQ2: FundamentalsCell
    roaGrowth1: FundamentalsCell
    roaGrowth2: FundamentalsCell
    roaGrowth3: FundamentalsCell

    roeQ1: FundamentalsCell
    roeY1: FundamentalsCell
    roeGrowthQ1: FundamentalsCell
    roeGrowthQ2: FundamentalsCell
    roeGrowth1: FundamentalsCell
    roeGrowth2: FundamentalsCell
    roeGrowth3: FundamentalsCell

    currentRatioQ1: FundamentalsCell

    equityQ1: FundamentalsCell
    equity1: FundamentalsCell
    equityGrowthQ1: FundamentalsCell
    equityGrowthQ2: FundamentalsCell
    equityGrowth1: FundamentalsCell
    equityGrowth2: FundamentalsCell
    equityGrowth3: FundamentalsCell

    totalDebtToEquityQ1: FundamentalsCell
    totalDebtToEquity1: FundamentalsCell
    totalDebtToEquityGrowthQ1: FundamentalsCell
    totalDebtToEquityGrowthQ2: FundamentalsCell
    totalDebtToEquityGrowth1: FundamentalsCell
    totalDebtToEquityGrowth2: FundamentalsCell
    totalDebtToEquityGrowth3: FundamentalsCell

    avgFreeCashFlowPerShareY5: FundamentalsCell
    avgFreeCashFlowPerShareGrowthY5: FundamentalsCell
    freeCashFlowPerShareGrowth1: FundamentalsCell
    freeCashFlowPerShareGrowth2: FundamentalsCell
    freeCashFlowPerShareGrowth3: FundamentalsCell

    nonCurrentLiabilitiesToIncomeQ1: FundamentalsCell
    nonCurrentLiabilitiesToIncome1: FundamentalsCell
    nonCurrentLiabilitiesToIncomeGrowthQ1: FundamentalsCell
    nonCurrentLiabilitiesToIncomeGrowthQ2: FundamentalsCell
    nonCurrentLiabilitiesToIncomeGrowth1: FundamentalsCell
    nonCurrentLiabilitiesToIncomeGrowth2: FundamentalsCell
    nonCurrentLiabilitiesToIncomeGrowth3: FundamentalsCell

    profitMarginQ1: FundamentalsCell
    profitMargin1: FundamentalsCell
    profitMarginGrowthQ1: FundamentalsCell
    profitMarginGrowthQ2: FundamentalsCell
    profitMarginGrowth1: FundamentalsCell
    profitMarginGrowth2: FundamentalsCell
    profitMarginGrowth3: FundamentalsCell

    interestExpenseToOperativeIncomeQ1: FundamentalsCell
    interestExpenseToOperativeIncome1: FundamentalsCell
    interestExpenseToOperativeIncomeGrowthQ1: FundamentalsCell
    interestExpenseToOperativeIncomeGrowthQ2: FundamentalsCell
    interestExpenseToOperativeIncomeGrowth1: FundamentalsCell
    interestExpenseToOperativeIncomeGrowth2: FundamentalsCell
    interestExpenseToOperativeIncomeGrowth3: FundamentalsCell

    retainedEarningsQ1: FundamentalsCell
    retainedEarnings1: FundamentalsCell
    retainedEarningsGrowthQ1: FundamentalsCell
    retainedEarningsGrowthQ2: FundamentalsCell
    retainedEarningsGrowth1: FundamentalsCell
    retainedEarningsGrowth2: FundamentalsCell
    retainedEarningsGrowth3: FundamentalsCell

    shares: FundamentalsCell
    sharesGrowth1: FundamentalsCell
    sharesGrowth2: FundamentalsCell
    sharesGrowth3: FundamentalsCell
}

export class ValueInvesting extends StockData {

    headerData(stock: Stock): undefined {
        return undefined
    }

    labels(): string[] {
        return [
            'symbol',
            'marketCap',
            'EV',
            'totalCashPerShareP',
            'trailingPE',
            'forwardPE',
            'priceToSalesTrailing12Months',
            'priceBook',
            'currentQ PriceToFreeCashFlow',
            'priceToFreeCashFlow',
            'enterpriseValueRevenue',
            'enterpriseValueEBIT',
            'acquirersMultiple',
            'priceEarningGrowth',

            'ROIC Q1',
            'ROIC Y1',
            'ROIC Q1g',
            'ROIC Q2g',
            'ROIC Y1g',
            'ROIC Y2g',
            'ROIC Y3g',

            'ROA Q1',
            'ROA Y1',
            'ROA Q1g',
            'ROA Q2g',
            'ROA Y1g',
            'ROA Y2g',
            'ROA Y3g',

            'ROE Q1',
            'ROE Y1',
            'ROE Q1g',
            'ROE Q2g',
            'ROE Y1g',
            'ROE Y2g',
            'ROE Y3g',

            'currentRatio Q1',

            'equity Q1',
            'equity Y1',
            'equity Q1g',
            'equity Q2g',
            'equity Y1g',
            'equity Y2g',
            'equity Y3g',

            'totalDebtToEquity Q1',
            'totalDebtToEquity Y1',
            'totalDebtToEquity Q1g',
            'totalDebtToEquity Q2g',
            'totalDebtToEquity 1Yg',
            'totalDebtToEquity 2Yg',
            'totalDebtToEquity 3Yg',

            'avgFreeCashFlowPerShareY5',
            'avgFreeCashFlowPerShareGrowthY5',
            'freeCashFlowPerShareGrowth1',
            'freeCashFlowPerShareGrowth2',
            'freeCashFlowPerShareGrowth3',

            'nonCurrentLiabilitiesToIncome Q1',
            'nonCurrentLiabilitiesToIncome Y1',
            'nonCurrentLiabilitiesToIncome Q1g',
            'nonCurrentLiabilitiesToIncome Q2g',
            'nonCurrentLiabilitiesToIncome Y1g',
            'nonCurrentLiabilitiesToIncome Y2g',
            'nonCurrentLiabilitiesToIncome Y3g',

            'profitMargin Q1',
            'profitMargin Y1',
            'profitMargin Q1g',
            'profitMargin Q2g',
            'profitMargin Y1g',
            'profitMargin Y2g',
            'profitMargin Y3g',

            'interestExpenseToOperativeIncome Q1',
            'interestExpenseToOperativeIncome Y1',
            'interestExpenseToOperativeIncome Q1g',
            'interestExpenseToOperativeIncome Q2g',
            'interestExpenseToOperativeIncome Y1g',
            'interestExpenseToOperativeIncome Y2g',
            'interestExpenseToOperativeIncome Y3g',

            'retainedEarnings Q1',
            'retainedEarnings Y1',
            'retainedEarnings Q1g',
            'retainedEarnings Q2g',
            'retainedEarnings Y1g',
            'retainedEarnings Y2g',
            'retainedEarnings Y3g',

            'shares',
            'shares Y1g',
            'shares Y2g',
            'shares Y3g',

            'score'
        ]
    }

    fromStock(stock: Stock): ValueInvestingFields {
        const ratiosFields = {
            symbol: StockData.toCell(stock.symbol, false, false, `${stock.companyName}, price ${StockData.toTitle(StockData.lastEntry(stock.price))}`),
            marketCap: StockData.toCell(StockData.last(stock.marketCap)),
            enterpriseValue: StockData.toCell(StockData.last(stock.enterpriseValue), false),
            totalCashPerShareP: StockData.toCell(StockData.last(stock.totalCashPerShareP), true),
            trailingPE: StockData.toCell(StockData.last(stock.trailingPE), false, false, StockData.toTitle(stock.trailingPE)),
            forwardPE: StockData.toCell(StockData.last(stock.forwardPE), false, false, StockData.toTitle(stock.forwardPE)),
            priceToSalesTrailing12Months: StockData.toCell(StockData.last(stock.priceToSalesTrailing12Months), false, false, StockData.toTitle(stock.priceToSalesTrailing12Months)),
            priceBook: StockData.toCell(StockData.last(stock.priceBook), false, false, StockData.toTitle(stock.priceBook)),
            currentPriceToFreeCashFlow: StockData.toCell(StockData.last(stock.currentPriceToFreeCashFlow), false, false, StockData.toTitle(stock.currentPriceToFreeCashFlow)),
            priceToFreeCashFlow: StockData.toCell(StockData.last(stock.priceToFreeCashFlow), false, false, StockData.toTitle(stock.priceToFreeCashFlow)),
            enterpriseValueRevenue: StockData.toCell(StockData.last(stock.enterpriseValueRevenue), false, false, StockData.toTitle(stock.enterpriseValueRevenue)),
            enterpriseValueEBIT: StockData.toCell(StockData.last(stock.enterpriseValueEBIT), false, false, StockData.toTitle(stock.enterpriseValueEBIT)),
            acquirersMultiple: StockData.toCell(StockData.last(stock.acquirersMultiple), false, false, ValueInvesting.toAcquirersMTitle(stock)),
            priceEarningGrowth: StockData.toCell(StockData.last(stock.priceEarningGrowth), false, false, StockData.toTitle(stock.priceEarningGrowth)),

            roicQ1: StockData.toCell(StockData.last(stock.roicPQ), false, false, StockData.toTitle(stock.roicPQ)),
            roicY1: StockData.toCell(StockData.last(stock.roicP), false, false, StockData.toTitle(stock.roicP)),
            roicGrowthQ1: StockData.toCell(StockData.last(stock.roicGrowthQ), true, true),
            roicGrowthQ2: StockData.toCell(StockData.last(stock.roicGrowthQ, 1), true, true),
            roicGrowth1: StockData.toCell(StockData.last(stock.roicGrowth), true, true),
            roicGrowth2: StockData.toCell(StockData.last(stock.roicGrowth, 1), true, true),
            roicGrowth3: StockData.toCell(StockData.last(stock.roicGrowth, 2), true, true),

            roaQ1: StockData.toCell(StockData.last(stock.roaPQ), false, false, StockData.toTitle(stock.roaPQ)),
            roaY1: StockData.toCell(StockData.last(stock.roaP), false, false, StockData.toTitle(stock.roaP)),
            roaGrowthQ1: StockData.toCell(StockData.last(stock.roaGrowthQ), true, true),
            roaGrowthQ2: StockData.toCell(StockData.last(stock.roaGrowthQ, 1), true, true),
            roaGrowth1: StockData.toCell(StockData.last(stock.roaGrowth), true, true),
            roaGrowth2: StockData.toCell(StockData.last(stock.roaGrowth, 1), true, true),
            roaGrowth3: StockData.toCell(StockData.last(stock.roaGrowth, 2), true, true),

            roeQ1: StockData.toCell(StockData.last(stock.roePQ), false, false, StockData.toTitle(stock.roePQ)),
            roeY1: StockData.toCell(StockData.last(stock.roeP), false, false, StockData.toTitle(stock.roeP)),
            roeGrowthQ1: StockData.toCell(StockData.last(stock.roeGrowthQ), true, true),
            roeGrowthQ2: StockData.toCell(StockData.last(stock.roeGrowthQ, 1), true, true),
            roeGrowth1: StockData.toCell(StockData.last(stock.roeGrowth), true, true),
            roeGrowth2: StockData.toCell(StockData.last(stock.roeGrowth, 1), true, true),
            roeGrowth3: StockData.toCell(StockData.last(stock.roeGrowth, 2), true, true),

            currentRatioQ1: StockData.toCell(StockData.last(stock.currentRatioQ), false),

            equityQ1: StockData.toCell(StockData.last(stock.totalShareholdersEquityQ), false, false, StockData.toTitle(stock.totalShareholdersEquityQ)),
            equity1: StockData.toCell(StockData.last(stock.totalShareholdersEquity), false, false, StockData.toTitle(stock.totalShareholdersEquity)),
            equityGrowthQ1: StockData.toCell(StockData.last(stock.totalShareholdersEquityGrowthQ), true, true),
            equityGrowthQ2: StockData.toCell(StockData.last(stock.totalShareholdersEquityGrowthQ, 1), true, true),
            equityGrowth1: StockData.toCell(StockData.last(stock.totalShareholdersEquityGrowth), true, true),
            equityGrowth2: StockData.toCell(StockData.last(stock.totalShareholdersEquityGrowth, 1), true, true),
            equityGrowth3: StockData.toCell(StockData.last(stock.totalShareholdersEquityGrowth, 2), true, true),

            totalDebtToEquityQ1: StockData.toCell(StockData.last(stock.totalDebtToEquityQ), false, false, StockData.toRatioTitle(stock.totalLiabilitiesQ, stock.totalShareholdersEquityQ, stock.totalDebtToEquityQ)),
            totalDebtToEquity1: StockData.toCell(StockData.last(stock.totalDebtToEquity), false, false, StockData.toRatioTitle(stock.totalLiabilities, stock.totalShareholdersEquity, stock.totalDebtToEquity)),
            totalDebtToEquityGrowthQ1: StockData.toCell(StockData.last(stock.totalDebtToEquityGrowthQ), true, true),
            totalDebtToEquityGrowthQ2: StockData.toCell(StockData.last(stock.totalDebtToEquityGrowthQ, 1), true, true),
            totalDebtToEquityGrowth1: StockData.toCell(StockData.last(stock.totalDebtToEquityGrowth), true, true),
            totalDebtToEquityGrowth2: StockData.toCell(StockData.last(stock.totalDebtToEquityGrowth, 1), true, true),
            totalDebtToEquityGrowth3: StockData.toCell(StockData.last(stock.totalDebtToEquityGrowth, 2), true, true),

            avgFreeCashFlowPerShareY5: StockData.toCell(StockData.avg(stock.freeCashFlowPerShare), false, false, StockData.toTitle(stock.freeCashFlowPerShare)),
            avgFreeCashFlowPerShareGrowthY5: StockData.toCell(StockData.avg(stock.freeCashFlowPerShareGrowth), true, false, StockData.toTitle(stock.freeCashFlowPerShareGrowth)),
            freeCashFlowPerShareGrowth1: StockData.toCell(StockData.last(stock.freeCashFlowPerShareGrowth), true, true),
            freeCashFlowPerShareGrowth2: StockData.toCell(StockData.last(stock.freeCashFlowPerShareGrowth, 1), true, true),
            freeCashFlowPerShareGrowth3: StockData.toCell(StockData.last(stock.freeCashFlowPerShareGrowth, 2), true, true),

            nonCurrentLiabilitiesToIncomeQ1: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeQ), false, false, StockData.toRatioTitleMinusNumerator(stock.totalLiabilitiesQ, stock.currentLiabilitiesQ, stock.netIncomeQ, stock.nonCurrentLiabilitiesToIncomeQ)),
            nonCurrentLiabilitiesToIncome1: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncome), false, false, StockData.toRatioTitleMinusNumerator(stock.totalLiabilities, stock.currentLiabilities, stock.netIncome, stock.nonCurrentLiabilitiesToIncome)),
            nonCurrentLiabilitiesToIncomeGrowthQ1: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeGrowthQ), true, true),
            nonCurrentLiabilitiesToIncomeGrowthQ2: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeGrowthQ, 1), true, true),
            nonCurrentLiabilitiesToIncomeGrowth1: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeGrowth), true, true),
            nonCurrentLiabilitiesToIncomeGrowth2: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeGrowth, 1), true, true),
            nonCurrentLiabilitiesToIncomeGrowth3: StockData.toCell(StockData.last(stock.nonCurrentLiabilitiesToIncomeGrowth, 2), true, true),

            profitMarginQ1: StockData.toCell(StockData.last(stock.profitMarginPQ), false, false, StockData.toTitle(stock.profitMarginPQ)),
            profitMargin1: StockData.toCell(StockData.last(stock.profitMarginP), false, false, StockData.toTitle(stock.profitMarginP)),
            profitMarginGrowthQ1: StockData.toCell(StockData.last(stock.profitMarginGrowthQ), true, true),
            profitMarginGrowthQ2: StockData.toCell(StockData.last(stock.profitMarginGrowthQ, 1), true, true),
            profitMarginGrowth1: StockData.toCell(StockData.last(stock.profitMarginGrowth), true, true),
            profitMarginGrowth2: StockData.toCell(StockData.last(stock.profitMarginGrowth, 1), true, true),
            profitMarginGrowth3: StockData.toCell(StockData.last(stock.profitMarginGrowth, 2), true, true),

            interestExpenseToOperativeIncomeQ1: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomePQ), true, false, StockData.toRatioTitle(stock.interestExpenseQ, stock.operatingIncomeQ, stock.interestExpenseToOperativeIncomePQ)),
            interestExpenseToOperativeIncome1: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeP), true, false, StockData.toRatioTitle(stock.interestExpense, stock.operatingIncome,stock.interestExpenseToOperativeIncomeP)),
            interestExpenseToOperativeIncomeGrowthQ1: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeGrowthQ), true, true),
            interestExpenseToOperativeIncomeGrowthQ2: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeGrowthQ, 1), true, true),
            interestExpenseToOperativeIncomeGrowth1: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeGrowth), true, true),
            interestExpenseToOperativeIncomeGrowth2: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeGrowth, 1), true, true),
            interestExpenseToOperativeIncomeGrowth3: StockData.toCell(StockData.last(stock.interestExpenseToOperativeIncomeGrowth, 2), true, true),

            retainedEarningsQ1: StockData.toCell(StockData.last(stock.retainedEarningsQ), false, false, StockData.toTitle(stock.retainedEarningsQ)),
            retainedEarnings1: StockData.toCell(StockData.last(stock.retainedEarnings), false, false, StockData.toTitle(stock.retainedEarnings)),
            retainedEarningsGrowthQ1: StockData.toCell(StockData.last(stock.retainedEarningsGrowthQ), true, true),
            retainedEarningsGrowthQ2: StockData.toCell(StockData.last(stock.retainedEarningsGrowthQ, 1), true, true),
            retainedEarningsGrowth1: StockData.toCell(StockData.last(stock.retainedEarningsGrowth), true, true),
            retainedEarningsGrowth2: StockData.toCell(StockData.last(stock.retainedEarningsGrowth, 1), true, true),
            retainedEarningsGrowth3: StockData.toCell(StockData.last(stock.retainedEarningsGrowth, 2), true, true),

            shares: StockData.toCell(StockData.last(stock.currentShares), false, false, StockData.toTitle(stock.currentShares)),
            sharesGrowth1: StockData.toCell(StockData.last(stock.sharesGrowth), true, true),
            sharesGrowth2: StockData.toCell(StockData.last(stock.sharesGrowth, 1), true, true),
            sharesGrowth3: StockData.toCell(StockData.last(stock.sharesGrowth, 2), true, true),

            score: StockData.toCell(0),
        }


        ratiosFields.enterpriseValue.score = StockData.percentBelow(ratiosFields.enterpriseValue.value, ratiosFields.marketCap.value)
        ratiosFields.totalCashPerShareP.score = ratiosFields.totalCashPerShareP.value > 10 ? 0.1 * ratiosFields.totalCashPerShareP.value : 0
        ratiosFields.trailingPE.score = 3 * StockAnalystService.ratioBetterThan(ratiosFields.trailingPE.value, 20, 50)
        ratiosFields.forwardPE.score = 10 * StockAnalystService.ratioBetterThan(ratiosFields.forwardPE.value, 20, 50)
        ratiosFields.priceToSalesTrailing12Months.score = 3 * StockAnalystService.ratioBetterThan(ratiosFields.priceToSalesTrailing12Months.value, 6, 50)
        ratiosFields.priceBook.score = 2 * StockAnalystService.ratioBetterThan(ratiosFields.priceBook.value, 2, 50)
        ratiosFields.currentPriceToFreeCashFlow.score = 5 * StockAnalystService.ratioBetterThan(ratiosFields.currentPriceToFreeCashFlow.value, 15, 50)
        ratiosFields.priceToFreeCashFlow.score = 3 * StockAnalystService.ratioBetterThan(ratiosFields.priceToFreeCashFlow.value, 15, 50)
        if(ValueInvesting.last(stock.enterpriseValue) < 0){
            ratiosFields.enterpriseValueRevenue.score = 20
            ratiosFields.enterpriseValueEBIT.score = 20
            ratiosFields.acquirersMultiple.score = 20
        } else {
            ratiosFields.enterpriseValueRevenue.score = StockAnalystService.ratioBetterThan(ratiosFields.enterpriseValueRevenue.value, 5, 10)
            ratiosFields.enterpriseValueEBIT.score = 2 * StockAnalystService.ratioBetterThan(ratiosFields.enterpriseValueEBIT.value, 15, 20)
            ratiosFields.acquirersMultiple.score = 5 * StockAnalystService.ratioBetterThan(ratiosFields.acquirersMultiple.value, 13, 20)
        }
        ratiosFields.priceEarningGrowth.score = 25 * StockAnalystService.ratioBetterThan(ratiosFields.priceEarningGrowth.value, 5, 10)

        ratiosFields.roicQ1.score = 2 * ratiosFields.roicQ1.value
        if(ratiosFields.roicQ1.value < 0){
            ratiosFields.roicQ1.score *= 2
        }
        ratiosFields.roicY1.score = 5 * ratiosFields.roicY1.value
        if(ratiosFields.roicY1.value < 0){
            ratiosFields.roicY1.score *= 2
        }
        ratiosFields.roicGrowthQ1.score = StockData.last(stock.roicPQ, 0) * ratiosFields.roicGrowthQ1.value / 100 * 2
        ratiosFields.roicGrowthQ2.score = StockData.last(stock.roicPQ, 1) * ratiosFields.roicGrowthQ2.value / 100
        ratiosFields.roicGrowth1.score = StockData.last(stock.roicP, 0) * ratiosFields.roicGrowth1.value / 100 * 3
        ratiosFields.roicGrowth2.score = StockData.last(stock.roicP, 1) * ratiosFields.roicGrowth2.value / 100 * 2
        ratiosFields.roicGrowth3.score = StockData.last(stock.roicP, 2) * ratiosFields.roicGrowth3.value / 100

        ratiosFields.roaQ1.score = ratiosFields.roaQ1.value
        if(ratiosFields.roaQ1.value < 0){
            ratiosFields.roaQ1.score *= 2
        }
        ratiosFields.roaY1.score = 2 * ratiosFields.roaY1.value
        if(ratiosFields.roaY1.value < 0){
            ratiosFields.roaY1.score *= 2
        }
        ratiosFields.roaGrowthQ1.score = StockData.last(stock.roaPQ, 0) * ratiosFields.roaGrowthQ1.value / 100 * 2
        ratiosFields.roaGrowthQ2.score = StockData.last(stock.roaPQ, 1) * ratiosFields.roaGrowthQ2.value / 100
        ratiosFields.roaGrowth1.score = StockData.last(stock.roaP, 0) * ratiosFields.roaGrowth1.value / 100 * 3
        ratiosFields.roaGrowth2.score = StockData.last(stock.roaP, 1) * ratiosFields.roaGrowth2.value / 100 * 2
        ratiosFields.roaGrowth3.score = StockData.last(stock.roaP, 2) * ratiosFields.roaGrowth3.value / 100

        if (ratiosFields.totalDebtToEquity1.value > 3) {
            ratiosFields.roeQ1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
            ratiosFields.roeY1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
        }
        ratiosFields.roeQ1.score = ratiosFields.roeQ1.value / StockData.last(stock.totalDebtToEquityQ, 0)
        if(ratiosFields.roeQ1.value < 0){
            ratiosFields.roeQ1.score *= 2
        }
        ratiosFields.roeY1.score = 2 * ratiosFields.roeY1.value / StockData.last(stock.totalDebtToEquity, 0)
        if(ratiosFields.roeY1.value < 0){
            ratiosFields.roeY1.score *= 2
        }
        ratiosFields.roeGrowthQ1.score = StockData.last(stock.roePQ, 0) * ratiosFields.roeGrowthQ1.value / StockData.last(stock.totalDebtToEquityQ, 0) / 100 * 2
        ratiosFields.roeGrowthQ2.score = StockData.last(stock.roePQ, 1) * ratiosFields.roeGrowthQ2.value / StockData.last(stock.totalDebtToEquityQ, 1) / 100
        ratiosFields.roeGrowth1.score = StockData.last(stock.roeP, 0) * ratiosFields.roeGrowth1.value / StockData.last(stock.totalDebtToEquity, 0) / 100 * 3
        ratiosFields.roeGrowth2.score = StockData.last(stock.roeP, 1) * ratiosFields.roeGrowth2.value / StockData.last(stock.totalDebtToEquity, 1) / 100 * 2
        ratiosFields.roeGrowth3.score = StockData.last(stock.roeP, 2) * ratiosFields.roeGrowth3.value / StockData.last(stock.totalDebtToEquity, 2) / 100


        if (ratiosFields.currentRatioQ1.value < 2) {
            ratiosFields.currentRatioQ1.score = (ratiosFields.currentRatioQ1.value - 2) * 100
        }
        if (ratiosFields.currentRatioQ1.value < 1.25) {
            ratiosFields.currentRatioQ1.classes.push(StockData.CLASS_ADDITIONAL_INFO)
        }

        ratiosFields.equityGrowthQ1.score = ratiosFields.equityGrowthQ1.value
        if(ValueInvesting.last(stock.totalShareholdersEquityQ) < 0) ratiosFields.equityGrowthQ1.score *= -1
        ratiosFields.equityGrowthQ2.score = ratiosFields.equityGrowthQ2.value
        if(ValueInvesting.last(stock.totalShareholdersEquityQ, 1) < 0) ratiosFields.equityGrowthQ2.score *= -1
        ratiosFields.equityGrowth1.score = ratiosFields.equityGrowth1.value * 1.5
        if(ValueInvesting.last(stock.totalShareholdersEquity, 0) < 0) ratiosFields.equityGrowth1.score *= -1
        ratiosFields.equityGrowth2.score = ratiosFields.equityGrowth2.value
        if(ValueInvesting.last(stock.totalShareholdersEquity, 1) < 0) ratiosFields.equityGrowth2.score *= -1
        ratiosFields.equityGrowth3.score = ratiosFields.equityGrowth3.value * 0.5
        if(ValueInvesting.last(stock.totalShareholdersEquity, 2) < 0) ratiosFields.equityGrowth3.score *= -1

        ratiosFields.totalDebtToEquityQ1.score = StockAnalystService.ratioBetterThan(ratiosFields.totalDebtToEquityQ1.value, 0.8, 10) * 20
        ratiosFields.totalDebtToEquity1.score = StockAnalystService.ratioBetterThan(ratiosFields.totalDebtToEquity1.value, 0.8, 10) * 50
        ratiosFields.totalDebtToEquityGrowthQ1.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquityQ, 0)) * ratiosFields.totalDebtToEquityGrowthQ1.value * 0.5
        ratiosFields.totalDebtToEquityGrowthQ2.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquityQ, 1)) * ratiosFields.totalDebtToEquityGrowthQ2.value * 0.25
        ratiosFields.totalDebtToEquityGrowth1.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 0)) * ratiosFields.totalDebtToEquityGrowth1.value * 0.75
        ratiosFields.totalDebtToEquityGrowth2.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 1)) * ratiosFields.totalDebtToEquityGrowth2.value * 0.5
        ratiosFields.totalDebtToEquityGrowth3.score = -StockData.squareRoot(StockData.last(stock.totalDebtToEquity, 2)) * ratiosFields.totalDebtToEquityGrowth3.value * 0.25

        const avgPriceToFCF5Y = StockData.avg(stock.priceToFreeCashFlow);
        ratiosFields.avgFreeCashFlowPerShareGrowthY5.score = ratiosFields.avgFreeCashFlowPerShareY5.value / avgPriceToFCF5Y * 50
        ratiosFields.freeCashFlowPerShareGrowth1.score = ratiosFields.freeCashFlowPerShareGrowth1.value / avgPriceToFCF5Y * 30
        ratiosFields.freeCashFlowPerShareGrowth2.score = ratiosFields.freeCashFlowPerShareGrowth2.value / avgPriceToFCF5Y * 20
        ratiosFields.freeCashFlowPerShareGrowth3.score = ratiosFields.freeCashFlowPerShareGrowth3.value / avgPriceToFCF5Y * 10

        ratiosFields.nonCurrentLiabilitiesToIncomeQ1.score = StockAnalystService.ratioBetterThan(ratiosFields.nonCurrentLiabilitiesToIncomeQ1.value, 4, 6, 5) * 2
        ratiosFields.nonCurrentLiabilitiesToIncome1.score = StockAnalystService.ratioBetterThan(ratiosFields.nonCurrentLiabilitiesToIncome1.value, 4, 6, 5) * 5
        ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ1.score = StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 0) < 0 ? -20 : -StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 0) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ1.value * 0.1
        ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ2.score = StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 1) < 0 ? -20 : -StockData.last(stock.nonCurrentLiabilitiesToIncomeQ, 1) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowthQ2.value * 0.05
        ratiosFields.nonCurrentLiabilitiesToIncomeGrowth1.score = StockData.last(stock.nonCurrentLiabilitiesToIncome, 0) < 0 ? -20 : -StockData.last(stock.nonCurrentLiabilitiesToIncome, 0) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth1.value * 0.15
        ratiosFields.nonCurrentLiabilitiesToIncomeGrowth2.score = StockData.last(stock.nonCurrentLiabilitiesToIncome, 1) < 0 ? -20 : -StockData.last(stock.nonCurrentLiabilitiesToIncome, 1) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth2.value * 0.1
        ratiosFields.nonCurrentLiabilitiesToIncomeGrowth3.score = StockData.last(stock.nonCurrentLiabilitiesToIncome, 3) < 0 ? -20 : -StockData.last(stock.nonCurrentLiabilitiesToIncome, 3) * ratiosFields.nonCurrentLiabilitiesToIncomeGrowth3.value * 0.05

        ratiosFields.profitMarginQ1.score = ratiosFields.profitMarginQ1.value / 2
        ratiosFields.profitMargin1.score = ratiosFields.profitMargin1.value / 2
        ratiosFields.profitMarginGrowthQ1.score = StockData.last(stock.profitMarginPQ, 0) * ratiosFields.profitMarginGrowthQ1.value * 0.02
        ratiosFields.profitMarginGrowthQ2.score = StockData.last(stock.profitMarginPQ, 1) * ratiosFields.profitMarginGrowthQ2.value * 0.01
        ratiosFields.profitMarginGrowth1.score = StockData.last(stock.profitMarginP, 0) * ratiosFields.profitMarginGrowth1.value * 0.03
        ratiosFields.profitMarginGrowth2.score = StockData.last(stock.profitMarginP, 1) * ratiosFields.profitMarginGrowth2.value * 0.02
        ratiosFields.profitMarginGrowth3.score = StockData.last(stock.profitMarginP, 2) * ratiosFields.profitMarginGrowth3.value * 0.01

        //TODO interestExpenseToOperativeIncome
        const interestExpenseQ = StockData.last(stock.interestExpenseQ, 0)
        const interestExpenseToOperativeIncomeQ = ratiosFields.interestExpenseToOperativeIncomeQ1.value
        if(interestExpenseQ > 0) {
            if(interestExpenseToOperativeIncomeQ < 0){    //operating income is in minus
                ratiosFields.interestExpenseToOperativeIncomeQ1.score = - 100
            } else {
                ratiosFields.interestExpenseToOperativeIncomeQ1.score = 5 - interestExpenseToOperativeIncomeQ
            }
        }
        const interestExpense = StockData.last(stock.interestExpense, 0)
        const interestExpenseToOperativeIncome = ratiosFields.interestExpenseToOperativeIncome1.value
        if(interestExpense > 0) {
            if(interestExpenseToOperativeIncome < 0){    //operating income is in minus
                ratiosFields.interestExpenseToOperativeIncome1.score = - 100
            } else {
                ratiosFields.interestExpenseToOperativeIncome1.score = 5 - interestExpenseToOperativeIncome
            }
        }


        ratiosFields.retainedEarningsGrowthQ1.score = ratiosFields.retainedEarningsGrowthQ1.value * 0.2
        if(ValueInvesting.last(stock.retainedEarningsQ) < 0) ratiosFields.retainedEarningsGrowthQ1.score *= -1
        ratiosFields.retainedEarningsGrowthQ2.score = ratiosFields.retainedEarningsGrowthQ2.value * 0.1
        if(ValueInvesting.last(stock.retainedEarningsQ, 1) < 0) ratiosFields.retainedEarningsGrowthQ2.score *= -1
        ratiosFields.retainedEarningsGrowth1.score = ratiosFields.retainedEarningsGrowth1.value * 0.3
        if(ValueInvesting.last(stock.retainedEarnings, 0) < 0) ratiosFields.retainedEarningsGrowth1.score *= -1
        ratiosFields.retainedEarningsGrowth2.score = ratiosFields.retainedEarningsGrowth2.value * 0.2
        if(ValueInvesting.last(stock.retainedEarnings, 1) < 0) ratiosFields.retainedEarningsGrowth2.score *= -1
        ratiosFields.retainedEarningsGrowth3.score = ratiosFields.retainedEarningsGrowth3.value * 0.1
        if(ValueInvesting.last(stock.retainedEarnings, 2) < 0) ratiosFields.retainedEarningsGrowth3.score *= -1

        ratiosFields.sharesGrowth1.score = - ratiosFields.sharesGrowth1.value * 6
        ratiosFields.sharesGrowth2.score = - ratiosFields.sharesGrowth2.value * 4
        ratiosFields.sharesGrowth3.score = - ratiosFields.sharesGrowth3.value * 2

        StockData.removeInfinity(ratiosFields)
        StockData.capScoreValues(ratiosFields)
        StockData.buildClasses(ratiosFields)
        StockData.calcTotalScore(ratiosFields)
        ratiosFields.symbol.classes.push('symbol')

        return ratiosFields
    }

    private static toAcquirersMTitle(stock: Stock) {
        return `last Y op. income ${StockData.toTitle(ValueInvesting.lastEntry(stock.operatingIncome))}
(last Q op. income) ${StockData.toTitle(ValueInvesting.lastEntry(stock.operatingIncomeQ))}
past data: ${StockData.toTitle(stock.acquirersMultiple)}`;
    }
}