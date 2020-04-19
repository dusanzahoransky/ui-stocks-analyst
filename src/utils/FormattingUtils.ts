import {TableColumn} from "../model/TableColumn";
import moment from "moment";

export class FormattingUtils {

    static format(rowValue: any[], value: number | string, columnIndex: TableColumn): string {
        if(!value){
            return ''
        }
        if (typeof value === 'string') {
            if(columnIndex === TableColumn.exDividendDate){
                let diff = moment().diff( value, 'days');
                return diff < 0 ? `in ${-diff} days` : value;
            }
            return value
        }
        if(!value || isNaN(value)){
            return value ? value.toFixed(1) : '';
        }
        if (value > 1000000000000) {
            const bil = value / 1000000000000;
            return `${bil.toFixed(1)}T`;
        }
        if (value > 1000000000) {
            const bil = value / 1000000000;
            return `${bil.toFixed(1)}B`;
        }
        if (value > 1000000) {
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
                return "Date"
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
            case "yoyQuarterlyRevenueGrowthPercent":
                return "(YOY) Q. revenue growth"
            case "earningsGrowthPercent":
                return "Earnings Growth %?"
            case "quarterlyRevenueGrowth":
                return "Q. revenue growth"
            case "yoyQuarterlyEarningsGrowthPercent":
                return "(YOY) Q. earnings growth"
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
            default:
                return field;
        }
    }
}