import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {StockFields} from "./StockFields";
import {StockData} from "./StockData";
import {IntrinsicValueResult, StockAnalystService} from "../../services/StockAnalystService";
import {FormattingUtils} from "../../utils/FormattingUtils";

export interface IntrinsicValueFields extends StockFields {
    symbol: FundamentalsCell,
    price: FundamentalsCell,
    marketCap: FundamentalsCell,

    growthEstimate5y: FundamentalsCell,

    roic1Y: FundamentalsCell,
    roic3Y: FundamentalsCell,

    bps1Y: FundamentalsCell,
    bps3Y: FundamentalsCell,
    bps5Y: FundamentalsCell,
    bps9Y: FundamentalsCell,

    revenue1Y: FundamentalsCell,
    revenue3Y: FundamentalsCell,
    revenue5Y: FundamentalsCell,
    revenue9Y: FundamentalsCell,

    cash1Y: FundamentalsCell,
    cash3Y: FundamentalsCell,
    cash5Y: FundamentalsCell,
    cash9Y: FundamentalsCell,

    eps1Y: FundamentalsCell,
    eps3Y: FundamentalsCell,
    eps5Y: FundamentalsCell,
    eps9Y: FundamentalsCell,

    rule1GrowthRate: FundamentalsCell,
    rule1PE: FundamentalsCell,
    currentEps: FundamentalsCell,
    futureEPS10Years: FundamentalsCell,
    futurePrice10Years: FundamentalsCell,
    stickerPrice15pcGrowth: FundamentalsCell,
    stickerPrice5pcGrowth: FundamentalsCell,
    belowStickerPrice15P: FundamentalsCell,
    belowStickerPrice5P: FundamentalsCell,

    futureEarningsYield: FundamentalsCell,
    futureFCFYield: FundamentalsCell,

    intrinsicValueFromBVGrowthDiscount5: FundamentalsCell,
    intrinsicValueFromFCFGrowthDiscount5: FundamentalsCell,
    intrinsicValueFromEGrowthDiscount5: FundamentalsCell,

    intrinsicValueFromBVGrowthDiscount10: FundamentalsCell,
    intrinsicValueFromFCFGrowthDiscount10: FundamentalsCell,
    intrinsicValueFromEGrowthDiscount10: FundamentalsCell,
}

export class IntrinsicValue extends StockData {

    headerData(): FundamentalsCell[] {
        return [];
    }

    labels(): string[] {
        return [
            'symbol',
            'price',
            'marketCap',

            'roic1Y',
            'roic3Y',

            'bps1Y',
            'bps3Y',
            'bps5Y',
            'bps9Y',

            'revenue1Y',
            'revenue3Y',
            'revenue5Y',
            'revenue9Y',

            'cash1Y',
            'cash3Y',
            'cash5Y',
            'cash9Y',

            'eps1Y',
            'eps3Y',
            'eps5Y',
            'eps9Y',

            'growthEstimate5y',

            'futureEarningsYield10Years',
            'futureFCF Yield10Years',

            'intrinsicValue BV 10Years 5%',
            'intrinsicValue BV 10Years 10%',

            'intrinsicValue Earnings 10Years 5%',
            'intrinsicValue Earnings 10Years 10%',

            'intrinsicValue FCF 10Years 5%',
            'intrinsicValue FCF 10Years 10%',

            'rule1GrowthRate',
            'rule1PE',
            'currentEps',
            'futureEPS10Years',
            'futurePrice10Years',
            'stickerPrice15pcGrowth',
            'stickerPrice5pcGrowth',
            'belowStickerPrice15P',
            'belowStickerPrice5P',

            'score'
        ]
    }

    fromStock(stock: Stock): IntrinsicValueFields {
        const ratiosFields = {
            symbol: StockData.toCell(stock.symbol),
            price: StockData.toCell(StockData.last(stock.price)),
            marketCap: StockData.toCell(StockData.last(stock.marketCap)),

            roic1Y: StockData.toCell(StockData.last(stock.roic1Y), true),
            roic3Y: StockData.toCell(StockData.last(stock.roic3Y), true),

            bps1Y: StockData.toCell(StockData.last(stock.bps1Y), true),
            bps3Y: StockData.toCell(StockData.last(stock.bps3Y), true),
            bps5Y: StockData.toCell(StockData.last(stock.bps5Y), true),
            bps9Y: StockData.toCell(StockData.last(stock.bps9Y), true),

            revenue1Y: StockData.toCell(StockData.last(stock.revenue1Y), true),
            revenue3Y: StockData.toCell(StockData.last(stock.revenue3Y), true),
            revenue5Y: StockData.toCell(StockData.last(stock.revenue5Y), true),
            revenue9Y: StockData.toCell(StockData.last(stock.revenue9Y), true),

            cash1Y: StockData.toCell(StockData.last(stock.cash1Y), true),
            cash3Y: StockData.toCell(StockData.last(stock.cash3Y), true),
            cash5Y: StockData.toCell(StockData.last(stock.cash5Y), true),
            cash9Y: StockData.toCell(StockData.last(stock.cash9Y), true),

            eps1Y: StockData.toCell(StockData.last(stock.eps1Y), true),
            eps3Y: StockData.toCell(StockData.last(stock.eps3Y), true),
            eps5Y: StockData.toCell(StockData.last(stock.eps5Y), true),
            eps9Y: StockData.toCell(StockData.last(stock.eps9Y), true),

            growthEstimate5y: StockData.toCell(StockData.last(stock.growthEstimate5y), true),

            futureEarningsYield: StockData.toCell(0, true),
            futureFCFYield: StockData.toCell(0, true),

            intrinsicValueFromBVGrowthDiscount5: StockData.toCell(0),
            intrinsicValueFromBVGrowthDiscount10: StockData.toCell(0),

            intrinsicValueFromEGrowthDiscount5: StockData.toCell(0),
            intrinsicValueFromEGrowthDiscount10: StockData.toCell(0),

            intrinsicValueFromFCFGrowthDiscount5: StockData.toCell(0),
            intrinsicValueFromFCFGrowthDiscount10: StockData.toCell(0),

            rule1GrowthRate: StockData.toCell(StockData.last(stock.rule1GrowthRate), true),
            rule1PE: StockData.toCell(StockData.last(stock.rule1PE)),
            currentEps: StockData.toCell(StockData.last(stock.currentEps)),
            futureEPS10Years: StockData.toCell(StockData.last(stock.futureEPS10Years)),
            futurePrice10Years: StockData.toCell(StockData.last(stock.futurePrice10Years)),
            stickerPrice15pcGrowth: StockData.toCell(StockData.last(stock.stickerPrice15pcGrowth)),
            stickerPrice5pcGrowth: StockData.toCell(StockData.last(stock.stickerPrice5pcGrowth)),
            belowStickerPrice15P: StockData.toCell(StockData.last(stock.belowStickerPrice15P), true),
            belowStickerPrice5P: StockData.toCell(StockData.last(stock.belowStickerPrice5P), true),

            score: StockData.toCell(0),
        }

        ratiosFields.growthEstimate5y.score = ratiosFields.growthEstimate5y.value * 5

        const y1multiplier = 2
        const y3multiplier = 1.5
        const y5multiplier = 1
        const y9multiplier = 0.5

        const roicMultiplier = 5
        const bpsMultiplier = 3
        const revenueMultiplier = 2.5
        const cashMultiplier = 2.5
        const epsMultiplier = 2

        ratiosFields.roic1Y.score = ratiosFields.roic1Y.value * y1multiplier * roicMultiplier
        ratiosFields.roic3Y.score = ratiosFields.roic3Y.value * y3multiplier * roicMultiplier

        ratiosFields.bps1Y.score = ratiosFields.bps1Y.value * y1multiplier * bpsMultiplier
        ratiosFields.bps3Y.score = ratiosFields.bps3Y.value * y3multiplier * bpsMultiplier
        ratiosFields.bps5Y.score = ratiosFields.bps5Y.value * y5multiplier * bpsMultiplier
        ratiosFields.bps9Y.score = ratiosFields.bps9Y.value * y9multiplier * bpsMultiplier

        ratiosFields.revenue1Y.score = ratiosFields.revenue1Y.value * y1multiplier * revenueMultiplier
        ratiosFields.revenue3Y.score = ratiosFields.revenue3Y.value * y3multiplier * revenueMultiplier
        ratiosFields.revenue5Y.score = ratiosFields.revenue5Y.value * y5multiplier * revenueMultiplier
        ratiosFields.revenue9Y.score = ratiosFields.revenue9Y.value * y9multiplier * revenueMultiplier

        ratiosFields.cash1Y.score = ratiosFields.cash1Y.value * y1multiplier * cashMultiplier
        ratiosFields.cash3Y.score = ratiosFields.cash3Y.value * y3multiplier * cashMultiplier
        ratiosFields.cash5Y.score = ratiosFields.cash5Y.value * y5multiplier * cashMultiplier
        ratiosFields.cash9Y.score = ratiosFields.cash9Y.value * y9multiplier * cashMultiplier

        ratiosFields.eps1Y.score = ratiosFields.eps1Y.value * y1multiplier * epsMultiplier
        ratiosFields.eps3Y.score = ratiosFields.eps3Y.value * y3multiplier * epsMultiplier
        ratiosFields.eps5Y.score = ratiosFields.eps5Y.value * y5multiplier * epsMultiplier
        ratiosFields.eps9Y.score = ratiosFields.eps9Y.value * y9multiplier * epsMultiplier

        ratiosFields.rule1GrowthRate.score = ratiosFields.rule1GrowthRate.value * 3
        ratiosFields.belowStickerPrice15P.score = ratiosFields.belowStickerPrice15P.value * 5
        ratiosFields.belowStickerPrice5P.score = ratiosFields.belowStickerPrice5P.value * 3

        const currentPE = IntrinsicValue.last(stock.trailingPE)
        const weightedPeGrowth = IntrinsicValue.weightedAverage(ratiosFields.eps1Y.value, ratiosFields.eps3Y.value, ratiosFields.eps5Y.value, ratiosFields.eps9Y.value);
        ratiosFields.futureEarningsYield.value = StockAnalystService.calcFutureYield(currentPE, weightedPeGrowth, 10)
        ratiosFields.futureEarningsYield.title = `pe ${FormattingUtils.formatValue(currentPE)} growth ${FormattingUtils.formatValue(weightedPeGrowth)}`


        let currentFCF = IntrinsicValue.lastDefined(stock.priceToFreeCashFlow)
        const weightedFCFGrowth = IntrinsicValue.weightedAverage(ratiosFields.cash1Y.value, ratiosFields.cash3Y.value, ratiosFields.cash5Y.value, ratiosFields.cash9Y.value);
        ratiosFields.futureFCFYield.value = StockAnalystService.calcFutureYield(currentFCF, weightedFCFGrowth, 10)
        ratiosFields.futureFCFYield.title = `fcf ${FormattingUtils.formatValue(currentFCF)} growth ${FormattingUtils.formatValue(weightedFCFGrowth)}`

        const avg5Ydividend = IntrinsicValue.avg(stock.dividends, 5)
        const weightedBVGrowth = IntrinsicValue.weightedAverage(ratiosFields.bps1Y.value, ratiosFields.bps3Y.value, ratiosFields.bps5Y.value, ratiosFields.bps9Y.value);
        const currentBV = IntrinsicValue.last(stock.bookValuePerShare);

        let intrinsicValueResult = StockAnalystService.calcIntrinsicValue(avg5Ydividend, currentBV, weightedBVGrowth, 10, 10)
        ratiosFields.intrinsicValueFromBVGrowthDiscount10.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromBVGrowthDiscount10.title = IntrinsicValue.formatIntrinsicValueCalc(avg5Ydividend, currentBV, weightedBVGrowth, intrinsicValueResult)

        intrinsicValueResult = StockAnalystService.calcIntrinsicValue(avg5Ydividend, currentBV, weightedBVGrowth, 5, 10)
        ratiosFields.intrinsicValueFromBVGrowthDiscount5.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromBVGrowthDiscount5.title = IntrinsicValue.formatIntrinsicValueCalc(avg5Ydividend, currentBV, weightedBVGrowth, intrinsicValueResult)

        const currentFCFPS = IntrinsicValue.last(stock.freeCashFlowPerShare);

        intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentFCFPS, weightedFCFGrowth, 10, 10)
        ratiosFields.intrinsicValueFromFCFGrowthDiscount10.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromFCFGrowthDiscount10.title = IntrinsicValue.formatIntrinsicValueCalc(0, currentFCFPS, weightedFCFGrowth, intrinsicValueResult)


        intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentFCFPS, weightedFCFGrowth, 5, 10)
        ratiosFields.intrinsicValueFromFCFGrowthDiscount5.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromFCFGrowthDiscount5.title = IntrinsicValue.formatIntrinsicValueCalc(0,currentFCFPS, weightedFCFGrowth, intrinsicValueResult)


        const currentEPS = IntrinsicValue.last(stock.eps);
        const weightedEPSGrowth = IntrinsicValue.weightedAverage(ratiosFields.eps1Y.value, ratiosFields.eps3Y.value, ratiosFields.eps5Y.value, ratiosFields.eps9Y.value);
        intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentEPS, weightedEPSGrowth, 10, 10)
        ratiosFields.intrinsicValueFromEGrowthDiscount10.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromEGrowthDiscount10.title = IntrinsicValue.formatIntrinsicValueCalc(0,currentEPS, weightedEPSGrowth, intrinsicValueResult)

        intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentEPS, weightedEPSGrowth, 5, 10)
        ratiosFields.intrinsicValueFromEGrowthDiscount5.value = intrinsicValueResult.intrinsicValue
        ratiosFields.intrinsicValueFromEGrowthDiscount5.title = IntrinsicValue.formatIntrinsicValueCalc(0,currentEPS, weightedEPSGrowth, intrinsicValueResult)

        StockData.removeInfinity(ratiosFields)
        StockData.capScoreValues(ratiosFields, 100)
        StockData.buildClasses(ratiosFields)
        StockData.calcTotalScore(ratiosFields)
        ratiosFields.symbol.classes.push('symbol')

        return ratiosFields
    }

    private static formatIntrinsicValueCalc(avg5Ydividend: number, currentValue: number, growth: number, intrinsicValueResult: IntrinsicValueResult) : string{
        const formattedCalc = `CV ${FormattingUtils.formatValue(currentValue)}
Growth ${FormattingUtils.formatValue(growth)} 
futureValue=${FormattingUtils.formatValue(intrinsicValueResult.futureValue)}
discountValue=${FormattingUtils.formatValue(intrinsicValueResult.discountValue)} 
cashTakenOut=${FormattingUtils.formatValue(intrinsicValueResult.cashTakenOut)}`;
        return avg5Ydividend ? `dividends ${FormattingUtils.formatValue(avg5Ydividend)}`.concat(formattedCalc) : formattedCalc
    }
}