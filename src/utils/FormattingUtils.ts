import {TableColumn} from "../model/TableColumn";

export class FormattingUtils {

    static format(rowValue: any[], value: any, columnIndex: TableColumn): string {
        if(columnIndex === TableColumn.companyName){
            const companyName = value as string;
            return companyName ? companyName.substr(0, companyName.indexOf('(')): '';
        }
        if (value && !isNaN(value)) {
            const num = value as number;
            if (num > 1000000000) {
                const bil = num / 1000000000;
                return `${bil.toFixed(0)}B`;
            }
            if (num > 1000000) {
                const mil = num / 1000000;
                return `${mil.toFixed(0)}M`;
            }
            return num.toLocaleString(undefined, {maximumFractionDigits: 2});
        }
        return value ? value : '';
    }

    static statLabel(fieldName: string): string {
        switch (fieldName) {
            case 'companyName' :
                return 'Company Name';
            case 'price' :
                return 'Price';
            case 'change' :
                return 'Change';
            case 'period' :
                return 'Date';
            case 'marketCap' :
                return 'Market Cap';
            case 'enterpriseValue' :
                return 'Enterprise Value';
            case 'trailingPE' :
                return 'Trailing Price/Earnings';
            case 'forwardPE' :
                return 'Forward Price/Earnings';
            case 'priceEarningGrowth' :
                return 'Price/Earnings to Growth Ratio';
            case 'priceSales' :
                return 'Price/Sales';
            case 'priceBook' :
                return 'Price/Book';
            case 'enterpriseValueRevenue' :
                return 'Enterprise Value/Revenue';
            case 'enterpriseValueEBITDA' :
                return 'Enterprise Value/EBITDA';
            case 'totalCashPerShare':
                return 'Total Cash Per Share';
            case 'totalDebtEquity':
                return 'Total Debt/Equity';
            case 'quarterlyRevenueGrowth':
                return 'Quarterly Revenue Growth';
            case 'quarterlyEarningsGrowth':
                return 'Quarterly Earnings Growth';
            case 'dilutedEarningPerShare':
                return 'Diluted Earning Per Share';
            case 'week52Change925436893203884':
                return '52 Week Change';
            case 'week52Low':
                return '% Above 52 Low';
            case 'week52High':
                return '% Below 52 High';
            default:
                return fieldName;
        }
    }
}