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
        return isEtf? this.tagEtfColumn(column) : this.tagStockColumn(column)
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
                return [CellTag.date, CellTag.dividents]

            case StockFields.enterpriseValue:
                return [CellTag.stat]
            case StockFields.totalCashPerSharePercent:
                return [CellTag.stat]
            case StockFields.totalDebtEquity:
                return [CellTag.stat]

            case StockFields.trailingPE:
                return [CellTag.stat]
            case StockFields.forwardPE:
                return [CellTag.stat]
            case StockFields.priceToSalesTrailing12Months:
                return [CellTag.stat]
            case StockFields.priceBook:
                return [CellTag.stat]
            case StockFields.enterpriseValueRevenue:
                return [CellTag.stat]
            case StockFields.enterpriseValueEBITDA:
                return [CellTag.stat]
            case StockFields.priceEarningGrowth:
                return [CellTag.stat]
            case StockFields.trailingPriceEarningGrowth:
                return [CellTag.stat]

            case StockFields.week52Change:
                return [CellTag.currentPriceStat]
            case StockFields.week52AboveLowPercent:
                return [CellTag.currentPriceStat]
            case StockFields.week52BelowHighPercent:
                return [CellTag.currentPriceStat]
            case StockFields.belowTargetLowPricePercent:
                return [CellTag.currentPriceStat]
            case StockFields.belowTargetMedianPricePercent:
                return [CellTag.currentPriceStat]

            case StockFields.heldByInsiders:
                return [CellTag.stock]
            case StockFields.heldByInstitutions:
                return [CellTag.stock]
            case StockFields.shortToFloat:
                return [CellTag.short]
            case StockFields.sharesShortPrevMonthCompare:
                return [CellTag.short]

            case StockFields.fiveYearAvgDividendYield:
                return [CellTag.dividents]
            case StockFields.trailingAnnualDividendYield:
                return [CellTag.dividents]
            case StockFields.payoutRatio:
                return [CellTag.dividents]

            case StockFields.revenueLastQuarter:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenue2QuartersAgo:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenue3QuartersAgo:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenueLastYear:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenue2YearsAgo:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenue4YearsAgo:
                return [CellTag.financials, CellTag.revenue]

            case StockFields.revenueGrowthLastQuarter:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenueGrowthLast2Quarters:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenueGrowthLastYear:
                return [CellTag.financials, CellTag.revenue]
            case StockFields.revenueGrowthLast4Years:
                return [CellTag.financials, CellTag.revenue]


            case StockFields.grossIncomeLastQuarter:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncome2QuartersAgo:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncome3QuartersAgo:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncomeLastYear:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncome2YearsAgo:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncome4YearsAgo:
                return [CellTag.financials, CellTag.grossIncome]

            case StockFields.grossIncomeGrowthLastQuarter:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncomeGrowthLast2Quarters:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncomeGrowthLastYear:
                return [CellTag.financials, CellTag.grossIncome]
            case StockFields.grossIncomeGrowthLast4Years:
                return [CellTag.financials, CellTag.grossIncome]


            case StockFields.ebitLastQuarter:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebit2QuartersAgo:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebit3QuartersAgo:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebitLastYear:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebit2YearsAgo:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebit4YearsAgo:
                return [CellTag.financials, CellTag.ebit]

            case StockFields.ebitGrowthLastQuarter:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebitGrowthLast2Quarters:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebitGrowthLastYear:
                return [CellTag.financials, CellTag.ebit]
            case StockFields.ebitGrowthLast4Years:
                return [CellTag.financials, CellTag.ebit]


            case StockFields.netIncomeLastQuarter:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncome2QuartersAgo:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncome3QuartersAgo:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncomeLastYear:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncome2YearsAgo:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncome4YearsAgo:
                return [CellTag.financials, CellTag.netIncome]

            case StockFields.netIncomeGrowthLastQuarter:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncomeGrowthLast2Quarters:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncomeGrowthLastYear:
                return [CellTag.financials, CellTag.netIncome]
            case StockFields.netIncomeGrowthLast4Years:
                return [CellTag.financials, CellTag.netIncome]


            case StockFields.freeCashFlowLastQuarter:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlow2QuartersAgo:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlow3QuartersAgo:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlowLastYear:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlow2YearsAgo:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlow4YearsAgo:
                return [CellTag.financials, CellTag.freeCashFlow]

            case StockFields.freeCashFlowGrowthLastQuarter:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlowGrowthLast2Quarters:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlowGrowthLastYear:
                return [CellTag.financials, CellTag.freeCashFlow]
            case StockFields.freeCashFlowGrowthLast4Years:
                return [CellTag.financials, CellTag.freeCashFlow]

            case StockFields.cashLastQuarter:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cash2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cash3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cashLastYear:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cash2YearsAgo:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cash4YearsAgo:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cashGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cashGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cashGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.cash]
            case StockFields.cashGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.cash]

            case StockFields.inventoryLastQuarter:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventory2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventory3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventoryLastYear:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventory2YearsAgo:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventory4YearsAgo:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventoryGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventoryGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventoryGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.inventory]
            case StockFields.inventoryGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.inventory]

            case StockFields.totalLiabilitiesLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilities2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilities3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilitiesLastYear:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilities2YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilities4YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilitiesGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilitiesGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilitiesGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.liabilities]
            case StockFields.totalLiabilitiesGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.liabilities]

            case StockFields.totalShareholdersEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquityLastYear:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.equity]
            case StockFields.totalShareholdersEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.equity]

            case StockFields.totalLiabilitiesToEquityLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquity2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquity3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquityLastYear:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquity2YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquity4YearsAgo:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquityGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]
            case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.liabilitiesToEquity]

            case StockFields.stockRepurchasedLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchased2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchased3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchasedLastYear:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchased2YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchased4YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchasedGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchasedGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchasedGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockRepurchasedGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock]

            case StockFields.stockLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stock2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stock3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockLastYear:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stock2YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stock4YearsAgo:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.stock]
            case StockFields.stockGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.stock]

            case StockFields.epsCurrentQuarterEstimate:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsLastQuarter:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps2QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps3QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps4QuartersAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsLastYear:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps2YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps3YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.eps4YearsAgo:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsGrowthLastQuarter:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsGrowthLast2Quarters:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsGrowthLastYear:
                return [CellTag.balanceSheet, CellTag.eps]
            case StockFields.epsGrowthLast4Years:
                return [CellTag.balanceSheet, CellTag.eps]

            case StockFields.peLastQuarter:
                return [CellTag.pe]
            case StockFields.pe2QuartersAgo:
                return [CellTag.pe]
            case StockFields.pe3QuartersAgo:
                return [CellTag.pe]
            case StockFields.pe4QuartersAgo:
                return [CellTag.pe]
            case StockFields.peGrowthLastQuarter:
                return [CellTag.pe]
            case StockFields.peGrowthLast2Quarters:
                return [CellTag.pe]
            case StockFields.peGrowthLast3Quarters:
                return [CellTag.pe]

            case StockFields.growthEstimate5y:
                return [CellTag.growth]

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