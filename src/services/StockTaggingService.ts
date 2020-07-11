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
                return [CellTag.date]
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
                return [CellTag.ratios, CellTag.value]
            case StockFields.forwardPE:
                return [CellTag.ratios, CellTag.value]
            case StockFields.priceToSalesTrailing12Months:
                return [CellTag.ratios, CellTag.value]
            case StockFields.priceBook:
                return [CellTag.ratios, CellTag.value]
            case StockFields.currentPriceToFreeCashFlow:
                return [CellTag.ratios, CellTag.value]
            case StockFields.priceToFreeCashFlow:
                return [CellTag.ratios, CellTag.value]
            case StockFields.enterpriseValueRevenue:
                return [CellTag.ratios]
            case StockFields.enterpriseValueEBITDA:
                return [CellTag.ratios]
            case StockFields.priceEarningGrowth:
                return [CellTag.yearlyGrowth]
            case StockFields.trailingPriceEarningGrowth:
                return [CellTag.yearlyGrowth]

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

            case StockFields.revenueQ1:
                return [CellTag.financials, CellTag.revenue, CellTag.Q1]
            case StockFields.revenueQ2:
                return [CellTag.financials, CellTag.revenue, CellTag.Q2]
            case StockFields.revenue1:
                return [CellTag.financials, CellTag.revenue, CellTag.Y1]
            case StockFields.revenue2:
                return [CellTag.financials, CellTag.revenue, CellTag.Y2]
            case StockFields.revenue3:
                return [CellTag.financials, CellTag.revenue, CellTag.Y3]

            case StockFields.revenueGrowthQ1:
                return [CellTag.revenue, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.revenueGrowthQ2:
                return [CellTag.revenue, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.revenueGrowth1:
                return [CellTag.revenue, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.revenueGrowth2:
                return [CellTag.revenue, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.revenueGrowth3:
                return [CellTag.revenue, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.grossIncomeQ1:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Q1]
            case StockFields.grossIncomeQ2:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Q2]
            case StockFields.grossIncome1:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Y1]
            case StockFields.grossIncome2:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Y2]
            case StockFields.grossIncome3:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Y3]

            case StockFields.grossIncomeGrowthQ1:
                return [CellTag.grossIncome, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.grossIncomeGrowthQ2:
                return [CellTag.grossIncome, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.grossIncomeGrowth1:
                return [CellTag.grossIncome, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.grossIncomeGrowth2:
                return [CellTag.grossIncome, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.grossIncomeGrowth3:
                return [CellTag.grossIncome, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.ebitQ1:
                return [CellTag.financials, CellTag.ebit, CellTag.Q1]
            case StockFields.ebitQ2:
                return [CellTag.financials, CellTag.ebit, CellTag.Q2]
            case StockFields.ebit1:
                return [CellTag.financials, CellTag.ebit, CellTag.Y1]
            case StockFields.ebit2:
                return [CellTag.financials, CellTag.ebit, CellTag.Y2]
            case StockFields.ebit3:
                return [CellTag.financials, CellTag.ebit, CellTag.Y3]

            case StockFields.ebitGrowthQ1:
                return [CellTag.ebit, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.ebitGrowthQ2:
                return [CellTag.ebit, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.ebitGrowth1:
                return [CellTag.ebit, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.ebitGrowth2:
                return [CellTag.ebit, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.ebitGrowth3:
                return [CellTag.ebit, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.netIncomeQ1:
                return [CellTag.financials, CellTag.netIncome, CellTag.Q1]
            case StockFields.netIncomeQ2:
                return [CellTag.financials, CellTag.netIncome, CellTag.Q2]
            case StockFields.netIncome1:
                return [CellTag.financials, CellTag.netIncome, CellTag.Y1]
            case StockFields.netIncome2:
                return [CellTag.financials, CellTag.netIncome, CellTag.Y2]
            case StockFields.netIncome3:
                return [CellTag.financials, CellTag.netIncome, CellTag.Y3]

            case StockFields.netIncomeGrowthQ1:
                return [CellTag.netIncome, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.netIncomeGrowthQ2:
                return [CellTag.netIncome, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.netIncomeGrowth1:
                return [CellTag.netIncome, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.netIncomeGrowth2:
                return [CellTag.netIncome, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.netIncomeGrowth3:
                return [CellTag.netIncome, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.profitMarginPQ1:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Q1]
            case StockFields.profitMarginPQ2:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Q2]
            case StockFields.profitMarginP1:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Y1]
            case StockFields.profitMarginP2:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Y2]
            case StockFields.profitMarginP3:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Y3]

            case StockFields.profitMarginGrowthQ1:
                return [CellTag.profitMargin, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.profitMarginGrowthQ2:
                return [CellTag.profitMargin, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.profitMarginGrowth1:
                return [CellTag.profitMargin, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.profitMarginGrowth2:
                return [CellTag.profitMargin, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.profitMarginGrowth3:
                return [CellTag.profitMargin, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.freeCashFlowQ1:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Q1]
            case StockFields.freeCashFlowQ2:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Q2]
            case StockFields.freeCashFlow1:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Y1]
            case StockFields.freeCashFlow2:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Y2]
            case StockFields.freeCashFlow3:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Y3]

            case StockFields.freeCashFlowGrowthQ1:
                return [CellTag.freeCashFlow, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowGrowthQ2:
                return [CellTag.freeCashFlow, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowGrowth1:
                return [CellTag.freeCashFlow, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowGrowth2:
                return [CellTag.freeCashFlow, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowGrowth3:
                return [CellTag.freeCashFlow, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.cashQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Q1]
            case StockFields.cashQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Q2]
            case StockFields.cash1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Y1]
            case StockFields.cash2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Y2]
            case StockFields.cash3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Y3]
            case StockFields.cashGrowthQ1:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.cashGrowthQ2:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.cashGrowth1:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.cashGrowth2:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.cashGrowth3:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.inventoryQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Q1]
            case StockFields.inventoryQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Q2]
            case StockFields.inventory1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Y1]
            case StockFields.inventory2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Y2]
            case StockFields.inventory3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Y3]
            case StockFields.inventoryGrowthQ1:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.inventoryGrowthQ2:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.inventoryGrowth1:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.inventoryGrowth2:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.inventoryGrowth3:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.currentAssetsQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Q1]
            case StockFields.currentAssetsQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Q2]

            case StockFields.currentLiabilitiesQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Q1]
            case StockFields.currentLiabilitiesQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Q2]

            case StockFields.currentRatioQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Q1]
            case StockFields.currentRatioQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Q2]
            case StockFields.currentRatio1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Y1]
            case StockFields.currentRatio2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Y2]
            case StockFields.currentRatio3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Y3]

            case StockFields.currentRatioGrowthQ1:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.currentRatioGrowthQ2:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.currentRatioGrowth1:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.currentRatioGrowth2:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.currentRatioGrowth3:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.totalLiabilitiesQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Q1]
            case StockFields.totalLiabilitiesQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Q2]

            case StockFields.totalAssetsQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Q1]
            case StockFields.totalAssetsQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Q2]
            case StockFields.totalAssets1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y1]
            case StockFields.totalAssets2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y2]
            case StockFields.totalAssets3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y3]
            case StockFields.totalAssetsGrowthQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.totalAssetsGrowthQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.totalAssetsGrowth1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.totalAssetsGrowth2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.totalAssetsGrowth3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.assets, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.totalShareholdersEquityQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Q1]
            case StockFields.totalShareholdersEquityQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Q2]
            case StockFields.totalShareholdersEquity1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Y1]
            case StockFields.totalShareholdersEquity2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Y2]
            case StockFields.totalShareholdersEquity3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Y3]
            case StockFields.totalShareholdersEquityGrowthQ1:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.totalShareholdersEquityGrowthQ2:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.totalShareholdersEquityGrowth1:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.totalShareholdersEquityGrowth2:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.totalShareholdersEquityGrowth3:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.totalDebtToEquityPQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Q1]
            case StockFields.totalDebtToEquityPQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Q2]
            case StockFields.totalDebtToEquityP1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Y1]
            case StockFields.totalDebtToEquityP2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Y2]
            case StockFields.totalDebtToEquityP3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Y3]
            case StockFields.totalDebtToEquityGrowthQ1:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.totalDebtToEquityGrowthQ2:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.totalDebtToEquityGrowth1:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.totalDebtToEquityGrowth2:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.totalDebtToEquityGrowth3:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.nonCurrentLiabilitiesToIncomeQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Q1]
            case StockFields.nonCurrentLiabilitiesToIncomeQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Q2]
            case StockFields.nonCurrentLiabilitiesToIncome1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y1]
            case StockFields.nonCurrentLiabilitiesToIncome2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y2]
            case StockFields.nonCurrentLiabilitiesToIncome3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y3]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowthQ1:
                return [CellTag.balanceSheet, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowthQ2:
                return [CellTag.balanceSheet, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth1:
                return [CellTag.balanceSheet, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth2:
                return [CellTag.balanceSheet, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.nonCurrentLiabilitiesToIncomeGrowth3:
                return [CellTag.balanceSheet, CellTag.nonCurrentLiabilitiesToIncome, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.stockRepurchasedQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Q1]
            case StockFields.stockRepurchasedQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Q2]
            case StockFields.stockRepurchased1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y1]
            case StockFields.stockRepurchased2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y2]
            case StockFields.stockRepurchased3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y3]
            case StockFields.stockRepurchasedGrowthQ1:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.stockRepurchasedGrowthQ2:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.stockRepurchasedGrowth1:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.stockRepurchasedGrowth2:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.stockRepurchasedGrowth3:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.shares1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y1]
            case StockFields.shares2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y2]
            case StockFields.shares3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Y3]
            case StockFields.sharesGrowth1:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.sharesGrowth2:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.sharesGrowth3:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.epsQ1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Q1]
            case StockFields.epsQ2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Q2]
            case StockFields.eps1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Y1]
            case StockFields.eps2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Y2]
            case StockFields.eps3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Y3]
            case StockFields.epsGrowthQ1:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.epsGrowthQ2:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.epsGrowth1:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.epsGrowth2:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.epsGrowth3:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.peQ1:
                return [CellTag.ratios, CellTag.pe, CellTag.Q1]
            case StockFields.peQ2:
                return [CellTag.ratios, CellTag.pe, CellTag.Q2]
            case StockFields.pe1:
                return [CellTag.ratios, CellTag.pe, CellTag.Y1]
            case StockFields.pe2:
                return [CellTag.ratios, CellTag.pe, CellTag.Y2]
            case StockFields.pe3:
                return [CellTag.ratios, CellTag.pe, CellTag.Y3]
            case StockFields.peGrowthQ1:
                return [CellTag.pe, CellTag.Q1, CellTag.yearlyGrowth]
            case StockFields.peGrowthQ2:
                return [CellTag.pe, CellTag.Q2, CellTag.yearlyGrowth]
            case StockFields.peGrowth1:
                return [CellTag.pe, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.peGrowth2:
                return [CellTag.pe, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.peGrowth3:
                return [CellTag.pe, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.bookValuePerShare1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.bookValuePerShare, CellTag.Y1]
            case StockFields.bookValuePerShare2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.bookValuePerShare, CellTag.Y2]
            case StockFields.bookValuePerShare3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.bookValuePerShare, CellTag.Y3]
            case StockFields.bookValuePerShareGrowth1:
                return [CellTag.balanceSheet, CellTag.bookValuePerShare, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.bookValuePerShareGrowth2:
                return [CellTag.balanceSheet, CellTag.bookValuePerShare, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.bookValuePerShareGrowth3:
                return [CellTag.balanceSheet, CellTag.bookValuePerShare, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.capSpending1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.capSpending, CellTag.Y1]
            case StockFields.capSpending2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.capSpending, CellTag.Y2]
            case StockFields.capSpending3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.capSpending, CellTag.Y3]
            case StockFields.capSpendingGrowth1:
                return [CellTag.balanceSheet, CellTag.capSpending, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.capSpendingGrowth2:
                return [CellTag.balanceSheet, CellTag.capSpending, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.capSpendingGrowth3:
                return [CellTag.balanceSheet, CellTag.capSpending, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.freeCashFlowPerShare1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.freeCashFlowPerShare, CellTag.Y1]
            case StockFields.freeCashFlowPerShare2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.freeCashFlowPerShare, CellTag.Y2]
            case StockFields.freeCashFlowPerShare3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.freeCashFlowPerShare, CellTag.Y3]
            case StockFields.freeCashFlowPerShareGrowth1:
                return [CellTag.balanceSheet, CellTag.freeCashFlowPerShare, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowPerShareGrowth2:
                return [CellTag.balanceSheet, CellTag.freeCashFlowPerShare, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.freeCashFlowPerShareGrowth3:
                return [CellTag.balanceSheet, CellTag.freeCashFlowPerShare, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.grossMargin1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.grossMargin, CellTag.Y1]
            case StockFields.grossMargin2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.grossMargin, CellTag.Y2]
            case StockFields.grossMargin3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.grossMargin, CellTag.Y3]
            case StockFields.grossMarginGrowth1:
                return [CellTag.balanceSheet, CellTag.grossMargin, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.grossMarginGrowth2:
                return [CellTag.balanceSheet, CellTag.grossMargin, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.grossMarginGrowth3:
                return [CellTag.balanceSheet, CellTag.grossMargin, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.operatingCashFlow1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingCashFlow, CellTag.Y1]
            case StockFields.operatingCashFlow2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingCashFlow, CellTag.Y2]
            case StockFields.operatingCashFlow3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingCashFlow, CellTag.Y3]
            case StockFields.operatingCashFlowGrowth1:
                return [CellTag.balanceSheet, CellTag.operatingCashFlow, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.operatingCashFlowGrowth2:
                return [CellTag.balanceSheet, CellTag.operatingCashFlow, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.operatingCashFlowGrowth3:
                return [CellTag.balanceSheet, CellTag.operatingCashFlow, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.operatingIncome1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingIncome, CellTag.Y1]
            case StockFields.operatingIncome2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingIncome, CellTag.Y2]
            case StockFields.operatingIncome3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingIncome, CellTag.Y3]
            case StockFields.operatingIncomeGrowth1:
                return [CellTag.balanceSheet, CellTag.operatingIncome, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.operatingIncomeGrowth2:
                return [CellTag.balanceSheet, CellTag.operatingIncome, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.operatingIncomeGrowth3:
                return [CellTag.balanceSheet, CellTag.operatingIncome, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.operatingMargin1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingMargin, CellTag.Y1]
            case StockFields.operatingMargin2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingMargin, CellTag.Y2]
            case StockFields.operatingMargin3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.operatingMargin, CellTag.Y3]
            case StockFields.operatingMarginGrowth1:
                return [CellTag.balanceSheet, CellTag.operatingMargin, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.operatingMarginGrowth2:
                return [CellTag.balanceSheet, CellTag.operatingMargin, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.operatingMarginGrowth3:
                return [CellTag.balanceSheet, CellTag.operatingMargin, CellTag.Y3, CellTag.yearlyGrowth]

            case StockFields.workingCapital1:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.workingCapital, CellTag.Y1]
            case StockFields.workingCapital2:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.workingCapital, CellTag.Y2]
            case StockFields.workingCapital3:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.workingCapital, CellTag.Y3]
            case StockFields.workingCapitalGrowth1:
                return [CellTag.balanceSheet, CellTag.workingCapital, CellTag.Y1, CellTag.yearlyGrowth]
            case StockFields.workingCapitalGrowth2:
                return [CellTag.balanceSheet, CellTag.workingCapital, CellTag.Y2, CellTag.yearlyGrowth]
            case StockFields.workingCapitalGrowth3:
                return [CellTag.balanceSheet, CellTag.workingCapital, CellTag.Y3, CellTag.yearlyGrowth]


            case StockFields.growthEstimate5y:
                return [CellTag.rule1, CellTag.analysts, CellTag.yearlyGrowth]

            case StockFields.roicP1:
                return [CellTag.rule1, CellTag.cgRoic, CellTag.value]
            case StockFields.roicP2:
                return [CellTag.rule1, CellTag.cgRoic]
            case StockFields.roicP3:
                return [CellTag.rule1, CellTag.cgRoic]
            case StockFields.roic1Y:
                return [CellTag.rule1, CellTag.cgRoic, CellTag.value]
            case StockFields.roic3Y:
                return [CellTag.rule1, CellTag.cgRoic]

            case StockFields.revenue1Y:
                return [CellTag.rule1, CellTag.cgRevenue]
            case StockFields.revenue3Y:
                return [CellTag.rule1, CellTag.cgRevenue]
            case StockFields.revenue5Y:
                return [CellTag.rule1, CellTag.cgRevenue]
            case StockFields.revenue9Y:
                return [CellTag.rule1, CellTag.cgRevenue]

            case StockFields.eps1Y:
                return [CellTag.rule1, CellTag.cgEps]
            case StockFields.eps3Y:
                return [CellTag.rule1, CellTag.cgEps]
            case StockFields.eps5Y:
                return [CellTag.rule1, CellTag.cgEps]
            case StockFields.eps9Y:
                return [CellTag.rule1, CellTag.cgEps]

            case StockFields.bps1Y:
                return [CellTag.rule1, CellTag.cgBps]
            case StockFields.bps3Y:
                return [CellTag.rule1, CellTag.cgBps]
            case StockFields.bps5Y:
                return [CellTag.rule1, CellTag.cgBps]
            case StockFields.bps9Y:
                return [CellTag.rule1, CellTag.cgBps]

            case StockFields.cash1Y:
                return [CellTag.rule1, CellTag.cgCash]
            case StockFields.cash3Y:
                return [CellTag.rule1, CellTag.cgCash]
            case StockFields.cash5Y:
                return [CellTag.rule1, CellTag.cgCash]
            case StockFields.cash9Y:
                return [CellTag.rule1, CellTag.cgCash]

            case StockFields.pe1Y:
                return [CellTag.rule1, CellTag.cgPe]
            case StockFields.pe3Y:
                return [CellTag.rule1, CellTag.cgPe]
            case StockFields.pe5Y:
                return [CellTag.rule1, CellTag.cgPe]
            case StockFields.pe9Y:
                return [CellTag.rule1, CellTag.cgPe]

            case StockFields.rule1GrowthRate:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.defaultPE:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.historicalPE:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.rule1PE:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.currentEps:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.futurePrice10Years:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.futureEPS10Years:
                return [CellTag.rule1, CellTag.calc]

            case StockFields.stickerPrice15pcGrowth:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.stickerPrice5pcGrowth:
                return [CellTag.rule1, CellTag.calc]

            case StockFields.belowStickerPrice15P:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.belowStickerPrice5P:
                return [CellTag.rule1, CellTag.calc]

            case StockFields.price:
                return [CellTag.price, CellTag.hidden]

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
                return [CellTag.totalScore]

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