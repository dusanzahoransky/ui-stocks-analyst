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
                        FormattingUtils.formatEtf(headerAverages, value, column)
                        : FormattingUtils.formatStock(headerAverages, value, column)
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

        const changeColumn = this.props.isEtf ? EtfTableColumn.change : StockFields.change;
        if (column === changeColumn) {
            if (data.value < 0) {
                classes.push('redText')
            } else {
                classes.push('greenText')
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

                case StockFields.netIncomeLastQuarter:
                    return "income"
                case StockFields.netIncome2QuartersAgo:
                    return "income"
                case StockFields.netIncome3QuartersAgo:
                    return "income"
                case StockFields.netIncomeLastYear:
                    return "income"
                case StockFields.netIncome4YearsAgo:
                    return "income"
                case StockFields.netIncomeGrowthLastQuarter:
                    return "income"
                case StockFields.netIncomeGrowthLast2Quarters:
                    return "income"
                case StockFields.netIncomeGrowthLast4Years:
                    return "income"

                case StockFields.revenueLastQuarter:
                    return "revenue"
                case StockFields.revenue2QuartersAgo:
                    return "revenue"
                case StockFields.revenue3QuartersAgo:
                    return "revenue"
                case StockFields.revenueLastYear:
                    return "revenue"
                case StockFields.revenueGrowthLastQuarter:
                    return "revenue"
                case StockFields.revenueGrowthLast2Quarters:
                    return "revenue"
                case StockFields.revenueGrowthLastYear:
                    return "revenue"
                case StockFields.revenueGrowthLast4Years:
                    return "revenue"

                case StockFields.cashLastQuarter:
                    return "cash"
                case StockFields.cashLastYear:
                    return "cash"
                case StockFields.cashGrowthLastQuarter:
                    return "cash"
                case StockFields.cashGrowthLastYear:
                    return "cash"
                case StockFields.cashGrowthLast4Years:
                    return "cash"

                case StockFields.inventoryLastQuarter:
                    return "inventory"
                case StockFields.inventoryLastYear:
                    return "inventory"
                case StockFields.inventoryGrowthLastQuarter:
                    return "inventory"
                case StockFields.inventoryGrowthLastYear:
                    return "inventory"
                case StockFields.inventoryGrowthLast4Years:
                    return "inventory"

                case StockFields.totalLiabilitiesLastQuarter:
                    return "liabilities"
                case StockFields.totalLiabilitiesLastYear:
                    return "liabilities"
                case StockFields.totalLiabilitiesGrowthLastQuarter:
                    return "liabilities"
                case StockFields.totalLiabilitiesGrowthLastYear:
                    return "liabilities"
                case StockFields.totalLiabilitiesGrowthLast4Years:
                    return "liabilities"

                case StockFields.totalShareholdersEquityLastQuarter:
                    return "equity"
                case StockFields.totalShareholdersEquityLastYear:
                    return "equity"
                case StockFields.totalShareholdersEquityGrowthLastQuarter:
                    return "equity"
                case StockFields.totalShareholdersEquityGrowthLastYear:
                    return "equity"
                case StockFields.totalShareholdersEquityGrowthLast4Years:
                    return "equity"

                case StockFields.totalLiabilitiesToEquityLastQuarter:
                    return "liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityLastYear:
                    return "liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLastQuarter:
                    return "liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLastYear:
                    return "liabilitiesToEquity"
                case StockFields.totalLiabilitiesToEquityGrowthLast4Years:
                    return "liabilitiesToEquity"

                case StockFields.stockRepurchasedLastQuarter:
                    return "stock"
                case StockFields.stockRepurchasedLastYear:
                    return "stock"
                case StockFields.stockRepurchasedGrowthLastQuarter:
                    return "stock"
                case StockFields.stockRepurchasedGrowthLastYear:
                    return "stock"
                case StockFields.stockRepurchasedGrowthLast4Years:
                    return "stock"

                case StockFields.stockLastQuarter:
                    return "stock"
                case StockFields.stockLastYear:
                    return "stock"
                case StockFields.stockGrowthLastQuarter:
                    return "stock"
                case StockFields.stockGrowthLastYear:
                    return "stock"
                case StockFields.stockGrowthLast4Years:
                    return "stock"

                case StockFields.epsCurrentQuarterEstimate:
                    return "eps"
                case StockFields.epsLastQuarter:
                    return "eps"
                case StockFields.eps2QuartersAgo:
                    return "eps"
                case StockFields.eps3QuartersAgo:
                    return "eps"
                case StockFields.eps4QuartersAgo:
                    return "eps"
                case StockFields.epsLastYear:
                    return "eps"
                case StockFields.eps2YearsAgo:
                    return "eps"
                case StockFields.eps3YearsAgo:
                    return "eps"
                case StockFields.eps4YearsAgo:
                    return "eps"
                case StockFields.epsGrowthLastQuarter:
                    return "eps"
                case StockFields.epsGrowthLast2Quarters:
                    return "eps"
                case StockFields.epsGrowthLastYear:
                    return "eps"
                case StockFields.epsGrowthLast4Years:
                    return "eps"

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