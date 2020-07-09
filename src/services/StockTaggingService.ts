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
        //TODO
        return []

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
            case StockFields.price:
                return [CellTag.currentPrice]
            case StockFields.change:
                return [CellTag.price]

            case StockFields.lastReportedQuarter:
                return [CellTag.date, CellTag.lastReport]
            case StockFields.exDividendDate:
                return [CellTag.date, CellTag.dividends]

            case StockFields.enterpriseValue:
                return [CellTag.ratios]
            case StockFields.totalCashPerSharePercent:
                return [CellTag.ratios]
            case StockFields.totalDebtEquity:
                return [CellTag.ratios]

            case StockFields.trailingPE:
                return [CellTag.ratios, CellTag.value]
            case StockFields.forwardPE:
                return [CellTag.ratios, CellTag.value]
            case StockFields.priceToSalesTrailing12Months:
                return [CellTag.ratios, CellTag.value]
            case StockFields.priceBook:
                return [CellTag.ratios, CellTag.value]
            case StockFields.enterpriseValueRevenue:
                return [CellTag.ratios]
            case StockFields.enterpriseValueEBITDA:
                return [CellTag.ratios]
            case StockFields.priceEarningGrowth:
                return [CellTag.growth]
            case StockFields.trailingPriceEarningGrowth:
                return [CellTag.growth]

            case StockFields.week52Change:
                return [CellTag.price]
            case StockFields.week52AboveLowPercent:
                return [CellTag.price]
            case StockFields.week52BelowHighPercent:
                return [CellTag.price]

            case StockFields.belowTargetLowPricePercent:
                return [CellTag.analysts, CellTag.price]
            case StockFields.belowTargetMedianPricePercent:
                return [CellTag.analysts, CellTag.price]

            case StockFields.heldByInsiders:
                return [CellTag.stock]
            case StockFields.heldByInstitutions:
                return [CellTag.stock]
            case StockFields.buyPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.sellPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.shortToFloat:
                return [CellTag.short, CellTag.stock]
            case StockFields.sharesShortPrevMonthCompare:
                return [CellTag.short, CellTag.stock]

            case StockFields.fiveYearAvgDividendYield:
                return [CellTag.dividends]
            case StockFields.trailingAnnualDividendYield:
                return [CellTag.dividends]
            case StockFields.payoutRatio:
                return [CellTag.dividends]

            case StockFields.revenueLastQuarter:
                return [CellTag.financials, CellTag.revenue, CellTag.LastQuarter]
            case StockFields.revenue2QuartersAgo:
                return [CellTag.financials, CellTag.revenue, CellTag.Last2Quarters]
            case StockFields.revenue3QuartersAgo:
                return [CellTag.financials, CellTag.revenue, CellTag.Last3Quarters]
            case StockFields.revenueLastYear:
                return [CellTag.financials, CellTag.revenue, CellTag.LastYear]
            case StockFields.revenue2YearsAgo:
                return [CellTag.financials, CellTag.revenue, CellTag.Last2Years]
            case StockFields.revenue4YearsAgo:
                return [CellTag.financials, CellTag.revenue, CellTag.Last4Years]

            case StockFields.revenueGrowthLastQuarter:
                return [CellTag.revenue, CellTag.LastQuarter, CellTag.growth]
            case StockFields.revenueGrowthLast2Quarters:
                return [CellTag.revenue, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.revenueGrowthLastYear:
                return [CellTag.revenue, CellTag.LastYear, CellTag.growth]
            case StockFields.revenueGrowthLast4Years:
                return [CellTag.revenue, CellTag.Last4Years, CellTag.growth]


            case StockFields.grossIncomeLastQuarter:
                return [CellTag.financials, CellTag.grossIncome, CellTag.LastQuarter]
            case StockFields.grossIncome2QuartersAgo:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last2Quarters]
            case StockFields.grossIncome3QuartersAgo:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last3Quarters]
            case StockFields.grossIncomeLastYear:
                return [CellTag.financials, CellTag.grossIncome, CellTag.LastYear]
            case StockFields.grossIncome2YearsAgo:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last2Years]
            case StockFields.grossIncome4YearsAgo:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last4Years]

            case StockFields.grossIncomeGrowthLastQuarter:
                return [CellTag.grossIncome, CellTag.LastQuarter, CellTag.growth]
            case StockFields.grossIncomeGrowthLast2Quarters:
                return [CellTag.grossIncome, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.grossIncomeGrowthLastYear:
                return [CellTag.grossIncome, CellTag.LastYear, CellTag.growth]
            case StockFields.grossIncomeGrowthLast4Years:
                return [CellTag.grossIncome, CellTag.Last4Years, CellTag.growth]


            case StockFields.ebitLastQuarter:
                return [CellTag.financials, CellTag.ebit, CellTag.LastQuarter]
            case StockFields.ebit2QuartersAgo:
                return [CellTag.financials, CellTag.ebit, CellTag.Last2Quarters]
            case StockFields.ebit3QuartersAgo:
                return [CellTag.financials, CellTag.ebit, CellTag.Last3Quarters]
            case StockFields.ebitLastYear:
                return [CellTag.financials, CellTag.ebit, CellTag.LastYear]
            case StockFields.ebit2YearsAgo:
                return [CellTag.financials, CellTag.ebit, CellTag.Last2Years]
            case StockFields.ebit4YearsAgo:
                return [CellTag.financials, CellTag.ebit, CellTag.Last4Years]

            case StockFields.ebitGrowthLastQuarter:
                return [CellTag.ebit, CellTag.LastQuarter, CellTag.growth]
            case StockFields.ebitGrowthLast2Quarters:
                return [CellTag.ebit, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.ebitGrowthLastYear:
                return [CellTag.ebit, CellTag.LastYear, CellTag.growth]
            case StockFields.ebitGrowthLast4Years:
                return [CellTag.ebit, CellTag.Last4Years, CellTag.growth]


            case StockFields.netIncomeLastQuarter:
                return [CellTag.financials, CellTag.netIncome, CellTag.LastQuarter]
            case StockFields.netIncome2QuartersAgo:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last2Quarters]
            case StockFields.netIncome3QuartersAgo:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last3Quarters]
            case StockFields.netIncomeLastYear:
                return [CellTag.financials, CellTag.netIncome, CellTag.LastYear]
            case StockFields.netIncome2YearsAgo:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last2Years]
            case StockFields.netIncome4YearsAgo:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last4Years]

            case StockFields.netIncomeGrowthLastQuarter:
                return [CellTag.netIncome, CellTag.LastQuarter, CellTag.growth]
            case StockFields.netIncomeGrowthLast2Quarters:
                return [CellTag.netIncome, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.netIncomeGrowthLastYear:
                return [CellTag.netIncome, CellTag.LastYear, CellTag.growth]
            case StockFields.netIncomeGrowthLast4Years:
                return [CellTag.netIncome, CellTag.Last4Years, CellTag.growth]


            case StockFields.profitMarginLastQuarter:
                return [CellTag.financials, CellTag.profitMargin, CellTag.LastQuarter]
            case StockFields.profitMargin2QuartersAgo:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Last2Quarters]
            case StockFields.profitMargin3QuartersAgo:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Last3Quarters]
            case StockFields.profitMarginLastYear:
                return [CellTag.financials, CellTag.profitMargin, CellTag.LastYear]
            case StockFields.profitMargin2YearsAgo:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Last2Years]
            case StockFields.profitMargin4YearsAgo:
                return [CellTag.financials, CellTag.profitMargin, CellTag.Last4Years]

            case StockFields.profitMarginGrowthLastQuarter:
                return [CellTag.profitMargin, CellTag.LastQuarter, CellTag.growth]
            case StockFields.profitMarginGrowthLast2Quarters:
                return [CellTag.profitMargin, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.profitMarginGrowthLastYear:
                return [CellTag.profitMargin, CellTag.LastYear, CellTag.growth]
            case StockFields.profitMarginGrowthLast4Years:
                return [CellTag.profitMargin, CellTag.Last4Years, CellTag.growth]


            case StockFields.freeCashFlowLastQuarter:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.LastQuarter]
            case StockFields.freeCashFlow2QuartersAgo:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last2Quarters]
            case StockFields.freeCashFlow3QuartersAgo:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last3Quarters]
            case StockFields.freeCashFlowLastYear:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.LastYear]
            case StockFields.freeCashFlow2YearsAgo:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last2Years]
            case StockFields.freeCashFlow4YearsAgo:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last4Years]

            case StockFields.freeCashFlowGrowthLastQuarter:
                return [CellTag.freeCashFlow, CellTag.LastQuarter, CellTag.growth]
            case StockFields.freeCashFlowGrowthLast2Quarters:
                return [CellTag.freeCashFlow, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.freeCashFlowGrowthLastYear:
                return [CellTag.freeCashFlow, CellTag.LastYear, CellTag.growth]
            case StockFields.freeCashFlowGrowthLast4Years:
                return [CellTag.freeCashFlow, CellTag.Last4Years, CellTag.growth]

            case StockFields.cashLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.LastQuarter]
            case StockFields.cash2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Last2Quarters]
            case StockFields.cash3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Last3Quarters]
            case StockFields.cashLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.LastYear]
            case StockFields.cash2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Last2Years]
            case StockFields.cash4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.cash, CellTag.Last4Years]
            case StockFields.cashGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastQuarter, CellTag.growth]
            case StockFields.cashGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.cashGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastYear, CellTag.growth]
            case StockFields.cashGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last4Years, CellTag.growth]

            case StockFields.inventoryLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.LastQuarter]
            case StockFields.inventory2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Last2Quarters]
            case StockFields.inventory3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Last3Quarters]
            case StockFields.inventoryLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.LastYear]
            case StockFields.inventory2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Last2Years]
            case StockFields.inventory4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.inventory, CellTag.Last4Years]
            case StockFields.inventoryGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastQuarter, CellTag.growth]
            case StockFields.inventoryGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.inventoryGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastYear, CellTag.growth]
            case StockFields.inventoryGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last4Years, CellTag.growth]

            case StockFields.currentAssetsLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.LastQuarter]
            case StockFields.currentAssets2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Last2Quarters]
            case StockFields.currentAssets3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Last3Quarters]
            case StockFields.currentAssetsLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.LastYear]
            case StockFields.currentAssets2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Last2Years]
            case StockFields.currentAssets4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentAssets, CellTag.Last4Years]

            case StockFields.currentLiabilitiesLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.LastQuarter]
            case StockFields.currentLiabilities2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Last2Quarters]
            case StockFields.currentLiabilities3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Last3Quarters]
            case StockFields.currentLiabilitiesLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.LastYear]
            case StockFields.currentLiabilities2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Last2Years]
            case StockFields.currentLiabilities4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentLiabilities, CellTag.Last4Years]

            case StockFields.currentRatioLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.LastQuarter]
            case StockFields.currentRatio2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Last2Quarters]
            case StockFields.currentRatio3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Last3Quarters]
            case StockFields.currentRatioLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.LastYear]
            case StockFields.currentRatio2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Last2Years]
            case StockFields.currentRatio4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.currentRatio, CellTag.ratios, CellTag.Last4Years]

            case StockFields.currentRatioGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.LastQuarter, CellTag.growth]
            case StockFields.currentRatioGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.currentRatioGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.LastYear, CellTag.growth]
            case StockFields.currentRatioGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.currentRatio, CellTag.ratios, CellTag.Last4Years, CellTag.growth]

            case StockFields.totalLiabilitiesLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.LastQuarter]
            case StockFields.totalLiabilities2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last2Quarters]
            case StockFields.totalLiabilities3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last3Quarters]
            case StockFields.totalLiabilitiesLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.LastYear]
            case StockFields.totalLiabilities2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last2Years]
            case StockFields.totalLiabilities4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last4Years]

            case StockFields.totalAssetsLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.LastQuarter]
            case StockFields.totalAssets2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last2Quarters]
            case StockFields.totalAssets3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last3Quarters]
            case StockFields.totalAssetsLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.LastYear]
            case StockFields.totalAssets2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last2Years]
            case StockFields.totalAssets4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilities, CellTag.Last4Years]

            case StockFields.totalShareholdersEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.LastQuarter]
            case StockFields.totalShareholdersEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Last2Quarters]
            case StockFields.totalShareholdersEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Last3Quarters]
            case StockFields.totalShareholdersEquityLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.LastYear]
            case StockFields.totalShareholdersEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Last2Years]
            case StockFields.totalShareholdersEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.equity, CellTag.Last4Years]
            case StockFields.totalShareholdersEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastQuarter, CellTag.growth]
            case StockFields.totalShareholdersEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.totalShareholdersEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastYear, CellTag.growth]
            case StockFields.totalShareholdersEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last4Years, CellTag.growth]

            case StockFields.totalLiabilitiesToEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.LastQuarter]
            case StockFields.totalLiabilitiesToEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Last2Quarters]
            case StockFields.totalLiabilitiesToEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Last3Quarters]
            case StockFields.totalLiabilitiesToEquityLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.LastYear]
            case StockFields.totalLiabilitiesToEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Last2Years]
            case StockFields.totalLiabilitiesToEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.liabilitiesToEquity, CellTag.Last4Years]
            case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastQuarter, CellTag.growth]
            case StockFields.totalLiabilitiesToEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastYear, CellTag.growth]
            case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last4Years, CellTag.growth]

            case StockFields.stockRepurchasedLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stockRepurchased2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last2Quarters]
            case StockFields.stockRepurchased3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last3Quarters]
            case StockFields.stockRepurchasedLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.LastYear]
            case StockFields.stockRepurchased2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last2Years]
            case StockFields.stockRepurchased4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last4Years]
            case StockFields.stockRepurchasedGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter, CellTag.growth]
            case StockFields.stockRepurchasedGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.stockRepurchasedGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear, CellTag.growth]
            case StockFields.stockRepurchasedGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years, CellTag.growth]

            case StockFields.stockLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stockLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.LastYear]
            case StockFields.stock2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last2Years]
            case StockFields.stock4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.stock, CellTag.Last4Years]
            case StockFields.stockGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter, CellTag.growth]
            case StockFields.stockGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear, CellTag.growth]
            case StockFields.stockGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years, CellTag.growth]

            case StockFields.epsLastQuarter:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.LastQuarter]
            case StockFields.eps2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last2Quarters]
            case StockFields.eps3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last3Quarters]
            case StockFields.eps4QuartersAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last4Quarters]
            case StockFields.epsLastYear:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.LastYear]
            case StockFields.eps2YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last2Years]
            case StockFields.eps3YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last3Years]
            case StockFields.eps4YearsAgo:
                return [CellTag.balanceSheet, CellTag.financials, CellTag.eps, CellTag.Last4Years]
            case StockFields.epsGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastQuarter, CellTag.growth]
            case StockFields.epsGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.epsGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastYear, CellTag.growth]
            case StockFields.epsGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last4Years, CellTag.growth]

            case StockFields.peLastQuarter:
                return [CellTag.ratios, CellTag.pe, CellTag.LastQuarter]
            case StockFields.pe2QuartersAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last2Quarters]
            case StockFields.pe3QuartersAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last3Quarters]
            case StockFields.pe4QuartersAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last4Quarters]
            case StockFields.peLastYear:
                return [CellTag.ratios, CellTag.pe, CellTag.LastYear]
            case StockFields.pe2YearsAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last2Years]
            case StockFields.pe3YearsAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last3Years]
            case StockFields.pe4YearsAgo:
                return [CellTag.ratios, CellTag.pe, CellTag.Last4Years]
            case StockFields.peGrowthLastQuarter:
                return [CellTag.pe, CellTag.LastQuarter, CellTag.growth]
            case StockFields.peGrowthLast2Quarters:
                return [CellTag.pe, CellTag.Last2Quarters, CellTag.growth]
            case StockFields.peGrowthLastYear:
                return [CellTag.pe, CellTag.LastYear, CellTag.growth]
            case StockFields.peGrowthLast4Years:
                return [CellTag.pe, CellTag.Last4Years, CellTag.growth]

            case StockFields.growthEstimate5y:
                return [CellTag.rule1, CellTag.analysts, CellTag.growth]

            case StockFields.roicLastYear:
                return [CellTag.rule1, CellTag.cgRoic, CellTag.value]
            case StockFields.roicLast2YearsAgo:
                return [CellTag.rule1, CellTag.cgRoic]
            case StockFields.roicLast4YearsAgo:
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

            case StockFields.belowStickerPrice15pc:
                return [CellTag.rule1, CellTag.calc]
            case StockFields.belowStickerPrice5pc:
                return [CellTag.rule1, CellTag.calc]

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