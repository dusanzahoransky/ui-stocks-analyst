import {StockFlattenFields} from "../model/StockFlattenFields";
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
            case StockFlattenFields.companyName:
                return [CellTag.companyName]
            case StockFlattenFields.chartLastUpdated:
            case StockFlattenFields.financialsLastUpdated:
            case StockFlattenFields.analysisLastUpdated:
            case StockFlattenFields.statisticsLastUpdated:
            case StockFlattenFields.holdersLastUpdated:
            case StockFlattenFields.krfLastUpdated:
                return [CellTag.date,  CellTag.lastUpdated]
            case StockFlattenFields.symbol:
                return [CellTag.symbol]
            case StockFlattenFields.currentPrice:
                return [CellTag.currentPrice]
            case StockFlattenFields.marketCap:
                return [CellTag.ratios]
            case StockFlattenFields.lastReportedQuarter:
                return [CellTag.date, CellTag.lastReport]
            case StockFlattenFields.exDividendDate:
                return [CellTag.date, CellTag.dividends]

            case StockFlattenFields.enterpriseValue:
                return [CellTag.ratios]
            case StockFlattenFields.totalCashPerShareP:
                return [CellTag.ratios]

            case StockFlattenFields.trailingPE:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.forwardPE:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.priceToSalesTrailing12Months:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.priceBook:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.currentPriceToFreeCashFlow:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.priceToFreeCashFlow:
                return [CellTag.ratios, CellTag.valueInvesting]
            case StockFlattenFields.enterpriseValueRevenue:
                return [CellTag.ratios]
            case StockFlattenFields.enterpriseValueEBITDA:
                return [CellTag.ratios]
            case StockFlattenFields.priceEarningGrowth:
                return [CellTag.ratios]

            case StockFlattenFields.targetMedianPrice:
                return [CellTag.analysts, CellTag.stock]
            case StockFlattenFields.belowTargetMedianPriceP:
                return [CellTag.analysts, CellTag.stock]

            case StockFlattenFields.heldByInsidersP:
                return [CellTag.stock]
            case StockFlattenFields.heldByInstitutionsP:
                return [CellTag.stock]
            case StockFlattenFields.buyPercentInsiderShares:
                return [CellTag.stock]
            case StockFlattenFields.sellPercentInsiderShares:
                return [CellTag.stock]
            case StockFlattenFields.shortToFloatP:
                return [CellTag.short, CellTag.stock]
            case StockFlattenFields.sharesShortPrevMonthCompareP:
                return [CellTag.short, CellTag.stock]

            case StockFlattenFields.fiveYearAvgDividendYield:
                return [CellTag.dividends]
            case StockFlattenFields.trailingAnnualDividendYield:
                return [CellTag.dividends]
            case StockFlattenFields.payoutRatioP:
                return [CellTag.dividends]
            case StockFlattenFields.dividendsGrowth1:
                return [CellTag.dividends]
            case StockFlattenFields.dividendsGrowth2:
                return [CellTag.dividends]
            case StockFlattenFields.dividendsGrowth3:
                return [CellTag.dividends]


            case StockFlattenFields.revenueQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.revenueQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.revenue1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.revenue2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.revenue3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.revenueGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFlattenFields.revenueGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFlattenFields.revenueGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFlattenFields.revenueGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]
            case StockFlattenFields.revenueGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting, CellTag.valueInvesting]


            case StockFlattenFields.grossIncomeQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.grossIncomeQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.grossIncome1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.grossIncome2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.grossIncome3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.grossIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.grossIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.grossIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.grossIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.grossIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFlattenFields.interestExpenseToOperativeIncomePQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.interestExpenseToOperativeIncomePQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.interestExpenseToOperativeIncomeP1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.interestExpenseToOperativeIncomeP2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.interestExpenseToOperativeIncomeP3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.interestExpenseToOperativeIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.interestExpenseToOperativeIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.interestExpenseToOperativeIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.interestExpenseToOperativeIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.interestExpenseToOperativeIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFlattenFields.netIncomeQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.netIncomeQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.netIncome1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.netIncome2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.netIncome3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.netIncomeGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.netIncomeGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.netIncomeGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.netIncomeGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.netIncomeGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]


            case StockFlattenFields.profitMarginPQ1:
                return [CellTag.financials, CellTag.Q1, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginPQ2:
                return [CellTag.financials, CellTag.Q2, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginP1:
                return [CellTag.financials, CellTag.Y1, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginP2:
                return [CellTag.financials, CellTag.Y2, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginP3:
                return [CellTag.financials, CellTag.Y3, CellTag.valueInvesting]

            case StockFlattenFields.profitMarginGrowthQ1:
                return [CellTag.financials, CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginGrowthQ2:
                return [CellTag.financials, CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginGrowth1:
                return [CellTag.financials, CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginGrowth2:
                return [CellTag.financials, CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.profitMarginGrowth3:
                return [CellTag.financials, CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]


            case StockFlattenFields.freeCashFlowQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.freeCashFlowQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.freeCashFlow1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.freeCashFlow2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.freeCashFlow3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.freeCashFlowGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.freeCashFlowGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.freeCashFlowGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.freeCashFlowGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.freeCashFlowGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFlattenFields.cashQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.cashQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.cash1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.cash2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.cash3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.cashGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.cashGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.cashGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.cashGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.cashGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFlattenFields.inventoryQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.inventoryQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.inventory1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.inventory2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.inventory3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.inventoryGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.inventoryGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.inventoryGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.inventoryGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.inventoryGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFlattenFields.currentRatioQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFlattenFields.currentRatioQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFlattenFields.currentRatio1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFlattenFields.currentRatio2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFlattenFields.currentRatio3:
                return [CellTag.ratios, CellTag.Y3]

            case StockFlattenFields.currentRatioGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth]
            case StockFlattenFields.currentRatioGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth]
            case StockFlattenFields.currentRatioGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth]
            case StockFlattenFields.currentRatioGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth]
            case StockFlattenFields.currentRatioGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth]

            case StockFlattenFields.totalLiabilitiesQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.totalLiabilitiesQ2:
                return [CellTag.Q2, CellTag.financials]

            case StockFlattenFields.totalAssetsQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.totalAssetsQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.totalAssets1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.totalAssets2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.totalAssets3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.totalAssetsGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.totalAssetsGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.totalAssetsGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.totalAssetsGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.totalAssetsGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFlattenFields.totalShareholdersEquityQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.totalShareholdersEquityQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.totalShareholdersEquity1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.totalShareholdersEquity2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.totalShareholdersEquity3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.totalShareholdersEquityGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalShareholdersEquityGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalShareholdersEquityGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalShareholdersEquityGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalShareholdersEquityGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFlattenFields.retainedEarningsQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.retainedEarningsQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.retainedEarnings1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.retainedEarnings2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.retainedEarnings3:
                return [CellTag.Y3, CellTag.financials]

            case StockFlattenFields.retainedEarningsGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.retainedEarningsGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.retainedEarningsGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.retainedEarningsGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.retainedEarningsGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFlattenFields.totalDebtToEquityQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFlattenFields.totalDebtToEquityQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFlattenFields.totalDebtToEquity1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFlattenFields.totalDebtToEquity2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFlattenFields.totalDebtToEquity3:
                return [CellTag.ratios, CellTag.Y3]
            case StockFlattenFields.totalDebtToEquityGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalDebtToEquityGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalDebtToEquityGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalDebtToEquityGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.totalDebtToEquityGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFlattenFields.nonCurrentLiabilitiesToIncomeQ1:
                return [CellTag.ratios, CellTag.Q1]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeQ2:
                return [CellTag.ratios, CellTag.Q2]
            case StockFlattenFields.nonCurrentLiabilitiesToIncome1:
                return [CellTag.ratios, CellTag.Y1]
            case StockFlattenFields.nonCurrentLiabilitiesToIncome2:
                return [CellTag.ratios, CellTag.Y2]
            case StockFlattenFields.nonCurrentLiabilitiesToIncome3:
                return [CellTag.ratios, CellTag.Y3]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowthQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowthQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth1:
                return [CellTag.ratios, CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth2:
                return [CellTag.ratios, CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.nonCurrentLiabilitiesToIncomeGrowth3:
                return [CellTag.ratios, CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFlattenFields.stockRepurchasedQ1:
                return [CellTag.stock, CellTag.Q1]
            case StockFlattenFields.stockRepurchasedQ2:
                return [CellTag.stock, CellTag.Q2]
            case StockFlattenFields.stockRepurchased1:
                return [CellTag.stock, CellTag.Y1]
            case StockFlattenFields.stockRepurchased2:
                return [CellTag.stock, CellTag.Y2]
            case StockFlattenFields.stockRepurchased3:
                return [CellTag.stock, CellTag.Y3]
            case StockFlattenFields.stockRepurchasedGrowthQ1:
                return [CellTag.stock, CellTag.Q1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.stockRepurchasedGrowthQ2:
                return [CellTag.stock, CellTag.Q2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.stockRepurchasedGrowth1:
                return [CellTag.stock, CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.stockRepurchasedGrowth2:
                return [CellTag.stock, CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.stockRepurchasedGrowth3:
                return [CellTag.stock, CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFlattenFields.shares1:
                return [CellTag.stock, CellTag.Y1]
            case StockFlattenFields.shares2:
                return [CellTag.stock, CellTag.Y2]
            case StockFlattenFields.shares3:
                return [CellTag.stock, CellTag.Y3]
            case StockFlattenFields.sharesGrowth1:
                return [CellTag.stock, CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.sharesGrowth2:
                return [CellTag.stock, CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.sharesGrowth3:
                return [CellTag.stock, CellTag.Y3, CellTag.financialsGrowth]

            case StockFlattenFields.epsQ1:
                return [CellTag.Q1, CellTag.ratios]
            case StockFlattenFields.epsQ2:
                return [CellTag.Q2, CellTag.ratios]
            case StockFlattenFields.eps1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFlattenFields.eps2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFlattenFields.eps3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFlattenFields.epsGrowthQ1:
                return [CellTag.Q1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.epsGrowthQ2:
                return [CellTag.Q2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.epsGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.epsGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.valueInvesting]
            case StockFlattenFields.epsGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.valueInvesting]

            case StockFlattenFields.peQ1:
                return [CellTag.ratios, CellTag.Q1, CellTag.hidden]
            case StockFlattenFields.peQ2:
                return [CellTag.ratios, CellTag.Q2, CellTag.hidden]
            case StockFlattenFields.pe1:
                return [CellTag.ratios, CellTag.Y1, CellTag.hidden]
            case StockFlattenFields.pe2:
                return [CellTag.ratios, CellTag.Y2, CellTag.hidden]
            case StockFlattenFields.pe3:
                return [CellTag.ratios, CellTag.Y3, CellTag.hidden]
            case StockFlattenFields.peGrowthQ1:
                return [CellTag.Q1, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFlattenFields.peGrowthQ2:
                return [CellTag.Q2, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFlattenFields.peGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFlattenFields.peGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.hidden]
            case StockFlattenFields.peGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.hidden]

            case StockFlattenFields.bookValuePerShare1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFlattenFields.bookValuePerShare2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFlattenFields.bookValuePerShare3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFlattenFields.bookValuePerShareGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth, CellTag.growthInvesting]
            case StockFlattenFields.bookValuePerShareGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth, CellTag.growthInvesting]
            case StockFlattenFields.bookValuePerShareGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth, CellTag.growthInvesting]


            case StockFlattenFields.freeCashFlowPerShare1:
                return [CellTag.Y1, CellTag.ratios]
            case StockFlattenFields.freeCashFlowPerShare2:
                return [CellTag.Y2, CellTag.ratios]
            case StockFlattenFields.freeCashFlowPerShare3:
                return [CellTag.Y3, CellTag.ratios]
            case StockFlattenFields.freeCashFlowPerShareGrowth1:
                return [CellTag.Y1, CellTag.ratiosGrowth]
            case StockFlattenFields.freeCashFlowPerShareGrowth2:
                return [CellTag.Y2, CellTag.ratiosGrowth]
            case StockFlattenFields.freeCashFlowPerShareGrowth3:
                return [CellTag.Y3, CellTag.ratiosGrowth]

            case StockFlattenFields.grossMargin1:
                return [CellTag.Y1, CellTag.financials, CellTag.valueInvesting]
            case StockFlattenFields.grossMargin2:
                return [CellTag.Y2, CellTag.financials, CellTag.valueInvesting]
            case StockFlattenFields.grossMargin3:
                return [CellTag.Y3, CellTag.financials, CellTag.valueInvesting]
            case StockFlattenFields.grossMarginGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.grossMarginGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.valueInvesting]
            case StockFlattenFields.grossMarginGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.valueInvesting]

            case StockFlattenFields.operatingCashFlow1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.operatingCashFlow2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.operatingCashFlow3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.operatingCashFlowGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.operatingCashFlowGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth, CellTag.growthInvesting]
            case StockFlattenFields.operatingCashFlowGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth, CellTag.growthInvesting]

            case StockFlattenFields.ebitQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.ebitQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.ebit1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.ebit2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.ebit3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.ebitGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.ebitGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.ebitGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.ebitGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.ebitGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFlattenFields.operatingMargin1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.operatingMargin2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.operatingMargin3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.operatingMarginGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.operatingMarginGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.operatingMarginGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]

            case StockFlattenFields.workingCapitalQ1:
                return [CellTag.Q1, CellTag.financials]
            case StockFlattenFields.workingCapitalQ2:
                return [CellTag.Q2, CellTag.financials]
            case StockFlattenFields.workingCapital1:
                return [CellTag.Y1, CellTag.financials]
            case StockFlattenFields.workingCapital2:
                return [CellTag.Y2, CellTag.financials]
            case StockFlattenFields.workingCapital3:
                return [CellTag.Y3, CellTag.financials]
            case StockFlattenFields.workingCapitalGrowthQ1:
                return [CellTag.Q1, CellTag.financialsGrowth]
            case StockFlattenFields.workingCapitalGrowthQ2:
                return [CellTag.Q2, CellTag.financialsGrowth]
            case StockFlattenFields.workingCapitalGrowth1:
                return [CellTag.Y1, CellTag.financialsGrowth]
            case StockFlattenFields.workingCapitalGrowth2:
                return [CellTag.Y2, CellTag.financialsGrowth]
            case StockFlattenFields.workingCapitalGrowth3:
                return [CellTag.Y3, CellTag.financialsGrowth]


            case StockFlattenFields.growthEstimate5y:
                return [CellTag.intrinsicValueInvesting, CellTag.analysts, CellTag.financialsGrowth]

            case StockFlattenFields.roicP1:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFlattenFields.roicP2:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFlattenFields.roicP3:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]

            case StockFlattenFields.roic1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]
            case StockFlattenFields.roic3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRoic, CellTag.valueInvesting]

            case StockFlattenFields.revenue1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFlattenFields.revenue3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFlattenFields.revenue5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]
            case StockFlattenFields.revenue9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgRevenue]

            case StockFlattenFields.eps1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFlattenFields.eps3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFlattenFields.eps5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]
            case StockFlattenFields.eps9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgEps]

            case StockFlattenFields.bps1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFlattenFields.bps3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFlattenFields.bps5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]
            case StockFlattenFields.bps9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgBps]

            case StockFlattenFields.cash1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFlattenFields.cash3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFlattenFields.cash5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]
            case StockFlattenFields.cash9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgCash]

            case StockFlattenFields.pe1Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFlattenFields.pe3Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFlattenFields.pe5Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]
            case StockFlattenFields.pe9Y:
                return [CellTag.intrinsicValueInvesting, CellTag.cgPe]

            case StockFlattenFields.rule1GrowthRate:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.defaultPE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.historicalPE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.rule1PE:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.currentEps:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.futurePrice10Years:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.futureEPS10Years:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFlattenFields.stickerPrice15pcGrowth:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.stickerPrice5pcGrowth:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFlattenFields.belowStickerPrice15P:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]
            case StockFlattenFields.belowStickerPrice5P:
                return [CellTag.intrinsicValueInvesting, CellTag.calc]

            case StockFlattenFields.price:
                return [CellTag.price, CellTag.hidden]

            case StockFlattenFields.yieldNext5Years:
                return [CellTag.analysts, CellTag.growthInvesting, CellTag.totalScore]
            case StockFlattenFields.yieldNext10Years:
                return [CellTag.analysts, CellTag.growthInvesting, CellTag.totalScore]
            case StockFlattenFields.score:
                return [CellTag.totalScore]
            case StockFlattenFields.score1Q:
                return [CellTag.totalScore]
            case StockFlattenFields.score2Q:
                return [CellTag.totalScore]
            case StockFlattenFields.score1Y:
                return [CellTag.totalScore]
            case StockFlattenFields.score4Y:
                return [CellTag.totalScore]
            case StockFlattenFields.scoreRatios:
                return [CellTag.totalScore]
            case StockFlattenFields.scoreStock:
                return [CellTag.totalScore]
            case StockFlattenFields.scoreDividends:
                return [CellTag.totalScore]
            case StockFlattenFields.scoreAnalysts:
                return [CellTag.totalScore]
            case StockFlattenFields.rule1score:
                return [CellTag.totalScore]
            case StockFlattenFields.valueInvestmentScore:
                return [CellTag.totalScore, CellTag.valueInvesting]
            case StockFlattenFields.growthInvestmentScore:
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