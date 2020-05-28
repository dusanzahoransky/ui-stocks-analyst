export enum StockTableColumn {
    date,
    lastReportedQuarter,
    symbol,
    companyName,
    price,
    change,

    enterpriseValue,
    // totalCashPerShare,
    totalCashPerSharePercent,
    totalDebtEquity,

    trailingPE,
    forwardPE,
    priceToSalesTrailing12Months,
    priceBook,
    enterpriseValueRevenue,
    enterpriseValueEBITDA,

    // yoyQuarterlyRevenueGrowthPercent,

    priceEarningGrowth,
    trailingPriceEarningGrowth,

    week52Change,
    // week52Low,
    week52AboveLowPercent,
    // week52High,
    week52BelowHighPercent,

    // targetLowPrice,
    belowTargetLowPricePercent,
    // targetMedianPrice,
    belowTargetMedianPricePercent,

    heldByInsiders,
    heldByInstitutions,
    shortToFloat,
    sharesShortPrevMonthCompare,

    exDividendDate,
    fiveYearAvgDividendYield,
    trailingAnnualDividendYield,
    payoutRatio,

    netIncomeLastQuarter,
    netIncome2QuartersAgo,
    netIncome3QuartersAgo,
    netIncomeLastYear,
    netIncome3YearsAgo,
    netIncomeGrowthLastQuarter,
    netIncomeGrowthLast2Quarters,
    netIncomeGrowthLast3Years,

    grossIncomeLastQuarter,
    grossIncome2QuartersAgo,
    grossIncome3QuartersAgo,
    grossIncomeLastYear,
    grossIncome3YearsAgo,
    grossIncomeGrowthLastQuarter,
    grossIncomeGrowthLast2Quarters,
    grossIncomeGrowthLast3Years,

    revenueLastQuarter,
    revenue2QuartersAgo,
    revenue3QuartersAgo,
    revenueLastYear,
    revenueGrowthLastQuarter,
    revenueGrowthLast2Quarters,
    revenueGrowthLastYear,
    revenueGrowthLast3Years,

    cashLastQuarter,
    cashLastYear,
    cashGrowthLastQuarter,
    cashGrowthLastYear,
    cashGrowthLast3Years,

    inventoryLastQuarter,
    inventoryLastYear,
    inventoryGrowthLastQuarter,
    inventoryGrowthLastYear,
    inventoryGrowthLast3Years,

    currentAssetsLastQuarter,
    currentAssetsLastYear,
    currentAssetsGrowthLastQuarter,
    currentAssetsGrowthLastYear,
    currentAssetsGrowthLast3Years,

    currentLiabilitiesLastQuarter,
    currentLiabilitiesLastYear,
    currentLiabilitiesGrowthLastQuarter,
    currentLiabilitiesGrowthLastYear,
    currentLiabilitiesGrowthLast3Years,

    totalLiabilitiesLastQuarter,
    totalLiabilitiesLastYear,
    totalLiabilitiesGrowthLastQuarter,
    totalLiabilitiesGrowthLastYear,
    totalLiabilitiesGrowthLast3Years,

    totalShareholdersEquityLastQuarter,
    totalShareholdersEquityLastYear,
    totalShareholdersEquityGrowthLastQuarter,
    totalShareholdersEquityGrowthLastYear,
    totalShareholdersEquityGrowthLast3Years,

    currentLiabilitiesToEquityLastQuarter,
    currentLiabilitiesToEquityLastYear,
    currentLiabilitiesToEquityGrowthLastQuarter,
    currentLiabilitiesToEquityGrowthLastYear,
    currentLiabilitiesToEquityGrowthLast3Years,

    totalLiabilitiesToEquityLastQuarter,
    totalLiabilitiesToEquityLastYear,
    totalLiabilitiesToEquityGrowthLastQuarter,
    totalLiabilitiesToEquityGrowthLastYear,
    totalLiabilitiesToEquityGrowthLast3Years,

    stockRepurchasedLastQuarter,
    stockRepurchasedLastYear,
    stockRepurchasedGrowthLastQuarter,
    stockRepurchasedGrowthLastYear,
    stockRepurchasedGrowthLast3Years,

    stockLastQuarter,
    stockLastYear,
    stockGrowthLastQuarter,
    stockGrowthLastYear,
    stockGrowthLast3Years,

    epsCurrentQuarterEstimate,
    epsLastQuarter,
    eps2QuartersAgo,
    eps3QuartersAgo,
    eps4QuartersAgo,
    epsLastYear,
    eps2YearsAgo,
    eps3YearsAgo,
    eps4YearsAgo,
    epsGrowthLastQuarter,
    epsGrowthLast2Quarters,
    epsGrowthLast3Quarters,
    epsGrowthEstimateLastQuarter,
    epsGrowthLastYear,
    epsGrowthLast2Years,
    epsGrowthLast3Years,

    // priceLastQuarter,
    // price2QuartersAgo,
    // price3QuartersAgo,
    // price4QuartersAgo,
    // priceGrowthLastQuarter,
    // priceGrowthLast2Quarters,
    // priceGrowthLast3Quarters,

    peLastQuarter,
    pe2QuartersAgo,
    pe3QuartersAgo,
    pe4QuartersAgo,
    peGrowthLastQuarter,
    peGrowthLast2Quarters,
    peGrowthLast3Quarters,

    //Rule 1 calc

    roic1Y,
    roic3Y,

    revenue1Y,
    revenue3Y,
    revenue5Y,
    revenue9Y,

    eps1Y,
    eps3Y,
    eps5Y,
    eps9Y,

    bps1Y,
    bps3Y,
    bps5Y,
    bps9Y,

    //free cash flow
    cash1Y,
    cash3Y,
    cash5Y,
    cash9Y,

    chartData,

    score,
    rule1score,
}