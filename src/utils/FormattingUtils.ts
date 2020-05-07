import {StockTableColumn} from "../model/StockTableColumn";
import moment from "moment";
import {IndexTableColumn} from "../model/IndexTableColumn";

export class FormattingUtils {

    static formatStock(rowValue: any[], value: number | string, columnIndex: StockTableColumn): string {
        if (typeof value === 'string' && columnIndex === StockTableColumn.exDividendDate) {
            let diff = moment().diff(value, 'days');
            return diff < 0 ? `in ${-diff} days` : value;
        }
        return this.format(rowValue, value)
    }

    static formatIndex(rowValue: any[], value: number | string, columnIndex: IndexTableColumn): string {
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
                return "Refresh date"
            case "lastReportedQuarter":
                return "Last Quarter"
            case "symbol":
                return "Symbol"
            case "exchange":
                return "Exchange"
            case "companyName":
                return "Company name"
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
                return "Price book"
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
                return "5y avg div yield"
            case "trailingAnnualDividendYield":
                return "(Trl) A. div yield"
            case "targetLowPrice":
                return "Target Low Price"
            case "belowTargetLowPricePercent":
                return "Below target low price %"
            case "belowTargetMedianPricePercent":
                return "Below target median price %"
            case "heldByInsiders":
                return "Held by insiders %"
            case "heldByInstitutions":
                return "Held by institutions %"
            case "shortToFloat":
                return "Short to Float %"
            case "sharesShortPrevMonthCompare":
                return "Short comp to prev month %"
            case "netIncomeLastQuarter":
                return "Net income (LQ)"
            case "netIncome2QuartersAgo":
                return "Net income (-2Q)"
            case "netIncomeGrowthLastQuarter":
                return "Net income growth (LQ)"
            case "netIncomeLastYear":
                return "Net income (LY)"
            case "netIncome2YearAgo":
                return "Net income (-2Y)"
            case "netIncome3YearAgo":
                return "Net income (-3Y)"
            case "netIncomeGrowthLastYear":
                return "Net income growth (LY)"
            case "netIncomeGrowthLast3Years":
                return "Net income growth (L3Y)"
            case "revenueLastQuarter":
                return "Revenue (LQ)"
            case "revenueGrowthLastQuarter":
                return "Revenue growth (LQ)"
            case "revenueLastYear":
                return "Revenue (LY)"
            case "revenueGrowthLastYear":
                return "Revenue growth (LY)"
            case "revenueGrowthLast3Years":
                return "Revenue growth (L3Y)"
            case "cashLastQuarter":
                return "Cash (LQ)"
            case "cashGrowthLastQuarter":
                return "Cash growth (LQ)"
            case "cashLastYear":
                return "Cash (LY)"
            case "cashGrowthLastYear":
                return "Cash growth (LY)"
            case "cashGrowthLast3Years":
                return "Cash growth (L3Y)"
            case "inventoryLastQuarter":
                return "Inventory (LQ)"
            case "inventoryGrowthLastQuarter":
                return "Inventory growth (LQ)"
            case "inventoryLastYear":
                return "Inventory (LY)"
            case "inventoryGrowthLastYear":
                return "Inventory growth (LY)"
            case "inventoryGrowthLast3Years":
                return "Inventory growth (L3Y)"
            case "currentLiabilitiesLastQuarter":
                return "Current liabilities (LQ)"
            case "currentLiabilitiesGrowthLastQuarter":
                return "Current liabilities growth (LQ)"
            case "currentLiabilitiesLastYear":
                return "Current liabilities (LY)"
            case "currentLiabilitiesGrowthLastYear":
                return "Current liabilities growth (LY)"
            case "currentLiabilitiesGrowthLast3Years":
                return "Current liabilities growth (L3Y)"
            case "totalLiabilitiesLastQuarter":
                return "Total liabilities (LQ)"
            case "totalLiabilitiesGrowthLastQuarter":
                return "Total liabilities growth (LQ)"
            case "totalLiabilitiesLastYear":
                return "Total liabilities (LY)"
            case "totalLiabilitiesGrowthLastYear":
                return "Total liabilities growth (LY)"
            case "totalLiabilitiesGrowthLast3Years":
                return "Total liabilities growth (L3Y)"
            case "totalShareholdersEquityLastQuarter":
                return "Total shrd equity (LQ)"
            case "totalShareholdersEquityGrowthLastQuarter":
                return "Total shrd equity growth (LQ)"
            case "totalShareholdersEquityLastYear":
                return "Total shrd equity (LY)"
            case "totalShareholdersEquityGrowthLastYear":
                return "Total shrd equity growth (LY)"
            case "totalShareholdersEquityGrowthLast3Years":
                return "Total shrd equity growth (L3Y)"
            case "currentLiabilitiesToEquityLastQuarter":
                return "Current liabilities to equity (LQ)"
            case "currentLiabilitiesToEquityLastYear":
                return "Current liabilities to equity (LY)"
            case "currentLiabilitiesToEquityGrowthLastQuarter":
                return "Current liabilities to equity growth (LQ)"
            case "currentLiabilitiesToEquityGrowthLastYear":
                return "Current liabilities to equity growth (LY)"
            case "currentLiabilitiesToEquityGrowthLast3Years":
                return "Current liabilities to equity growth (L3Y)"
            case "totalLiabilitiesToEquityLastQuarter":
                return "Total liabilities to equity (LQ)"
            case "totalLiabilitiesToEquityLastYear":
                return "Total liabilities to equity (LY)"
            case "totalLiabilitiesToEquityGrowthLastQuarter":
                return "Total liabilities to equity growth (LQ)"
            case "totalLiabilitiesToEquityGrowthLastYear":
                return "Total liabilities to equity growth (LY)"
            case "totalLiabilitiesToEquityGrowthLast3Years":
                return "Total liabilities to equity growth (L3Y)"
            case "stockRepurchasedLastQuarter":
                return "Stock repurchase (LQ)"
            case "stockRepurchasedGrowthLastQuarter":
                return "Stock repurchase growth (LQ)"
            case "stockRepurchasedLastYear":
                return "Stock repurchase (LY)"
            case "stockRepurchasedGrowthLastYear":
                return "Stock repurchase growth (LY)"
            case "stockRepurchasedGrowthLast3Years":
                return "Stock repurchase growth (L3Y)"
            case "stockLastQuarter":
                return "Stock (LQ)"
            case "stockGrowthLastQuarter":
                return "Stock growth (LQ)"
            case "stockLastYear":
                return "Stock (LY)"
            case "stockGrowthLastYear":
                return "Stock growth (LY)"
            case "stockGrowthLast3Years":
                return "Stock growth (L3Y)"
            case "epsCurrentQuarterEstimate" :
                return "EPS current Q estimate"
            case "epsLastQuarter" :
                return "EPS (LQ)"
            case "eps2QuartersAgo" :
                return "EPS (L2Q)"
            case "eps3QuartersAgo" :
                return "EPS (L3Q)"
            case "eps4QuartersAgo" :
                return "EPS (L4Q)"
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
                return "EPS (L2Y)"
            case "eps3YearsAgo":
                return "EPS (L3Y)"
            case "eps4YearsAgo":
                return "EPS (L4Y)"
            case "epsGrowthLastYear":
                return "Eps growth (LY)"
            case "epsGrowthLast2Years":
                return "Eps growth (L2Y)"
            case "epsGrowthLast3Years":
                return "Eps growth (L3Y)"
            case "netIncome3QuartersAgo":
                return "Net income (L3Q)"
            case "netIncome3YearsAgo":
                return "Net income (L3Y)"
            case "peLastQuarter":
                return "P/E (LQ)"
            case "pe2QuartersAgo":
                return "P/E (L2Q)"
            case "pe3QuartersAgo":
                return "P/E (L3Q)"
            case "pe4QuartersAgo":
                return "P/E (L4Q)"
            case "peGrowthLastQuarter":
                return "P/E growth (LQ)"
            case "peGrowthLast2Quarters":
                return "P/E growth (L2Q)"
            case "peGrowthLast3Quarters":
                return "P/E growth (L3Q)"
            case "netIncomeGrowthLast2Quarters":
                return "Net income growth (L2Q)"
            case "revenue2QuartersAgo":
                return "Revenue (L2Q)"
            case "revenue3QuartersAgo":
                return "Revenue (L3Q)"
            case "revenueGrowthLast2Quarters":
                return "Revenue growth (L2Q)"
            //index cols
            case "totalAssets":
                return "Total assets"
            case "yield":
                return "Yield"

            case "ytdReturn":
                return "Ytd return"
            case "threeYearAverageReturn":
                return "3Y avg return"
            case "fiveYearAverageReturn":
                return "5Y avg return"

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
                return "Avg daily volume 3M"
            case "averageDailyVolume10Day":
                return "Avg daily volume 10D"

            case "fundInceptionDate":
                return "Inception date"
            default:
                return field;
        }
    }
}