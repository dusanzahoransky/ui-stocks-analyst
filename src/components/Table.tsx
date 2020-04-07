import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './Table.css';

export enum Column {
    ticker,
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
        const averagesRow = header[1].map( (value, columnIndex) =>
            <th key={value} className={this.columnClass(columnIndex)}>{FormattingUtils.format(value)}</th>
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
                className={ this.columnClass(columnIndex) + ' ' + this.cellClass(value, averages[columnIndex], columnIndex)}>
                {FormattingUtils.format(value)}</td>
        );
        return (
            <tr key={rowIndex}>{rowValues}</tr>
        )
    }

    cellClass(value: string, average: string, columnIndex: number): string {
        const number = Number.parseFloat(value);
        const avg = Number.parseFloat(average);
        if (isNaN(number)) {
            return '';
        }

        switch (columnIndex) {
            case Column.ticker:
                return '';
            case Column.period:
                return '';
            case Column.marketCap:
                return '';
            case Column.enterpriseValue:
                return '';
            case Column.trailingPE:
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.forwardPE:
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.priceEarningGrowth:
                if (number < 1) return 'green';
                if (number > 2) return 'red';
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.priceSales:
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.priceBook:
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.enterpriseValueRevenue:
                return number > avg ? 'lightRed' : 'lightGreen';
            case Column.enterpriseValueEBITDA:
                if (number < 10) return 'green';
                if (number > 20) return 'red';
                return number > avg ? 'lightRed' : 'lightGreen';
        }

        return ''
    }

    private columnClass(columnIndex: number) {
        switch (columnIndex) {
            case Column.enterpriseValue:
            case Column.marketCap:
            case Column.period:
                return 'hidden';
            default: return '';
        }
    }
}