import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {Stock} from "../model/Stock";
import HttpClient from "./HttpClient";

export interface IntrinsicValueResult {
    intrinsicValue: number,
    futureValue: number,
    discountValue: number,
    cashTakenOut: number
}

export interface IntrinsicValueDiscountedFCFResult {
    intrinsicValue: number,
    finalFutureValue: number,
    finalDiscountValue: number
}

export class StockAnalystService {

    async loadAnalysis(watchlist: string, refreshDynamicData: boolean, refreshFinancials: boolean, mockData: boolean): Promise<Stock[]> {
        return HttpClient.fetch(`http://localhost:3000/stock/watchlist/${watchlist}?refreshDynamicData=${refreshDynamicData}&refreshFinancials=${refreshFinancials}&mockData=${mockData}`);
    }

    async loadEtfsAnalysis(watchlist: string, refreshDynamicData: boolean, mockData: boolean): Promise<EtfsAnalysisResult> {
        return HttpClient.fetch(`http://localhost:3000/stock/etfWatchlist/${watchlist}?refreshDynamicData=${refreshDynamicData}&mockData=${mockData}`);
    }


    public static calcFutureYield(currentYield: number, growthEstimate: number, years: number): number | undefined {
        if (!currentYield) {
            return undefined
        }
        const pv = 100 / currentYield
        const growthEstimateP = growthEstimate / 100
        return this.futureValue(pv, growthEstimateP, years);
    }

    public static calcIntrinsicValue(dividendsValue: number, pv: number, growthEstimate: number, discountRate: number, years: number): IntrinsicValueResult {
        growthEstimate = growthEstimate / 100
        discountRate = discountRate / 100
        const futureValue = this.futureValue(pv, growthEstimate, years)
        const discountValue = this.futureValue(1, discountRate, years)
        const cashTakenOut =  dividendsValue * (1 - ( 1 / this.futureValue(1, discountRate, years))) / discountRate
        const intrinsicValue = cashTakenOut + futureValue / discountValue
        return {intrinsicValue, futureValue, discountValue, cashTakenOut}
    }

    public static calcIntrinsicValueDiscountedCashFlow(pv: number, growthEstimate: number, discountRate: number, years: number): IntrinsicValueDiscountedFCFResult {
        growthEstimate = growthEstimate / 100
        discountRate = discountRate / 100

        let intrinsicValue = 0
        let futureValue = 0
        let discountValue = 0
        for(let i=0; i<years; i++) {
            futureValue = this.futureValue(pv, growthEstimate, i)
            discountValue = this.futureValue(1, discountRate, i)
            const discountedCashFlow = futureValue / discountValue
            intrinsicValue += discountedCashFlow
        }

        return {intrinsicValue, finalFutureValue: futureValue, finalDiscountValue: discountValue}
    }

    static futureValue(presentValue: number, growth: number, years: number) {
        return presentValue * Math.pow(1 + growth, years);
    }

    static ratioScore(number?: number, maxThreshold: number = 50) {
        return this.ratioBetterThan(number, 0, maxThreshold)
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


    static absLessThan(value: number, absValueThreshold: number) {
        if (value > absValueThreshold) {
            return absValueThreshold
        } else if (value < -absValueThreshold) {
            return -absValueThreshold
        } else {
            return value
        }
    }
}