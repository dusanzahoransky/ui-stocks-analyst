import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './Table.css';
import {TableColumn} from "../model/TableColumn";
import {CellData} from "../model/CellData";

export interface TableProps {
    headerLabels: string[];
    headerAverages: number[];
    data: CellData[][];
    sortField?: TableColumn;
}

export interface TableState {
    sortAsc: boolean;
    sortedBy: TableColumn;
    sortedData: CellData[][];
}

export class Table extends React.Component<TableProps, TableState> {

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
            <th key={field} className={this.columnClass(columnIndex)} onClick={() => this.setSortedField(columnIndex)}>
                <i className="fa fa-sort"/>
                {FormattingUtils.toFieldLabel(field)}
            </th>
        );
        let averagesRow = headerAverages.map((value, columnIndex) =>
            <th key={value} className={this.columnClass(columnIndex)}>{FormattingUtils.format(headerAverages, value, columnIndex)}</th>
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
            if (row1[column].value > row2[column].value) {
                return this.state.sortAsc ? 1 : -1
            }
            if (row1[column].value < row2[column].value) {
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
            <td key={columnIndex}
                className={this.dataCellClass(rowData, data, averages[columnIndex], columnIndex)}>
                {FormattingUtils.format(rowData, data.value, columnIndex)}</td>
        );
        return (
            <tr key={rowIndex}>{rowValues}</tr>
        )
    }

    dataCellClass(rowData: any[], data: CellData, average: any, columnIndex: number): string {
        let classes = [];
        let number = data.value;
        const avg = average;

        if (columnIndex === TableColumn.companyName) {
            classes.push('companyName');
        }
        if (columnIndex === TableColumn.change) {
            classes.push('change');
        }

        const price = Number.parseFloat(rowData[TableColumn.price]);

        switch (columnIndex) {
            // case TableColumn.ticker:
            // case TableColumn.period:
            // case TableColumn.marketCap:
            // case TableColumn.enterpriseValue:
            //     classes.push('');
            //     break;
            // case TableColumn.change:
            //     classes.push(data.startsWith('-') ? 'redText' : 'greenText');
            //     break;
            // case TableColumn.totalCashPerShare:
            //     classes.push(number / price > 0.2 ? 'lightGreen' :  number / price < 0.01 ? 'lightRed' : '');
            //     break;
            // case TableColumn.totalDebtEquity:
            //     if (number < 1) classes.push('green');
            //     else if (number > 100) classes.push('red');
            //     else classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.quarterlyRevenueGrowth:
            //     classes.push(number > 10 ? 'lightGreen' : 'lightRed');
            //     break;
            // case TableColumn.quarterlyEarningsGrowth:
            //     if (number > 20) classes.push('green');
            //     else if (number < 0) classes.push('red');
            //     else classes.push(number < avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.week52Change:
            //     classes.push(number < 0 ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.week52AboveLow:
            //     if(number < 20){ classes.push('lightRed'); }
            //     if(number < 5){ classes.push('red'); }
            //     if(number > 50){ classes.push('lightGreen'); }
            //     if(number > 100){ classes.push('green'); }
            //     break;
            // case TableColumn.week52BelowHigh:
            //     if(number < 20){ classes.push('lightGreen'); }
            //     if(number < 5){ classes.push('green'); }
            //     if(number > 50){ classes.push('lightRed'); }
            //     if(number > 100){ classes.push('red'); }
            //     break;
            // case TableColumn.trailingPE:
            //     classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.forwardPE:
            //     const trailingPE = Number.parseFloat(rowData[TableColumn.trailingPE]);
            //     if(number > avg){
            //         classes.push(number  > trailingPE ? 'red' : 'lightRed' );
            //     } else{
            //         classes.push(number  < trailingPE ? 'green' : 'lightGreen' );
            //     }
            //     break;
            // case TableColumn.priceEarningGrowth:
            //     if (number < 1) classes.push('green');
            //     else if (number > 3) classes.push('red');
            //     else classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.priceSales:
            //     classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.enterpriseValueRevenue:
            //     classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
            // case TableColumn.enterpriseValueEBITDA:
            //     if (number < 10) classes.push('green');
            //     else if (number > 20) classes.push('red');
            //     else classes.push(number > avg ? 'lightRed' : 'lightGreen');
            //     break;
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
            case TableColumn.week52Change:
            case TableColumn.week52Low:
            case TableColumn.week52High:
            case TableColumn.periodValuationMeasures:
                return 'hidden';
            default:
                return '';
        }
    }
}