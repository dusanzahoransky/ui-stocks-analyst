import React from "react"
import 'font-awesome/css/font-awesome.min.css'
import {FormattingUtils} from "../utils/FormattingUtils"
import './WatchlistTable.css'
import {StockFields} from "../model/StockFields"
import {CellData} from "../model/table/CellData"
import {EtfFields} from "../model/EtfFields"
import {StockTaggingService} from "../services/StockTaggingService"
import {CellTag} from "../model/table/CellTag"
import {Watchlist} from "./Watchlist"

export interface TableProps {
    headerLabels: string[]
    headerData: CellData[]
    data: CellData[][]
    isEtf: boolean
    sortField?: number
    visibleTags: CellTag[]
    hiddenTags: CellTag[]
    onStockClickHandler?: (stockSymbol: string) => void
}

export interface TableState {
    selectedRow: number
    sortAsc: boolean
    sortedBy: number
    sortedData: CellData[][]
}

export class WatchlistTable extends React.Component<TableProps, TableState> {

    private SORT_DEFAULT_ASC = true

    constructor(props: Readonly<TableProps>) {
        super(props)
        this.state = {
            selectedRow: undefined,
            sortAsc: this.SORT_DEFAULT_ASC,
            sortedBy: undefined,
            sortedData: this.props.data
        }
    }

    componentWillReceiveProps(nextProps: Readonly<TableProps>, nextContext: any) {
        this.setState(
            {
                sortedData: nextProps.data
            }
        )
    }

    render = () => {
        return (
            <div className='Table'>
                {this.renderTable()}
            </div>
        )
    }

    renderTable() {
        return (
            <table>
                {this.renderHeader(this.props.headerLabels, this.props.headerData)}
                {this.renderBody(this.state.sortedData, this.props.headerData)}
            </table>

        )
    }

    renderHeader(headerLabels: string[], headerAverages: CellData[]) {
        const labelsRow = headerLabels.map((field, column) => {
                let cellTags = StockTaggingService.tagColumn(column, this.props.isEtf)
                return <th key={column}
                           className={'label ' + this.toClasses(cellTags, column, this.props.isEtf)}
                           onClick={() => this.setSortedField(column)}
                           title={this.headerTitle(column, cellTags)}>
                    <i className="fa fa-sort"/>
                    {FormattingUtils.toFieldLabel(field)}
                    {/* uncomment to see the real stock fields, vs enumerated fields in case of any mismatch */}
                    {/*{StockFields[column]}*/}
                    {/* uncomment to see the tags */}
                    {/*{' ['+cellTags.map(t => CellTag[t]).join(' ')+']'}*/}
                </th>
            }
        )
        const averagesRow = headerAverages.map((value, column) => {
                let cellTags = StockTaggingService.tagColumn(column, this.props.isEtf)
                return <th key={column}
                           className={this.toClasses(cellTags, column, this.props.isEtf)}>
                    {
                        this.props.isEtf ?
                            FormattingUtils.formatEtf(value, column) :
                            FormattingUtils.formatStock(value, column)
                    }</th>
            }
        )

        return (
            <thead>
            <tr>{labelsRow}</tr>
            <tr>{averagesRow}</tr>
            </thead>
        )
    }

    private headerTitle(column: number, cellTags: CellTag[] = []): string {
        const title =
`Field: ${StockFields[column]}
Tags: ${cellTags.map(tag => CellTag[tag]).join(", ")}`
        return title
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
        let cell1 = row1[column]
        let cell2 = row2[column]

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
        return 0
    }

    renderBody(data: CellData[][], averages: any[]) {
        const rows = data.map((rowData, rowsEtf) =>
            this.renderRow(rowData, rowsEtf, averages)
        )
        return (
            <tbody>{rows}</tbody>
        )
    }

    renderRow(rowData: CellData[], row, averages: any[]) {
        const rowValues = rowData.map((data, column) =>
            <td key={column}
                onClick={() => {
                    const symbol = this.props.isEtf? rowData[EtfFields.symbol]: rowData[StockFields.symbol]
                    this.props.onStockClickHandler(symbol.value as string)
                }}
                className={this.dataCellClass(rowData, data, averages[column], column)}>
                <span>{
                    this.props.isEtf ?
                        FormattingUtils.formatEtf(data, column)
                        : FormattingUtils.formatStock(data, column)
                }</span>
                <span
                    className={"score"}>{data.score && typeof data.score === 'number' ? data.score.toFixed(0) : ''}</span>
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

    dataCellClass(rowData: any[], data: CellData, average: any, column: number): string {
        let classes = []

        if (data.additionalInfo !== undefined) {
            classes.push('additionalInfo')
        }

        let score = Number.isNaN(data.score) ? 0 : data.score
        if (score) {
            if (score < -10) {
                FormattingUtils.isGrowth(data.tags) ? classes.push('redText') : classes.push('red')
            } else if (score < 0) {
                FormattingUtils.isGrowth(data.tags) ? classes.push('lightRedText') : classes.push('lightRed')
            } else if (score > 10) {
                FormattingUtils.isGrowth(data.tags) ? classes.push('greenText') : classes.push('green')
              } else if (score > 0) {
                FormattingUtils.isGrowth(data.tags) ? classes.push('lightGreenText') : classes.push('lightGreen')
            }
        }

        classes.push(this.toClasses(data.tags, column, this.props.isEtf))

        if (this.props.isEtf) {
            if (column === EtfFields.change) {
                if (data.value < 0) {
                    classes.push('redText')
                } else {
                    classes.push('greenText')
                }
            } else if (column === EtfFields.score) {   //Score
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
            } else if (column >= StockFields.score) {   //Score
                if (data.value < 0) {
                    classes.push('redText')
                    classes.push('boldText')
                } else {
                    classes.push('greenText')
                    classes.push('boldText')
                }
            }
        }

        return classes.join(' ')
    }

    private setSelectedRow(row: number) {
        this.setState(state => {
            return {
                selectedRow: state.selectedRow === row ? undefined : row
            }
        })
    }

    private toClasses(cellTags: CellTag[], column: number, isEtf: boolean): string {
        if (!cellTags) {
            return ''
        }
        if (!this.isVisible(column, isEtf)) {
            cellTags = cellTags.concat(CellTag.hidden)
        }
        return cellTags.map(tag => CellTag[tag]).join(' ')
    }

    private isVisible(column: number, isEtf: boolean): boolean {
        if (isEtf) {
            return !StockTaggingService.tagEtfColumn(column).includes(CellTag.hidden)
        }

        const colTags = StockTaggingService.tagStockColumn(column)
        const canToggleVisibility = colTags.some(tag => Watchlist.DISPLAY_TOGGLES.includes(tag))  //do not hide cols which visibility can not be toggled by a checkbox

        const isHidden = colTags.some(colTag => this.props.hiddenTags.includes(colTag))
        const isDisplayed = colTags.some(colTag => this.props.visibleTags.includes(colTag))

        return !canToggleVisibility || (!isHidden && isDisplayed)
    }
}