import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {FormattingUtils} from "../../utils/FormattingUtils";
import {StockFields} from "./StockFields";
import moment from "moment";

export abstract class StockData {

    public static readonly CLASS_ADDITIONAL_INFO = 'additionalInfo';

    abstract headerData(): FundamentalsCell[]

    abstract labels(): string[]

    abstract fromStock(stock: Stock): StockFields

    static absLessThan(value: number, absValueThreshold: number) {
        if (value > absValueThreshold) {
            return absValueThreshold
        } else if (value < -absValueThreshold) {
            return -absValueThreshold
        } else {
            return value
        }
    }

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

    static ratioBetterThan(number: number, positiveLimit: number, maxThreshold: number = 50, capAt: number = 1000) {
        let score: number
        if (number > 0) {

            if (number <= positiveLimit + maxThreshold) {
                score = positiveLimit - number
            } else {
                score = -maxThreshold * 2
            }

        } else {
            score = -maxThreshold * 3 + ((1 / number) * 100)
        }
        return this.absLessThan(score, capAt)
    }

    static squareRoot(number: number): number{
        return number * number
    }

    static toCell(value?: number, isPercentage: boolean = false, isGrowth: boolean = false, title: string = ''): FundamentalsCell {
        const classes = isGrowth ? ['growth'] : [];
        return {value, score: 0, isPercentage, isGrowth, title, classes}
    }

    static toTitle(timelineField: any, isPercentage: boolean = false): string {
        if(!timelineField){
            return ''
        }
        return Object.keys(timelineField)
            .map(key => `${key}: ${FormattingUtils.formatValue(timelineField[key], isPercentage)}`)
            .join('\r\n')
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

    static last(timelineField: any | undefined, indexBeforeLast: number = 0): number | undefined {
        if (!timelineField) {
            return undefined
        }
        const values: number[] = Object.values(timelineField)
        return values[values.length - (indexBeforeLast + 1)]
    }

    static signOf(timelineField: any | undefined, indexBeforeLast: number = 0): number {
        const value = this.last(timelineField, indexBeforeLast);
        if(value < 0){
            return -1
        }
        return 1
    }

    static lastYears(timelineField: any | undefined, yearsBeforeLast: number = 0): number | undefined {
        if (!timelineField) {
            return undefined
        }
        const reversedKeys = Object.keys(timelineField).reverse()
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
        for(const value of latestValues){
            sum += value
            if(!value || value === 0){
                count--
            }
        }
        return sum / count
    }

    static lastEntry(timelineField: any | undefined, indexBeforeLast: number = 0): { [date: string]: any } {
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
        const score = Object.values(ratiosFields).map(f => f.score).reduce((prev, curr) => prev + curr)
        ratiosFields.score.value = score
        ratiosFields.score.classes.push(score > 0 ? 'greenText' : 'redText')
    }

    static removeInfinity(ratiosFields: StockFields) {
        Object.values(ratiosFields).filter(f => !f.value).forEach(f => f.score = 0)
    }

    static capScoreValues(ratiosFields: StockFields, maxValue = 100, warningThreshold = 1000) {
        const values = Object.values(ratiosFields);
        for (const value of values) {
            if (value.score > 1000 || value.score < -1000) {
                value.classes.push(this.CLASS_ADDITIONAL_INFO)
            }
            if (value.score > 100 || value.score < -100) {
                value.score = this.absLessThan(value.score, 100)
            }
        }
    }
}