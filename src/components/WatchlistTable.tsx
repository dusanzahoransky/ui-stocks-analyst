import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './WatchlistTable.css';
import {TableColumn} from "../model/TableColumn";
import {CellData} from "../model/CellData";

export interface TableProps {
    headerLabels: string[];
    headerAverages: number[];
    data: CellData[][];
    sortField?: TableColumn;
    onStockClickHandler?: (stockSymbol: string) => void
}

export interface TableState {
    sortAsc: boolean;
    sortedBy: TableColumn;
    sortedData: CellData[][];
}

export class WatchlistTable extends React.Component<TableProps, TableState> {

    private SORT_DEFAULT_ASC = true

    constructor(props: Readonly<TableProps>) {
        super(props);
        this.state = {
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
            <th key={columnIndex} className={'label ' + this.columnTypeClass(columnIndex)}
                onClick={() => this.setSortedField(columnIndex)}>
                <i className="fa fa-sort"/>
                {FormattingUtils.toFieldLabel(field)}
            </th>
        );
        let averagesRow = headerAverages.map((value, columnIndex) =>
            <th key={columnIndex}
                className={this.columnTypeClass(columnIndex)}>{FormattingUtils.format(headerAverages, value, columnIndex)}</th>
        );

        return (
            <thead>
            <tr>{labelsRow}</tr>
            <tr>{averagesRow}</tr>
            </thead>
        )
    }

    setSortedField(column: TableColumn) {
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

    private static sortData(row1: CellData[], row2: CellData[], column: TableColumn, asc: boolean) : number{
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
            <td key={columnIndex} onClick={() => this.props.onStockClickHandler(rowData[TableColumn.symbol].value as string)}
                className={this.dataCellClass(rowData, data, averages[columnIndex], columnIndex)}>
                <span>{FormattingUtils.format(rowData, data.value, columnIndex)}</span>
                <span className={"score"}>{data.score ? data.score.toFixed(0) : ''}</span>
            </td>
        );
        return (
            <tr key={rowIndex}>{rowValues}</tr>
        )
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

        if (columnIndex === TableColumn.change) {
            if (data.value < 0) {
                classes.push('redText')
            } else {
                classes.push('greenText')
            }
        }

        classes.push(this.columnTypeClass(columnIndex));

        return classes.join(' ');
    }

    columnTypeClass(columnIndex: number) {
        switch (columnIndex) {
            case TableColumn.chartData:
                return 'hidden'
            case TableColumn.companyName:
                return 'companyName'
            case TableColumn.date:
                return 'date'
            case TableColumn.lastReportedQuarter:
                return 'date lastReport'
            case TableColumn.exDividendDate:
                return 'date dividents'
            case TableColumn.symbol:
                return 'symbol'
            case TableColumn.price:
                return 'price'
            case TableColumn.change:
                return 'change'

            case TableColumn.totalCashPerSharePercent:
                return "stat"
            case TableColumn.totalDebtEquity:
                return "stat"

            case TableColumn.trailingPE:
                return "stat"
            case TableColumn.forwardPE:
                return "stat"
            case TableColumn.priceToSalesTrailing12Months:
                return "stat"
            case TableColumn.enterpriseValueRevenue:
                return "stat"
            case TableColumn.enterpriseValueEBITDA:
                return "stat"
            case TableColumn.priceEarningGrowth:
                return "stat"
            case TableColumn.trailingPriceEarningGrowth:
                return "stat"

            case TableColumn.week52Change:
                return "currentPriceStat"
            case TableColumn.week52AboveLowPercent:
                return "currentPriceStat"
            case TableColumn.week52BelowHighPercent:
                return "currentPriceStat"
            case TableColumn.belowTargetLowPricePercent:
                return "currentPriceStat"
            case TableColumn.belowTargetMedianPricePercent:
                return "currentPriceStat"

            case TableColumn.heldByInsiders:
                return "stock"
            case TableColumn.heldByInstitutions:
                return "stock"
            case TableColumn.shortToFloat:
                return "short"
            case TableColumn.sharesShortPrevMonthCompare:
                return "short"

            case TableColumn.fiveYearAvgDividendYield:
                return "dividents"
            case TableColumn.trailingAnnualDividendYield:
                return "dividents"

            case TableColumn.netIncomeLastQuarter:
                return "income"
            case TableColumn.netIncome2QuartersAgo:
                return "income"
            case TableColumn.netIncome3QuartersAgo:
                return "income"
            case TableColumn.netIncomeLastYear:
                return "income"
            case TableColumn.netIncome3YearsAgo:
                return "income"
            case TableColumn.netIncomeGrowthLastQuarter:
                return "income"
            case TableColumn.netIncomeGrowthLast2Quarters:
                return "income"
            case TableColumn.netIncomeGrowthLast3Years:
                return "income"

            case TableColumn.revenueLastQuarter:
                return "revenue"
            case TableColumn.revenue2QuartersAgo:
                return "revenue"
            case TableColumn.revenue3QuartersAgo:
                return "revenue"
            case TableColumn.revenueLastYear:
                return "revenue"
            case TableColumn.revenueGrowthLastQuarter:
                return "revenue"
            case TableColumn.revenueGrowthLast2Quarters:
                return "revenue"
            case TableColumn.revenueGrowthLastYear:
                return "revenue"
            case TableColumn.revenueGrowthLast3Years:
                return "revenue"

            case TableColumn.cashLastQuarter:
                return "cash"
            case TableColumn.cashLastYear:
                return "cash"
            case TableColumn.cashGrowthLastQuarter:
                return "cash"
            case TableColumn.cashGrowthLastYear:
                return "cash"
            case TableColumn.cashGrowthLast3Years:
                return "cash"

            case TableColumn.inventoryLastQuarter:
                return "inventory"
            case TableColumn.inventoryLastYear:
                return "inventory"
            case TableColumn.inventoryGrowthLastQuarter:
                return "inventory"
            case TableColumn.inventoryGrowthLastYear:
                return "inventory"
            case TableColumn.inventoryGrowthLast3Years:
                return "inventory"

            case TableColumn.currentLiabilitiesLastQuarter:
                return "liabilities"
            case TableColumn.currentLiabilitiesLastYear:
                return "liabilities"
            case TableColumn.totalLiabilitiesLastQuarter:
                return "liabilities"
            case TableColumn.totalLiabilitiesLastYear:
                return "liabilities"

            case TableColumn.totalShareholdersEquityLastQuarter:
                return "equity"
            case TableColumn.totalShareholdersEquityLastYear:
                return "equity"
            case TableColumn.totalShareholdersEquityGrowthLastQuarter:
                return "equity"
            case TableColumn.totalShareholdersEquityGrowthLastYear:
                return "equity"
            case TableColumn.totalShareholdersEquityGrowthLast3Years:
                return "equity"

            case TableColumn.currentLiabilitiesToEquityLastQuarter:
                return "liabilitiesToEquity"
            case TableColumn.currentLiabilitiesToEquityLastYear:
                return "liabilitiesToEquity"
            case TableColumn.currentLiabilitiesToEquityGrowthLastQuarter:
                return "liabilitiesToEquity"
            case TableColumn.currentLiabilitiesToEquityGrowthLastYear:
                return "liabilitiesToEquity"
            case TableColumn.currentLiabilitiesToEquityGrowthLast3Years:
                return "liabilitiesToEquity"

            case TableColumn.totalLiabilitiesToEquityLastQuarter:
                return "liabilitiesToEquity"
            case TableColumn.totalLiabilitiesToEquityLastYear:
                return "liabilitiesToEquity"
            case TableColumn.totalLiabilitiesToEquityGrowthLastQuarter:
                return "liabilitiesToEquity"
            case TableColumn.totalLiabilitiesToEquityGrowthLastYear:
                return "liabilitiesToEquity"
            case TableColumn.totalLiabilitiesToEquityGrowthLast3Years:
                return "liabilitiesToEquity"

            case TableColumn.stockRepurchasedLastQuarter:
                return "stock"
            case TableColumn.stockRepurchasedLastYear:
                return "stock"
            case TableColumn.stockRepurchasedGrowthLastQuarter:
                return "stock"
            case TableColumn.stockRepurchasedGrowthLastYear:
                return "stock"
            case TableColumn.stockRepurchasedGrowthLast3Years:
                return "stock"

            case TableColumn.stockLastQuarter:
                return "stock"
            case TableColumn.stockLastYear:
                return "stock"
            case TableColumn.stockGrowthLastQuarter:
                return "stock"
            case TableColumn.stockGrowthLastYear:
                return "stock"
            case TableColumn.stockGrowthLast3Years:
                return "stock"

            case TableColumn.epsCurrentQuarterEstimate:
                return "eps"
            case TableColumn.epsLastQuarter:
                return "eps"
            case TableColumn.eps2QuartersAgo:
                return "eps"
            case TableColumn.eps3QuartersAgo:
                return "eps"
            case TableColumn.eps4QuartersAgo:
                return "eps"
            case TableColumn.epsLastYear:
                return "eps"
            case TableColumn.eps2YearsAgo:
                return "eps"
            case TableColumn.eps3YearsAgo:
                return "eps"
            case TableColumn.eps4YearsAgo:
                return "eps"
            case TableColumn.epsGrowthLastQuarter:
                return "eps"
            case TableColumn.epsGrowthLast2Quarters:
                return "eps"
            case TableColumn.epsGrowthLast3Quarters:
                return "eps"
            case TableColumn.epsGrowthEstimateLastQuarter:
                return "eps"
            case TableColumn.epsGrowthLastYear:
                return "eps"
            case TableColumn.epsGrowthLast2Years:
                return "eps"
            case TableColumn.epsGrowthLast3Years:
                return "eps"

            case TableColumn.peLastQuarter:
                return "pe"
            case TableColumn.pe2QuartersAgo:
                return "pe"
            case TableColumn.pe3QuartersAgo:
                return "pe"
            case TableColumn.pe4QuartersAgo:
                return "pe"
            case TableColumn.peGrowthLastQuarter:
                return "pe"
            case TableColumn.peGrowthLast2Quarters:
                return "pe"
            case TableColumn.peGrowthLast3Quarters:
                return "pe"
        }

    }
}