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
import {StockInfo} from "../model/StockInfo";
import {IndicesChartData} from "../model/IndicesChartData";
import {IndicesPriceChart} from "./IndicesPriceChart";


export interface WatchlistProps {
    watchlist: string
    result?: AnalysisResult,
    peRatio: number,
    onRefreshClickHandler?: (watchlist: string) => void,
    onShowClickHandler?: (watchlist: string) => void,
    isPreset: boolean
    isIndex: boolean
    isLoaded: boolean
}

export interface WatchlistState {
    priceEpsData?: PriceEpsDataRaw[]
    indicesChartSymbols?: string[]
    chartLabel?: string
}

export class Watchlist extends React.Component<WatchlistProps, WatchlistState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<WatchlistProps>) {
        super(props);
        this.state = {
            priceEpsData: undefined,
            //uncomment to render chart of the first stock on load
            // priceEpsData: props.result ? props.result.stocks[0].chartData : undefined
            indicesChartSymbols: []
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
            if (this.props.isIndex && this.state.indicesChartSymbols.length > 0) {
                const chartData = this.prepareIndicesChartData(this.props.result.stocks);
                return <div className={!chartData ? 'hidden' : ''}>
                    <IndicesPriceChart
                        data={chartData}
                        symbols={this.state.indicesChartSymbols}
                        description={`Performance of all indices in the watchlist`}/>
                </div>
            } else {
                const chartData = this.prepareEpsChartData(priceEpsData, peRatio);
                return <div className={!chartData ? 'hidden' : ''}>
                    <PriceEpsChart
                        data={chartData}
                        description={`Price and earnings line of ${this.state.chartLabel} with EPS scale of ${peRatio}`}/>
                </div>
            }
        }
    }

    renderTable(result?: AnalysisResult) {
        if (!this.props.isLoaded) {
            return ''
        } else {
            const headers = this.toHeaderData(result.averages);
            let data = this.toTableData(result.stocks);
            const scoredData = data.map(row => this.stockAnalystService.scoreRow(headers[1], row, this.props.isIndex))
            return <WatchlistTable
                data={scoredData}
                isIndex={this.props.isIndex}
                headerLabels={headers[0]}
                headerAverages={headers[1]}
                onStockClickHandler={this.stockOnClickHandler}
            />
        }
    }

    stockOnClickHandler = (stockSymbol: string) => {
        if(this.props.isIndex){
            let updatedSymbols;
            if(this.state.indicesChartSymbols.includes(stockSymbol)){
                updatedSymbols = this.state.indicesChartSymbols.filter( s => s !== stockSymbol)
            } else{
                updatedSymbols = this.state.indicesChartSymbols.concat(stockSymbol)
            }
            this.setState(state => {
                return {
                    indicesChartSymbols: updatedSymbols
                }
            })
        } else {
            const priceEpsData = this.props.result.stocks
                .filter(stock => stock.symbol === stockSymbol)
                .map(stock => stock.chartData)[0]

            //close the graph on a second click
            if (this.state.priceEpsData === priceEpsData) {
                this.setState(state => {
                    return {
                        priceEpsData: undefined
                    }
                })
            } else {
                this.setState(state => {
                    return {
                        priceEpsData,
                        chartLabel: stockSymbol as string
                    }
                })
            }
        }
    }

    toHeaderData(averages: StockInfo): any[][] {
        averages = this.stockAnalystService.filterDisplayableStats(averages, this.props.isIndex)
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
            stock = this.stockAnalystService.filterDisplayableStats(stock, this.props.isIndex)
            const rowValues = Object.keys(stock)
                .filter(key => key !== 'periodValuationMeasures')
                .map(key => stock[key] ? stock[key] : '')
            rows.push(rowValues);
        }
        return rows;
    }

    private prepareIndicesChartData(stocks: StockInfo[]): IndicesChartData[] | undefined {

        const chartStocks = stocks.filter(s => this.state.indicesChartSymbols.includes(s.symbol))

        const allDates = Array.from(new Set(chartStocks.flatMap(s => s.chartData.map(d => d.date))))
            .sort()

        const chartData = new Array(allDates.length)
        for(let i = 0; i < allDates.length; i++){
            const date = allDates[i]
            const dataPoint: IndicesChartData = {
                date: moment(allDates[i] * 1000).format('YYYY-MM-DD')
            }
            for(const stock of chartStocks){
                let chartDataAtDate = stock.chartData.filter(d => d.date === date)[0];
                if(chartDataAtDate){
                    dataPoint[stock.symbol] = chartDataAtDate.price
                }
            }
            chartData[i] = dataPoint
        }
        return chartData
    }
    private prepareEpsChartData(priceEpsData: PriceEpsDataRaw[], peRatio: number): PriceEpsData[] | undefined {
        if (!priceEpsData) return undefined

        const round1Dec = (value?: number) => value ? Math.round(value * 10) / 10 : undefined;
        const round2Dec = (value?: number) => value ? Math.round(value * 10) / 10 : undefined;

        return priceEpsData.map(data => {
            const price = round1Dec(data.price);
            const epsQuarterly = round1Dec(data.epsQuarterly * peRatio * 4);
            const epsAnnually = round1Dec(data.epsAnnually * peRatio);
            const peQuarterly = round2Dec(data.peQuarterly);
            const peAnnually = round2Dec(data.peAnnually);
            const processedData: PriceEpsData = {
                date: moment(data.date * 1000).format('YYYY-MM-DD'),
                price,
                epsQuarterly,
                epsAnnually,
                peQuarterly,
                peAnnually,
            }
            return processedData
        })
    }
}

