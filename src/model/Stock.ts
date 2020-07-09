import {Timeline} from "./Timeline";

export interface Stock {
    id: number,
    symbol: string,
    exchange: string,
    chartLastUpdated: string,
    financialsLastUpdated: string,
    analysisLastUpdated: string,
    statisticsLastUpdated: string,
    holdersLastUpdated: string,
    krfLastUpdated: string,
    lastReportedQuarter: string,
    companyName: string,
    currency: string,
    financialCurrency: string,
    change: number,
    currentPrice: number,
    enterpriseValue: Timeline,
    totalCashPerShare: Timeline,
    totalCashPerShareP: Timeline,
    trailingPE: Timeline,
    forwardPE: Timeline,
    priceToSalesTrailing12Months: Timeline,
    priceToFreeCashFlowQ: Timeline,
    priceToFreeCashFlow: Timeline,

    priceBook: Timeline,
    enterpriseValueRevenue: Timeline,
    enterpriseValueEBITDA: Timeline,
    priceEarningGrowth: Timeline,
    trailingPriceEarningGrowth: Timeline,
    week52ChangeP: Timeline,
    week52Low: Timeline,
    week52AboveLowP: Timeline,
    week52High: Timeline,
    week52BelowHighP: Timeline,
    targetLowPrice: Timeline,
    belowTargetLowPriceP: Timeline,
    targetMedianPrice: Timeline,
    belowTargetMedianPriceP: Timeline,
    heldByInsidersP: Timeline,
    heldByInstitutionsP: Timeline,
    buyPercentInsiderShares: Timeline,
    sellPercentInsiderShares: Timeline,
    shortToFloatP: Timeline,
    sharesShortPrevMonthCompareP: Timeline,
    exDividendDate: Timeline,
    fiveYearAvgDividendYield: Timeline,
    trailingAnnualDividendYield: Timeline,
    payoutRatioP: Timeline,
    revenueQ: Timeline,
    revenue: Timeline,

    revenueGrowthQ: Timeline,
    revenueGrowth: Timeline,

    grossIncomeQ: Timeline,
    grossIncome: Timeline,

    grossIncomeGrowthQ: Timeline,
    grossIncomeGrowth: Timeline,

    ebitQ: Timeline,
    ebit: Timeline,

    ebitGrowthQ: Timeline,
    ebitGrowth: Timeline,

    netIncomeQ: Timeline,
    netIncome: Timeline,

    netIncomeGrowthQ: Timeline,
    netIncomeGrowth: Timeline,

    profitMarginPQ: Timeline,
    profitMarginP: Timeline,

    profitMarginGrowthQ: Timeline,
    profitMarginGrowth: Timeline,

    totalCashFromOperatingActivitiesQ: Timeline,
    totalCashFromOperatingActivities: Timeline,

    totalCashFromOperatingActivitiesGrowthQ: Timeline,
    totalCashFromOperatingActivitiesGrowth: Timeline,

    capitalExpendituresQ: Timeline,
    capitalExpenditures: Timeline,

    capitalExpendituresGrowthQ: Timeline,
    capitalExpendituresGrowth: Timeline,

    freeCashFlowQ: Timeline,
    freeCashFlow: Timeline,

    freeCashFlowGrowthQ: Timeline,
    freeCashFlowGrowth: Timeline,

    cashQ: Timeline,
    cash: Timeline,

    cashGrowthQ: Timeline,
    cashGrowth: Timeline,

    inventoryQ: Timeline,
    inventory: Timeline,

    inventoryGrowthQ: Timeline,
    inventoryGrowth: Timeline,

    currentAssetsQ: Timeline,
    currentAssets: Timeline,

    currentAssetsGrowthQ: Timeline,
    currentAssetsGrowth: Timeline,

    currentLiabilitiesQ: Timeline,
    currentLiabilities: Timeline,

    currentLiabilitiesGrowthQ: Timeline,
    currentLiabilitiesGrowth: Timeline,

    currentRatioQ: Timeline,
    currentRatio: Timeline,

    currentRatioGrowthQ: Timeline,
    currentRatioGrowth: Timeline,

    totalLiabilitiesQ: Timeline,
    totalLiabilities: Timeline,

    totalLiabilitiesGrowthQ: Timeline,
    totalLiabilitiesGrowth: Timeline,

    totalDebtToEquityPQ: Timeline,
    totalDebtToEquityP: Timeline,

    totalDebtToEquityGrowthQ: Timeline,
    totalDebtToEquityGrowth: Timeline,

    nonCurrentLiabilitiesToIncomeQ: Timeline,
    nonCurrentLiabilitiesToIncome: Timeline,

    nonCurrentLiabilitiesToIncomeGrowthQ: Timeline,
    nonCurrentLiabilitiesToIncomeGrowth: Timeline,

    totalAssetsQ: Timeline,
    totalAssets: Timeline,

    totalAssetsGrowthQ: Timeline,
    totalAssetsGrowth: Timeline,

    totalShareholdersEquityQ: Timeline,
    totalShareholdersEquity: Timeline,

    totalShareholdersEquityGrowthQ: Timeline,
    totalShareholdersEquityGrowth: Timeline,

    totalLiabilitiesToEquityQ: Timeline,
    totalLiabilitiesToEquity: Timeline,

    totalLiabilitiesToEquityGrowthQ: Timeline,
    totalLiabilitiesToEquityGrowth: Timeline,

    stockRepurchasedQ: Timeline,
    stockRepurchased: Timeline,

    stockRepurchasedGrowthQ: Timeline,
    stockRepurchasedGrowth: Timeline,

    epsQ: Timeline,
    eps: Timeline,

    epsGrowthQ: Timeline,
    epsGrowth: Timeline,

    peQ: Timeline,
    pe: Timeline,

    peGrowthQ: Timeline,
    peGrowth: Timeline,

    bookValuePerShare: Timeline,
    bookValuePerShareGrowth: Timeline,
    capSpending: Timeline,
    capSpendingGrowth: Timeline,
    dividends: Timeline,
    dividendsGrowth: Timeline,
    freeCashFlowPerShare: Timeline,
    freeCashFlowPerShareGrowth: Timeline,
    grossMargin: Timeline,
    grossMarginGrowth: Timeline,
    operatingCashFlow: Timeline,
    operatingCashFlowGrowth: Timeline,
    operatingIncome: Timeline,
    operatingIncomeGrowth: Timeline,
    operatingMargin: Timeline,
    operatingMarginGrowth: Timeline,
    growthEstimate5y: Timeline,
    shares: Timeline,
    sharesGrowth: Timeline,
    workingCapital: Timeline,
    workingCapitalGrowth: Timeline,
    roicP: Timeline,
    roic1Y: Timeline,
    roic3Y: Timeline,
    revenue1Y: Timeline,
    revenue3Y: Timeline,
    revenue5Y: Timeline,
    revenue9Y: Timeline,
    eps1Y: Timeline,
    eps3Y: Timeline,
    eps5Y: Timeline,
    eps9Y: Timeline,
    bps1Y: Timeline,
    bps3Y: Timeline,
    bps5Y: Timeline,
    bps9Y: Timeline,
    cash1Y: Timeline,
    cash3Y: Timeline,
    cash5Y: Timeline,
    cash9Y: Timeline,
    pe1Y: Timeline,
    pe3Y: Timeline,
    pe5Y: Timeline,
    pe9Y: Timeline,
    rule1GrowthRate: Timeline,
    defaultPE: Timeline,
    historicalPE: Timeline,
    rule1PE: Timeline,
    currentEps: Timeline,
    futureEPS10Years: Timeline,
    futurePrice10Years: Timeline,
    stickerPrice15pcGrowth: Timeline,
    stickerPrice5pcGrowth: Timeline,
    belowStickerPrice15P: Timeline,
    belowStickerPrice5P: Timeline,
    price: Timeline
}