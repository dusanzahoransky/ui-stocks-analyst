import {StockFields} from "../model/StockFields";
import {EtfTableColumn} from "../model/EtfTableColumn";
import {CellTag} from "../model/CellTag";
import {CellData} from "../model/CellData";

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
            case StockFields.quarterEnds:
                return [CellTag.hidden]
            case StockFields.yearEnds:
                return [CellTag.hidden]
            case StockFields.chartData:
                return [CellTag.hidden]

            case StockFields.companyName:
                return [CellTag.companyName]
            case StockFields.date:
                return [CellTag.date]
            case StockFields.symbol:
                return [CellTag.symbol]
            case StockFields.price:
                return [CellTag.price]
            case StockFields.change:
                return [CellTag.change]

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
                return [CellTag.ratios]
            case StockFields.forwardPE:
                return [CellTag.ratios]
            case StockFields.priceToSalesTrailing12Months:
                return [CellTag.ratios]
            case StockFields.priceBook:
                return [CellTag.ratios]
            case StockFields.enterpriseValueRevenue:
                return [CellTag.ratios]
            case StockFields.enterpriseValueEBITDA:
                return [CellTag.ratios]
            case StockFields.priceEarningGrowth:
                return [CellTag.ratios]
            case StockFields.trailingPriceEarningGrowth:
                return [CellTag.ratios]

            case StockFields.week52Change:
                return [CellTag.currentPrice]
            case StockFields.week52AboveLowPercent:
                return [CellTag.currentPrice]
            case StockFields.week52BelowHighPercent:
                return [CellTag.currentPrice]

            case StockFields.belowTargetLowPricePercent:
                return [CellTag.analysts]
            case StockFields.belowTargetMedianPricePercent:
                return [CellTag.analysts]

            case StockFields.heldByInsiders:
                return [CellTag.stock]
            case StockFields.heldByInstitutions:
                return [CellTag.stock]
            case StockFields.buyPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.sellPercentInsiderShares:
                return [CellTag.stock]
            case StockFields.shortToFloat:
                return [CellTag.short]
            case StockFields.sharesShortPrevMonthCompare:
                return [CellTag.short]

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
                return [CellTag.financials, CellTag.revenue, CellTag.LastQuarter]
            case StockFields.revenueGrowthLast2Quarters:
                return [CellTag.financials, CellTag.revenue, CellTag.Last2Quarters]
            case StockFields.revenueGrowthLastYear:
                return [CellTag.financials, CellTag.revenue, CellTag.LastYear]
            case StockFields.revenueGrowthLast4Years:
                return [CellTag.financials, CellTag.revenue, CellTag.Last4Years]


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
                return [CellTag.financials, CellTag.grossIncome, CellTag.LastQuarter]
            case StockFields.grossIncomeGrowthLast2Quarters:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last2Quarters]
            case StockFields.grossIncomeGrowthLastYear:
                return [CellTag.financials, CellTag.grossIncome, CellTag.LastYear]
            case StockFields.grossIncomeGrowthLast4Years:
                return [CellTag.financials, CellTag.grossIncome, CellTag.Last4Years]


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
                return [CellTag.financials, CellTag.ebit, CellTag.LastQuarter]
            case StockFields.ebitGrowthLast2Quarters:
                return [CellTag.financials, CellTag.ebit, CellTag.Last2Quarters]
            case StockFields.ebitGrowthLastYear:
                return [CellTag.financials, CellTag.ebit, CellTag.LastYear]
            case StockFields.ebitGrowthLast4Years:
                return [CellTag.financials, CellTag.ebit, CellTag.Last4Years]


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
                return [CellTag.financials, CellTag.netIncome, CellTag.LastQuarter]
            case StockFields.netIncomeGrowthLast2Quarters:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last2Quarters]
            case StockFields.netIncomeGrowthLastYear:
                return [CellTag.financials, CellTag.netIncome, CellTag.LastYear]
            case StockFields.netIncomeGrowthLast4Years:
                return [CellTag.financials, CellTag.netIncome, CellTag.Last4Years]


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
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.LastQuarter]
            case StockFields.freeCashFlowGrowthLast2Quarters:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last2Quarters]
            case StockFields.freeCashFlowGrowthLastYear:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.LastYear]
            case StockFields.freeCashFlowGrowthLast4Years:
                return [CellTag.financials, CellTag.freeCashFlow, CellTag.Last4Years]

            case StockFields.cashLastQuarter:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastQuarter]
            case StockFields.cash2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last2Quarters]
            case StockFields.cash3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last3Quarters]
            case StockFields.cashLastYear:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastYear]
            case StockFields.cash2YearsAgo:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last2Years]
            case StockFields.cash4YearsAgo:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last4Years]
            case StockFields.cashGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastQuarter]
            case StockFields.cashGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last2Quarters]
            case StockFields.cashGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.LastYear]
            case StockFields.cashGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.cash, CellTag.Last4Years]

            case StockFields.inventoryLastQuarter:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastQuarter]
            case StockFields.inventory2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last2Quarters]
            case StockFields.inventory3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last3Quarters]
            case StockFields.inventoryLastYear:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastYear]
            case StockFields.inventory2YearsAgo:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last2Years]
            case StockFields.inventory4YearsAgo:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last4Years]
            case StockFields.inventoryGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastQuarter]
            case StockFields.inventoryGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last2Quarters]
            case StockFields.inventoryGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.LastYear]
            case StockFields.inventoryGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.inventory, CellTag.Last4Years]

            case StockFields.totalLiabilitiesLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.LastQuarter]
            case StockFields.totalLiabilities2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last2Quarters]
            case StockFields.totalLiabilities3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last3Quarters]
            case StockFields.totalLiabilitiesLastYear:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.LastYear]
            case StockFields.totalLiabilities2YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last2Years]
            case StockFields.totalLiabilities4YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last4Years]
            case StockFields.totalLiabilitiesGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.LastQuarter]
            case StockFields.totalLiabilitiesGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last2Quarters]
            case StockFields.totalLiabilitiesGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.LastYear]
            case StockFields.totalLiabilitiesGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.liabilities, CellTag.Last4Years]

            case StockFields.totalShareholdersEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastQuarter]
            case StockFields.totalShareholdersEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last2Quarters]
            case StockFields.totalShareholdersEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last3Quarters]
            case StockFields.totalShareholdersEquityLastYear:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastYear]
            case StockFields.totalShareholdersEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last2Years]
            case StockFields.totalShareholdersEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last4Years]
            case StockFields.totalShareholdersEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastQuarter]
            case StockFields.totalShareholdersEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last2Quarters]
            case StockFields.totalShareholdersEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.LastYear]
            case StockFields.totalShareholdersEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.equity, CellTag.Last4Years]

            case StockFields.totalLiabilitiesToEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastQuarter]
            case StockFields.totalLiabilitiesToEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last2Quarters]
            case StockFields.totalLiabilitiesToEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last3Quarters]
            case StockFields.totalLiabilitiesToEquityLastYear:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastYear]
            case StockFields.totalLiabilitiesToEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last2Years]
            case StockFields.totalLiabilitiesToEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last4Years]
            case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastQuarter]
            case StockFields.totalLiabilitiesToEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last2Quarters]
            case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.LastYear]
            case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity, CellTag.Last4Years]

            case StockFields.stockRepurchasedLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stockRepurchased2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Quarters]
            case StockFields.stockRepurchased3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last3Quarters]
            case StockFields.stockRepurchasedLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear]
            case StockFields.stockRepurchased2YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Years]
            case StockFields.stockRepurchased4YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years]
            case StockFields.stockRepurchasedGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stockRepurchasedGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Quarters]
            case StockFields.stockRepurchasedGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear]
            case StockFields.stockRepurchasedGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years]

            case StockFields.stockLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stock2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Quarters]
            case StockFields.stock3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last3Quarters]
            case StockFields.stockLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear]
            case StockFields.stock2YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Years]
            case StockFields.stock4YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years]
            case StockFields.stockGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastQuarter]
            case StockFields.stockGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last2Quarters]
            case StockFields.stockGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.LastYear]
            case StockFields.stockGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock, CellTag.Last4Years]

            case StockFields.epsLastQuarter:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastQuarter]
            case StockFields.eps2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last2Quarters]
            case StockFields.eps3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last3Quarters]
            case StockFields.eps4QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last4Quarters]
            case StockFields.epsLastYear:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastYear]
            case StockFields.eps2YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last2Years]
            case StockFields.eps3YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last3Years]
            case StockFields.eps4YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last4Years]
            case StockFields.epsGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastQuarter]
            case StockFields.epsGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last2Quarters]
            case StockFields.epsGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.LastYear]
            case StockFields.epsGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.eps, CellTag.Last4Years]

            case StockFields.peLastQuarter:
                return [CellTag.pe, CellTag.LastQuarter]
            case StockFields.pe2QuartersAgo:
                return [CellTag.pe, CellTag.Last2Quarters]
            case StockFields.pe3QuartersAgo:
                return [CellTag.pe, CellTag.Last3Quarters]
            case StockFields.pe4QuartersAgo:
                return [CellTag.pe, CellTag.Last4Quarters]
            case StockFields.peLastYear:
                return [CellTag.pe, CellTag.LastYear]
            case StockFields.pe2YearsAgo:
                return [CellTag.pe, CellTag.Last2Years]
            case StockFields.pe3YearsAgo:
                return [CellTag.pe, CellTag.Last3Years]
            case StockFields.pe4YearsAgo:
                return [CellTag.pe, CellTag.Last4Years]
            case StockFields.peGrowthLastQuarter:
                return [CellTag.pe, CellTag.LastQuarter]
            case StockFields.peGrowthLast2Quarters:
                return [CellTag.pe, CellTag.Last2Quarters]
            case StockFields.peGrowthLastYear:
                return [CellTag.pe, CellTag.LastYear]
            case StockFields.peGrowthLast4Years:
                return [CellTag.pe, CellTag.Last4Years]

            case StockFields.growthEstimate5y:
                return [CellTag.analysts]

            case StockFields.roic1Y:
                return [CellTag.rule1, CellTag.cgRoic]
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

            default:
                throw Error('Undefined field ' + column)
        }
    }

    static tagEtfColumn(column: number): CellTag[] {
        switch (column) {
            case EtfTableColumn.chartData:
                return [CellTag.hidden]
            case EtfTableColumn.companyName:
                return [CellTag.companyName]
            case EtfTableColumn.date:
                return [CellTag.date]
            case EtfTableColumn.symbol:
                return [CellTag.symbol]
            case EtfTableColumn.price:
                return [CellTag.price]
            case EtfTableColumn.change:
                return [CellTag.change]
            case EtfTableColumn.asOfDate:
                return [CellTag.date, CellTag.lastReport]
        }
    }
}