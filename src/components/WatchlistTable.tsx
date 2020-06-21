import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './WatchlistTable.css';
import {StockFields} from "../model/StockFields";
import {CellData} from "../model/CellData";
import {EtfTableColumn} from "../model/EtfTableColumn";

export interface TableProps {
    headerLabels: string[];
    headerAverages: number[];
    data: CellData[][];
    isEtf: boolean;
    sortField?: number;
    onStockClickHandler?: (stockSymbol: string) => void
}

export interface TableState {
    selectedRow: number;
    sortAsc: boolean;
    sortedBy: number;
    sortedData: CellData[][];
}

export class WatchlistTable extends React.Component<TableProps, TableState> {

    private SORT_DEFAULT_ASC = true

    constructor(props: Readonly<TableProps>) {
        super(props);
        this.state = {
            selectedRow: undefined,
            sortAsc: this.SORT_DEFAULT_ASC,
            sortedBy: undefined,
            sortedData: props.data
        }
    }

    render = () => {
        return (
            <div className='Table'>
                {this.renderTable()}
            </div>
        )
    };

    renderTable() {
        return (
            <table>
                {this.renderHeader(this.props.headerLabels, this.props.headerAverages)}
                {this.renderBody(this.state.sortedData, this.props.headerAverages)}
            </table>

        )
    }

    renderHeader(headerLabels: string[], headerAverages: number[]) {
        const labelsRow = headerLabels.map((field, column) =>
            <th key={column} className={'label ' + this.columnTypeClass(column, this.props.isEtf)}
                onClick={() => this.setSortedField(column)}>
                <i className="fa fa-sort"/>
                {FormattingUtils.toFieldLabel(field)}
            </th>
        );
        const averagesRow = headerAverages.map((value, column) =>
            <th key={column}
                className={this.columnTypeClass(column, this.props.isEtf)}>
                {
                    this.props.isEtf ?
                        FormattingUtils.formatEtf(headerAverages, value, column) :
                        FormattingUtils.formatStock(headerAverages, value, column)
                }</th>
        );

        return (
            <thead>
            <tr>{labelsRow}</tr>
            <tr>{averagesRow}</tr>
            </thead>
        )
    }

    setSortedField(column: number) {
        this.setState(state => {
            const sortAsc = state.sortedBy === column ? !state.sortAsc : this.SORT_DEFAULT_ASC
            return {
                sortAsc: sortAsc,
                sortedBy: column,
                sortedData: state.sortedData
                    .sort((row1, row2) => WatchlistTable.sortData(row1, row2, column, sortAsc))
            }
        })
    }

    private static sortData(row1: CellData[], row2: CellData[], column: number, asc: boolean): number {
        let cell1 = row1[column];
        let cell2 = row2[column];

        if (!cell1) {
            return asc ? -1 : 1
        }
        if (!cell2) {
            return asc ? 1 : -1
        }
        if (cell1.value > cell2.value) {
            return asc ? 1 : -1
        }
        if (cell1.value < cell2.value) {
            return asc ? -1 : 1
        }
        return 0;
    }

    renderBody(data: CellData[][], averages: any[]) {
        const rows = data.map((rowData, rowsEtf) =>
            this.renderRow(rowData, rowsEtf, averages)
        );
        return (
            <tbody>{rows}</tbody>
        )
    }

    renderRow(rowData: CellData[], row, averages: any[]) {
        const rowValues = rowData.map((data, column) =>
            <td key={column}
                onClick={() => this.props.onStockClickHandler(rowData[StockFields.symbol].value as string)}
                className={this.dataCellClass(rowData, data, averages[column], column)}>
                <span>{
                    this.props.isEtf ?
                        FormattingUtils.formatEtf(rowData, data.value, column)
                        : FormattingUtils.formatStock(rowData, data.value, column)
                }</span>
                <span className={"score"}>{data.score ? data.score.toFixed(0) : ''}</span>
            </td>
        );
        return (
            <tr key={row} className={this.rowClass(row)}
                onClick={() => this.setSelectedRow(row)}>{rowValues}</tr>
        )
    }

    rowClass(row: number): string {
        return row === this.state.selectedRow ? 'selected' : ''
    }

    dataCellClass(rowData: any[], data: CellData, average: any, column: number): string {
        let classes = [];

        let score = Number.isNaN(data.score) ? 0 : data.score;
        if (score) {
            if (score < -10) {
                classes.push('red')
            } else if (score < 0) {
                classes.push('lightRed')
            } else if (score > 10) {
                classes.push('green')
            } else if (score > 0) {
                classes.push('lightGreen')
            }
        }

        if (this.props.isEtf) {
            if (column === EtfTableColumn.change) {
                if (data.value < 0) {
                    classes.push('redText')
                } else {
                    classes.push('greenText')
                }
            } else if (column === EtfTableColumn.score) {   //Score
                if (data.value < 0) {
                    classes.push('redText')
                } else {
                    classes.push('greenText')
                }
            }
        } else {
            if (column === StockFields.change) {
                if (data.value < 0) {
                    classes.push('redText')
                } else {
                    classes.push('greenText')
                }
            } else if (column === StockFields.score || column === StockFields.rule1score) {   //Score
                if (data.value < 0) {
                    classes.push('redText')
                    classes.push('boldText')
                } else {
                    classes.push('greenText')
                    classes.push('boldText')
                }
            }
        }

        classes.push(this.columnTypeClass(column, this.props.isEtf));

        return classes.join(' ');
    }

    columnTypeClass(column: number, isEtf: boolean) {
        if (isEtf) {
            switch (column) {
                case EtfTableColumn.chartData:
                    return 'hidden'
                case EtfTableColumn.companyName:
                    return 'companyName'
                case EtfTableColumn.date:
                    return 'date'
                case EtfTableColumn.symbol:
                    return 'symbol'
                case EtfTableColumn.price:
                    return 'price'
                case EtfTableColumn.change:
                    return 'change'
                case EtfTableColumn.asOfDate:
                    return 'date lastReport'
            }
        } else {
            switch (column) {
                case StockFields.chartData:
                    return 'hidden'
                case StockFields.companyName:
                    return 'companyName'
                case StockFields.date:
                    return 'date'
                case StockFields.symbol:
                    return 'symbol'
                case StockFields.price:
                    return 'price'
                case StockFields.change:
                    return 'change'

                case StockFields.lastReportedQuarter:
                    return 'date lastReport'
                case StockFields.exDividendDate:
                    return 'date dividents'

                case StockFields.totalCashPerSharePercent:
                    return "stat"
                case StockFields.totalDebtEquity:
                    return "stat"

                case StockFields.trailingPE:
                    return "stat"
                case StockFields.forwardPE:
                    return "stat"
                case StockFields.priceToSalesTrailing12Months:
                    return "stat"
                case StockFields.priceBook:
                    return "stat"
                case StockFields.enterpriseValueRevenue:
                    return "stat"
                case StockFields.enterpriseValueEBITDA:
                    return "stat"
                case StockFields.priceEarningGrowth:
                    return "stat"
                case StockFields.trailingPriceEarningGrowth:
                    return "stat"

                case StockFields.week52Change:
                    return "currentPriceStat"
                case StockFields.week52AboveLowPercent:
                    return "currentPriceStat"
                case StockFields.week52BelowHighPercent:
                    return "currentPriceStat"
                case StockFields.belowTargetLowPricePercent:
                    return "currentPriceStat"
                case StockFields.belowTargetMedianPricePercent:
                    return "currentPriceStat"

                case StockFields.heldByInsiders:
                    return "stock"
                case StockFields.heldByInstitutions:
                    return "stock"
                case StockFields.shortToFloat:
                    return "short"
                case StockFields.sharesShortPrevMonthCompare:
                    return "short"

                case StockFields.fiveYearAvgDividendYield:
                    return "dividents"
                case StockFields.trailingAnnualDividendYield:
                    return "dividents"
                case StockFields.payoutRatio:
                    return "dividents"

                case StockFields.revenueLastQuarter:
                    return "financials revenue"
                case StockFields.revenue2QuartersAgo:
                    return "financials revenue"
                case StockFields.revenue3QuartersAgo:
                    return "financials revenue"
                case StockFields.revenueLastYear:
                    return "financials revenue"
                case StockFields.revenue2YearsAgo:
                    return "financials revenue"
                case StockFields.revenue4YearsAgo:
                    return "financials revenue"

                case StockFields.revenueGrowthLastQuarter:
                    return "financials revenue"
                case StockFields.revenueGrowthLast2Quarters:
                    return "financials revenue"
                case StockFields.revenueGrowthLastYear:
                    return "financials revenue"
                case StockFields.revenueGrowthLast4Years:
                    return "financials revenue"


                case StockFields.grossIncomeLastQuarter:
                    return "financials grossIncome"
                case StockFields.grossIncome2QuartersAgo:
                    return "financials grossIncome"
                case StockFields.grossIncome3QuartersAgo:
                    return "financials grossIncome"
                case StockFields.grossIncomeLastYear:
                    return "financials grossIncome"
                case StockFields.grossIncome2YearsAgo:
                    return "financials grossIncome"
                case StockFields.grossIncome4YearsAgo:
                    return "financials grossIncome"

                case StockFields.grossIncomeGrowthLastQuarter:
                    return "financials grossIncome"
                case StockFields.grossIncomeGrowthLast2Quarters:
                    return "financials grossIncome"
                case StockFields.grossIncomeGrowthLastYear:
                    return "financials grossIncome"
                case StockFields.grossIncomeGrowthLast4Years:
                    return "financials grossIncome"


                case StockFields.ebitLastQuarter:
                    return "financials ebit"
                case StockFields.ebit2QuartersAgo:
                    return "financials ebit"
                case StockFields.ebit3QuartersAgo:
                    return "financials ebit"
                case StockFields.ebitLastYear:
                    return "financials ebit"
                case StockFields.ebit2YearsAgo:
                    return "financials ebit"
                case StockFields.ebit4YearsAgo:
                    return "financials ebit"

                case StockFields.ebitGrowthLastQuarter:
                    return "financials ebit"
                case StockFields.ebitGrowthLast2Quarters:
                    return "financials ebit"
                case StockFields.ebitGrowthLastYear:
                    return "financials ebit"
                case StockFields.ebitGrowthLast4Years:
                    return "financials ebit"


                case StockFields.netIncomeLastQuarter:
                    return "financials netIncome"
                case StockFields.netIncome2QuartersAgo:
                    return "financials netIncome"
                case StockFields.netIncome3QuartersAgo:
                    return "financials netIncome"
                case StockFields.netIncomeLastYear:
                    return "financials netIncome"
                case StockFields.netIncome2YearsAgo:
                    return "financials netIncome"
                case StockFields.netIncome4YearsAgo:
                    return "financials netIncome"

                case StockFields.netIncomeGrowthLastQuarter:
                    return "financials netIncome"
                case StockFields.netIncomeGrowthLast2Quarters:
                    return "financials netIncome"
                case StockFields.netIncomeGrowthLastYear:
                    return "financials netIncome"
                case StockFields.netIncomeGrowthLast4Years:
                    return "financials netIncome"


                case StockFields.freeCashFlowLastQuarter:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlow2QuartersAgo:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlow3QuartersAgo:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlowLastYear:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlow2YearsAgo:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlow4YearsAgo:
                    return "financials freeCashFlow"

                case StockFields.freeCashFlowGrowthLastQuarter:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlowGrowthLast2Quarters:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlowGrowthLastYear:
                    return "financials freeCashFlow"
                case StockFields.freeCashFlowGrowthLast4Years:
                    return "financials freeCashFlow"

                case StockFields.cashLastQuarter:
                    return "balanceSheet cash"
                case StockFields.cash2QuartersAgo:
                    return "balanceSheet cash"
                case StockFields.cash3QuartersAgo:
                    return "balanceSheet cash"
                case StockFields.cashLastYear:
                    return "balanceSheet cash"
                case StockFields.cash2YearsAgo:
                    return "balanceSheet cash"
                case StockFields.cash4YearsAgo:
                    return "balanceSheet cash"
                case StockFields.cashGrowthLastQuarter:
                    return "balanceSheet cash"
                case StockFields.cashGrowthLast2Quarters:
                    return "balanceSheet cash"
                case StockFields.cashGrowthLastYear:
                    return "balanceSheet cash"
                case StockFields.cashGrowthLast4Years:
                    return "balanceSheet cash"

                case StockFields.inventoryLastQuarter:
                    return "balanceSheet inventory"
                case StockFields.inventory2QuartersAgo:
                    return "balanceSheet inventory"
                case StockFields.inventory3QuartersAgo:
                    return "balanceSheet inventory"
                case StockFields.inventoryLastYear:
                    return "balanceSheet inventory"
                case StockFields.inventory2YearsAgo:
                    return "balanceSheet inventory"
                case StockFields.inventory4YearsAgo:
                    return "balanceSheet inventory"
                case StockFields.inventoryGrowthLastQuarter:
                    return "balanceSheet inventory"
                case StockFields.inventoryGrowthLast2Quarters:
                    return "balanceSheet inventory"
                case StockFields.inventoryGrowthLastYear:
                    return "balanceSheet inventory"
                case StockFields.inventoryGrowthLast4Years:
                    return "balanceSheet inventory"

                case StockFields.totalLiabilitiesLastQuarter:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilities2QuartersAgo:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilities3QuartersAgo:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilitiesLastYear:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilities2YearsAgo:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilities4YearsAgo:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilitiesGrowthLastQuarter:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilitiesGrowthLast2Quarters:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilitiesGrowthLastYear:
                    return "balanceSheet liabilities"
                case StockFields.totalLiabilitiesGrowthLast4Years:
                    return "balanceSheet liabilities"

                case StockFields.totalShareholdersEquityLastQuarter:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquity2QuartersAgo:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquity3QuartersAgo:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquityLastYear:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquity2YearsAgo:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquity4YearsAgo:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquityGrowthLastQuarter:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquityGrowthLast2Quarters:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquityGrowthLastYear:
                    return "balanceSheet equity"
                case StockFields.totalShareholdersEquityGrowthLast4Years:
                    return "balanceSheet equity"

                case StockFields.totalLiabilitiesToEquityLastQuarter:
                    return "balanceSheet liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityLastYear:
                    return "balanceSheet liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                    return "balanceSheet liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                    return "balanceSheet liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                    return "balanceSheet liabilitiesToEquity"

                case StockFields.stockRepurchasedLastQuarter:
                    return "balanceSheet stock"
                case StockFields.stockRepurchased2QuartersAgo:
                    return "balanceSheet stock"
                case StockFields.stockRepurchased3QuartersAgo:
                    return "balanceSheet stock"
                case StockFields.stockRepurchasedLastYear:
                    return "balanceSheet stock"
                case StockFields.stockRepurchased2YearsAgo:
                    return "balanceSheet stock"
                case StockFields.stockRepurchased4YearsAgo:
                    return "balanceSheet stock"
                case StockFields.stockRepurchasedGrowthLastQuarter:
                    return "balanceSheet stock"
                case StockFields.stockRepurchasedGrowthLast2Quarters:
                    return "balanceSheet stock"
                case StockFields.stockRepurchasedGrowthLastYear:
                    return "balanceSheet stock"
                case StockFields.stockRepurchasedGrowthLast4Years:
                    return "balanceSheet stock"

                case StockFields.stockLastQuarter:
                    return "balanceSheet stock"
                case StockFields.stock2QuartersAgo:
                    return "balanceSheet stock"
                case StockFields.stock3QuartersAgo:
                    return "balanceSheet stock"
                case StockFields.stockLastYear:
                    return "balanceSheet stock"
                case StockFields.stock2YearsAgo:
                    return "balanceSheet stock"
                case StockFields.stock4YearsAgo:
                    return "balanceSheet stock"
                case StockFields.stockGrowthLastQuarter:
                    return "balanceSheet stock"
                case StockFields.stockGrowthLast2Quarters:
                    return "balanceSheet stock"
                case StockFields.stockGrowthLastYear:
                    return "balanceSheet stock"
                case StockFields.stockGrowthLast4Years:
                    return "balanceSheet stock"

                case StockFields.epsCurrentQuarterEstimate:
                    return "balanceSheet eps"
                case StockFields.epsLastQuarter:
                    return "balanceSheet eps"
                case StockFields.eps2QuartersAgo:
                    return "balanceSheet eps"
                case StockFields.eps3QuartersAgo:
                    return "balanceSheet eps"
                case StockFields.eps4QuartersAgo:
                    return "balanceSheet eps"
                case StockFields.epsLastYear:
                    return "balanceSheet eps"
                case StockFields.eps2YearsAgo:
                    return "balanceSheet eps"
                case StockFields.eps3YearsAgo:
                    return "balanceSheet eps"
                case StockFields.eps4YearsAgo:
                    return "balanceSheet eps"
                case StockFields.epsGrowthLastQuarter:
                    return "balanceSheet eps"
                case StockFields.epsGrowthLast2Quarters:
                    return "balanceSheet eps"
                case StockFields.epsGrowthLastYear:
                    return "balanceSheet eps"
                case StockFields.epsGrowthLast4Years:
                    return "balanceSheet eps"

                case StockFields.peLastQuarter:
                    return "pe"
                case StockFields.pe2QuartersAgo:
                    return "pe"
                case StockFields.pe3QuartersAgo:
                    return "pe"
                case StockFields.pe4QuartersAgo:
                    return "pe"
                case StockFields.peGrowthLastQuarter:
                    return "pe"
                case StockFields.peGrowthLast2Quarters:
                    return "pe"
                case StockFields.peGrowthLast3Quarters:
                    return "pe"

                case StockFields.growthEstimate5y:
                    return "growth"

                case StockFields.roic1Y:
                    return "cg-roic"
                case StockFields.roic3Y:
                    return "cg-roic"

                case StockFields.revenue1Y:
                    return "cg-revenue"
                case StockFields.revenue3Y:
                    return "cg-revenue"
                case StockFields.revenue5Y:
                    return "cg-revenue"
                case StockFields.revenue9Y:
                    return "cg-revenue"

                case StockFields.eps1Y:
                    return "cg-eps"
                case StockFields.eps3Y:
                    return "cg-eps"
                case StockFields.eps5Y:
                    return "cg-eps"
                case StockFields.eps9Y:
                    return "cg-eps"

                case StockFields.bps1Y:
                    return "cg-bps"
                case StockFields.bps3Y:
                    return "cg-bps"
                case StockFields.bps5Y:
                    return "cg-bps"
                case StockFields.bps9Y:
                    return "cg-bps"

                case StockFields.cash1Y:
                    return "cg-cash"
                case StockFields.cash3Y:
                    return "cg-cash"
                case StockFields.cash5Y:
                    return "cg-cash"
                case StockFields.cash9Y:
                    return "cg-cash"

                case StockFields.score:
                    return "totalScore"
                case StockFields.rule1score:
                    return "totalScore"
            }
        }
    }

    private setSelectedRow(row: number) {
        this.setState(state => {
            return {
                selectedRow: state.selectedRow === row ? undefined : row
            }
        })
    }
}