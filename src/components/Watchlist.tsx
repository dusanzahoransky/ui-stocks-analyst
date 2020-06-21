import React from "react";
import {WatchlistTable} from "./WatchlistTable";
import {StockAnalysisResult} from "../model/StockAnalysisResult";
import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {StockAnalystService} from "../services/StockAnalystService";
import {PriceEpsChart} from "./PriceEpsChart";
import {PriceEpsDataRaw} from "../model/PriceEpsDataRaw";
import {PriceEpsData} from "../model/PriceEpsData";
import "./Watchlist.css";
import 'font-awesome/css/font-awesome.min.css';
import moment from "moment";
import {Stock} from "../model/Stock";
import {EtfsChartData} from "../model/EtfsChartData";
import {EtfsPriceChart} from "./EtfsPriceChart";
import {StockRatiosPeriods} from "../model/StockRatiosPeriods";
import {RatioChart} from "./RatioChart";
import {RatioChartData} from "../model/RatioChartData";
import {ChartRatios} from "../model/ChartRatios";
import {StockTaggingService} from "../services/StockTaggingService";


export interface WatchlistProps {
    watchlist: string
    result?: StockAnalysisResult | EtfsAnalysisResult,
    onRefreshYahooHandler?: (watchlist: string) => void,
    onRefreshMorningstarClickHandler?: (watchlist: string) => void,
    /**
     * On show/hide click
     */
    onShowClickHandler?: (watchlist: string) => void,
    /**
     * preset watchlist stored in DB or a custom on the fly created watchlist
     */
    isPreset: boolean
    /**
     * an ETF index or normal stock
     */
    isEtf: boolean
    /**
     * show the watchlist - render it as expanded, showing all the stocks
     */
    isExpanded: boolean
}

export interface WatchlistState {
    priceEpsData?: PriceEpsDataRaw[]
    ratiosData?: StockRatiosPeriods
    /**
     * Remove outliers which would otherwise deform the chart, e.g. an EP which is extremely high in a single quarter
     */
    priceEpsChartRemoveOutliers?: boolean
    etfsChartSymbols?: string[]
    chartLabel?: string
}

export class Watchlist extends React.Component<WatchlistProps, WatchlistState> {

    private readonly stockAnalystService: StockAnalystService;
    private readonly stockTaggingService: StockTaggingService;

    constructor(props: Readonly<WatchlistProps>) {
        super(props);
        this.state = {
            // priceEpsData: undefined,
            // ratiosData: undefined,
            //uncomment to render chart of the first stock on load
            // priceEpsData: props.result ? props.result.stocks[0].stock.chartData : undefined,
            // ratiosData: props.result ? props.result.stocks[0].stockRatiosTimeline.periods : undefined,
            // etfsChartSymbols: ['VTS', 'VUSA'],
            etfsChartSymbols: [],
            priceEpsChartRemoveOutliers: true
        }
        this.stockAnalystService = new StockAnalystService();
        this.stockTaggingService = new StockTaggingService();

    }

    render() {
        const {watchlist, result} = this.props;

        const table = this.renderTable(result)
        const charts = this.props.isEtf ? this.renderEtfsChart() : this.renderCompanyCharts(this.state.priceEpsData, this.state.ratiosData)

        const refreshLink = this.props.isPreset && this.props.isExpanded ?
            <span className="refresh">
                <i className="fa fa-refresh" onClick={() => this.props.onRefreshYahooHandler(watchlist)}/> Yahoo
            </span> : ''

        const refreshRatiosLink = this.props.isPreset && this.props.isExpanded ?
            <span className="refresh">
                <i className="fa fa-refresh refreshRatios"
                   onClick={() => this.props.onRefreshMorningstarClickHandler(watchlist)}/> MorningStar
            </span> : ''

        const showLink = this.props.isPreset ?
            <i className="fa fa-caret-down" onClick={() => this.props.onShowClickHandler(watchlist)}/> : ''

        return <div
            className="Watchlist"
            key={watchlist}>
            <h2 className={"WatchlistName " + (this.props.isEtf ? "Etf" : "Stock")}>
                {showLink} {Watchlist.toWatchlistLabel(watchlist)}{refreshLink}{refreshRatiosLink}</h2>
            {table}
            {charts}
        </div>
    }

    renderEtfsChart() {
        if (!this.props.isExpanded || this.state.etfsChartSymbols.length === 0) {
            return ''
        }
        const chartData = this.prepareEtfsChartData(this.props.result.stocks);
        return <div className={!chartData ? 'hidden' : ''}>
            <EtfsPriceChart
                data={chartData}
                symbols={this.state.etfsChartSymbols}
                label={`Etf price chart`}/>
        </div>
    }

    renderCompanyCharts(priceEpsData?: PriceEpsDataRaw[], ratiosData?: StockRatiosPeriods) {
        if (!this.props.isExpanded || !priceEpsData) {
            return ''
        }
        const peRatio = 15
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

    getStock(result: StockAnalysisResult | EtfsAnalysisResult, isEtf: boolean): Stock[] {
        return this.props.isEtf ?
            (result as EtfsAnalysisResult).stocks :
            (result as StockAnalysisResult).stocks.map(s => s.stock)
    }

    renderTable(result?: StockAnalysisResult | EtfsAnalysisResult) {
        if (!this.props.isExpanded) {
            return ''
        } else {
            const stocksInfo: Stock[] = this.getStock(result, this.props.isEtf)    //one more level of nesting
            const headers = this.toHeaderData(result.averages, this.props.isEtf);
            let data = this.toTableData(stocksInfo);
            const scoredData = data.map(row => this.stockAnalystService.scoreRow(headers[1], row, this.props.isEtf))
            const taggedData = scoredData.map(row => this.stockTaggingService.tagRow(row, this.props.isEtf))

            return <WatchlistTable
                data={taggedData}
                isEtf={this.props.isEtf}
                headerLabels={headers[0]}
                headerAverages={headers[1]}
                onStockClickHandler={this.stockOnClickHandler}
            />
        }
    }

    stockOnClickHandler = (stockSymbol: string) => {
        if (this.props.isEtf) {
            let updatedSymbols;
            if (this.state.etfsChartSymbols.includes(stockSymbol)) {
                updatedSymbols = this.state.etfsChartSymbols.filter(s => s !== stockSymbol)
            } else {
                updatedSymbols = this.state.etfsChartSymbols.concat(stockSymbol)
            }
            this.setState(state => {
                return {
                    etfsChartSymbols: updatedSymbols
                }
            })
        } else {
            let clickedStockWithRatios = this.props.result.stocks
                .filter(stock => stock.stock.symbol === stockSymbol)[0];
            const priceEpsData = clickedStockWithRatios.stock.chartData
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

    toHeaderData(averages: Stock, isEtf: boolean): any[][] {
        averages = this.stockAnalystService.filterDisplayableStats(averages, isEtf)

        const headersRow = Object.keys(averages)
        const averagesRow = Object.keys(averages).map(key => averages[key])

        this.addScoreHeader(headersRow, averagesRow)
        if (!isEtf) {
            this.addRule1Header(headersRow, averagesRow)
        }

        return [
            headersRow,
            averagesRow
        ]
    }

    addScoreHeader(headersRow: string[], averagesRow: number[]) {
        headersRow.push('Score')
        averagesRow.push(0)
    }

    addRule1Header(headersRow: string[], averagesRow: number[]) {
        headersRow.push('Rule 1 Score')
        averagesRow.push(0)
    }

    toTableData(stocks: Stock[]): any[][] {
        let rows = [];
        for (let stock of stocks) {
            stock = this.stockAnalystService.filterDisplayableStats(stock, this.props.isEtf)
            const rowValues = Object.keys(stock)
                .map(key => stock[key] ? stock[key] : '')
            rows.push(rowValues);
        }
        return rows;
    }

    private prepareEtfsChartData(stocks: Stock[]): EtfsChartData[] | undefined {

        const chartStocks = stocks.filter(s => this.state.etfsChartSymbols.includes(s.symbol))

        const allDates = Array.from(new Set(chartStocks.flatMap(s => s.chartData.map(d => d.date))))
            .sort()

        const chartData = new Array<EtfsChartData>(allDates.length)
        for (let i = 0; i < allDates.length; i++) {
            const date = allDates[i]
            const dataPoint: EtfsChartData = {
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

        //remove outliers, sometime a price jumps from 10 to 1000, e.g. RYA stock and that messes up the chart scale
        for (let i = 1; i < priceEpsData.length; i++) {
            if (priceEpsData[i].price > priceEpsData[i - 1].price * 20) {
                priceEpsData[i].price = undefined
            }
        }

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
                    case 'EU':
                    case 'US':
                    case 'AU':
                    case 'GB':
                    case 'CHF':
                    case 'ETF':
                        return g;
                    default:
                        return g[0].toUpperCase().concat(g.substr(1).toLowerCase());
                }

            })
            .replace(/_/g, ' ')
    }
}

