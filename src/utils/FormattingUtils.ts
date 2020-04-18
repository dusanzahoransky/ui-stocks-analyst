import {TableColumn} from "../model/TableColumn";

export class FormattingUtils {

    static format(rowValue: any[], value: number | string, columnIndex: TableColumn): string {
        if (typeof value === 'string') {
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
                return "Total cash / share"
            case "totalCashPerSharePercent":
                return "Total cash / share %"
            case "totalDebtEquity":
                return "Total debt / equity"
            case "trailingPE":
                return "Tra pe"
            case "forwardPE":
                return "Fwd pe"
            case "priceToSalesTrailing12Months":
                return "PS tra 12 months"
            case "priceBook":
                return "Price book"
            case "enterpriseValueRevenue":
                return "EV revenue"
            case "enterpriseValueEBITDA":
                return "EV ebitda"
            case "quarterlyRevenueGrowth":
                return "Qua revenue growth"
            case "quarterlyEarningsGrowth":
                return "Qua earnings growth"
            case "priceEarningGrowth":
                return "PEG"
            case "trailingPriceEarningGrowth":
                return "Trailing PEG"
            case "week52Change":
                return "Week 52 change"
            case "week52Low":
                return "Week 52 low"
            case "week52AboveLowPercent":
                return "Week 52 above low %"
            case "week52High":
                return "Week 52 high"
            case "week52BelowHighPercent":
                return "Week 52 below high %"
            case "exDividendDate":
                return "Ex dividend date"
            case "fiveYearAvgDividendYield":
                return "5 year avg dividend yield"
            case "trailingAnnualDividendYield":
                return "Tr annual dividend yield"
            case "periodValuationMeasures":
                return "Period valuation measures"
            default:
                return field;
        }
    }
}