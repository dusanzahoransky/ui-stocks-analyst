import {StockFlattenFields} from "../model/StockFlattenFields";
import moment from "moment";
import {EtfFields} from "../model/EtfFields";
import {CellData} from "../model/table/CellData";
import {CellTag} from "../model/table/CellTag";

export class FormattingUtils {

    static toWatchlistLabel(watchlist: string) {
        return watchlist
            .replace(/[a-zA-Z]+/g, function (g) {
                switch (g) {
                    case 'EU':
                    case 'US':
                    case 'AU':
                    case 'GB':
                    case 'CHF':
                    case 'ETF':
                        return g
                    default:
                        return g[0].toUpperCase().concat(g.substr(1).toLowerCase())
                }

            })
            .replace(/_/g, ' ')
    }

    static formatStock(data: CellData, column: StockFlattenFields): string {
        if (typeof data === 'string' && column === StockFlattenFields.exDividendDate) {
            let diff = moment().diff(data, 'days');
            return diff < 0 ? `in ${-diff} days` : data;
        }
        const formattedValue = this.format(data.value);
        if(formattedValue && this.isPercentage(data.tags, column, false)){
            return formattedValue.concat('%')
        }
        return formattedValue
    }

    static formatEtf(data: CellData, column: EtfFields): string {
        return this.format(data.value)
    }

    static format(value: number | string): string {
        if (!value) {
            return ''
        }
        if (typeof value === 'object') {
            return JSON.stringify(value).substring(0, 10)
        }
        if (typeof value === 'string') {
            return value
        }
        return this.formatNumber(value, 1000000);
    }

    static formatNumber(value: number, minThresholdToFormat: number = 1000): string{
        if (!value || isNaN(value)) {
            return value ? value.toFixed(1) : '';
        }
        const absValue = Math.abs(value);
        if (absValue > 1000000000000 && absValue > minThresholdToFormat) {
            const bil = value / 1000000000000;
            return `${bil.toFixed(1)}T`;
        }
        if (absValue > 1000000000 && absValue > minThresholdToFormat) {
            const bil = value / 1000000000;
            return `${bil.toFixed(1)}B`;
        }
        if (absValue > 1000000 && absValue > minThresholdToFormat) {
            const mil = value / 1000000;
            return `${mil.toFixed(1)}M`;
        }
        if (absValue > 1000 && absValue > minThresholdToFormat) {
            const thousand = value / 1000;
            return `${thousand.toFixed(1)}K`;
        }
        return value.toLocaleString(undefined, {maximumFractionDigits: 1});
    }

    static toFieldLabel(field: string) {
        let fieldLabel = field.replace(/[A-Z0-9]+/g, g  => ' '.concat(g));

        fieldLabel = fieldLabel[0].toUpperCase() + fieldLabel.substr(1)

        fieldLabel = fieldLabel.replace(/ P$/, ' %')
        fieldLabel = fieldLabel.replace('Enterprise Value EBITDA', 'EV / EBITDA')
        fieldLabel = fieldLabel.replace('Trailing 12Months', 'ttm')
        fieldLabel = fieldLabel.replace('Trailing PE', 'PE ttm')
        fieldLabel = fieldLabel.replace('Forward PE', 'PE fwd')
        fieldLabel = fieldLabel.replace('Profit Margin', 'Net margin')
        fieldLabel = fieldLabel.replace('Book Value Per Share', 'BPS')
        fieldLabel = fieldLabel.replace('Free Cash Flow Per Share', 'FCFPS')
        fieldLabel = fieldLabel.replace('Roic 1Y', 'ROIC 1Y')
        fieldLabel = fieldLabel.replace('Roic 3Y', 'ROIC 3Y')
        fieldLabel = fieldLabel.replace('Average Daily Volume', 'Volume')
        fieldLabel = fieldLabel.replace('One Month', '1M')
        fieldLabel = fieldLabel.replace('Three Month', '3M')
        fieldLabel = fieldLabel.replace('One Year', '1Y')
        fieldLabel = fieldLabel.replace('Three Year', '3Y')
        fieldLabel = fieldLabel.replace('Five Year', '5Y')
        fieldLabel = fieldLabel.replace('Ten Year', '10Y')
        fieldLabel = fieldLabel.replace('Held By', '')
        fieldLabel = fieldLabel.replace('Total', '')
        fieldLabel = fieldLabel.replace('Last Reported Quarter', 'Last Q')
        fieldLabel = fieldLabel.replace('Last Updated', 'at')
        fieldLabel = fieldLabel.replace('Cash Per Share', 'Cash/Share')
        fieldLabel = fieldLabel.replace('Five', '5')
        fieldLabel = fieldLabel.replace('Forward', 'Fwd')
        fieldLabel = fieldLabel.replace('Debt Equity', 'Debt/Eq')
        fieldLabel = fieldLabel.replace('Percent', '%')
        fieldLabel = fieldLabel.replace('Enterprise Value', 'EV')
        fieldLabel = fieldLabel.replace('Last Year', '1Y')
        fieldLabel = fieldLabel.replace('Last 4Years', '4Y')
        fieldLabel = fieldLabel.replace('Last Quarter', '1Q')
        fieldLabel = fieldLabel.replace('Last 2Quarters', '2Q')
        fieldLabel = fieldLabel.replace('Last 4Quarters', '4Q')
        fieldLabel = fieldLabel.replace('2Years Ago', '2Y')
        fieldLabel = fieldLabel.replace('4Years Ago', '4Y')
        fieldLabel = fieldLabel.replace('Years', 'Y')
        fieldLabel = fieldLabel.replace('Year', 'Y')
        fieldLabel = fieldLabel.replace('2Quarters Ago', '2Q')
        fieldLabel = fieldLabel.replace('3Quarters Ago', '3Q')
        fieldLabel = fieldLabel.replace('Quarters', 'Q')
        fieldLabel = fieldLabel.replace('Quarter', 'Q')
        fieldLabel = fieldLabel.replace('Week 52', '52 ')
        fieldLabel = fieldLabel.replace('Week52', '52')
        fieldLabel = fieldLabel.replace('Fifty Two', '52')
        fieldLabel = fieldLabel.replace('Growth', 'Growth')
        fieldLabel = fieldLabel.replace('Shares Short Prev Month Compare', 'Short to prev month')
        fieldLabel = fieldLabel.replace('Shareholders Equity', 'Share eq')
        fieldLabel = fieldLabel.replace('Liabilities', 'Liab')
        fieldLabel = fieldLabel.replace('Equity', 'eq')
        fieldLabel = fieldLabel.replace('Repurchased', 'rep')
        fieldLabel = fieldLabel.replace('Eps', 'EPS')
        fieldLabel = fieldLabel.replace('Pe', 'PE')
        fieldLabel = fieldLabel.replace('Bps', 'BPS')
        fieldLabel = fieldLabel.replace('15pc', '15%')
        fieldLabel = fieldLabel.replace('5pc', '5%')
        fieldLabel = fieldLabel.replace('Rule 1', 'Rule_1 ')
        fieldLabel = fieldLabel.replace('Inventory', 'Inv')
        fieldLabel = fieldLabel.replace('Ebit', 'EBIT')
        fieldLabel = fieldLabel.replace('Price Book', 'PB')
        fieldLabel = fieldLabel.replace('Price To Book', 'PB')
        fieldLabel = fieldLabel.replace('Price To Earnings', 'PE')
        fieldLabel = fieldLabel.replace('Price To Sales', 'PS')
        fieldLabel = fieldLabel.replace('Current Price To Free Cash Flow', 'PCF LQ')
        fieldLabel = fieldLabel.replace('Price To Free Cash Flow', 'PFCF')
        fieldLabel = fieldLabel.replace('Price To Cashflow', 'PCF')
        fieldLabel = fieldLabel.replace('Free Cash Flow', 'FCF')
        fieldLabel = fieldLabel.replace('Price To Sales T. 12Months', 'PS')
        fieldLabel = fieldLabel.replace('Sticker Price', 'Intristic value')
        fieldLabel = fieldLabel.replace('Price Earning Growth', 'PEG')
        fieldLabel = fieldLabel.replace('Avg Dividend Yield', 'Avg Dividend')
        fieldLabel = fieldLabel.replace('Dividend Date', 'Dividend')
        fieldLabel = fieldLabel.replace('Operating Cash Flow', 'OCF')
        fieldLabel = fieldLabel.replace('Cash Flow', 'CF')
        fieldLabel = fieldLabel.replace('Interest Expense To Operative Income P', 'Interest To Op Income')

        return fieldLabel;
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
        if(value > 1000 || value < -1000) {
            return 1000;
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
        if (value > 1000 || value < -1000) {
            return "K";
        }
        return "";
    }

    static isPercentage(tags: CellTag[], column: StockFlattenFields, isEtf: boolean) {
        if(isEtf){
            return false
        }
        const isGrowth = this.isGrowth(tags);
        let isPercentage = false
        switch (column){
            case StockFlattenFields.grossMargin1:
            case StockFlattenFields.grossMargin2:
            case StockFlattenFields.grossMargin3:
            case StockFlattenFields.profitMarginP1:
            case StockFlattenFields.profitMarginP2:
            case StockFlattenFields.profitMarginP3:
            case StockFlattenFields.profitMarginPQ1:
            case StockFlattenFields.profitMarginPQ2:
            case StockFlattenFields.operatingMargin1:
            case StockFlattenFields.operatingMargin2:
            case StockFlattenFields.operatingMargin3:
            case StockFlattenFields.totalCashPerShareP:
            case StockFlattenFields.belowTargetMedianPriceP:
            case StockFlattenFields.heldByInsidersP:
            case StockFlattenFields.heldByInstitutionsP:
            case StockFlattenFields.shortToFloatP:
            case StockFlattenFields.sharesShortPrevMonthCompareP:
            case StockFlattenFields.payoutRatioP:
            case StockFlattenFields.belowStickerPrice15P:
            case StockFlattenFields.belowStickerPrice5P:
            case StockFlattenFields.interestExpenseToOperativeIncomeP1:
            case StockFlattenFields.interestExpenseToOperativeIncomeP2:
            case StockFlattenFields.interestExpenseToOperativeIncomeP3:
            case StockFlattenFields.interestExpenseToOperativeIncomePQ1:
            case StockFlattenFields.interestExpenseToOperativeIncomePQ2:
                isPercentage = true
        }
        return isGrowth || isPercentage
    }

    static isGrowth(tags: CellTag[]) {
        return tags && (tags.includes(CellTag.ratiosGrowth) || tags.includes(CellTag.financialsGrowth));
    }
}