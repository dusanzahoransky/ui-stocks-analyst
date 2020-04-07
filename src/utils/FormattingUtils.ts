export class FormattingUtils {

    static format(value: any): string {
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
        return value ? value.toString() : '';
    }

    static statLabel(fieldName: string): string {
        switch (fieldName) {
            case 'period' :
                return 'Date';
            case 'marketCap' :
                return 'Market Cap';
            case 'enterpriseValue' :
                return 'Enterprise Value';
            case 'trailingPE' :
                return 'Trailing P/E';
            case 'forwardPE' :
                return 'Forward P/E';
            case 'priceEarningGrowth' :
                return 'PEG Ratio';
            case 'priceSales' :
                return 'Price/Sales';
            case 'priceBook' :
                return 'Price/Book';
            case 'enterpriseValueRevenue' :
                return 'Enterprise Value/Revenue';
            case 'enterpriseValueEBITDA' :
                return 'Enterprise Value/EBITDA';
            default:
                return fieldName;
        }
    }
}