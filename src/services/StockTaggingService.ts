import {StockFields} from "../model/StockFields";
import {EtfFields} from "../model/EtfFields";
import {CellTag} from "../model/table/CellTag";
import {CellData} from "../model/table/CellData";

export class StockTaggingService {

    tagRow(rowValues: CellData[], isEtf: boolean): CellData[] {
        rowValues.forEach((cellData, column) => {
            cellData.tags = isEtf ?
                StockTaggingService.tagEtfColumn(column) :
                StockTaggingService.tagStockColumn(column);
        })
        return rowValues
    }

    static tagColumn(column: number, isEtf: boolean): CellTag[] {
        return isEtf ? this.tagEtfColumn(column) : this.tagStockColumn(column)
    }

    static tagStockColumn(column: number): CellTag[] {
        switch (column) {
            case StockFields.companyName:
                return [CellTag.companyName]
            case StockFields.chartLastUpdated:
            case StockFields.financialsLastUpdated:
            case StockFields.analysisLastUpdated:
            case StockFields.statisticsLastUpdated:
            case StockFields.holdersLastUpdated:
            case StockFields.krfLastUpdated:
                return [CellTag.date,  CellTag.lastUpdated]
            case StockFields.symbol:
                return [CellTag.symbol]
            case StockFields.currentPrice:
                return [CellTag.currentPrice]
            case StockFields.change:
                return [CellTag.price]

            case StockFields.lastReportedQuarter:
                return [CellTag.date, CellTag.lastReport]
            case StockFields.exDividendDate:
                return [CellTag.date, CellTag.dividends]

            case StockFields.enterpriseValue:
                return [CellTag.ratios]
            case StockFields.totalCashPerShareP:
                return [CellTag.ratios]

            case StockFields.trailingPE:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.forwardPE:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.priceToSalesTrailing12Months:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.priceBook:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.currentPriceToFreeCashFlow:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.priceToFreeCashFlow:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFields.enterpriseValueRevenue:
                return [CellTag.ratios]
            case StockFields.enterpriseValueEBITDA:
                return [CellTag.ratios]
            case StockFields.priceEarningGrowth:
                return [CellTag.ratios]
            case StockFields.trailingPriceEarningGrowth:
                return [CellTag.ratios]

            case StockFields.week52ChangeP:
                return [CellTag.price]
            case StockFields.week52AboveLowP:
                return [CellTag.price]
            case StockFields.week52BelowHighP:
                return [CellTag.price]

            case StockFields.targetLowPrice:
                return [CellTag.analysts, CellTag.price]
            case StockFields.targetMedianPrice:
                return [CellTag.analysts, CellTag.price]
            case StockFields.belowTargetLowPriceP:
                return [CellTag.analysts, CellTag.price]
            case StockFields.belowTargetMedianPriceP:
                return [CellTag.analysts, CellTag.price]

            case StockFields.heldByInsidersP:
                return [CellTag.stock]
            case StockFields.heldByInstitutionsP:
                return [CellTag.stock]
            case StockFields.buyPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.sellPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.shortToFloatP:
                return [CellTag.short, CellTag.stock]
            case StockFields.sharesShortPrevMonthCompareP:
                return [CellTag.short, CellTag.stock]

            case StockFields.fiveYearAvgDividendYield:
                return [CellTag.dividends]
            case StockFields.trailingAnnualDividendYield:
                return [CellTag.dividends]
            case StockFields.payoutRatioP:
                return [CellTag.dividends]
            case StockFields.dividendsGrowth1:
                return [CellTag.dividends]
            case StockFields.dividendsGrowth2:
                return [CellTag.dividends]
            case StockFields.dividendsGrowth3:
                return [CellTag.dividends]


            case StockFields.revenueQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.revenueQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.revenue1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.revenue2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.revenue3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.revenueGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFields.revenueGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFields.revenueGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFields.revenueGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFields.revenueGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]


            case StockFields.grossIncomeQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.grossIncomeQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.grossIncome1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.grossIncome2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.grossIncome3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.grossIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.grossIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.grossIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.grossIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.grossIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFields.interestExpenseToOperativeIncomePQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.interestExpenseToOperativeIncomePQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.interestExpenseToOperativeIncomeP1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.interestExpenseToOperativeIncomeP2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.interestExpenseToOperativeIncomeP3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.interestExpenseToOperativeIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.interestExpenseToOperativeIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.interestExpenseToOperativeIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.interestExpenseToOperativeIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.interestExpenseToOperativeIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFields.netIncomeQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.netIncomeQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.netIncome1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.netIncome2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.netIncome3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.netIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.netIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.netIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.netIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.netIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]


            case StockFields.profitMarginPQ1:
                return [CellTag.financials, CellTag.Q1, CellTag.valueInvesting]
            case StockFields.profitMarginPQ2:
                return [CellTag.financials, CellTag.Q2, CellTag.valueInvesting]
            case StockFields.profitMarginP1:
                return [CellTag.financials, CellTag.Y1, CellTag.valueInvesting]
            case StockFields.profitMarginP2:
                return [CellTag.financials, CellTag.Y2, CellTag.valueInvesting]
            case StockFields.profitMarginP3:
                return [CellTag.financials, CellTag.Y3, CellTag.valueInvesting]

            case StockFields.profitMarginGrowthQ1:
                return [CellTag.financials, CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.profitMarginGrowthQ2:
                return [CellTag.financials, CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.profitMarginGrowth1:
                return [CellTag.financials, CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.profitMarginGrowth2:
                return [CellTag.financials, CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.profitMarginGrowth3:
                return [CellTag.financials, CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]


            case StockFields.freeCashFlowQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.freeCashFlowQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.freeCashFlow1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.freeCashFlow2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.freeCashFlow3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.freeCashFlowGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.freeCashFlowGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.freeCashFlowGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.freeCashFlowGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.freeCashFlowGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFields.cashQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.cashQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.cash1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.cash2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.cash3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.cashGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.cashGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.cashGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.cashGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.cashGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFields.inventoryQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.inventoryQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.inventory1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.inventory2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.inventory3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.inventoryGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.inventoryGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.inventoryGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.inventoryGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.inventoryGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFields.currentRatioQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFields.currentRatioQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFields.currentRatio1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFields.currentRatio2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFields.currentRatio3:
                return [CellTag.ratios, CellTag.Y3]

            case StockFields.currentRatioGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth]
            case StockFields.currentRatioGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth]
            case StockFields.currentRatioGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth]
            case StockFields.currentRatioGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth]
            case StockFields.currentRatioGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth]

            case StockFields.totalLiabilitiesQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.totalLiabilitiesQ2:
                return [CellTag.Q2, CellTag.financials]

            case StockFields.totalAssetsQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.totalAssetsQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.totalAssets1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.totalAssets2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.totalAssets3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.totalAssetsGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.totalAssetsGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.totalAssetsGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.totalAssetsGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.totalAssetsGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFields.totalShareholdersEquityQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.totalShareholdersEquityQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.totalShareholdersEquity1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.totalShareholdersEquity2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.totalShareholdersEquity3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.totalShareholdersEquityGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.totalShareholdersEquityGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.totalShareholdersEquityGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.totalShareholdersEquityGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.totalShareholdersEquityGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFields.retainedEarningsQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.retainedEarningsQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.retainedEarnings1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.retainedEarnings2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.retainedEarnings3:
                return [CellTag.Y3, CellTag.financials]

            case StockFields.retainedEarningsGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.retainedEarningsGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.retainedEarningsGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.retainedEarningsGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.retainedEarningsGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFields.totalDebtToEquityQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFields.totalDebtToEquityQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFields.totalDebtToEquity1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFields.totalDebtToEquity2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFields.totalDebtToEquity3:
                return [CellTag.ratios, CellTag.Y3]
            case StockFields.totalDebtToEquityGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.totalDebtToEquityGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.totalDebtToEquityGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.totalDebtToEquityGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.totalDebtToEquityGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFields.nonCurrentLiabilitiesToIncomeQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFields.nonCurrentLiabilitiesToIncomeQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFields.nonCurrentLiabilitiesToIncome1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFields.nonCurrentLiabilitiesToIncome2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFields.nonCurrentLiabilitiesToIncome3:
                return [CellTag.ratios, CellTag.Y3]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFields.stockRepurchasedQ1:
                return [CellTag.stock, CellTag.Q1]
            case StockFields.stockRepurchasedQ2:
                return [CellTag.stock, CellTag.Q2]
            case StockFields.stockRepurchased1:
                return [CellTag.stock, CellTag.Y1]
            case StockFields.stockRepurchased2:
                return [CellTag.stock, CellTag.Y2]
            case StockFields.stockRepurchased3:
                return [CellTag.stock, CellTag.Y3]
            case StockFields.stockRepurchasedGrowthQ1:
                return [CellTag.stock, CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.stockRepurchasedGrowthQ2:
                return [CellTag.stock, CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.stockRepurchasedGrowth1:
                return [CellTag.stock, CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.stockRepurchasedGrowth2:
                return [CellTag.stock, CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.stockRepurchasedGrowth3:
                return [CellTag.stock, CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFields.shares1:
                return [CellTag.stock, CellTag.Y1]
            case StockFields.shares2:
                return [CellTag.stock, CellTag.Y2]
            case StockFields.shares3:
                return [CellTag.stock, CellTag.Y3]
            case StockFields.sharesGrowth1:
                return [CellTag.stock, CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.sharesGrowth2:
                return [CellTag.stock, CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.sharesGrowth3:
                return [CellTag.stock, CellTag.Y3, CellTag.financialsGrowth]

            case StockFields.epsQ1:
                return [CellTag.Q1, CellTag.ratios]
            case StockFields.epsQ2:
                return [CellTag.Q2, CellTag.ratios]
            case StockFields.eps1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFields.eps2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFields.eps3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFields.epsGrowthQ1:
                return [CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.epsGrowthQ2:
                return [CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.epsGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.epsGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFields.epsGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFields.peQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.hidden]
            case StockFields.peQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.hidden]
            case StockFields.pe1:
                return [CellTag.ratios, CellTag.Y1, CellTag.hidden]
            case StockFields.pe2:
                return [CellTag.ratios, CellTag.Y2, CellTag.hidden]
            case StockFields.pe3:
                return [CellTag.ratios, CellTag.Y3, CellTag.hidden]
            case StockFields.peGrowthQ1:
                return [CellTag.Q1, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFields.peGrowthQ2:
                return [CellTag.Q2, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFields.peGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFields.peGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFields.peGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.hidden]

            case StockFields.bookValuePerShare1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFields.bookValuePerShare2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFields.bookValuePerShare3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFields.bookValuePerShareGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.growthInvesting]
            case StockFields.bookValuePerShareGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.growthInvesting]
            case StockFields.bookValuePerShareGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.growthInvesting]


            case StockFields.freeCashFlowPerShare1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFields.freeCashFlowPerShare2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFields.freeCashFlowPerShare3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFields.freeCashFlowPerShareGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth]
            case StockFields.freeCashFlowPerShareGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth]
            case StockFields.freeCashFlowPerShareGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth]

            case StockFields.grossMargin1:
                return [CellTag.Y1, CellTag.financials, CellTag.valueInvesting]
            case StockFields.grossMargin2:
                return [CellTag.Y2, CellTag.financials, CellTag.valueInvesting]
            case StockFields.grossMargin3:
                return [CellTag.Y3, CellTag.financials, CellTag.valueInvesting]
            case StockFields.grossMarginGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.grossMarginGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFields.grossMarginGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFields.operatingCashFlow1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.operatingCashFlow2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.operatingCashFlow3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.operatingCashFlowGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.operatingCashFlowGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFields.operatingCashFlowGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFields.ebitQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.ebitQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.ebit1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.ebit2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.ebit3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.ebitGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.ebitGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.ebitGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.ebitGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.ebitGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFields.operatingMargin1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.operatingMargin2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.operatingMargin3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.operatingMarginGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.operatingMarginGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.operatingMarginGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFields.workingCapitalQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFields.workingCapitalQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFields.workingCapital1:
                return [CellTag.Y1, CellTag.financials]
            case StockFields.workingCapital2:
                return [CellTag.Y2, CellTag.financials]
            case StockFields.workingCapital3:
                return [CellTag.Y3, CellTag.financials]
            case StockFields.workingCapitalGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFields.workingCapitalGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFields.workingCapitalGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFields.workingCapitalGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFields.workingCapitalGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFields.growthEstimate5y:
                return [CellTag.intrinsicValueInvesting, CellTag.analysts, CellTag.financialsGrowth]

            case StockFields.roicP1:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFields.roicP2:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFields.roicP3:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]

            case StockFields.roic1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFields.roic3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]

            case StockFields.revenue1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFields.revenue3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFields.revenue5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFields.revenue9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]

            case StockFields.eps1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFields.eps3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFields.eps5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFields.eps9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]

            case StockFields.bps1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFields.bps3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFields.bps5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFields.bps9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]

            case StockFields.cash1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFields.cash3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFields.cash5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFields.cash9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]

            case StockFields.pe1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFields.pe3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFields.pe5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFields.pe9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]

            case StockFields.rule1GrowthRate:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.defaultPE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.historicalPE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.rule1PE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.currentEps:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.futurePrice10Years:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.futureEPS10Years:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFields.stickerPrice15pcGrowth:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.stickerPrice5pcGrowth:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFields.belowStickerPrice15P:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFields.belowStickerPrice5P:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFields.price:
                return [CellTag.price, CellTag.hidden]

            case StockFields.yieldNext5Years:
                return [CellTag.analysts, CellTag.growthInvesting, CellTag.totalScore]
            case StockFields.yieldNext10Years:
                return [CellTag.analysts, CellTag.growthInvesting, CellTag.totalScore]
            case StockFields.score:
                return [CellTag.totalScore]
            case StockFields.score1Q:
                return [CellTag.totalScore]
            case StockFields.score2Q:
                return [CellTag.totalScore]
            case StockFields.score1Y:
                return [CellTag.totalScore]
            case StockFields.score4Y:
                return [CellTag.totalScore]
            case StockFields.scoreRatios:
                return [CellTag.totalScore]
            case StockFields.scoreStock:
                return [CellTag.totalScore]
            case StockFields.scoreDividends:
                return [CellTag.totalScore]
            case StockFields.scoreAnalysts:
                return [CellTag.totalScore]
            case StockFields.rule1score:
                return [CellTag.totalScore]
            case StockFields.valueInvestmentScore:
                return [CellTag.totalScore, CellTag.valueInvesting]
            case StockFields.growthInvestmentScore:
                return [CellTag.totalScore, CellTag.growthInvesting]

            default:
                throw Error('Undefined field ' + column)
        }
    }

    static tagEtfColumn(column: number): CellTag[] {
        switch (column) {
            case EtfFields.chartData:
                return [CellTag.hidden]
            case EtfFields.companyName:
                return [CellTag.companyName]
            case EtfFields.date:
                return [CellTag.date]
            case EtfFields.symbol:
                return [CellTag.symbol]
            case EtfFields.price:
                return [CellTag.price]
            case EtfFields.change:
                return [CellTag.change]
            case EtfFields.asOfDate:
                return [CellTag.date, CellTag.lastReport]
        }
    }
}