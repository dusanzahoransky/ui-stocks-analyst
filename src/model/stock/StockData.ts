import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {FormattingUtils} from "../../utils/FormattingUtils";
import {StockFields} from "./StockFields";
import moment from "moment";
import {TimelineEntries} from "./TimelineEntries";
import {Cell} from "../table/Cell";
import {StockAnalystService} from "../../services/StockAnalystService";

export abstract class StockData {

    public static readonly CLASS_ADDITIONAL_INFO = 'additionalInfo';

    abstract headerData(stock: Stock): StockFields | undefined

    abstract labels(): string[]

    abstract fromStock(stock: Stock, stockAverages?: Stock): StockFields


    static buildClasses(ratiosFields: StockFields) {
        const fields = Object.values(ratiosFields) as FundamentalsCell[];

        for (const field of fields) {
            if (field.score < -10) {
                field.isPercentage ? field.classes.push('redText') : field.classes.push('red')
            } else if (field.score < 0) {
                field.isPercentage ? field.classes.push('lightRedText') : field.classes.push('lightRed')
            } else if (field.score > 10) {
                field.isPercentage ? field.classes.push('greenText') : field.classes.push('green')
            } else if (field.score > 0) {
                field.isPercentage ? field.classes.push('lightGreenText') : field.classes.push('lightGreen')
            }
        }
    }

    static squareRoot(number: number): number {
        return number * number
    }

    static toCell(value?: number, isPercentage: boolean = false, isGrowth: boolean = false, title: string = ''): FundamentalsCell {
        const classes = isGrowth ? ['growth'] : [];
        return {value, score: 0, isPercentage, isGrowth, title, classes}
    }

    static toGenericCell(value?: any, isPercentage: boolean = false, isGrowth: boolean = false, title: string = ''): Cell<any> {
        const classes = isGrowth ? ['growth'] : [];
        return {value, score: 0, isPercentage, isGrowth, title, classes}
    }

    static toTitle(value: TimelineEntries | string | number, isPercentage: boolean = false): string {
        if (!value) {
            return ''
        }
        if(typeof value === 'string' || typeof value === 'number'){
            return FormattingUtils.formatValue(value, isPercentage)
        } else {
            return Object.keys(value)
                .map(key => `${key}: ${FormattingUtils.formatValue(value[key], isPercentage)}`)
                .join('\r\n')
        }
    }

    static toRatioTitle(numerator: any, denominator: any, result: any): string {
        return Object.keys(numerator)
            .map(key => {
                const numeratorValue = numerator ? FormattingUtils.formatValue(numerator[key]) : null
                const denominatorValue = denominator ? FormattingUtils.formatValue(denominator[key]) : null
                const resultValue = result ? FormattingUtils.formatValue(result[key]) : null
                return `${key}: ${numeratorValue} / ${denominatorValue} = ${resultValue}`
            })
            .join('\r\n')
    }

    static toRatioTitleMinusNumerator(numerator: any, minusNumerator: any, denominator: any, result: any): string {
        return Object.keys(numerator)
            .map(key => {
                const numeratorValue = numerator ? FormattingUtils.formatValue(numerator[key]) : null
                const minusNumeratorValue = minusNumerator ? FormattingUtils.formatValue(minusNumerator[key]) : null
                const denominatorValue = denominator ? FormattingUtils.formatValue(denominator[key]) : denominator
                const resultValue = result ? FormattingUtils.formatValue(result[key]) : null
                return `${key}: ${numeratorValue} - ${minusNumeratorValue} / ${denominatorValue} = ${resultValue}`
            })
            .join('\r\n')
    }

    static last(timelineField: any | undefined, indexBeforeLast: number = 0, defaultValue = undefined): number | undefined {
        if (!timelineField) {
            return defaultValue
        }
        const values: number[] = Object.values(timelineField)
        const number = values[values.length - (indexBeforeLast + 1)];
        if (!number) {
            return defaultValue
        }
        return number
    }

    static lastDefined(timelineField: any | undefined, indexBeforeLast: number = 0, defaultValue = undefined): number | undefined {
        if (!timelineField) {
            return defaultValue
        }
        const values: number[] = Object.values(timelineField)
        let number
        do {
            number = values[values.length - (indexBeforeLast + 1)];
            indexBeforeLast++
        } while (!number && indexBeforeLast < values.length)

        if (!number) {
            return defaultValue
        }
        return number
    }

    static signOf(timelineField: any | undefined, indexBeforeLast: number = 0): number {
        const value = this.last(timelineField, indexBeforeLast);
        if (value < 0) {
            return -1
        }
        return 1
    }

    static lastYears(timelineField: any | undefined, lastReportedYear: string, yearsBeforeLast: number = 0): number | undefined {
        if (!timelineField) {
            return undefined
        }
        const reversedKeys = Object.keys(timelineField).reverse()
        //FIXME use lastReportedYear
        const yearToGet = moment().add(-yearsBeforeLast, 'year').format('YYYY')

        const keyToGet = reversedKeys.filter(date => date.startsWith(yearToGet))[0];
        return keyToGet ? timelineField[keyToGet] : undefined
    }

    static avg(timelineField: any | undefined, nLatestValues: number = 5): number {
        if (!timelineField) {
            return undefined
        }
        const values: number[] = Object.values(timelineField)
        const latestValues = values.reverse().slice(0, nLatestValues);

        let sum = 0
        let count = nLatestValues
        for (const value of latestValues) {
            sum += value
            if (!value || value === 0) {
                count--
            }
        }
        return sum / count
    }

    static lastEntry(timelineField: any | undefined, indexBeforeLast: number = 0): TimelineEntries {
        if (!timelineField) {
            return undefined
        }
        const keys: string[] = Object.keys(timelineField)
        const lastKey = keys[keys.length - (indexBeforeLast + 1)]
        return {[lastKey]: timelineField[lastKey]}
    }

    static percentBelow(value1: number, value2: number) {
        return (value2 - value1) / value1 * 100
    }

    static calcTotalScore(ratiosFields: StockFields) {
        const score = Object.values(ratiosFields)
            .map(f => f.score)
            .reduce((prev, curr) => prev + curr)
        ratiosFields.score.value = score
        ratiosFields.score.classes.push(score > 0 ? 'greenText' : 'redText')
    }

    static removeInfinity(ratiosFields: StockFields) {
        Object.values(ratiosFields).filter(f => !f.value).forEach(f => f.score = 0)
    }

    static weightedAverage(value1: number, value2: number, value3: number, value4: number): number {
        let count = 0
        let sum = 0
        if (value1) {
            sum += value1 * 0.5
            count += 0.5
        }
        if (value2) {
            sum += value2 * 1
            count += 1
        }
        if (value3) {
            sum += value3 * 1.5
            count += 1.5
        }
        if (value4) {
            sum += value4 * 2
            count += 2
        }
        return sum / count
    }

    static capScoreValues(ratiosFields: StockFields, maxValue = 100, warningThreshold = 1000) {
        const values = Object.values(ratiosFields);
        for (const value of values) {
            if (value.score > warningThreshold || value.score < -warningThreshold) {
                value.classes.push(this.CLASS_ADDITIONAL_INFO)
            }
            if (value.score > maxValue || value.score < -maxValue) {
                value.score = StockAnalystService.absLessThan(value.score, maxValue)
            }
        }
    }
}