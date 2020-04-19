export enum TableColumn {
    id,
    date,
    symbol,
    exchange,
    companyName,
    price,
    change,
    enterpriseValue,

    totalCashPerShare,
    totalCashPerSharePercent,
    totalDebtEquity,

    trailingPE,
    forwardPE,
    priceToSalesTrailing12Months,
    priceBook,
    enterpriseValueRevenue,
    enterpriseValueEBITDA,

    quarterlyRevenueGrowth,
    yoyQuarterlyRevenueGrowthPercent,
    yoyQuarterlyEarningsGrowthPercent,
    /**
     * Details? What periods is this comparing is it quaterly, yearly?
     */
    earningsGrowthPercent,
    priceEarningGrowth,
    trailingPriceEarningGrowth,

    week52Change,
    week52Low,
    week52AboveLowPercent,
    week52High,
    week52BelowHighPercent,

    targetLowPrice,
    belowTargetLowPricePercent,
    targetMedianPrice,
    belowTargetMedianPricePercent,

    heldByInsiders,
    heldByInstitutions,
    shortToFloat,
    sharesShortPrevMonthCompare,

    exDividendDate,
    fiveYearAvgDividendYield,
    trailingAnnualDividendYield,

    score,
}