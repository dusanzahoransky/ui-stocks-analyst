import React from "react";
import {WatchlistTable} from "./WatchlistTable";
import {AnalysisResult} from "../model/AnalysisResult";
import {StockAnalystService} from "../services/StockAnalystService";
import {PriceEpsChart} from "./PriceEpsChart";
import {PriceEpsDataRaw} from "../model/PriceEpsDataRaw";
import {PriceEpsData} from "../model/PriceEpsData";
import "./Watchlist.css";
import 'font-awesome/css/font-awesome.min.css';
import moment from "moment";
import {CellData} from "../model/CellData";
import {StockInfo} from "../model/StockInfo";


export interface WatchlistProps {
    watchlist: string
    result?: AnalysisResult,
    peRatio: number,
    onRefreshClickHandler?: (watchlist: string) => void,
    onShowClickHandler?: (watchlist: string) => void,
    isPreset: boolean
    isLoaded: boolean
}

export interface WatchlistState {
    priceEpsData?: PriceEpsDataRaw[]
    chartLabel?: string
}

export class Watchlist extends React.Component<WatchlistProps, WatchlistState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<WatchlistProps>) {
        super(props);
        this.state = {
            priceEpsData: undefined
        }
        this.stockAnalystService = new StockAnalystService();
    }

    render() {
        const {watchlist, result, peRatio} = this.props;

        const table = this.renderTable(result)
        const epsChart = this.renderEpsChart(peRatio, this.state.priceEpsData)

        const refreshLink = this.props.isPreset && this.props.isLoaded ?
            <i className="fa fa-refresh" onClick={() => this.props.onRefreshClickHandler(watchlist)}/> : ''

        const showLink = this.props.isPreset ?
            <i className="fa fa-caret-down" onClick={() => this.props.onShowClickHandler(watchlist)}/> : ''

        return <div
            className="Watchlist" key={watchlist}>
            <h2 className="WatchlistName">{showLink} Watchlist: {watchlist}{refreshLink}</h2>
            {epsChart}
            {table}
        </div>
    }

    renderEpsChart(peRatio: number, priceEpsData?: PriceEpsDataRaw[]) {
        if (!this.props.isLoaded) {
            return ''
        } else {
            const chartData = this.prepareEpsChartData(this.state.priceEpsData, peRatio);
            return <div className={!chartData ? 'hidden' : ''}>
                <PriceEpsChart
                    data={chartData}
                    description={`Price and earnings line of ${this.state.chartLabel} with EPS scale of ${peRatio}`}/>
            </div>
        }
    }

    renderTable(result?: AnalysisResult) {
        if (!this.props.isLoaded) {
            return ''
        } else {
            const headers = this.toHeaderData(result.averages);
            let data = this.toTableData(result.stocks);
            const scoredData = data.map(row => this.stockAnalystService.scoreRow(headers[1], row))
            return <WatchlistTable
                data={scoredData}
                headerLabels={headers[0]}
                headerAverages={headers[1]}
                onStockClickHandler={this.stockOnClickHandler}
            />
        }
    }

    stockOnClickHandler = (rowData: CellData[], rowIndex: number, columnIndex: number) => {
        const stockSymbol = rowData[columnIndex].value;

        const priceEpsData = this.props.result.stocks
            .filter(stock => stock.symbol === stockSymbol)
            .map(stock => stock.chartData)[0]

        //close the graph on a second click
        if (this.state.priceEpsData === priceEpsData) {
            this.setState({
                priceEpsData: undefined
            })
        } else {
            this.setState({
                priceEpsData,
                chartLabel: stockSymbol as string
            })
        }
    }

    toHeaderData(averages: StockInfo): any[][] {
        averages = this.stockAnalystService.filterDisplayableStats(averages)
        const headersRow = Object.keys(averages)
            .filter(key => key !== 'periodValuationMeasures')
            .concat('Score')

        const averagesRow = Object.keys(averages)
            .filter(key => key !== 'periodValuationMeasures')
            .map(key => averages[key])
            .concat(0)

        return [
            headersRow,
            averagesRow
        ]
    }

    toTableData(stocks: StockInfo[]): any[][] {
        let rows = [];
        for (let stock of stocks) {
            stock = this.stockAnalystService.filterDisplayableStats(stock)
            const rowValues = Object.keys(stock)
                .filter(key => key !== 'periodValuationMeasures')
                .map(key => stock[key] ? stock[key] : '')
            rows.push(rowValues);
        }
        return rows;
    }

    private prepareEpsChartData(priceEpsData: PriceEpsDataRaw[], peRatio: number): PriceEpsData[] | undefined {
        if (!priceEpsData) return undefined
        return priceEpsData.map(data => {
            return {
                date: moment(data.date * 1000).format('YYYY-MM-DD'),
                price: Math.round(data.price * 10) / 10,
                eps: data.eps ? Math.round(data.eps * peRatio * 4 * 10) / 10 : undefined
            }
        })
    }
}

