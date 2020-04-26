import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {AnalysisResult} from "../model/AnalysisResult";
import './StocksAnalysis.css';
import {Table} from "../components/Table";
import {PriceEpsChart} from "../components/PriceEps";
import {PriceEpsData} from "../model/PriceEpsData";
import {PriceEpsDataRaw} from "../model/PriceEpsDataRaw";
import moment from "moment";

export interface StocksAnalysisProps {

}

export interface StocksAnalysisState {
    error?: string
    results?: Map<string, AnalysisResult>
    peRation: number
    priceEpsData?: PriceEpsDataRaw[]
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {
            error: undefined,
            results: undefined,
            peRation: 15,
            priceEpsData: undefined
        }
        this.stockAnalystService = new StockAnalystService();
    }

    componentDidMount() {
        const results = new Map();
        results.set('TEST', this.stockAnalystService.loadTestAnalysis());
        results.set('AUD', this.stockAnalystService.loadAudAnalysis());
        results.set('CHF', this.stockAnalystService.loadChfAnalysis());
        results.set('EUR', this.stockAnalystService.loadEurAnalysis());
        results.set('GBP', this.stockAnalystService.loadGbpAnalysis());
        results.set('USD', this.stockAnalystService.loadUsdAnalysis());
        // results.set('NASDAQ100', this.stockAnalystService.loadNasdaq100Analysis());
        const priceEpsData = results.get('TEST').stocks[0].chartData;
        this.setState({
            results,
            priceEpsData
        })
    }

    render = () => {
        if (this.state.error) {
            return <div>Error</div>;
        }

        if (!this.state.results) {
            return <div>Loading analysis result...</div>;
        }

        const tables = []
        this.state.results.forEach((result: AnalysisResult, watchlist: string) => {
            const headers = this.toHeaderData(result);
            let data = this.toTableData(result);

            const scoredData = data.map(row => this.stockAnalystService.scoreRow(headers[1], row))
            tables.push(
                <div className="Table" key={watchlist}>
                    <h2 className="watchlist">{watchlist}</h2>
                    <Table data={scoredData} headerLabels={headers[0]} headerAverages={headers[1]}/>
                </div>
            )
        });

        const peRation = this.state.peRation
        const priceEpsData = this.prepareEpsChartData(this.state.priceEpsData, peRation);
        //TODO input to scale PE ration
        const epsChart = <div>
            <p>PE scale {peRation}</p>
            <PriceEpsChart data={priceEpsData}/>
        </div>;

        return (
            <div className='StocksAnalysis'>
                <div className={'PriceEpsChart'}>{epsChart}</div>
                <div className={'Watchlists'}>{tables}</div>
            </div>
        )
    };

    private prepareEpsChartData(priceEpsData: PriceEpsDataRaw[], peRatio: number): PriceEpsData[] {
        return priceEpsData.map(data => {
            return {
                date: moment(data.date * 1000).format('YYYY-MM-DD'),
                price: Math.round(data.price * 10) / 10,
                eps: data.eps ? Math.round(data.eps * peRatio * 4 * 10) / 10  : undefined
            }
        })
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


}