import React from "react"
import 'font-awesome/css/font-awesome.min.css'
import {FormattingUtils} from "../../utils/FormattingUtils"
import './FundamentalsTable.css'
import {FundamentalsCell} from "../../model/table/FundamentalsCell";

export interface FundamentalsTableProps {
    title: string
    headerLabels: string[]
    headerData: FundamentalsCell[]
    data: FundamentalsCell[][]
    onStockClickHandler?: (stockSymbol: string) => void
}

export interface FundamentalsTableState {
    selectedRow: number
    sortAsc: boolean
    sortedBy: number
    sortedData: FundamentalsCell[][]
}

export class FundamentalsTable extends React.Component<FundamentalsTableProps, FundamentalsTableState> {

    private SORT_DEFAULT_ASC = true

    constructor(props: Readonly<FundamentalsTableProps>) {
        super(props)
        this.state = {
            selectedRow: undefined,
            sortAsc: this.SORT_DEFAULT_ASC,
            sortedBy: undefined,
            sortedData: this.props.data
        }
    }

    componentWillReceiveProps(nextProps: Readonly<FundamentalsTableProps>, nextContext: any) {
        this.setState(
            {sortedData: nextProps.data}
        )
    }

    render = () => {
        return (
            <div className='FundamentalsTable'>
                <div className='TableName'>{this.props.title}</div>
                {this.renderTable()}
            </div>
        )
    }

    renderTable() {
        return (
            <table>
                {this.renderHeader(this.state.sortedData, this.props.headerLabels, this.props.headerData)}
                {this.renderBody(this.state.sortedData, this.props.headerData)}
            </table>

        )
    }

    renderHeader(data: FundamentalsCell[][], headerLabels: string[], headerAverages: FundamentalsCell[]) {
        const labelsRow = headerLabels.map((field, column) => {
                return <th key={column}
                           onClick={() => this.setSortedField(column)}>
                    {data[0][column] && data[0][column].isGrowth? <i className="fa fa-line-chart"/>:undefined}
                    {FormattingUtils.toFieldLabel(field)}
                </th>
            }
        )
        const averagesRow = headerAverages.map((value, column) => {
                return <th key={column}>
                    {FormattingUtils.formatCellValue(value)}
                </th>
            }
        )

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
                    .sort((row1, row2) => FundamentalsTable.sortData(row1, row2, column, sortAsc))
            }
        })
    }

    private static sortData(row1: FundamentalsCell[], row2: FundamentalsCell[], column: number, asc: boolean): number {
        let cell1 = row1[column]
        let cell2 = row2[column]

        if (!cell1.value) {
            return asc ? -1 : 1
        }
        if (!cell2.value) {
            return asc ? 1 : -1
        }
        if (cell1.value > cell2.value) {
            return asc ? 1 : -1
        }
        if (cell1.value < cell2.value) {
            return asc ? -1 : 1
        }
        return 0
    }

    renderBody(data: FundamentalsCell[][], averages: any[]) {
        const rows = data.map((rowData, rowsEtf) =>
            this.renderRow(rowData, rowsEtf, averages)
        )
        return (
            <tbody>{rows}</tbody>
        )
    }

    renderRow(rowData: FundamentalsCell[], row, averages: any[]) {
        const rowValues = rowData.map((data, column) =>
            <td key={column}
                onClick={() => {
                    const symbol = rowData[0]
                    this.props.onStockClickHandler(symbol.value.toString())
                }}
                className={data.classes.join(' ')}
                title={data.title}
            >
                <span>{
                    FormattingUtils.formatCellValue(data)
                }</span>
                <span
                    className={"score"}>{data.score? data.score.toFixed(0) : ''}</span>
            </td>
        )
        return (
            <tr key={row} className={this.rowClass(row)}
                onClick={() => this.setSelectedRow(row)}>{rowValues}</tr>
        )
    }

    rowClass(row: number): string {
        return row === this.state.selectedRow ? 'selected' : ''
    }

    private setSelectedRow(row: number) {
        this.setState(state => {
            return {selectedRow: state.selectedRow === row ? undefined : row}
        })
    }
}