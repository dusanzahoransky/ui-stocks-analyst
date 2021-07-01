import {Stock} from '../Stock'
import {FundamentalsCell} from '../table/FundamentalsCell'
import {StockFields} from './StockFields'
import {StockData} from './StockData'

export interface FinancialsFields extends StockFields {
    symbol: FundamentalsCell,
    epsQ: FundamentalsCell,

    epsGrowthQ: FundamentalsCell,
    eps: FundamentalsCell,
    epsGrowth: FundamentalsCell,
    bookValuePerShare: FundamentalsCell,
    bookValuePerShareGrowth: FundamentalsCell,
    freeCashFlowPerShare: FundamentalsCell,
    freeCashFlowPerShareGrowth: FundamentalsCell,

    revenueQ: FundamentalsCell,
    revenueGrowthQ: FundamentalsCell,
    revenue: FundamentalsCell,
    revenueGrowth: FundamentalsCell,

    grossIncomeQ: FundamentalsCell,
    grossIncomeGrowthQ: FundamentalsCell,
    grossIncome: FundamentalsCell,
    grossIncomeGrowth: FundamentalsCell,

    ebitQ: FundamentalsCell,
    ebitGrowthQ: FundamentalsCell,
    ebit: FundamentalsCell,
    ebitGrowth: FundamentalsCell,

    operatingIncomeQ: FundamentalsCell,
    operatingIncomeGrowthQ: FundamentalsCell,
    operatingIncome: FundamentalsCell,
    operatingIncomeGrowth: FundamentalsCell,

    netIncomeQ: FundamentalsCell,
    netIncomeGrowthQ: FundamentalsCell,
    netIncome: FundamentalsCell,
    netIncomeGrowth: FundamentalsCell,

    interestExpenseQ: FundamentalsCell,
    interestExpense: FundamentalsCell,

    capitalExpendituresQ: FundamentalsCell,
    capitalExpendituresGrowthQ: FundamentalsCell,
    capitalExpenditures: FundamentalsCell,
    capitalExpendituresGrowth: FundamentalsCell,

    operatingCashFlowQ: FundamentalsCell,
    operatingCashFlowGrowthQ: FundamentalsCell,
    operatingCashFlow: FundamentalsCell,
    operatingCashFlowGrowth: FundamentalsCell,

    freeCashFlowQ: FundamentalsCell,
    freeCashFlowGrowthQ: FundamentalsCell,
    freeCashFlow: FundamentalsCell,
    freeCashFlowGrowth: FundamentalsCell,

    cashAndCashEquivalentsQ: FundamentalsCell,
    cashAndCashEquivalentsGrowthQ: FundamentalsCell,
    cashAndCashEquivalents: FundamentalsCell,
    cashAndCashEquivalentsGrowth: FundamentalsCell,

    inventoryQ: FundamentalsCell,
    inventoryGrowthQ: FundamentalsCell,
    inventory: FundamentalsCell,
    inventoryGrowth: FundamentalsCell,

    currentAssetsQ: FundamentalsCell,
    currentAssetsGrowthQ: FundamentalsCell,
    currentAssets: FundamentalsCell,
    currentAssetsGrowth: FundamentalsCell,

    currentLiabilitiesQ: FundamentalsCell,
    currentLiabilitiesGrowthQ: FundamentalsCell,
    currentLiabilities: FundamentalsCell,
    currentLiabilitiesGrowth: FundamentalsCell,

    workingCapitalQ: FundamentalsCell,
    workingCapitalGrowthQ: FundamentalsCell,
    workingCapital: FundamentalsCell,
    workingCapitalGrowth: FundamentalsCell,

    totalDebtQ: FundamentalsCell,
    totalDebtGrowthQ: FundamentalsCell,
    totalDebt: FundamentalsCell,
    totalDebtGrowth: FundamentalsCell,

    totalAssetsQ: FundamentalsCell,
    totalAssetsGrowthQ: FundamentalsCell,
    totalAssets: FundamentalsCell,
    totalAssetsGrowth: FundamentalsCell,

    totalLiabilitiesQ: FundamentalsCell,
    totalLiabilitiesGrowthQ: FundamentalsCell,
    totalLiabilities: FundamentalsCell,
    totalLiabilitiesGrowth: FundamentalsCell,

    totalShareholdersEquityQ: FundamentalsCell,
    totalShareholdersEquityGrowthQ: FundamentalsCell,
    totalShareholdersEquity: FundamentalsCell,
    totalShareholdersEquityGrowth: FundamentalsCell,

    retainedEarningsQ: FundamentalsCell,
    retainedEarningsGrowthQ: FundamentalsCell,
    retainedEarnings: FundamentalsCell,
    retainedEarningsGrowth: FundamentalsCell,

    score: FundamentalsCell
}

export class Financials extends StockData {

    headerData(stock: Stock): undefined {
        return undefined
    }

    labels(): string[] {
        return [
            'symbol',
            'epsQ',

            'epsGrowthQ',
            'eps',
            'epsGrowth',
            'bookValuePerShare',
            'bookValuePerShareGrowth',
            'freeCashFlowPerShare',
            'freeCashFlowPerShareGrowth',

            'revenueQ',
            'revenueGrowthQ',
            'revenue',
            'revenueGrowth',

            'grossIncomeQ',
            'grossIncomeGrowthQ',
            'grossIncome',
            'grossIncomeGrowth',

            'ebitQ',
            'ebitGrowthQ',
            'ebit',
            'ebitGrowth',

            'operatingIncomeQ',
            'operatingIncomeGrowthQ',
            'operatingIncome',
            'operatingIncomeGrowth',

            'netIncomeQ',
            'netIncomeGrowthQ',
            'netIncome',
            'netIncomeGrowth',

            'interestExpenseQ',
            'interestExpense',

            'capitalExpendituresQ',
            'capitalExpendituresGrowthQ',
            'capitalExpenditures',
            'capitalExpendituresGrowth',

            'operatingCashFlowQ',
            'operatingCashFlowGrowthQ',
            'operatingCashFlow',
            'operatingCashFlowGrowth',

            'freeCashFlowQ',
            'freeCashFlowGrowthQ',
            'freeCashFlow',
            'freeCashFlowGrowth',

            'cashAndCashEquivalentsQ',
            'cashAndCashEquivalentsGrowthQ',
            'cashAndCashEquivalents',
            'cashAndCashEquivalentsGrowth',

            'inventoryQ',
            'inventoryGrowthQ',
            'inventory',
            'inventoryGrowth',

            'currentAssetsQ',
            'currentAssetsGrowthQ',
            'currentAssets',
            'currentAssetsGrowth',

            'currentLiabilitiesQ',
            'currentLiabilitiesGrowthQ',
            'currentLiabilities',
            'currentLiabilitiesGrowth',

            'workingCapitalQ',
            'workingCapitalGrowthQ',
            'workingCapital',
            'workingCapitalGrowth',

            'totalDebtQ',
            'totalDebtGrowthQ',
            'totalDebt',
            'totalDebtGrowth',

            'totalAssetsQ',
            'totalAssetsGrowthQ',
            'totalAssets',
            'totalAssetsGrowth',

            'totalLiabilitiesQ',
            'totalLiabilitiesGrowthQ',
            'totalLiabilities',
            'totalLiabilitiesGrowth',

            'totalShareholdersEquityQ',
            'totalShareholdersEquityGrowthQ',
            'totalShareholdersEquity',
            'totalShareholdersEquityGrowth',

            'retainedEarningsQ',
            'retainedEarningsGrowthQ',
            'retainedEarnings',
            'retainedEarningsGrowth',

            'score'
        ]
    }

    fromStock(stock: Stock): FinancialsFields {
        const ratiosFields = {
            symbol: StockData.toCell(stock.symbol, false, false, Financials.toTitle(stock.symbol)),
            epsQ: StockData.toCell(Financials.last(stock.epsQ), false, false, Financials.toTitle(stock.epsQ)),

            epsGrowthQ: StockData.toCell(Financials.last(stock.epsGrowthQ), false, true, Financials.toTitle(stock.epsGrowthQ)),
            eps: StockData.toCell(Financials.last(stock.eps), false, false, Financials.toTitle(stock.eps)),
            epsGrowth: StockData.toCell(Financials.last(stock.epsGrowth), false, true, Financials.toTitle(stock.epsGrowth)),
            bookValuePerShare: StockData.toCell(Financials.last(stock.bookValuePerShare), false, false, Financials.toTitle(stock.bookValuePerShare)),
            bookValuePerShareGrowth: StockData.toCell(Financials.last(stock.bookValuePerShareGrowth), false, true, Financials.toTitle(stock.bookValuePerShareGrowth)),
            freeCashFlowPerShare: StockData.toCell(Financials.last(stock.freeCashFlowPerShare), false, false, Financials.toTitle(stock.freeCashFlowPerShare)),
            freeCashFlowPerShareGrowth: StockData.toCell(Financials.last(stock.freeCashFlowPerShareGrowth), false, true, Financials.toTitle(stock.freeCashFlowPerShareGrowth)),

            revenueQ: StockData.toCell(Financials.last(stock.revenueQ), false, false, Financials.toTitle(stock.revenueQ)),
            revenueGrowthQ: StockData.toCell(Financials.last(stock.revenueGrowthQ), false, true, Financials.toTitle(stock.revenueGrowthQ)),
            revenue: StockData.toCell(Financials.last(stock.revenue), false, false, Financials.toTitle(stock.revenue)),
            revenueGrowth: StockData.toCell(Financials.last(stock.revenueGrowth), false, true, Financials.toTitle(stock.revenueGrowth)),

            grossIncomeQ: StockData.toCell(Financials.last(stock.grossIncomeQ), false, false, Financials.toTitle(stock.grossIncomeQ)),
            grossIncomeGrowthQ: StockData.toCell(Financials.last(stock.grossIncomeGrowthQ), false, true, Financials.toTitle(stock.grossIncomeGrowthQ)),
            grossIncome: StockData.toCell(Financials.last(stock.grossIncome), false, false, Financials.toTitle(stock.grossIncome)),
            grossIncomeGrowth: StockData.toCell(Financials.last(stock.grossIncomeGrowth), false, true, Financials.toTitle(stock.grossIncomeGrowth)),

            ebitQ: StockData.toCell(Financials.last(stock.ebitQ), false, false, Financials.toTitle(stock.ebitQ)),
            ebitGrowthQ: StockData.toCell(Financials.last(stock.ebitGrowthQ), false, true, Financials.toTitle(stock.ebitGrowthQ)),
            ebit: StockData.toCell(Financials.last(stock.ebit), false, false, Financials.toTitle(stock.ebit)),
            ebitGrowth: StockData.toCell(Financials.last(stock.ebitGrowth), false, true, Financials.toTitle(stock.ebitGrowth)),

            operatingIncomeQ: StockData.toCell(Financials.last(stock.operatingIncomeQ), false, false, Financials.toTitle(stock.operatingIncomeQ)),
            operatingIncomeGrowthQ: StockData.toCell(Financials.last(stock.operatingIncomeGrowthQ), false, true, Financials.toTitle(stock.operatingIncomeGrowthQ)),
            operatingIncome: StockData.toCell(Financials.last(stock.operatingIncome), false, false, Financials.toTitle(stock.operatingIncome)),
            operatingIncomeGrowth: StockData.toCell(Financials.last(stock.operatingIncomeGrowth), false, true, Financials.toTitle(stock.operatingIncomeGrowth)),

            netIncomeQ: StockData.toCell(Financials.last(stock.netIncomeQ), false, false, Financials.toTitle(stock.netIncomeQ)),
            netIncomeGrowthQ: StockData.toCell(Financials.last(stock.netIncomeGrowthQ), false, true, Financials.toTitle(stock.netIncomeGrowthQ)),
            netIncome: StockData.toCell(Financials.last(stock.netIncome), false, false, Financials.toTitle(stock.netIncome)),
            netIncomeGrowth: StockData.toCell(Financials.last(stock.netIncomeGrowth), false, true, Financials.toTitle(stock.netIncomeGrowth)),

            interestExpenseQ: StockData.toCell(Financials.last(stock.interestExpenseQ), false, false, Financials.toTitle(stock.interestExpenseQ)),
            interestExpense: StockData.toCell(Financials.last(stock.interestExpense), false, false, Financials.toTitle(stock.interestExpense)),

            capitalExpendituresQ: StockData.toCell(Financials.last(stock.capitalExpendituresQ), false, false, Financials.toTitle(stock.capitalExpendituresQ)),
            capitalExpendituresGrowthQ: StockData.toCell(Financials.last(stock.capitalExpendituresGrowthQ), false, true, Financials.toTitle(stock.capitalExpendituresGrowthQ)),
            capitalExpenditures: StockData.toCell(Financials.last(stock.capitalExpenditures), false, false, Financials.toTitle(stock.capitalExpenditures)),
            capitalExpendituresGrowth: StockData.toCell(Financials.last(stock.capitalExpendituresGrowth), false, true, Financials.toTitle(stock.capitalExpendituresGrowth)),

            operatingCashFlowQ: StockData.toCell(Financials.last(stock.operatingCashFlowQ), false, false, Financials.toTitle(stock.operatingCashFlowQ)),
            operatingCashFlowGrowthQ: StockData.toCell(Financials.last(stock.operatingCashFlowGrowthQ), false, true, Financials.toTitle(stock.operatingCashFlowGrowthQ)),
            operatingCashFlow: StockData.toCell(Financials.last(stock.operatingCashFlow), false, false, Financials.toTitle(stock.operatingCashFlow)),
            operatingCashFlowGrowth: StockData.toCell(Financials.last(stock.operatingCashFlowGrowth), false, true, Financials.toTitle(stock.operatingCashFlowGrowth)),

            freeCashFlowQ: StockData.toCell(Financials.last(stock.freeCashFlowQ), false, false, Financials.toTitle(stock.freeCashFlowQ)),
            freeCashFlowGrowthQ: StockData.toCell(Financials.last(stock.freeCashFlowGrowthQ), false, true, Financials.toTitle(stock.freeCashFlowGrowthQ)),
            freeCashFlow: StockData.toCell(Financials.last(stock.freeCashFlow), false, false, Financials.toTitle(stock.freeCashFlow)),
            freeCashFlowGrowth: StockData.toCell(Financials.last(stock.freeCashFlowGrowth), false, true, Financials.toTitle(stock.freeCashFlowGrowth)),

            cashAndCashEquivalentsQ: StockData.toCell(Financials.last(stock.cashAndCashEquivalentsQ), false, false, Financials.toTitle(stock.cashAndCashEquivalentsQ)),
            cashAndCashEquivalentsGrowthQ: StockData.toCell(Financials.last(stock.cashAndCashEquivalentsGrowthQ), false, true, Financials.toTitle(stock.cashAndCashEquivalentsGrowthQ)),
            cashAndCashEquivalents: StockData.toCell(Financials.last(stock.cashAndCashEquivalents), false, false, Financials.toTitle(stock.cashAndCashEquivalents)),
            cashAndCashEquivalentsGrowth: StockData.toCell(Financials.last(stock.cashAndCashEquivalentsGrowth), false, true, Financials.toTitle(stock.cashAndCashEquivalentsGrowth)),

            inventoryQ: StockData.toCell(Financials.last(stock.inventoryQ), false, false, Financials.toTitle(stock.inventoryQ)),
            inventoryGrowthQ: StockData.toCell(Financials.last(stock.inventoryGrowthQ), false, true, Financials.toTitle(stock.inventoryGrowthQ)),
            inventory: StockData.toCell(Financials.last(stock.inventory), false, false, Financials.toTitle(stock.inventory)),
            inventoryGrowth: StockData.toCell(Financials.last(stock.inventoryGrowth), false, true, Financials.toTitle(stock.inventoryGrowth)),

            currentAssetsQ: StockData.toCell(Financials.last(stock.currentAssetsQ), false, false, Financials.toTitle(stock.currentAssetsQ)),
            currentAssetsGrowthQ: StockData.toCell(Financials.last(stock.currentAssetsGrowthQ), false, true, Financials.toTitle(stock.currentAssetsGrowthQ)),
            currentAssets: StockData.toCell(Financials.last(stock.currentAssets), false, false, Financials.toTitle(stock.currentAssets)),
            currentAssetsGrowth: StockData.toCell(Financials.last(stock.currentAssetsGrowth), false, true, Financials.toTitle(stock.currentAssetsGrowth)),

            currentLiabilitiesQ: StockData.toCell(Financials.last(stock.currentLiabilitiesQ), false, false, Financials.toTitle(stock.currentLiabilitiesQ)),
            currentLiabilitiesGrowthQ: StockData.toCell(Financials.last(stock.currentLiabilitiesGrowthQ), false, true, Financials.toTitle(stock.currentLiabilitiesGrowthQ)),
            currentLiabilities: StockData.toCell(Financials.last(stock.currentLiabilities), false, false, Financials.toTitle(stock.currentLiabilities)),
            currentLiabilitiesGrowth: StockData.toCell(Financials.last(stock.currentLiabilitiesGrowth), false, true, Financials.toTitle(stock.currentLiabilitiesGrowth)),

            workingCapitalQ: StockData.toCell(Financials.last(stock.workingCapitalQ), false, false, Financials.toTitle(stock.workingCapitalQ)),
            workingCapitalGrowthQ: StockData.toCell(Financials.last(stock.workingCapitalGrowthQ), false, true, Financials.toTitle(stock.workingCapitalGrowthQ)),
            workingCapital: StockData.toCell(Financials.last(stock.workingCapital), false, false, Financials.toTitle(stock.workingCapital)),
            workingCapitalGrowth: StockData.toCell(Financials.last(stock.workingCapitalGrowth), false, true, Financials.toTitle(stock.workingCapitalGrowth)),

            totalDebtQ: StockData.toCell(Financials.last(stock.totalDebtQ), false, false, Financials.toTitle(stock.totalDebtQ)),
            totalDebtGrowthQ: StockData.toCell(Financials.last(stock.totalDebtGrowthQ), false, true, Financials.toTitle(stock.totalDebtGrowthQ)),
            totalDebt: StockData.toCell(Financials.last(stock.totalDebt), false, false, Financials.toTitle(stock.totalDebt)),
            totalDebtGrowth: StockData.toCell(Financials.last(stock.totalDebtGrowth), false, true, Financials.toTitle(stock.totalDebtGrowth)),

            totalAssetsQ: StockData.toCell(Financials.last(stock.totalAssetsQ), false, false, Financials.toTitle(stock.totalAssetsQ)),
            totalAssetsGrowthQ: StockData.toCell(Financials.last(stock.totalAssetsGrowthQ), false, true, Financials.toTitle(stock.totalAssetsGrowthQ)),
            totalAssets: StockData.toCell(Financials.last(stock.totalAssets), false, false, Financials.toTitle(stock.totalAssets)),
            totalAssetsGrowth: StockData.toCell(Financials.last(stock.totalAssetsGrowth), false, true, Financials.toTitle(stock.totalAssetsGrowth)),

            totalLiabilitiesQ: StockData.toCell(Financials.last(stock.totalLiabilitiesQ), false, false, Financials.toTitle(stock.totalLiabilitiesQ)),
            totalLiabilitiesGrowthQ: StockData.toCell(Financials.last(stock.totalLiabilitiesGrowthQ), false, true, Financials.toTitle(stock.totalLiabilitiesGrowthQ)),
            totalLiabilities: StockData.toCell(Financials.last(stock.totalLiabilities), false, false, Financials.toTitle(stock.totalLiabilities)),
            totalLiabilitiesGrowth: StockData.toCell(Financials.last(stock.totalLiabilitiesGrowth), false, true, Financials.toTitle(stock.totalLiabilitiesGrowth)),

            totalShareholdersEquityQ: StockData.toCell(Financials.last(stock.totalShareholdersEquityQ), false, false, Financials.toTitle(stock.totalShareholdersEquityQ)),
            totalShareholdersEquityGrowthQ: StockData.toCell(Financials.last(stock.totalShareholdersEquityGrowthQ), false, true, Financials.toTitle(stock.totalShareholdersEquityGrowthQ)),
            totalShareholdersEquity: StockData.toCell(Financials.last(stock.totalShareholdersEquity), false, false, Financials.toTitle(stock.totalShareholdersEquity)),
            totalShareholdersEquityGrowth: StockData.toCell(Financials.last(stock.totalShareholdersEquityGrowth), false, true, Financials.toTitle(stock.totalShareholdersEquityGrowth)),

            retainedEarningsQ: StockData.toCell(Financials.last(stock.retainedEarningsQ), false, false, Financials.toTitle(stock.retainedEarningsQ)),
            retainedEarningsGrowthQ: StockData.toCell(Financials.last(stock.retainedEarningsGrowthQ), false, true, Financials.toTitle(stock.retainedEarningsGrowthQ)),
            retainedEarnings: StockData.toCell(Financials.last(stock.retainedEarnings), false, false, Financials.toTitle(stock.retainedEarnings)),
            retainedEarningsGrowth: StockData.toCell(Financials.last(stock.retainedEarningsGrowth), false, true, Financials.toTitle(stock.retainedEarningsGrowth)),

            score: StockData.toCell(0),
        }

        StockData.removeInfinity(ratiosFields)
        StockData.capScoreValues(ratiosFields)
        StockData.buildClasses(ratiosFields)
        StockData.calcTotalScore(ratiosFields)
        ratiosFields.symbol.classes.push('symbol')

        return ratiosFields
    }
}