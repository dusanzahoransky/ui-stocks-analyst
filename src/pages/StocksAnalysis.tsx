import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {AnalysisResult} from "../model/AnalysisResult";
import {StockInfo} from "../model/StockInfo";
import './StocksAnalysis.css';
import {Table} from "../components/Table";
import {FormattingUtils} from "../utils/FormattingUtils";
import {CellData} from "../model/CellData";

export interface StocksAnalysisProps {

}

export interface StocksAnalysisState {
    error?: string
    results?: Map<string, AnalysisResult>
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {error: undefined, results: undefined}
        this.stockAnalystService = new StockAnalystService();
    }

    componentDidMount() {
        let results = new Map();
        // results.set('AUD', this.stockAnalystService.loadAudAnalysis());
        // results.set('CHF', this.stockAnalystService.loadChfAnalysis());
        // results.set('EUR', this.stockAnalystService.loadEurAnalysis());
        // results.set('GBP', this.stockAnalystService.loadGbpAnalysis());
        results.set('USD', this.stockAnalystService.loadUsdAnalysis());
        // results.set('NASDAQ100', this.stockAnalystService.loadNasdaq100Analysis());
        this.setState({
            results
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
        this.state.results.forEach( (result: AnalysisResult, watchlist: string) => {
            const headers = this.toHeaderData(result);
            let data = this.toTableData(result);

            const scoredData = data.map( row => this.stockAnalystService.scoreData(headers[1], row))
            tables.push(
                <div className="Table">
                    <h2 className="watchlist">{watchlist}</h2>
                    <Table data={scoredData} headerLabels={headers[0]} headerAverages={headers[1]}/>
                </div>
            )
        });


        return (
            <div className='StocksAnalysis'>
                {tables}
            </div>
        )
    };

    toHeaderData(result: AnalysisResult): any[][] {
        let headersRow = Object.keys(result.averages)
            .filter(key => key !== 'periodValuationMeasures');

        let averagesRow = Object.keys(result.averages)
            .filter(key => key !== 'periodValuationMeasures')
            .map(key => result.averages[key]);

        return [
            headersRow,
            averagesRow
        ]
    }

    toTableData(result: AnalysisResult): any[][] {
        let rows = [];
        for (const stock of result.stocks) {
            let rowValues = Object.keys(stock)
                    .filter(key => key !== 'periodValuationMeasures')
                    .map(key => stock[key] ? stock[key] : '');
            rows.push(rowValues);
        }
        return rows;
    }


}