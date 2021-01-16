import React from "react"
import {WatchlistTable} from "./WatchlistTable"
import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult"
import {StockAnalystService} from "../services/StockAnalystService"
import {PriceEpsChart} from "./PriceEpsChart"
import {PriceEpsData} from "../model/PriceEpsData"
import "./WatchlistAnalysis.css"
import 'font-awesome/css/font-awesome.min.css'
import moment from "moment"
import {EtfsChartData} from "../model/EtfsChartData"
import {EtfsPriceChart} from "./EtfsPriceChart"
import {RatioChart} from "./RatioChart"
import {RatioChartData} from "../model/RatioChartData"
import {FinancialChartRatios} from "../model/FinancialChartRatios"
import {StockTaggingService} from "../services/StockTaggingService"
import {CellData} from "../model/table/CellData"
import {OtherChartRatios} from "../model/OtherChartRatios"
import {CellTag} from "../model/table/CellTag"
import {StocksAnalysisResult} from "../model/StocksAnalysisResult"
import {Etf} from "../model/Etf"
import {Stock} from "../model/Stock";
import {Timeline} from "../model/Timeline";
import {FormattingUtils} from "../utils/FormattingUtils";
import Watchlist from "../model/watchlist/Watchlist";
import {Alert} from "./Alert";


export interface WatchlistAnalysisProps {
    watchlist: Watchlist
}

export interface WatchlistAnalysisState {
    etfsResult?: EtfsAnalysisResult,
    stocksResult?: StocksAnalysisResult,
    selectedStock?: Stock
    etfsChartSymbols?: string[]
    visibleTags: CellTag[]
    hiddenTags: CellTag[]
    isExpanded: boolean,
    error?: string
}

export class WatchlistAnalysis extends React.Component<WatchlistAnalysisProps, WatchlistAnalysisState> {

    private readonly stockAnalystService: StockAnalystService
    private readonly stockTaggingService: StockTaggingService

    public static readonly DISPLAY_TOGGLES = [CellTag.lastUpdated, CellTag.stock, CellTag.dividends, CellTag.ratios, CellTag.ratiosGrowth, CellTag.financials, CellTag.financialsGrowth, CellTag.valueInvesting, CellTag.growthInvesting, CellTag.intrinsicValueInvesting]
    public static readonly DISPLAY_DEFAULTS = [CellTag.price, CellTag.ratios, , CellTag.ratiosGrowth, CellTag.valueInvesting, CellTag.growthInvesting, CellTag.financialsGrowth]

    public static readonly HIDE_TOGGLES = [CellTag.Q1, CellTag.Q2, CellTag.Y1, CellTag.Y2, CellTag.Y3]
    public static readonly HIDE_DEFAULTS = [CellTag.Q2, CellTag.Y3]

    constructor(props: Readonly<WatchlistAnalysisProps>) {
        super(props)
        this.state = WatchlistAnalysis.resetState()
        this.stockAnalystService = new StockAnalystService()
        this.stockTaggingService = new StockTaggingService()
    }

    private static resetState() {
        return {
            selectedStock: undefined,
            etfsChartSymbols: [],
            visibleTags: WatchlistAnalysis.DISPLAY_DEFAULTS,
            hiddenTags: WatchlistAnalysis.HIDE_DEFAULTS,
            isExpanded: false
        };
    }

    componentDidMount() {
        //uncomment to preload data
        if(this.props.watchlist.name === 'TO_CHECK'){
            return this.loadWatchlistData(this.props.watchlist)
        }
    }

    componentDidUpdate(prevProps: Readonly<WatchlistAnalysisProps>, prevState: Readonly<WatchlistAnalysisState>, snapshot?: any) {
        if (!this.state.isExpanded && prevState.isExpanded) {
            this.setState(WatchlistAnalysis.resetState())
        }
    }

    render() {
        const {watchlist} = this.props
        const {isExpanded, error} = this.state

        if (error) {
            return <Alert message={error} onCloseHandler={() => this.setState({error: undefined})}/>
        }

        //ETF rendering
        if (watchlist.etf) {
            if (isExpanded) {
                return <div className="Watchlist" key={watchlist.name}>
                    <h3 className={"WatchlistName Etf"}>
                        {this.renderShowLink()}
                        {FormattingUtils.toWatchlistLabel(watchlist.name)}
                        {this.renderRefreshDynamicDataIcon()}
                    </h3>
                    {this.renderTable()}
                    {this.renderEtfsChart()}
                </div>
            }
            return <div className="Watchlist" key={watchlist.name}>
                <h3 className={"WatchlistName Etf"}>
                    {this.renderShowLink()}
                    {FormattingUtils.toWatchlistLabel(watchlist.name)}
                </h3>
            </div>
        }

        //Stock rendering
        if (isExpanded) {
            const visibleTags = WatchlistAnalysis.DISPLAY_TOGGLES.map(tag => this.toVisibleTagCheckbox(tag))
            const toDisplayCheckboxesSpan = <span className="VisibleTags">Display: {visibleTags}</span>

            const hiddenTags = WatchlistAnalysis.HIDE_TOGGLES.map(tag => this.toHiddenTagCheckbox(tag))
            const toHideCheckboxesSpan = <span className="HiddenTags">Hide: {hiddenTags}</span>

            return <div
                className="WatchlistAnalysis"
                key={watchlist.name}>
                <h2 className={"WatchlistName Stock"}>
                    {this.renderShowLink()}
                    {FormattingUtils.toWatchlistLabel(watchlist.name)}
                    {this.renderRefreshDynamicDataIcon()}
                    {this.renderRefreshAllDataIcon()}
                </h2>
                {toDisplayCheckboxesSpan}
                {toHideCheckboxesSpan}
                {this.renderTable()}
                {this.renderCompanyCharts()}
            </div>
        } else {
            return <div
                className="WatchlistAnalysis"
                key={watchlist.name}>
                <h2 className={"WatchlistName Stock"}>
                    {this.renderShowLink()}
                    {FormattingUtils.toWatchlistLabel(watchlist.name)}
                </h2>
            </div>
        }
    }

    private renderRefreshAllDataIcon() {
        const {watchlist} = this.props
        return <span className="refresh">
                <i className="fa fa-refresh refreshFinancials" onClick={() => this.onRefreshFinancialsHandler(watchlist)}/>
                All Data
            </span>;
    }

    private onRefreshFinancialsHandler(watchlist: Watchlist) {
        return this.loadWatchlistData(watchlist, false, true, false);
    }

    private async loadWatchlistData(watchlist: Watchlist,
                                    refreshDynamicData: boolean = false,
                                    refreshFinancials: boolean = false,
                                    mockData: boolean = false) {
        try {
            const response = watchlist.etf ?
                await this.stockAnalystService.loadEtfsAnalysis(watchlist.name, refreshDynamicData, mockData)
                : await this.stockAnalystService.loadAnalysis(watchlist.name, refreshDynamicData, refreshFinancials, mockData)

            const etfsResult = watchlist.etf ? response as EtfsAnalysisResult : undefined
            const stocksResult = !watchlist.etf ? {stocks: response} as StocksAnalysisResult : undefined

            if(watchlist.etf){
                this.setState({
                    isExpanded: true,
                    etfsResult
                })
            } else{
                this.setState({
                    isExpanded: true,
                    stocksResult
                })
            }
        } catch (e) {
            this.setState({error: `Failed to load ${watchlist.name} ${e.message}`})
        }
    }

    renderTable() {
        const {data, headerData, headerLabels} = this.prepareData()

        return <WatchlistTable
            data={data}
            isEtf={this.props.watchlist.etf}
            headerLabels={headerLabels}
            headerData={headerData}
            visibleTags={this.state.visibleTags}
            hiddenTags={this.state.hiddenTags}
            onStockClickHandler={this.stockOnClickHandler}
        />
    }

    private renderShowLink() {
          return <i className="fa fa-caret-down" onClick={() => this.onShowClickHandler(this.props.watchlist)}/>
    }

    private onShowClickHandler(watchlist) {
        if (this.state.isExpanded) {
            this.setState({isExpanded: false})
        } else {
            return this.loadWatchlistData(watchlist, false, false);
        }
    }

    private renderRefreshDynamicDataIcon() {
        const label = this.props.watchlist.etf ? 'Refresh data' : 'Dynamic Data'
        return <span className="refresh">
                <i className="fa fa-refresh"
                   onClick={() => this.onRefreshDynamicDataHandler(this.props.watchlist)}/> {label}
            </span>
    }


    private onRefreshDynamicDataHandler(watchlist: Watchlist) {
        return this.loadWatchlistData(watchlist, true, false, false);
    }

    private prepareData(): { data: CellData[][], headerData: CellData[], headerLabels: string[] } {
        let data: CellData[][] = []
        let headerData: CellData[] = []
        let headerLabels: string[] = []

        if (this.props.watchlist.etf) {

            const etfs = this.state.etfsResult.etfs
            let averages = {...this.state.etfsResult.averages}

            averages = this.stockAnalystService.filterDisplayableEtfStats(averages)

            headerLabels = Object.keys(averages)
            headerData = Object.keys(averages).map(key => {
                return {value: averages[key]}
            })

            const labels = this.stockAnalystService.getScoreLabels(this.props.watchlist.etf)
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
            const stocks = this.state.stocksResult.stocks
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

            const labels = this.stockAnalystService.getScoreLabels(this.props.watchlist.etf)
            labels.forEach(label => this.addHeader(headerLabels, headerData, label))

        }

        data = data.map(row => this.stockTaggingService.tagRow(row, this.props.watchlist.etf))
        data = data.map(row => this.stockAnalystService.scoreRow(headerData, row, this.props.watchlist.etf))

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
                    let newVisibleTags
                    if (prevState.visibleTags.includes(tag)) {
                        newVisibleTags = prevState.visibleTags.filter(hiddenTag => hiddenTag !== tag)
                    } else {
                        newVisibleTags = prevState.visibleTags.concat(tag)
                    }
                    return {visibleTags: newVisibleTags}
                })
            }}/>
            </span>
    }

    private toHiddenTagCheckbox(tag: CellTag) {
        let tagName = CellTag[tag]
        return <span className="HiddenTag" key={tagName}>{tagName} <input
            name={tagName}
            type="checkbox"
            checked={this.state.hiddenTags.includes(tag)}
            onChange={() => {
                this.setState((prevState) => {
                    let newHiddenTags
                    if (prevState.hiddenTags.includes(tag)) {
                        newHiddenTags = prevState.hiddenTags.filter(hiddenTag => hiddenTag !== tag)
                    } else {
                        newHiddenTags = prevState.hiddenTags.concat(tag)
                    }
                    return {hiddenTags: newHiddenTags}
                })
            }}/>
            </span>
    }

    renderEtfsChart() {
        if (this.state.etfsChartSymbols.length === 0) {
            return undefined
        }
        const chartData = this.prepareEtfsChartData(this.state.etfsResult.etfs)
        return <div className={!chartData ? 'hidden' : ''}>
            <EtfsPriceChart
                data={chartData}
                symbols={this.state.etfsChartSymbols}
                label={`Etf price chart`}/>
        </div>
    }

    renderCompanyCharts() {
        const {selectedStock} = this.state;
        if (!selectedStock) {
            return undefined
        }

        const peRatio = 15
        const pbRatio = 3
        const pfcRatio = 20
        const chartData = this.prepareEpsChartData(selectedStock, peRatio, pbRatio, pfcRatio)
        const priceEpsChart = <PriceEpsChart
            data={chartData}
            description={`Price to earnings, book value and free cash flow per share ${selectedStock.companyName}. [Scales: PE=${peRatio} PB=${pbRatio} PFC=${pfcRatio}]`}/>

        let financialRatiosCharts
        let otherRatiosCharts

        const yearsToDisplay = 10

        financialRatiosCharts = WatchlistAnalysis.getChartFinancialRatios().map(ratio => {
            const multiplyQuarters = FinancialChartRatios[ratio] !== FinancialChartRatios.profitMarginP
                && FinancialChartRatios[ratio] !== FinancialChartRatios.workingCapital
            const chartData = WatchlistAnalysis.prepareRatiosData(selectedStock, ratio, false, multiplyQuarters, yearsToDisplay)
            return <RatioChart
                key={ratio}
                data={chartData}
                label={`${FinancialChartRatios[ratio]}`}/>
        })

        otherRatiosCharts = WatchlistAnalysis.getChartOtherRatios().map(ratio => {
            const percentage = OtherChartRatios[ratio] === OtherChartRatios.totalDebtToEquity
                || OtherChartRatios[ratio] === OtherChartRatios.nonCurrentLiabilitiesToIncome
            const chartData = WatchlistAnalysis.prepareRatiosData(selectedStock, ratio, percentage, false, yearsToDisplay)
            return <RatioChart
                key={ratio}
                data={chartData}
                label={`${OtherChartRatios[ratio]}`}/>
        })


        return <div>
            <div>{priceEpsChart}</div>
            <div className={"RatiosCharts"}>
                <div className={'RatiosChartsColumn'}>{financialRatiosCharts}</div>
                <div className={'RatiosChartsColumn'}>{otherRatiosCharts}</div>
            </div>
        </div>
    }

    private static prepareRatiosData(stock: Stock, ratio: string, percentage: boolean, quartersMultiple: boolean, yearsToDisplay: number): RatioChartData[] {
        const chartData: RatioChartData[] = []

        const percentageMultiple = percentage ? 100 : 1;
        const quarterMultiple = quartersMultiple ? 4 : 1;

        const ratioTimeline = stock[ratio] as Timeline
        if (ratioTimeline) {
            const periods = Object.entries(ratioTimeline)

            for (let i = 1; i < periods.length && i < yearsToDisplay; i++) {
                const date = periods[i][0]
                const value = periods[i][1] * percentageMultiple
                chartData.push({
                    date,
                    value
                })
            }
        }

        const ratioQuartersTimeline = stock[ratio + 'Q'] as Timeline
        if (ratioQuartersTimeline) {
            const quarterPeriods = Object.entries(ratioQuartersTimeline)

            for (let i = 1; i < quarterPeriods.length && i < yearsToDisplay; i++) {
                const date = quarterPeriods[i][0]
                const value = quarterPeriods[i][1] * percentageMultiple * quarterMultiple
                chartData.push({
                    date,
                    value
                })
            }
        }
        return chartData
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
        if (this.props.watchlist.etf) {
            let updatedSymbols
            if (this.state.etfsChartSymbols.includes(stockSymbol)) {
                updatedSymbols = this.state.etfsChartSymbols.filter(s => s !== stockSymbol)
            } else {
                updatedSymbols = this.state.etfsChartSymbols.concat(stockSymbol)
            }
            this.setState({
                etfsChartSymbols: updatedSymbols
            })
        } else {
            let selectedStock = this.state.stocksResult.stocks
                .filter(stock => stock.symbol === stockSymbol)[0]

            //close the graph on a second click
            if (this.state.selectedStock === selectedStock) {
                this.setState({
                    selectedStock: undefined
                })
            } else {
                this.setState({
                    selectedStock,
                })
            }
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

    private prepareEpsChartData(stock: Stock, peRatio: number, pbRatio: number, fcpsRation: number): PriceEpsData[] | undefined {
        if (!stock) return undefined

        const round1Dec = (value?: number) => value ? Math.round(value * 10) / 10 : undefined

        //remove outliers, sometime a price jumps from 10 to 1000, e.g. RYA stock and that messes up the chart scale
        const priceTimeline = stock.price as Timeline;
        const periods = Object.keys(priceTimeline);
        for (let i = 1; i < periods.length; i++) {
            const currentPeriod = periods[i];
            const previousPeriod = periods[i - 1];
            if (priceTimeline[currentPeriod] > priceTimeline[previousPeriod] * 20) {
                priceTimeline[currentPeriod] = undefined
            }
        }

        const priceEntries = Object.entries(priceTimeline);
        //uncomment to display full chart timeline
        // const chartStart = moment(priceEntries[0], "YYYY-MM-DD")
        const chartStart = moment('2015-01-01', "YYYY-MM-DD")
        const chartEnd = moment(priceEntries[priceEntries.length - 1], "YYYY-MM-DD")
        let currentDate = chartStart

        const chartData: PriceEpsData[] = []
        while (currentDate.isBefore(chartEnd)) {
            const date = currentDate.format("YYYY-MM-DD")

            const price = round1Dec(priceTimeline[date])

            const epsQuarterly = round1Dec(stock.epsQ[date] * peRatio * 4)
            const epsAnnually = round1Dec(stock.eps[date] * peRatio)

            const bpsAnnually = round1Dec(stock.bookValuePerShare[date] * pbRatio)
            const fcpsAnnually = round1Dec(stock.freeCashFlowPerShare[date] * fcpsRation)

            chartData.push({
                date,
                price,
                epsQuarterly,
                epsAnnually,
                bpsAnnually,
                fcpsAnnually
            })

            currentDate = currentDate.add(1, "day")

        }
        return chartData
    }


}

