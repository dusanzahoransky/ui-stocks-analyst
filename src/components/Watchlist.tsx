import React from "react";
import {WatchlistTable} from "./WatchlistTable";
import {StockAnalysisResult} from "../model/StockAnalysisResult";
import {IndicesAnalysisResult} from "../model/IndicesAnalysisResult";
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
import {StockRatiosPeriods} from "../model/StockRatiosPeriods";
import {RatioChart} from "./RatioChart";
import {RatioChartData} from "../model/RatioChartData";
import {ChartRatios} from "../model/ChartRatios";


export interface WatchlistProps {
    watchlist: string
    result?: StockAnalysisResult | IndicesAnalysisResult,
    peRatio: number,
    onRefreshClickHandler?: (watchlist: string) => void,
    onRefreshRatiosClickHandler?: (watchlist: string) => void,
    onShowClickHandler?: (watchlist: string) => void,
    isPreset: boolean
    isIndex: boolean
    isLoaded: boolean
}

export interface WatchlistState {
    priceEpsData?: PriceEpsDataRaw[]
    ratiosData?: StockRatiosPeriods
    /**
     * Remove outliers which would otherwise deform the chart, e.g. an EP which is extremely high in a single quarter
     */
    priceEpsChartRemoveOutliers?: boolean
    indicesChartSymbols?: string[]
    chartLabel?: string
}

export class Watchlist extends React.Component<WatchlistProps, WatchlistState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<WatchlistProps>) {
        super(props);
        this.state = {
            // priceEpsData: undefined,
            // ratiosData: undefined,
            //uncomment to render chart of the first stock on load
            priceEpsData: props.result ? props.result.stocks[0].stockInfo.chartData : undefined,
            ratiosData: props.result ? props.result.stocks[0].stockRatiosTimeline.periods : undefined,
            // indicesChartSymbols: ['VTS', 'VUSA'],
            indicesChartSymbols: [],
            priceEpsChartRemoveOutliers: true
        }
        this.stockAnalystService = new StockAnalystService();

    }

    render() {
        const {watchlist, result, peRatio} = this.props;

        const table = this.renderTable(result)
        const charts = this.props.isIndex ? this.renderIndicesChart() : this.renderCompanyCharts(peRatio, this.state.priceEpsData, this.state.ratiosData)

        const refreshLink = this.props.isPreset && this.props.isLoaded ?
            <span className="refresh">
                <i className="fa fa-refresh" onClick={() => this.props.onRefreshClickHandler(watchlist)}/> Yahoo
            </span> : ''

        const refreshRatiosLink = this.props.isPreset && this.props.isLoaded ?
            <span className="refresh">
                <i className="fa fa-refresh refreshRatios"
                   onClick={() => this.props.onRefreshRatiosClickHandler(watchlist)}/> MorningStar
            </span> : ''

        const showLink = this.props.isPreset ?
            <i className="fa fa-caret-down" onClick={() => this.props.onShowClickHandler(watchlist)}/> : ''

        return <div
            className="Watchlist"
            key={watchlist}>
            <h2 className={"WatchlistName " + (this.props.isIndex ? "Index" : "Stock")}>
                {showLink} {Watchlist.toWatchlistLabel(watchlist)}{refreshLink}{refreshRatiosLink}</h2>
            {table}
            {charts}
        </div>
    }

    renderIndicesChart() {
        if (!this.props.isLoaded || this.state.indicesChartSymbols.length === 0) {
            return ''
        }
        const chartData = this.prepareIndicesChartData(this.props.result.stocks);
        return <div className={!chartData ? 'hidden' : ''}>
            <IndicesPriceChart
                data={chartData}
                symbols={this.state.indicesChartSymbols}
                description={`Performance of all indices in the watchlist`}/>
        </div>
    }

    renderCompanyCharts(peRatio: number, priceEpsData?: PriceEpsDataRaw[], ratiosData?: StockRatiosPeriods) {
        if (!this.props.isLoaded || !priceEpsData) {
            return ''
        }
        const chartData = this.prepareEpsChartData(priceEpsData, peRatio);
        const priceEpsChart = <PriceEpsChart
            data={chartData}
            description={`Price and earnings line of ${this.state.chartLabel} with EPS scale of ${peRatio}`}/>;

        const periods = Object.keys(ratiosData);
        const ratiosCharts = Watchlist.getChartRatios().map(ratio => {
            const chartData: RatioChartData[] = periods.map(period => {
                return {
                    date: period,
                    value: ratiosData[period][ratio] as number
                }
            });
            return <RatioChart
                key={ratio}
                data={chartData}
                label={`${ChartRatios[ratio]}`}/>
        })

        return <div>
            <div className={!chartData ? 'hidden' : ''}>{priceEpsChart}</div>
            <div className={!ratiosData ? 'hidden' : ''}>{ratiosCharts}</div>
        </div>

    }

    private static getChartRatios(): string[] {
        const enumNames = []

        for (const enumMember in ChartRatios) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                enumNames.push(enumMember)
            }
        }

        return enumNames
    }

    getStockInfo(result: StockAnalysisResult | IndicesAnalysisResult, isIndex: boolean): StockInfo[] {
        return this.props.isIndex ?
            (result as IndicesAnalysisResult).stocks :
            (result as StockAnalysisResult).stocks.map(s => s.stockInfo)
    }

    renderTable(result?: StockAnalysisResult | IndicesAnalysisResult) {
        if (!this.props.isLoaded) {
            return ''
        } else {
            const stocksInfo: StockInfo[] = this.getStockInfo(result, this.props.isIndex)    //one more level of nesting
            const headers = this.toHeaderData(result.averages);
            let data = this.toTableData(stocksInfo);
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
        if (this.props.isIndex) {
            let updatedSymbols;
            if (this.state.indicesChartSymbols.includes(stockSymbol)) {
                updatedSymbols = this.state.indicesChartSymbols.filter(s => s !== stockSymbol)
            } else {
                updatedSymbols = this.state.indicesChartSymbols.concat(stockSymbol)
            }
            this.setState(state => {
                return {
                    indicesChartSymbols: updatedSymbols
                }
            })
        } else {
            let clickedStockWithRatios = this.props.result.stocks
                .filter(stock => stock.stockInfo.symbol === stockSymbol)[0];
            const priceEpsData = clickedStockWithRatios.stockInfo.chartData
            const ratiosData = clickedStockWithRatios.stockRatiosTimeline.periods

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
                        ratiosData,
                        chartLabel: stockSymbol as string
                    }
                })
            }
        }
    }

    toHeaderData(averages: StockInfo): any[][] {
        averages = this.stockAnalystService.filterDisplayableStats(averages, this.props.isIndex)
        const headersRow = Object.keys(averages)
            .concat('Score', 'Rule 1 Score')

        const averagesRow = Object.keys(averages)
            .map(key => averages[key])
            .concat(0, 0)

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
                .map(key => stock[key] ? stock[key] : '')
            rows.push(rowValues);
        }
        return rows;
    }

    private prepareIndicesChartData(stocks: StockInfo[]): IndicesChartData[] | undefined {

        const chartStocks = stocks.filter(s => this.state.indicesChartSymbols.includes(s.symbol))

        const allDates = Array.from(new Set(chartStocks.flatMap(s => s.chartData.map(d => d.date))))
            .sort()

        const chartData = new Array<IndicesChartData>(allDates.length)
        for (let i = 0; i < allDates.length; i++) {
            const date = allDates[i]
            const dataPoint: IndicesChartData = {
                date: moment(allDates[i] * 1000).format('YYYY-MM-DD')
            }
            for (const stock of chartStocks) {
                let chartDataAtDate = stock.chartData.filter(d => d.date === date)[0];
                if (chartDataAtDate) {
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


    private static toWatchlistLabel(watchlist: string) {
        return watchlist
            .replace(/[a-zA-Z]+/g, function (g) {
                switch (g) {
                    case 'AUD':
                    case 'EUR':
                    case 'USD':
                    case 'AU':
                    case 'US':
                    case 'CHF':
                    case 'GBP':
                        return g;
                    default:
                        return g[0].toUpperCase().concat(g.substr(1).toLowerCase());
                }

            })
            .replace(/_/g, ' ')
    }
}

