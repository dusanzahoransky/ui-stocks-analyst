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
        let fieldLabel = field
            .replace(/[A-Z0-9]+/g, g  => ' '.concat(g));

        fieldLabel = fieldLabel[0].toUpperCase() + fieldLabel.substr(1)

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
        fieldLabel = fieldLabel.replace('Cash Per Share', 'Cash/Share')
        fieldLabel = fieldLabel.replace('Trailing', 'T.')
        fieldLabel = fieldLabel.replace('Five', '5')
        fieldLabel = fieldLabel.replace('Forward', 'Fwd')
        fieldLabel = fieldLabel.replace('Debt Equity', 'Debth/Eq')
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
        fieldLabel = fieldLabel.replace('Price To Cashflow', 'PS')
        fieldLabel = fieldLabel.replace('Price To Sales T. 12Months', 'PS')
        fieldLabel = fieldLabel.replace('Sticker Price', 'S.Price')
        fieldLabel = fieldLabel.replace('Price Earning Growth', 'PEG')
        fieldLabel = fieldLabel.replace('Avg Dividend Yield', 'Avg Dividend')
        fieldLabel = fieldLabel.replace('Dividend Date', 'Dividend')

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