import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './Table.css';

export enum Column {
    ticker,
    companyName,
    price,
    change,
    totalCashPerShare,
    totalDebtEquity,
    quarterlyRevenueGrowth,
    quarterlyEarningsGrowth,
    dilutedEarningPerShare,
    week52Change,
    week52Low,
    week52High,
    period,
    marketCap,
    enterpriseValue,
    trailingPE,
    forwardPE,
    priceEarningGrowth,
    priceSales,
    priceBook,
    enterpriseValueRevenue,
    enterpriseValueEBITDA,
}

export interface TableProps {
    headers: string[][];
    data: string[][];
    sortField?: Column;
}

export interface TableState {
    sortAsc: boolean;
    sortedBy: Column;
    sortedData: string[][];
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
                {this.renderHeader(this.props.headers)}
                {this.renderBody(this.state.sortedData, this.props.headers[1])}
            </table>

        )
    }

    renderHeader(header: string[][]) {
        const headersRow = header[0].map((field, columnIndex) =>
            <th key={field} className={this.columnClass(columnIndex)}>
                <i className="fa fa-sort" onClick={() => this.setSortedField(columnIndex)}/>
                {FormattingUtils.statLabel(field)}
            </th>
        );
        let averagesRow = header[1].map((value, columnIndex) =>
            <th key={value} className={this.columnClass(columnIndex)}>{FormattingUtils.format(header[1], value, columnIndex)}</th>
        );

        return (
            <thead>
            <tr>{headersRow}</tr>
            <tr>{averagesRow}</tr>
            </thead>
        )
    }

    setSortedField(column: Column) {
        if (this.state.sortedBy == column) {
            this.setState({sortAsc: !this.state.sortAsc})
        }
        this.setState({sortedBy: column});
        const sortedData = this.state.sortedData.sort((row1, row2) => {
            if (row1[column] > row2[column]) {
                return this.state.sortAsc ? 1 : -1
            }
            if (row1[column] < row2[column]) {
                return this.state.sortAsc ? -1 : 1
            }
            return 0;
        });
        this.setState(
            {sortedData}
        )
    }

    renderBody(data: string[][], averages: string[]) {
        const rows = data.map((rowData, rowsIndex) =>
            this.renderRow(rowData, rowsIndex, averages)
        );
        return (
            <tbody>{rows}</tbody>
        )
    }

    renderRow(rowData: string[], rowIndex, averages: string[]) {
        const rowValues = rowData.map((value, columnIndex) =>
            <td key={columnIndex}
                className={this.dataCellClass(rowData, value, averages[columnIndex], columnIndex)}>
                {FormattingUtils.format(rowData, value, columnIndex)}</td>
        );
        return (
            <tr key={rowIndex}>{rowValues}</tr>
        )
    }

    dataCellClass(rowData: string[], value: string, average: string, columnIndex: number): string {
        let classes = [];
        let number = Number.parseFloat(value);
        const avg = Number.parseFloat(average);

        if (columnIndex === Column.companyName) {
            classes.push('companyName');
        }
        if (columnIndex === Column.change) {
            classes.push('companyName');
        }

        const price = Number.parseFloat(rowData[Column.price]);

        switch (columnIndex) {
            case Column.ticker:
            case Column.period:
            case Column.marketCap:
            case Column.enterpriseValue:
                classes.push('');
                break;
            case Column.change:
                classes.push(value.startsWith('-') ? 'lightRed' : 'lightGreen');
                break;
            case Column.totalCashPerShare:
                classes.push(number / price > 0.2 ? 'lightGreen' :  number / price < 0.01 ? 'lightRed' : '');
                break;
            case Column.totalDebtEquity:
                if (number < 1) classes.push('green');
                else if (number > 100) classes.push('red');
                else classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.quarterlyRevenueGrowth:
                if (number > 20) classes.push('green');
                else if (number < 0) classes.push('red');
                else classes.push(number < avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.quarterlyEarningsGrowth:
                if (number > 20) classes.push('green');
                else if (number < 0) classes.push('red');
                else classes.push(number < avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.dilutedEarningPerShare:
                //classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.week52Change:
                classes.push(number < 0 ? 'lightRed' : 'lightGreen');
                break;
            case Column.week52Low:
                number = (price - number) / price * 100;
                classes.push(number > 100 ? 'lightRed' : number < 20 ? 'lightGreen' : '');
                break;
            case Column.week52High:
                number = (number - price) / price * 100;
                if (number > 100) classes.push('green');
                else if (number < 10) classes.push('red');
                classes.push(number > 50 ? 'lightGreen' : number < 20 ? 'lightRed' : '');
                break;
            case Column.trailingPE:
                classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.forwardPE:
                classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.priceEarningGrowth:
                if (number < 1) classes.push('green');
                else if (number > 2) classes.push('red');
                else classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.priceSales:
                classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.priceBook:
                classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.enterpriseValueRevenue:
                classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
            case Column.enterpriseValueEBITDA:
                if (number < 10) classes.push('green');
                else if (number > 20) classes.push('red');
                else classes.push(number > avg ? 'lightRed' : 'lightGreen');
                break;
        }

        classes.push(this.columnClass(columnIndex));

        return classes.join(' ');
    }

    private columnClass(columnIndex: number) {
        switch (columnIndex) {
            case Column.enterpriseValue:
            case Column.marketCap:
            case Column.period:
                return 'hidden';
            default:
                return '';
        }
    }
}