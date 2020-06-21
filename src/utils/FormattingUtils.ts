import {StockFields} from "../model/StockFields";
import moment from "moment";
import {EtfTableColumn} from "../model/EtfTableColumn";

export class FormattingUtils {

    static formatStock(rowValue: any[], value: number | string, column: StockFields): string {
        if (typeof value === 'string' && column === StockFields.exDividendDate) {
            let diff = moment().diff(value, 'days');
            return diff < 0 ? `in ${-diff} days` : value;
        }
        return this.format(rowValue, value)
    }

    static formatEtf(rowValue: any[], value: number | string, column: EtfTableColumn): string {
        return this.format(rowValue, value)
    }

    static format(rowValue: any[], value: number | string): string {
        if (!value) {
            return ''
        }
        if (typeof value === 'object') {
            return JSON.stringify(value).substring(0, 10)
        }
        if (typeof value === 'string') {
            return value
        }
        if (!value || isNaN(value)) {
            return value ? value.toFixed(1) : '';
        }
        if (value > 1000000000000 || value < -1000000000000) {
            const bil = value / 1000000000000;
            return `${bil.toFixed(1)}T`;
        }
        if (value > 1000000000 || value < -1000000000) {
            const bil = value / 1000000000;
            return `${bil.toFixed(1)}B`;
        }
        if (value > 1000000 || value < -1000000) {
            const mil = value / 1000000;
            return `${mil.toFixed(1)}M`;
        }
        return value.toLocaleString(undefined, {maximumFractionDigits: 1});
    }

    static toFieldLabel(field: string) {
        switch (field) {
            case "id":
                return "Id"
            case "date":
                return "Refreshed Yahoo"
            case "lastReportedQuarter":
                return "Last Quarter"
            case "symbol":
                return "Symbol"
            case "exchange":
                return "Exchange"
            case "companyName":
                return "Name"
            case "price":
                return "Price"
            case "change":
                return "Change"
            case "enterpriseValue":
                return "EV"
            case "totalCashPerShare":
                return "Cash /Share"
            case "totalCashPerSharePercent":
                return "Cash /Share %"
            case "totalDebtEquity":
                return "Debt /Equity"
            case "trailingPE":
                return "(Trl) P/E"
            case "forwardPE":
                return "(Fwd) P/E"
            case "priceToSalesTrailing12Months":
                return "(TTM) P/S"
            case "priceBook":
                return "P/B"
            case "enterpriseValueRevenue":
                return "EV /R"
            case "enterpriseValueEBITDA":
                return "EV /EBITDA"
            case "earningsGrowthPercent":
                return "Earnings Growth %?"
            case "quarterlyRevenueGrowth":
                return "Q. revenue growth"
            case "priceEarningGrowth":
                return "PEG"
            case "trailingPriceEarningGrowth":
                return "(Trl) PEG"
            case "week52Change":
                return "52W change"
            case "week52Low":
                return "52W low"
            case "week52AboveLowPercent":
                return "52W above low %"
            case "week52High":
                return "52W high"
            case "week52BelowHighPercent":
                return "52W below high %"
            case "exDividendDate":
                return "Ex div date"
            case "fiveYearAvgDividendYield":
                return "5y avg (dYvyield)"
            case "trailingAnnualDividendYield":
                return "(Trl) A. (dYvyield)"
            case "targetLowPrice":
                return "Target Low Price"
            case "belowTargetLowPricePercent":
                return "Below low price %"
            case "belowTargetMedianPricePercent":
                return "Below median price %"
            case "heldByInsiders":
                return "Held by insdr %"
            case "heldByInstitutions":
                return "Held by inst %"
            case "shortToFloat":
                return "Short vs Float %"
            case "sharesShortPrevMonthCompare":
                return "Short vs prev month %"
            case "netIncomeLastQuarter":
                return "Net income (LQ)"
            case "netIncome2QuartersAgo":
                return "Net income (-2Q)"
            case "netIncomeGrowthLastQuarter":
                return "Net income growth (LQ)"
            case "netIncomeLastYear":
                return "Net income (LY)"
            case "netIncome2YearsAgo":
                return "Net income (-2Y)"
            case "netIncome3YearAgo":
                return "Net income (-4Y)"
            case "netIncomeGrowthLastYear":
                return "Net income growth (LY)"
            case "netIncomeGrowthLast4Years":
                return "Net income growth (L4Y)"
            case "revenueLastQuarter":
                return "Revenue (LQ)"
            case "revenueGrowthLastQuarter":
                return "Revenue growth (LQ)"
            case "revenueLastYear":
                return "Revenue (LY)"
            case "revenue2YearsAgo":
                return "Revenue (-2Y)"
            case "revenue4YearsAgo":
                return "Revenue (-4Y)"
            case "revenueGrowthLastYear":
                return "Revenue growth (LY)"
            case "revenueGrowthLast4Years":
                return "Revenue growth (L4Y)"
            case "cashLastQuarter":
                return "Cash (LQ)"
            case "cashGrowthLastQuarter":
                return "Cash growth (LQ)"
            case "cashLastYear":
                return "Cash (LY)"
            case "cashGrowthLastYear":
                return "Cash growth (LY)"
            case "cashGrowthLast4Years":
                return "Cash growth (L4Y)"
            case "inventoryLastQuarter":
                return "Inventory (LQ)"
            case "inventoryGrowthLastQuarter":
                return "Inventory growth (LQ)"
            case "inventoryLastYear":
                return "Inventory (LY)"
            case "inventoryGrowthLastYear":
                return "Inventory growth (LY)"
            case "inventoryGrowthLast4Years":
                return "Inventory growth (L4Y)"
            case "currentLiabilitiesLastQuarter":
                return "Current liab (LQ)"
            case "currentLiabilitiesGrowthLastQuarter":
                return "Current liab growth (LQ)"
            case "currentLiabilitiesLastYear":
                return "Current liab (LY)"
            case "currentLiabilitiesGrowthLastYear":
                return "Current liab growth (LY)"
            case "currentLiabilitiesGrowthLast4Years":
                return "Current liab growth (L4Y)"
            case "totalLiabilitiesLastQuarter":
                return "Total liab (LQ)"
            case "totalLiabilitiesGrowthLastQuarter":
                return "Total liab growth (LQ)"
            case "totalLiabilitiesLastYear":
                return "Total liab (LY)"
            case "totalLiabilitiesGrowthLastYear":
                return "Total liab growth (LY)"
            case "totalLiabilitiesGrowthLast4Years":
                return "Total liab growth (L4Y)"
            case "totalShareholdersEquityLastQuarter":
                return "Total shrd equity (LQ)"
            case "totalShareholdersEquityGrowthLastQuarter":
                return "Total shrd equity growth (LQ)"
            case "totalShareholdersEquityLastYear":
                return "Total shrd equity (LY)"
            case "totalShareholdersEquityGrowthLastYear":
                return "Total shrd equity growth (LY)"
            case "totalShareholdersEquityGrowthLast4Years":
                return "Total shrd equity growth (L4Y)"
            case "currentLiabilitiesToEquityLastQuarter":
                return "Current liab to equity (LQ)"
            case "currentLiabilitiesToEquityLastYear":
                return "Current liab to equity (LY)"
            case "currentLiabilitiesToEquityGrowthLastQuarter":
                return "Current liab to equity growth (LQ)"
            case "currentLiabilitiesToEquityGrowthLastYear":
                return "Current liab to equity growth (LY)"
            case "currentLiabilitiesToEquityGrowthLast4Years":
                return "Current liab to equity growth (L4Y)"
            case "totalLiabilitiesToEquityLastQuarter":
                return "Total liab to equity (LQ)"
            case "totalLiabilitiesToEquityLastYear":
                return "Total liab to equity (LY)"
            case "totalLiabilitiesToEquityGrowthLastQuarter":
                return "Total liab to equity growth (LQ)"
            case "totalLiabilitiesToEquityGrowthLastYear":
                return "Total liab to equity growth (LY)"
            case "totalLiabilitiesToEquityGrowthLast4Years":
                return "Total liab to equity growth (L4Y)"
            case "stockRepurchasedLastQuarter":
                return "Stock repurchase (LQ)"
            case "stockRepurchasedGrowthLastQuarter":
                return "Stock repurch growth (LQ)"
            case "stockRepurchasedLastYear":
                return "Stock repurch (LY)"
            case "stockRepurchasedGrowthLastYear":
                return "Stock repurch growth (LY)"
            case "stockRepurchasedGrowthLast4Years":
                return "Stock repurch growth (L4Y)"
            case "stockLastQuarter":
                return "Stock (LQ)"
            case "stockGrowthLastQuarter":
                return "Stock growth (LQ)"
            case "stockLastYear":
                return "Stock (LY)"
            case "stockGrowthLastYear":
                return "Stock growth (LY)"
            case "stockGrowthLast4Years":
                return "Stock growth (L4Y)"
            case "epsCurrentQuarterEstimate" :
                return "EPS current Q estimate"
            case "epsLastQuarter" :
                return "EPS (LQ)"
            case "eps2QuartersAgo" :
                return "EPS (-2Q)"
            case "eps3QuartersAgo" :
                return "EPS (-3Q)"
            case "eps4QuartersAgo" :
                return "EPS (-4Q)"
            case "epsGrowthLastQuarter" :
                return "EPS growth (LQ)"
            case "epsGrowthLast2Quarters" :
                return "EPS growth (L2Q)"
            case "epsGrowthLast3Quarters" :
                return "EPS growth (L3Q)"
            case "epsGrowthEstimateLastQuarter" :
                return "EPS growth LQ to Estimate"
            case "epsLastYear":
                return "EPS (LY)"
            case "eps2YearsAgo":
                return "EPS (-2Y)"
            case "eps3YearsAgo":
                return "EPS (-3Y)"
            case "eps4YearsAgo":
                return "EPS (-4Y)"
            case "epsGrowthLastYear":
                return "Eps growth (LY)"
            case "epsGrowthLast2Years":
                return "Eps growth (L2Y)"
            case "epsGrowthLast4Years":
                return "Eps growth (L4Y)"
            case "netIncome3QuartersAgo":
                return "Net income (-3Q)"
            case "netIncome4YearsAgo":
                return "Net income (-4Y)"
            case "peLastQuarter":
                return "P/E (LQ)"
            case "pe2QuartersAgo":
                return "P/E (-2Q)"
            case "pe3QuartersAgo":
                return "P/E (-3Q)"
            case "pe4QuartersAgo":
                return "P/E (-4Q)"
            case "peGrowthLastQuarter":
                return "P/E growth (LQ)"
            case "peGrowthLast2Quarters":
                return "P/E growth (L2Q)"
            case "peGrowthLast3Quarters":
                return "P/E growth (L3Q)"
            case "netIncomeGrowthLast2Quarters":
                return "Net income growth (L2Q)"
            case "revenue2QuartersAgo":
                return "Revenue (-2Q)"
            case "revenue3QuartersAgo":
                return "Revenue (-3Q)"
            case "revenueGrowthLast2Quarters":
                return "Revenue growth (L2Q)"
            //index cols
            case "totalAssets":
                return "Total assets"
            case "yield":
                return "Yield"

            case "ytdReturn":
                return "Ytd"
            case "threeYearAverageReturn":
                return "3Y avg"
            case "fiveYearAverageReturn":
                return "5Y avg"

            case "priceToEarnings":
                return "PE"
            case "priceToBook":
                return "PB"
            case "priceToCashflow":
                return "P/CashF"
            case "priceToSales":
                return "PS"

            case "fiftyTwoWeekLow":
                return "52 low"
            case "fiftyTwoWeekHigh":
                return "52 high"

            case "fiftyTwoAboveLowPercent":
                return "52 above low"
            case "fiftyTwoBelowHighPercent":
                return "52 below high"

            case "asOfDate":
                return "As of date"

            case "oneMonth":
                return "1M"
            case "threeMonth":
                return "3M"
            case "oneYear":
                return "1Y"
            case "threeYear":
                return "3Y"
            case "ytd":
                return "Ytd"
            case "fiveYear":
                return "5Y"
            case "tenYear":
                return "10Y"

            case "lastBearMkt":
                return "Last bear mkt"
            case "lastBullMkt":
                return "Last bull mkt"


            case "annualHoldingsTurnover":
                return "Annual holdings turnover"
            case "annualReportExpenseRatio":
                return "Annual report expense ratio"

            case "averageDailyVolume3Month":
                return "Volume 3M"
            case "averageDailyVolume10Day":
                return "Volume 10D"

            case "fundInceptionDate":
                return "Inception date"

            case "payoutRatio":
                return "Payout ratio"
            case "currentAssetsLastQuarter":
                return "Current assets (LQ)"
            case "currentAssetsLastYear":
                return "Current assets (LY)"
            case "currentAssetsGrowthLastQuarter":
                return "Current assets growth (LQ)"
            case "currentAssetsGrowthLastYear":
                return "Current assets growth (LY)"
            case "currentAssetsGrowthLast4Years":
                return "Current assets growth (L4Y)"
            case "grossIncomeLastQuarter":
                return "Gross income (LQ)"
            case "grossIncome2QuartersAgo":
                return "Gross income (-2Q)"
            case "grossIncome3QuartersAgo":
                return "Gross income (-3Q)"
            case "grossIncomeLastYear":
                return "Gross income (LY)"
            case "grossIncome2YearsAgo":
                return "Gross income (-2Y)"
            case "grossIncome4YearsAgo":
                return "Gross income (-4Y)"
            case "grossIncomeGrowthLastQuarter":
                return "Gross income growth (LQ)"
            case "grossIncomeGrowthLast2Quarters":
                return "Gross income growth (L2Q)"
            case "grossIncomeGrowthLastYear":
                return "Gross income growth (LY)"
            case "grossIncomeGrowthLast4Years":
                return "Gross income growth (L4Y)"
            case "growthEstimate5y":
                return "Growth est (5Y)"
            case "roic1Y":
                return "Roic (1Y) cg."
            case "roic3Y":
                return "Roic (3Y) cg."
            case "revenue1Y":
                return "Revenue (1Y) cg."
            case "revenue3Y":
                return "Revenue (3Y) cg."
            case "revenue5Y":
                return "Revenue (5Y) cg."
            case "revenue9Y":
                return "Revenue (9Y) cg."
            case "eps1Y":
                return "Eps (1Y) cg."
            case "eps3Y":
                return "Eps (3Y) cg."
            case "eps5Y":
                return "Eps (5Y) cg."
            case "eps9Y":
                return "Eps (9Y) cg."
            case "bps1Y":
                return "Bps (1Y) cg."
            case "bps3Y":
                return "Bps (3Y) cg."
            case "bps5Y":
                return "Bps (5Y) cg."
            case "bps9Y":
                return "Bps (9Y) cg."
            case "cash1Y":
                return "Cash (1Y) cg."
            case "cash3Y":
                return "Cash (3Y) cg."
            case "cash5Y":
                return "Cash (5Y) cg."
            case "cash9Y":
                return "Cash (9Y) cg."
            case "pe1Y":
                return "Pe (1Y) cg."
            case "pe3Y":
                return "Pe (3Y) cg."
            case "pe5Y":
                return "Pe (5Y) cg."
            case "pe9Y":
                return "Pe (9Y) cg."
            case "rule1GrowthRate":
                return "Rule 1 growth rate"
            case "defaultPE":
                return "Default pe"
            case "historicalPE":
                return "Historical pe"
            case "rule1PE":
                return "Rule 1 pe"
            case "currentEps":
                return "Current eps"
            case "futureEPS10Years":
                return "Future eps 10Y"
            case "futurePrice10Years":
                return "Future price 10Y"
            case "stickerPrice15pcGrowth":
                return "Sticker price 15%"
            case "stickerPrice10pcGrowth":
                return "Sticker price 10%"
            case "stickerPrice5pcGrowth":
                return "Sticker price 5%"
            case "belowStickerPrice15pc":
                return "Below sticker price 15%"
            case "belowStickerPrice10pc":
                return "Below sticker price 10%"
            case "belowStickerPrice5pc":
                return "Below sticker price 5%"
            case "ebitLastQuarter":
                return "EBIT (LQ)"
            case "ebit2QuartersAgo":
                return "EBIT (-2Q)"
            case "ebit3QuartersAgo":
                return "EBIT (-3Q)"
            case "ebitLastYear":
                return "EBIT (LY)"
            case "ebit2YearsAgo":
                return "EBIT (-2Y)"
            case "ebit4YearsAgo":
                return "EBIT (-4Y)"
            case "ebitGrowthLastQuarter":
                return "EBIT growth (LQ)"
            case "ebitGrowthLast2Quarters":
                return "EBIT growth (L2Q)"
            case "ebitGrowthLastYear":
                return "EBIT growth (LY)"
            case "ebitGrowthLast4Years":
                return "EBIT growth (L4Y)"
            case "freeCashFlowLastQuarter":
                return "Free cash flow (LQ)"
            case "freeCashFlow2QuartersAgo":
                return "Free cash flow (-2Q)"
            case "freeCashFlow3QuartersAgo":
                return "Free cash flow (-3Q)"
            case "freeCashFlowLastYear":
                return "Free cash flow (LY)"
            case "freeCashFlow4YearsAgo":
                return "Free cash flow (-4Y)"
            case "freeCashFlowGrowthLastQuarter":
                return "Free cash flow growth (LQ)"
            case "freeCashFlowGrowthLast2Quarters":
                return "Free cash flow growth (-2Q)"
            case "freeCashFlowGrowthLast4Years":
                return "Free cash flow growth (-4Y)"
            case "freeCashFlow2YearsAgo":
                return "Free cash flow (-2Y)"
            case "freeCashFlowGrowthLastYear":
                return "Free cash flow growth (LY)"
            case "cash2QuartersAgo":
                return "Cash (-2Q)"
            case "cash3QuartersAgo":
                return "Cash (-3Q)"
            case "cash2YearsAgo":
                return "Cash (-2Y)"
            case "cash4YearsAgo":
                return "Cash (-4Y)"
            case "cashGrowthLast2Quarters":
                return "Cash growth (L2Q)"
            case "inventory2QuartersAgo":
                return "Inventory (-2Q)"
            case "inventory3QuartersAgo":
                return "Inventory (-3Q)"
            case "inventory2YearsAgo":
                return "Inventory (-2Y)"
            case "inventory4YearsAgo":
                return "Inventory (-4Y)"
            case "inventoryGrowthLast2Quarters":
                return "Inventory growth (L2Q)"
            case "totalLiabilities2QuartersAgo":
                return "Total liabilities (-2Q)"
            case "totalLiabilities3QuartersAgo":
                return "Total liabilities (-3Q)"
            case "totalLiabilities2YearsAgo":
                return "Total liabilities (-2Y)"
            case "totalLiabilities3YearsAgo":
                return "Total liabilities (-3Y)"
            case "totalLiabilities4YearsAgo":
                return "Total liabilities (-4Y)"
            case "totalLiabilitiesGrowthLast2Quarters":
                return "Total liabilities growth (L2Q)"
            case "totalShareholdersEquity2QuartersAgo":
                return "Total shareholders equity (-2Q)"
            case "totalShareholdersEquity3QuartersAgo":
                return "Total shareholders equity (-3Q)"
            case "totalShareholdersEquity2YearsAgo":
                return "Total shareholders equity (-2Y)"
            case "totalShareholdersEquity4YearsAgo":
                return "Total shareholders equity (-4Y)"
            case "totalShareholdersEquityGrowthLast2Quarters":
                return "Total shareholders equity growth (L2Q)"
            case "totalLiabilitiesToEquity2QuartersAgo":
                return "Total liabilities to equity (-2Q)"
            case "totalLiabilitiesToEquity3QuartersAgo":
                return "Total liabilities to equity (-3Q)"
            case "totalLiabilitiesToEquity2YearsAgo":
                return "Total liabilities to equity (-2Y)"
            case "totalLiabilitiesToEquity4YearsAgo":
                return "Total liabilities to equity (-4Y)"
            case "totalLiabilitiesToEquityGrowthLast2Quarters":
                return "Total liabilities to equity growth (L2Q)"
            case "stockRepurchased2QuartersAgo":
                return "Stock repurchased (-2Q)"
            case "stockRepurchased3QuartersAgo":
                return "Stock repurchased (-3Q)"
            case "stockRepurchased2YearsAgo":
                return "Stock repurchased (-2Y)"
            case "stockRepurchased4YearsAgo":
                return "Stock repurchased (-4Y)"
            case "stockRepurchasedGrowthLast2Quarters":
                return "Stock repurchased growth (L2Q)"
            case "stock2QuartersAgo":
                return "Stock (-2Q)"
            case "stock3QuartersAgo":
                return "Stock (-3Q)"
            case "stock2YearsAgo":
                return "Stock (-2Y)"
            case "stock4YearsAgo":
                return "Stock (-4Y)"
            case "stockGrowthLast2Quarters":
                return "Stock growth (L2Q)"
            default:
                return field;
        }
    }


    static scaleFactor(value: number): number {
        if (value > 1000000000000 || value < -1000000000000) {
            return 1000000000000;
        }
        if (value > 1000000000 || value < -1000000000) {
            return 1000000000;
        }
        if (value > 1000000 || value < -1000000) {
            return 1000000;
        }
        return 1;
    }

    static scaleFactorLabel(value: number): string {
        if (value > 1000000000000 || value < -1000000000000) {
            return "T";
        }
        if (value > 1000000000 || value < -1000000000) {
            return "B";
        }
        if (value > 1000000 || value < -1000000) {
            return "M";
        }
        return "";
    }

}