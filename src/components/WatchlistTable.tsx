import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './WatchlistTable.css';
import {StockTableColumn} from "../model/StockTableColumn";
import {CellData} from "../model/CellData";
import {IndexTableColumn} from "../model/IndexTableColumn";

export interface TableProps {
    headerLabels: string[];
    headerAverages: number[];
    data: CellData[][];
    isIndex: boolean;
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
        const labelsRow = headerLabels.map((field, columnIndex) =>
            <th key={columnIndex} className={'label ' + this.columnTypeClass(columnIndex, this.props.isIndex)}
                onClick={() => this.setSortedField(columnIndex)}>
                <i className="fa fa-sort"/>
                {FormattingUtils.toFieldLabel(field)}
            </th>
        );
        const averagesRow = headerAverages.map((value, columnIndex) =>
            <th key={columnIndex}
                className={this.columnTypeClass(columnIndex, this.props.isIndex)}>
                {
                    this.props.isIndex ?
                        FormattingUtils.formatIndex(headerAverages, value, columnIndex)
                        : FormattingUtils.formatStock(headerAverages, value, columnIndex)
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
        const rows = data.map((rowData, rowsIndex) =>
            this.renderRow(rowData, rowsIndex, averages)
        );
        return (
            <tbody>{rows}</tbody>
        )
    }

    renderRow(rowData: CellData[], rowIndex, averages: any[]) {
        const rowValues = rowData.map((data, columnIndex) =>
            <td key={columnIndex}
                onClick={() => this.props.onStockClickHandler(rowData[StockTableColumn.symbol].value as string)}
                className={this.dataCellClass(rowData, data, averages[columnIndex], columnIndex)}>
                <span>{
                    this.props.isIndex ?
                        FormattingUtils.formatIndex(rowData, data.value, columnIndex)
                        : FormattingUtils.formatStock(rowData, data.value, columnIndex)
                }</span>
                <span className={"score"}>{data.score ? data.score.toFixed(0) : ''}</span>
            </td>
        );
        return (
            <tr key={rowIndex} className={this.rowClass(rowIndex)}
                onClick={() => this.setSelectedRow(rowIndex)}>{rowValues}</tr>
        )
    }

    rowClass(rowIndex: number): string {
        return rowIndex === this.state.selectedRow ? 'selected' : ''
    }

    dataCellClass(rowData: any[], data: CellData, average: any, columnIndex: number): string {
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

        const changeColumn = this.props.isIndex ? IndexTableColumn.change : StockTableColumn.change;
        if (columnIndex === changeColumn) {
            if (data.value < 0) {
                classes.push('redText')
            } else {
                classes.push('greenText')
            }
        }

        classes.push(this.columnTypeClass(columnIndex, this.props.isIndex));

        return classes.join(' ');
    }

    columnTypeClass(columnIndex: number, isIndex: boolean) {
        if (isIndex) {
            switch (columnIndex) {
                case IndexTableColumn.chartData:
                    return 'hidden'
                case IndexTableColumn.companyName:
                    return 'companyName'
                case IndexTableColumn.date:
                    return 'date'
                case IndexTableColumn.symbol:
                    return 'symbol'
                case IndexTableColumn.price:
                    return 'price'
                case IndexTableColumn.change:
                    return 'change'
                case IndexTableColumn.asOfDate:
                    return 'date'
                case IndexTableColumn.fundInceptionDate:
                    return 'date'
            }
        } else {
            switch (columnIndex) {
                case StockTableColumn.chartData:
                    return 'hidden'
                case StockTableColumn.companyName:
                    return 'companyName'
                case StockTableColumn.date:
                    return 'date'
                case StockTableColumn.symbol:
                    return 'symbol'
                case StockTableColumn.price:
                    return 'price'
                case StockTableColumn.change:
                    return 'change'

                case StockTableColumn.lastReportedQuarter:
                    return 'date lastReport'
                case StockTableColumn.exDividendDate:
                    return 'date dividents'

                case StockTableColumn.totalCashPerSharePercent:
                    return "stat"
                case StockTableColumn.totalDebtEquity:
                    return "stat"

                case StockTableColumn.trailingPE:
                    return "stat"
                case StockTableColumn.forwardPE:
                    return "stat"
                case StockTableColumn.priceToSalesTrailing12Months:
                    return "stat"
                case StockTableColumn.priceBook:
                    return "stat"
                case StockTableColumn.enterpriseValueRevenue:
                    return "stat"
                case StockTableColumn.enterpriseValueEBITDA:
                    return "stat"
                case StockTableColumn.priceEarningGrowth:
                    return "stat"
                case StockTableColumn.trailingPriceEarningGrowth:
                    return "stat"

                case StockTableColumn.week52Change:
                    return "currentPriceStat"
                case StockTableColumn.week52AboveLowPercent:
                    return "currentPriceStat"
                case StockTableColumn.week52BelowHighPercent:
                    return "currentPriceStat"
                case StockTableColumn.belowTargetLowPricePercent:
                    return "currentPriceStat"
                case StockTableColumn.belowTargetMedianPricePercent:
                    return "currentPriceStat"

                case StockTableColumn.heldByInsiders:
                    return "stock"
                case StockTableColumn.heldByInstitutions:
                    return "stock"
                case StockTableColumn.shortToFloat:
                    return "short"
                case StockTableColumn.sharesShortPrevMonthCompare:
                    return "short"

                case StockTableColumn.fiveYearAvgDividendYield:
                    return "dividents"
                case StockTableColumn.trailingAnnualDividendYield:
                    return "dividents"
                case StockTableColumn.payoutRatio:
                    return "dividents"

                case StockTableColumn.netIncomeLastQuarter:
                    return "income"
                case StockTableColumn.netIncome2QuartersAgo:
                    return "income"
                case StockTableColumn.netIncome3QuartersAgo:
                    return "income"
                case StockTableColumn.netIncomeLastYear:
                    return "income"
                case StockTableColumn.netIncome3YearsAgo:
                    return "income"
                case StockTableColumn.netIncomeGrowthLastQuarter:
                    return "income"
                case StockTableColumn.netIncomeGrowthLast2Quarters:
                    return "income"
                case StockTableColumn.netIncomeGrowthLast3Years:
                    return "income"

                case StockTableColumn.revenueLastQuarter:
                    return "revenue"
                case StockTableColumn.revenue2QuartersAgo:
                    return "revenue"
                case StockTableColumn.revenue3QuartersAgo:
                    return "revenue"
                case StockTableColumn.revenueLastYear:
                    return "revenue"
                case StockTableColumn.revenueGrowthLastQuarter:
                    return "revenue"
                case StockTableColumn.revenueGrowthLast2Quarters:
                    return "revenue"
                case StockTableColumn.revenueGrowthLastYear:
                    return "revenue"
                case StockTableColumn.revenueGrowthLast3Years:
                    return "revenue"

                case StockTableColumn.cashLastQuarter:
                    return "cash"
                case StockTableColumn.cashLastYear:
                    return "cash"
                case StockTableColumn.cashGrowthLastQuarter:
                    return "cash"
                case StockTableColumn.cashGrowthLastYear:
                    return "cash"
                case StockTableColumn.cashGrowthLast3Years:
                    return "cash"

                case StockTableColumn.inventoryLastQuarter:
                    return "inventory"
                case StockTableColumn.inventoryLastYear:
                    return "inventory"
                case StockTableColumn.inventoryGrowthLastQuarter:
                    return "inventory"
                case StockTableColumn.inventoryGrowthLastYear:
                    return "inventory"
                case StockTableColumn.inventoryGrowthLast3Years:
                    return "inventory"

                case StockTableColumn.currentLiabilitiesLastQuarter:
                    return "liabilities"
                case StockTableColumn.currentLiabilitiesLastYear:
                    return "liabilities"
                case StockTableColumn.currentLiabilitiesGrowthLastQuarter:
                    return "liabilities"
                case StockTableColumn.currentLiabilitiesGrowthLastYear:
                    return "liabilities"
                case StockTableColumn.currentLiabilitiesGrowthLast3Years:
                    return "liabilities"
                case StockTableColumn.totalLiabilitiesLastQuarter:
                    return "liabilities"
                case StockTableColumn.totalLiabilitiesLastYear:
                    return "liabilities"
                case StockTableColumn.totalLiabilitiesGrowthLastQuarter:
                    return "liabilities"
                case StockTableColumn.totalLiabilitiesGrowthLastYear:
                    return "liabilities"
                case StockTableColumn.totalLiabilitiesGrowthLast3Years:
                    return "liabilities"

                case StockTableColumn.totalShareholdersEquityLastQuarter:
                    return "equity"
                case StockTableColumn.totalShareholdersEquityLastYear:
                    return "equity"
                case StockTableColumn.totalShareholdersEquityGrowthLastQuarter:
                    return "equity"
                case StockTableColumn.totalShareholdersEquityGrowthLastYear:
                    return "equity"
                case StockTableColumn.totalShareholdersEquityGrowthLast3Years:
                    return "equity"

                case StockTableColumn.currentLiabilitiesToEquityLastQuarter:
                    return "liabilitiesToEquity"
                case StockTableColumn.currentLiabilitiesToEquityLastYear:
                    return "liabilitiesToEquity"
                case StockTableColumn.currentLiabilitiesToEquityGrowthLastQuarter:
                    return "liabilitiesToEquity"
                case StockTableColumn.currentLiabilitiesToEquityGrowthLastYear:
                    return "liabilitiesToEquity"
                case StockTableColumn.currentLiabilitiesToEquityGrowthLast3Years:
                    return "liabilitiesToEquity"

                case StockTableColumn.totalLiabilitiesToEquityLastQuarter:
                    return "liabilitiesToEquity"
                case StockTableColumn.totalLiabilitiesToEquityLastYear:
                    return "liabilitiesToEquity"
                case StockTableColumn.totalLiabilitiesToEquityGrowthLastQuarter:
                    return "liabilitiesToEquity"
                case StockTableColumn.totalLiabilitiesToEquityGrowthLastYear:
                    return "liabilitiesToEquity"
                case StockTableColumn.totalLiabilitiesToEquityGrowthLast3Years:
                    return "liabilitiesToEquity"

                case StockTableColumn.stockRepurchasedLastQuarter:
                    return "stock"
                case StockTableColumn.stockRepurchasedLastYear:
                    return "stock"
                case StockTableColumn.stockRepurchasedGrowthLastQuarter:
                    return "stock"
                case StockTableColumn.stockRepurchasedGrowthLastYear:
                    return "stock"
                case StockTableColumn.stockRepurchasedGrowthLast3Years:
                    return "stock"

                case StockTableColumn.stockLastQuarter:
                    return "stock"
                case StockTableColumn.stockLastYear:
                    return "stock"
                case StockTableColumn.stockGrowthLastQuarter:
                    return "stock"
                case StockTableColumn.stockGrowthLastYear:
                    return "stock"
                case StockTableColumn.stockGrowthLast3Years:
                    return "stock"

                case StockTableColumn.epsCurrentQuarterEstimate:
                    return "eps"
                case StockTableColumn.epsLastQuarter:
                    return "eps"
                case StockTableColumn.eps2QuartersAgo:
                    return "eps"
                case StockTableColumn.eps3QuartersAgo:
                    return "eps"
                case StockTableColumn.eps4QuartersAgo:
                    return "eps"
                case StockTableColumn.epsLastYear:
                    return "eps"
                case StockTableColumn.eps2YearsAgo:
                    return "eps"
                case StockTableColumn.eps3YearsAgo:
                    return "eps"
                case StockTableColumn.eps4YearsAgo:
                    return "eps"
                case StockTableColumn.epsGrowthLastQuarter:
                    return "eps"
                case StockTableColumn.epsGrowthLast2Quarters:
                    return "eps"
                case StockTableColumn.epsGrowthLast3Quarters:
                    return "eps"
                case StockTableColumn.epsGrowthEstimateLastQuarter:
                    return "eps"
                case StockTableColumn.epsGrowthLastYear:
                    return "eps"
                case StockTableColumn.epsGrowthLast2Years:
                    return "eps"
                case StockTableColumn.epsGrowthLast3Years:
                    return "eps"

                case StockTableColumn.peLastQuarter:
                    return "pe"
                case StockTableColumn.pe2QuartersAgo:
                    return "pe"
                case StockTableColumn.pe3QuartersAgo:
                    return "pe"
                case StockTableColumn.pe4QuartersAgo:
                    return "pe"
                case StockTableColumn.peGrowthLastQuarter:
                    return "pe"
                case StockTableColumn.peGrowthLast2Quarters:
                    return "pe"
                case StockTableColumn.peGrowthLast3Quarters:
                    return "pe"

                case StockTableColumn.roic1Y:
                    return "cg-roic"
                case StockTableColumn.roic3Y:
                    return "cg-roic"

                case StockTableColumn.revenue1Y:
                    return "cg-revenue"
                case StockTableColumn.revenue3Y:
                    return "cg-revenue"
                case StockTableColumn.revenue5Y:
                    return "cg-revenue"
                case StockTableColumn.revenue9Y:
                    return "cg-revenue"

                case StockTableColumn.eps1Y:
                    return "cg-eps"
                case StockTableColumn.eps3Y:
                    return "cg-eps"
                case StockTableColumn.eps5Y:
                    return "cg-eps"
                case StockTableColumn.eps9Y:
                    return "cg-eps"

                case StockTableColumn.bps1Y:
                    return "cg-bps"
                case StockTableColumn.bps3Y:
                    return "cg-bps"
                case StockTableColumn.bps5Y:
                    return "cg-bps"
                case StockTableColumn.bps9Y:
                    return "cg-bps"

                case StockTableColumn.cash1Y:
                    return "cg-cash"
                case StockTableColumn.cash3Y:
                    return "cg-cash"
                case StockTableColumn.cash5Y:
                    return "cg-cash"
                case StockTableColumn.cash9Y:
                    return "cg-cash"
            }
        }
    }

    private setSelectedRow(rowIndex: number) {
        this.setState(state => {
            return {
                selectedRow: state.selectedRow === rowIndex ? undefined : rowIndex
            }
        })
    }
}