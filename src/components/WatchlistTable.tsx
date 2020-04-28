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
    onStockClickHandler?: (rowData: CellData[], rowIndex: number, columnIndex: number) => void
}

export interface TableState {
    sortAsc: boolean;
    sortedBy: TableColumn;
    sortedData: CellData[][];
}

export class WatchlistTable extends React.Component<TableProps, TableState> {

    constructor(props: Readonly<TableProps>) {
        super(props);
        this.state = {
            sortAsc: true,
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
            <th key={columnIndex} className={'label ' + this.columnClass(columnIndex)}
                onClick={() => this.setSortedField(columnIndex)}>
                <i className="fa fa-sort"/>
                {FormattingUtils.toFieldLabel(field)}
            </th>
        );
        let averagesRow = headerAverages.map((value, columnIndex) =>
            <th key={columnIndex}
                className={this.columnClass(columnIndex)}>{FormattingUtils.format(headerAverages, value, columnIndex)}</th>
        );

        return (
            <thead>
            <tr>{labelsRow}</tr>
            <tr>{averagesRow}</tr>
            </thead>
        )
    }

    setSortedField(column: TableColumn) {
        if (this.state.sortedBy === column) {
            this.setState({sortAsc: !this.state.sortAsc})
        }
        this.setState({sortedBy: column});
        const sortedData = this.state.sortedData.sort((row1, row2) => {

            let cell1 = row1[column];
            let cell2 = row2[column];

            if (!cell1) {
                return this.state.sortAsc ? -1 : 1
            }

            if (!cell2) {
                return this.state.sortAsc ? 1 : -1
            }

            if (cell1.value > cell2.value) {
                return this.state.sortAsc ? 1 : -1
            }
            if (cell1.value < cell2.value) {
                return this.state.sortAsc ? -1 : 1
            }
            return 0;
        });
        this.setState(
            {sortedData}
        )
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
            <td key={columnIndex} onClick={() => this.props.onStockClickHandler(rowData, rowIndex, columnIndex)}
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

        if (columnIndex === TableColumn.companyName) {
            classes.push('companyName');
        }
        if (columnIndex === TableColumn.symbol) {
            classes.push('symbol');
        }
        if (columnIndex === TableColumn.price) {
            classes.push('price');
        }
        if (columnIndex === TableColumn.change) {
            classes.push('change');
        }

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

        classes.push(this.columnClass(columnIndex));

        return classes.join(' ');
    }

    columnClass(columnIndex: number) {
        switch (columnIndex) {
            case TableColumn.id:
            case TableColumn.date:
            case TableColumn.exchange:
            case TableColumn.totalCashPerShare:
            case TableColumn.priceBook:
            case TableColumn.week52Low:
            case TableColumn.week52High:
            case TableColumn.targetMedianPrice:
            case TableColumn.targetLowPrice:
            case TableColumn.currency:
            case TableColumn.financialCurrency:
            case TableColumn.cashLastYear:
            case TableColumn.inventoryLastYear:
            case TableColumn.totalShareholdersEquityLastYear:
            case TableColumn.stockRepurchasedLastYear:
            case TableColumn.stockLastYear:
            case TableColumn.stockLastQuarter:
            case TableColumn.totalDebtEquity:
            case TableColumn.currentLiabilitiesGrowthLastQuarter:
            case TableColumn.currentLiabilitiesLastYear:
            case TableColumn.currentLiabilitiesGrowthLastYear:
            case TableColumn.currentLiabilitiesGrowthLast3Years:
            case TableColumn.totalLiabilitiesGrowthLastQuarter:
            case TableColumn.totalLiabilitiesLastYear:
            case TableColumn.totalLiabilitiesGrowthLastYear:
            case TableColumn.totalLiabilitiesGrowthLast3Years:
            case TableColumn.inventoryGrowthLast3Years:
            case TableColumn.cashGrowthLast3Years:
            case TableColumn.totalShareholdersEquityGrowthLast3Years:
            case TableColumn.chartData:
            case TableColumn.quarterEnds:
            case TableColumn.yearEnds:
                return 'hidden';
            default:
                return '';
        }
    }
}