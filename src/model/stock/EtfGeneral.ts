import {Stock} from "../Stock";
import {FundamentalsCell} from "../table/FundamentalsCell";
import {StockFields} from "./StockFields";
import {StockData} from "./StockData";
import {Cell} from "../table/Cell";

export interface EtfGeneralFields extends StockFields {
    symbol: FundamentalsCell,

    chartLastUpdated: FundamentalsCell,
    statisticsLastUpdated: FundamentalsCell,

    asOfDate: FundamentalsCell,

    totalAssets: FundamentalsCell,

    yield: FundamentalsCell,

    threeYearAverageReturn: FundamentalsCell,
    fiveYearAverageReturn: FundamentalsCell,

    priceToEarnings: FundamentalsCell,
    priceToBook: FundamentalsCell,
    priceToCashflow: FundamentalsCell,
    priceToSales: FundamentalsCell,

    ytdReturn: FundamentalsCell,
    oneMonth: FundamentalsCell,
    threeMonth: FundamentalsCell,
    oneYear: FundamentalsCell,
    threeYear: FundamentalsCell,
    fiveYear: FundamentalsCell,
    tenYear: FundamentalsCell,

    annualHoldingsTurnover: FundamentalsCell,
    annualReportExpenseRatio: FundamentalsCell,
    averageDailyVolume3Month: FundamentalsCell,
    fundInceptionDate: FundamentalsCell,
}

export class EtfGeneral extends StockData {

    headerData(averages: Stock): EtfGeneralFields {
        return {
            symbol: StockData.toGenericCell('Averages'),

            chartLastUpdated: StockData.toCell(),
            statisticsLastUpdated: StockData.toCell(),

            asOfDate: StockData.toCell(),

            totalAssets: StockData.toCell(averages.totalAssets),

            yield: StockData.toCell(averages.yield),

            threeYearAverageReturn: StockData.toCell(averages.threeYearAverageReturn),
            fiveYearAverageReturn: StockData.toCell(averages.fiveYearAverageReturn),

            priceToEarnings: StockData.toCell(averages.priceToEarnings),
            priceToBook: StockData.toCell(averages.priceToBook),
            priceToCashflow: StockData.toCell(averages.priceToCashflow),
            priceToSales: StockData.toCell(averages.priceToSales),

            ytdReturn: StockData.toCell(averages.ytdReturn),
            oneMonth: StockData.toCell(averages.oneMonth),
            threeMonth: StockData.toCell(averages.threeMonth),
            oneYear: StockData.toCell(averages.oneYear),
            threeYear: StockData.toCell(averages.threeYear),
            fiveYear: StockData.toCell(averages.fiveYear),
            tenYear: StockData.toCell(averages.tenYear),

            annualHoldingsTurnover: StockData.toCell(averages.annualHoldingsTurnover),
            annualReportExpenseRatio: StockData.toCell(averages.annualReportExpenseRatio),
            averageDailyVolume3Month: StockData.toCell(averages.averageDailyVolume3Month),
            fundInceptionDate: StockData.toCell(),

            score: StockData.toCell(),
        }
    }

    labels(): string[] {
        return [
            'symbol',

            'chartLastUpdated',
            'statisticsLastUpdated',

            'asOfDate',

            'totalAssets',

            'yield',

            'threeYearAverageReturn',
            'fiveYearAverageReturn',

            'priceToEarnings',
            'priceToBook',
            'priceToCashflow',
            'priceToSales',

            'ytdReturn',
            'oneMonth',
            'threeMonth',
            'oneYear',
            'threeYear',
            'fiveYear',
            'tenYear',

            'annualHoldingsTurnover',
            'annualReportExpenseRatio',
            'averageDailyVolume3Month',
            'fundInceptionDate',
            'score',
        ]
    }

    fromStock(stock: Stock, avg?: Stock): EtfGeneralFields {
        const fields = {
            symbol: StockData.toCell(stock.symbol, false, false, `${stock.exchange}: ${stock.companyName}`),

            chartLastUpdated: StockData.toCell(stock.chartLastUpdated),
            statisticsLastUpdated: StockData.toCell(stock.statisticsLastUpdated),

            asOfDate: StockData.toCell(stock.asOfDate),

            totalAssets: StockData.toCell(StockData.last(stock.totalAssets), false, false, EtfGeneral.toTitle(stock.totalAssets)),

            yield: StockData.toCell(StockData.last(stock.yield), false, false, EtfGeneral.toTitle(stock.yield)),

            threeYearAverageReturn: StockData.toCell(StockData.last(stock.threeYearAverageReturn), false, false, EtfGeneral.toTitle(stock.threeYearAverageReturn)),
            fiveYearAverageReturn: StockData.toCell(StockData.last(stock.fiveYearAverageReturn), false, false, EtfGeneral.toTitle(stock.fiveYearAverageReturn)),

            priceToEarnings: StockData.toCell(StockData.last(stock.priceToEarnings), false, false, EtfGeneral.toTitle(stock.priceToEarnings)),
            priceToBook: StockData.toCell(StockData.last(stock.priceToBook), false, false, EtfGeneral.toTitle(stock.priceToBook)),
            priceToCashflow: StockData.toCell(StockData.last(stock.priceToCashflow), false, false, EtfGeneral.toTitle(stock.priceToCashflow)),
            priceToSales: StockData.toCell(StockData.last(stock.priceToSales), false, false, EtfGeneral.toTitle(stock.priceToSales)),

            ytdReturn: StockData.toCell(StockData.last(stock.ytdReturn), false, false, EtfGeneral.toTitle(stock.ytd)),
            oneMonth: StockData.toCell(StockData.last(stock.oneMonth), false, false, EtfGeneral.toTitle(stock.oneMonth)),
            threeMonth: StockData.toCell(StockData.last(stock.threeMonth), false, false, EtfGeneral.toTitle(stock.threeMonth)),
            oneYear: StockData.toCell(StockData.last(stock.oneYear), false, false, EtfGeneral.toTitle(stock.oneYear)),
            threeYear: StockData.toCell(StockData.last(stock.threeYear), false, false, EtfGeneral.toTitle(stock.threeYear)),
            fiveYear: StockData.toCell(StockData.last(stock.fiveYear), false, false, EtfGeneral.toTitle(stock.fiveYear)),
            tenYear: StockData.toCell(StockData.last(stock.tenYear), false, false, EtfGeneral.toTitle(stock.tenYear)),

            annualHoldingsTurnover: StockData.toCell(StockData.last(stock.annualHoldingsTurnover), false, false, EtfGeneral.toTitle(stock.annualHoldingsTurnover)),
            annualReportExpenseRatio: StockData.toCell(StockData.last(stock.annualReportExpenseRatio), false, false, EtfGeneral.toTitle(stock.annualReportExpenseRatio)),
            averageDailyVolume3Month: StockData.toCell(StockData.last(stock.averageDailyVolume3Month), false, false, EtfGeneral.toTitle(stock.averageDailyVolume3Month)),
            fundInceptionDate: StockData.toCell(StockData.last(stock.fundInceptionDate), false, false, EtfGeneral.toTitle(stock.fundInceptionDate)),

            score: StockData.toCell(0),
        }

        const hundredMil = 100000000;
        if(avg.totalAssets - fields.totalAssets.value > hundredMil) {
            fields.totalAssets.score = -1
        }
        const fiveHundredMil = 500000000;
        if(avg.totalAssets - fields.totalAssets.value > fiveHundredMil) {
            fields.totalAssets.score = -5
        }

        fields.yield.score = fields.yield.value - avg.yield

        fields.threeYearAverageReturn.score = fields.threeYearAverageReturn.value - avg.threeYearAverageReturn
        fields.fiveYearAverageReturn.score = fields.fiveYearAverageReturn.value - avg.fiveYearAverageReturn
        fields.fiveYearAverageReturn.score *= 2

        fields.priceToEarnings.score = avg.priceToEarnings - fields.priceToEarnings.value
        fields.priceToEarnings.score *= 1.5
        fields.priceToBook.score = avg.priceToBook - fields.priceToBook.value
        fields.priceToBook.score *= 0.5
        fields.priceToCashflow.score = avg.priceToCashflow - fields.priceToCashflow.value
        fields.priceToCashflow.score *= 2
        fields.priceToSales.score = avg.priceToSales - fields.priceToSales.value
        fields.priceToSales.score *= 1

        fields.threeYear.score = fields.threeYear.value - avg.threeYear
        fields.threeYear.score *= 0.5
        fields.fiveYear.score = fields.fiveYear.value - avg.fiveYear
        fields.fiveYear.score *= 1.5
        fields.tenYear.score = fields.tenYear.value - avg.tenYear
        fields.tenYear.score *= 5

        fields.annualHoldingsTurnover.score = fields.annualHoldingsTurnover.value - avg.annualHoldingsTurnover
        fields.annualHoldingsTurnover.score *= 0
        fields.annualReportExpenseRatio.score = fields.annualReportExpenseRatio.value - avg.annualReportExpenseRatio
        fields.annualReportExpenseRatio.score *= 0
        fields.averageDailyVolume3Month.score = fields.averageDailyVolume3Month.value - avg.averageDailyVolume3Month
        fields.averageDailyVolume3Month.score *= 0

        StockData.removeInfinity(fields)
        StockData.capScoreValues(fields)
        StockData.buildClasses(fields)
        StockData.calcTotalScore(fields)
        fields.symbol.classes.push('symbol')

        return fields
    }

}