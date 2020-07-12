import React from "react"
import {WatchlistTable} from "./WatchlistTable"
import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult"
import {StockAnalystService} from "../services/StockAnalystService"
import {PriceEpsChart} from "./PriceEpsChart"
import {PriceEpsDataRaw} from "../model/PriceEpsDataRaw"
import {PriceEpsData} from "../model/PriceEpsData"
import "./Watchlist.css"
import 'font-awesome/css/font-awesome.min.css'
import moment from "moment"
import {EtfsChartData} from "../model/EtfsChartData"
import {EtfsPriceChart} from "./EtfsPriceChart"
import {StockRatiosPeriods} from "../model/StockRatiosPeriods"
import {RatioChart} from "./RatioChart"
import {RatioChartData} from "../model/RatioChartData"
import {FinancialChartRatios} from "../model/FinancialChartRatios"
import {StockTaggingService} from "../services/StockTaggingService"
import {CellData} from "../model/table/CellData"
import {OtherChartRatios} from "../model/OtherChartRatios"
import {CellTag} from "../model/table/CellTag"
import {StocksAnalysisResult} from "../model/StocksAnalysisResult"
import {Etf} from "../model/Etf"


export interface WatchlistProps {
    watchlist: string
    etfsResult?: EtfsAnalysisResult,
    stocksResult?: StocksAnalysisResult,
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
    visibleTags: CellTag[]
}

export class Watchlist extends React.Component<WatchlistProps, WatchlistState> {

    private readonly stockAnalystService: StockAnalystService
    private readonly stockTaggingService: StockTaggingService

    public static readonly VISIBILITY_TOGGLES = [CellTag.price, CellTag.ratios, CellTag.stock, CellTag.dividends, CellTag.timelineGrowth, CellTag.rule1, CellTag.value, CellTag.growth, CellTag.financials]
    public static readonly VISIBLE_DEFAULTS = [CellTag.price, CellTag.ratios, CellTag.stock, CellTag.dividends, CellTag.timelineGrowth, CellTag.rule1, CellTag.value, CellTag.growth]

    constructor(props: Readonly<WatchlistProps>) {
        super(props)
        this.state = {
            // priceEpsData: undefined,
            // ratiosData: undefined,
            //uncomment to render chart of the first stock on load
            // priceEpsData: props.result ? props.result.stocks[0].stock.chartData : undefined,
            // ratiosData: props.result ? props.result.stocks[0].stockRatiosTimeline.periods : undefined,
            // etfsChartSymbols: ['VTS', 'VUSA'],
            etfsChartSymbols: [],
            priceEpsChartRemoveOutliers: true,
            // visibleTags: []
            // visibleTags: Watchlist.VISIBLE_DEFAULTS
            visibleTags: Watchlist.VISIBILITY_TOGGLES
        }
        this.stockAnalystService = new StockAnalystService()
        this.stockTaggingService = new StockTaggingService()
    }

    render() {
        const {watchlist, isPreset, isExpanded, isEtf, onRefreshMorningstarClickHandler} = this.props

        //ETF rendering
        if (isEtf) {
            return <div
                className="Watchlist"
                key={watchlist}>
                <h2 className={"WatchlistName Etf"}>
                    {this.renderShowLink()} {Watchlist.toWatchlistLabel(watchlist)}{this.renderRefreshLink()}</h2>
                {this.renderTable()}
                {this.renderEtfsChart()}
            </div>
        }

        //Stock rendering
        const refreshRatiosLink = isPreset && isExpanded ?
            <span className="refresh">
                <i className="fa fa-refresh refreshRatios"
                   onClick={() => onRefreshMorningstarClickHandler(watchlist)}/> MorningStar
            </span> : ''

        let checkboxesSpan
        if (isExpanded) {
            const visibleTags = Watchlist.VISIBILITY_TOGGLES.map(tag => this.toVisibleTagCheckbox(tag))
            checkboxesSpan = <span className="VisibleTags">Display: {visibleTags}</span>
        }

        return <div
            className="Watchlist"
            key={watchlist}>
            <h2 className={"WatchlistName Stock"}>
                {this.renderShowLink()} {Watchlist.toWatchlistLabel(watchlist)}{this.renderRefreshLink()}{refreshRatiosLink} {checkboxesSpan}</h2>
            {this.renderTable()}
            {this.renderCompanyCharts()}
        </div>
    }

    renderTable() {
        if (!this.props.isExpanded) {
            return ''
        } else {
            const {data, headerData, headerLabels} = this.prepareData()

            return <WatchlistTable
                data={data}
                isEtf={this.props.isEtf}
                headerLabels={headerLabels}
                headerData={headerData}
                visibleTags={this.state.visibleTags}
                onStockClickHandler={this.stockOnClickHandler}
            />
        }
    }

    private renderShowLink() {
        return this.props.isPreset ?
            <i className="fa fa-caret-down" onClick={() => this.props.onShowClickHandler(this.props.watchlist)}/> : ''
    }

    private renderRefreshLink() {
        return this.props.isPreset && this.props.isExpanded ?
            <span className="refresh">
                <i className="fa fa-refresh" onClick={() => this.props.onRefreshYahooHandler(this.props.watchlist)}/> Yahoo
            </span> : ''
    }

    private prepareData(): { data: CellData[][], headerData: CellData[], headerLabels: string[] } {

        let data: CellData[][] = []
        let headerData: CellData[] = []
        let headerLabels: string[] = []

        if (this.props.isEtf) {

            const etfs = this.props.etfsResult.etfs
            let averages = {...this.props.etfsResult.averages}

            averages = this.stockAnalystService.filterDisplayableEtfStats(averages)

            headerLabels = Object.keys(averages)
            headerData = Object.keys(averages).map(key => {
                return {value: averages[key]}
            })

            const labels = this.stockAnalystService.getScoreLabels(this.props.isEtf)
            labels.forEach(label => this.addHeader(headerLabels, headerData, label))

            for (const etf of etfs) {
                let etfClone = {...etf}
                etfClone = this.stockAnalystService.filterDisplayableEtfStats(etfClone)
                const rowData = Object.keys(etfClone).map(key => {
                    return {value: etfClone[key]}
                })
                data.push(rowData)
            }
        } else {
            const stocks = this.props.stocksResult.stocks
            let flattenStockData

            for (const stock of stocks) {
                let stockClone = {...stock}
                stockClone = this.stockAnalystService.filterDisplayableStockStats(stockClone)
                flattenStockData = this.stockAnalystService.flattenStockData(stockClone)
                const rowData = Object.keys(flattenStockData).map(key => {
                    return {value: flattenStockData[key]}
                })
                data.push(rowData)
            }

            headerLabels = Object.keys(flattenStockData)

            const labels = this.stockAnalystService.getScoreLabels(this.props.isEtf)
            labels.forEach(label => this.addHeader(headerLabels, headerData, label))

        }

        data = data.map(row => this.stockTaggingService.tagRow(row, this.props.isEtf))
        data = data.map(row => this.stockAnalystService.scoreRow(headerData, row, this.props.isEtf))

        return {data, headerData, headerLabels}
    }


    addHeader(headerLabels: string[], headerData: CellData[], label: string) {
        headerLabels.push(label)
        headerData.push({value: 0})
    }

    private toVisibleTagCheckbox(tag: CellTag) {
        let tagName = CellTag[tag]
        return <span className="VisibleTag" key={tagName}>{tagName} <input
            name={tagName}
            type="checkbox"
            checked={this.state.visibleTags.includes(tag)}
            onChange={() => {
                this.setState((prevState) => {
                    let newHiddenTags
                    if (prevState.visibleTags.includes(tag)) {
                        newHiddenTags = prevState.visibleTags.filter(hiddenTag => hiddenTag !== tag)
                    } else {
                        newHiddenTags = prevState.visibleTags.concat(tag)
                    }
                    return {visibleTags: newHiddenTags}
                })
            }}/>
            </span>
    }

    renderEtfsChart() {
        if (!this.props.isExpanded || this.state.etfsChartSymbols.length === 0) {
            return ''
        }
        const chartData = this.prepareEtfsChartData(this.props.etfsResult.etfs)
        return <div className={!chartData ? 'hidden' : ''}>
            <EtfsPriceChart
                data={chartData}
                symbols={this.state.etfsChartSymbols}
                label={`Etf price chart`}/>
        </div>
    }

    renderCompanyCharts() {
        if (!this.props.isExpanded) {
            return ''
        }
        const ratiosData = this.state.ratiosData
        const peRatio = 15
        const chartData = this.prepareEpsChartData(this.state.priceEpsData, peRatio)
        const priceEpsChart = <PriceEpsChart
            data={chartData}
            description={`Price and earnings line of ${this.state.chartLabel} with EPS scale of ${peRatio}`}/>

        let financialRatiosCharts
        let otherRatiosCharts
        if (ratiosData) {
            const periods = Object.keys(ratiosData)

            financialRatiosCharts = Watchlist.getChartFinancialRatios().map(ratio => {
                const chartData: RatioChartData[] = periods.map(period => {
                    return {
                        date: period,
                        value: ratiosData[period][ratio] as number
                    }
                })
                return <RatioChart
                    key={ratio}
                    data={chartData}
                    label={`${FinancialChartRatios[ratio]}`}/>
            })

            otherRatiosCharts = Watchlist.getChartOtherRatios().map(ratio => {
                const chartData: RatioChartData[] = periods.map(period => {
                    return {
                        date: period,
                        value: ratiosData[period][ratio] as number
                    }
                })
                return <RatioChart
                    key={ratio}
                    data={chartData}
                    label={`${OtherChartRatios[ratio]}`}/>
            })
        }


        return <div>
            <div className={!chartData ? 'hidden' : ''}>{priceEpsChart}</div>
            <div className={"RatiosCharts"}>
                <div className={!ratiosData ? 'hidden' : 'RatiosChartsColumn'}>{financialRatiosCharts}</div>
                <div className={!ratiosData ? 'hidden' : 'RatiosChartsColumn'}>{otherRatiosCharts}</div>
            </div>
        </div>

    }

    private static getChartFinancialRatios(): string[] {
        const enumNames = []

        for (const enumMember in FinancialChartRatios) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                enumNames.push(enumMember)
            }
        }

        return enumNames
    }

    private static getChartOtherRatios(): string[] {
        const enumNames = []

        for (const enumMember in OtherChartRatios) {
            if (Number.isNaN(Number.parseInt(enumMember))) {
                enumNames.push(enumMember)
            }
        }

        return enumNames
    }


    stockOnClickHandler = (stockSymbol: string) => {
        if (this.props.isEtf) {
            let updatedSymbols
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
            //TODO
            // let clickedStockWithRatios = this.props.result.stocks
            //     .filter(stock => stock.stock.symbol === stockSymbol)[0]
            // const priceEpsData = clickedStockWithRatios.stock.chartData
            // const ratiosData = clickedStockWithRatios.stockRatiosTimeline.periods
            //
            // //close the graph on a second click
            // if (this.state.priceEpsData === priceEpsData) {
            //     this.setState(state => {
            //         return {
            //             priceEpsData: undefined
            //         }
            //     })
            // } else {
            //     this.setState(state => {
            //         return {
            //             priceEpsData,
            //             ratiosData,
            //             chartLabel: stockSymbol as string
            //         }
            //     })
            // }
        }
    }


    private prepareEtfsChartData(etfs: Etf[]): EtfsChartData[] | undefined {

        const chartStocks = etfs.filter(s => this.state.etfsChartSymbols.includes(s.symbol))

        const allDates = Array.from(new Set(chartStocks.flatMap(s => s.chartData.map(d => d.date))))
            .sort()

        const chartData = new Array<EtfsChartData>(allDates.length)
        for (let i = 0; i < allDates.length; i++) {
            const date = allDates[i]
            const dataPoint: EtfsChartData = {
                date: moment(allDates[i] * 1000).format('YYYY-MM-DD')
            }
            for (const stock of chartStocks) {
                let chartDataAtDate = stock.chartData.filter(d => d.date === date)[0]
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

        const round1Dec = (value?: number) => value ? Math.round(value * 10) / 10 : undefined
        const round2Dec = (value?: number) => value ? Math.round(value * 10) / 10 : undefined

        //remove outliers, sometime a price jumps from 10 to 1000, e.g. RYA stock and that messes up the chart scale
        for (let i = 1; i < priceEpsData.length; i++) {
            if (priceEpsData[i].price > priceEpsData[i - 1].price * 20) {
                priceEpsData[i].price = undefined
            }
        }

        return priceEpsData.map(data => {
            const price = round1Dec(data.price)
            const epsQuarterly = round1Dec(data.epsQuarterly * peRatio * 4)
            const epsAnnually = round1Dec(data.epsAnnually * peRatio)
            const peQuarterly = round2Dec(data.peQuarterly)
            const peAnnually = round2Dec(data.peAnnually)
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
                        return g
                    default:
                        return g[0].toUpperCase().concat(g.substr(1).toLowerCase())
                }

            })
            .replace(/_/g, ' ')
    }

}

