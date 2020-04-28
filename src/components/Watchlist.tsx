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


export interface WatchlistProps {
    watchlist: string
    result: AnalysisResult,
    peRatio: number,
    onRefreshClickHandler?: (watchlist: string) => void
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
        const headers = this.toHeaderData(result);
        let data = this.toTableData(result);
        const scoredData = data.map(row => this.stockAnalystService.scoreRow(headers[1], row))


        const chartData = this.prepareEpsChartData(this.state.priceEpsData, peRatio);
        const epsChart = <div className={!chartData ? 'hidden' : ''}>
            <PriceEpsChart
                data={chartData}
                description={`Price and earnings line of ${this.state.chartLabel}. with EPS scale of ${peRatio}`}/>
        </div>;


        return <div className="Watchlist" key={watchlist}>
            <h2 className="WatchlistName">Watchlist: {watchlist} <i className="fa fa-refresh" onClick={() => this.props.onRefreshClickHandler(watchlist)}/></h2>
            {epsChart}
            <WatchlistTable
                data={scoredData}
                headerLabels={headers[0]}
                headerAverages={headers[1]}
                onStockClickHandler={this.stockOnClickHandler}
            />
        </div>
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

    toHeaderData(result: AnalysisResult): any[][] {
        const headersRow = Object.keys(result.averages)
            .filter(key => key !== 'periodValuationMeasures')
            .concat('Score')

        const averagesRow = Object.keys(result.averages)
            .filter(key => key !== 'periodValuationMeasures')
            .map(key => result.averages[key])
            .concat(0)

        return [
            headersRow,
            averagesRow
        ]
    }

    toTableData(result: AnalysisResult): any[][] {
        let rows = [];
        for (const stock of result.stocks) {
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

