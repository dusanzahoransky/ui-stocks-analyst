import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {FormattingUtils} from "../utils/FormattingUtils";
import './WatchlistTable.css';
import {StockFields} from "../model/StockFields";
import {CellData} from "../model/CellData";
import {EtfTableColumn} from "../model/EtfTableColumn";
import {StockTaggingService} from "../services/StockTaggingService";
import {CellTag} from "../model/CellTag";

export interface TableProps {
    headerLabels: string[]
    headerAverages: number[]
    data: CellData[][]
    isEtf: boolean
    sortField?: number
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
        const labelsRow = headerLabels.map((field, column) => {
                let cellTags = StockTaggingService.tagColumn(column, this.props.isEtf);
                return <th key={column}
                           className={'label ' + this.toClasses(cellTags, column, this.props.isEtf)}
                           onClick={() => this.setSortedField(column)}>
                    <i className="fa fa-sort"/>
                    {FormattingUtils.toFieldLabel(field)}
                </th>;
            }
        );
        const averagesRow = headerAverages.map((value, column) => {
                let cellTags = StockTaggingService.tagColumn(column, this.props.isEtf);
                return <th key={column}
                           className={this.toClasses(cellTags, column, this.props.isEtf)}>
                    {
                        this.props.isEtf ?
                            FormattingUtils.formatEtf(headerAverages, value, column) :
                            FormattingUtils.formatStock(headerAverages, value, column)
                    }</th>;
            }
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
                <span
                    className={"score"}>{data.score && typeof data.score === 'number' ? data.score.toFixed(0) : ''}</span>
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

        if (data.additionalInfo !== undefined) {
            classes.push('additionalInfo')
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

        classes.push(this.toClasses(data.tags, column, this.props.isEtf))

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
            } else if (column >= StockFields.score && column <= StockFields.rule1score) {   //Score
                if (data.value < 0) {
                    classes.push('redText')
                    classes.push('boldText')
                } else {
                    classes.push('greenText')
                    classes.push('boldText')
                }
            }
        }

        return classes.join(' ');
    }

    private setSelectedRow(row: number) {
        this.setState(state => {
            return {
                selectedRow: state.selectedRow === row ? undefined : row
            }
        })
    }

    private toClasses(cellTags: CellTag[], column: number, isEtf: boolean): string {
        if(!cellTags){
            return ''
        }
        if(this.isHidden(column, isEtf)){
            cellTags = cellTags.concat(CellTag.hidden)
        }
        return cellTags.map(tag => CellTag[tag]).join(' ');
    }

    private isHidden(column: number, isEtf: boolean): boolean {
        const colTags = isEtf ? StockTaggingService.tagEtfColumn(column) : StockTaggingService.tagStockColumn(column)
        return this.props.hiddenTags.some(hiddenTag => colTags.includes(hiddenTag))
    }
}