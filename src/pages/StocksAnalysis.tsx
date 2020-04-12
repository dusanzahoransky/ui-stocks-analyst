import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {AnalysisResult} from "../model/AnalysisResult";
import {StockInfo} from "../model/StockInfo";
import {PeriodMeasure} from "../model/PeriodMeasure";
import './StocksAnalysis.css';
import {Table} from "../components/Table";
import {FormattingUtils} from "../utils/FormattingUtils";

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
        results.set('AUD', this.stockAnalystService.loadAudAnalysis());
        results.set('CHF', this.stockAnalystService.loadChfAnalysis());
        results.set('EUR', this.stockAnalystService.loadEurAnalysis());
        results.set('GBP', this.stockAnalystService.loadGbpAnalysis());
        results.set('USD', this.stockAnalystService.loadUsdAnalysis());
        results.set('NASDAQ100', this.stockAnalystService.loadNasdaq100Analysis());
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
            const currentPeriod = result.statisticsAllPeriods[0];

            const headers = this.toHeaderData(currentPeriod, result);
            let data = this.toTableData(currentPeriod, result);

            headers[1] = this.stockAnalystService.transformData(headers[1]);
            data = data.map(rowData => this.stockAnalystService.transformData(rowData));
            tables.push(
                <div className="Table">
                    <h2 className="watchlist">{watchlist}</h2>
                    <Table data={data} headers={headers}/>
                </div>
            )
        });


        return (
            <div className='StocksAnalysis'>
                {tables}
            </div>
        )
    };

    toHeaderData(period: string, result: AnalysisResult): any[][] {
        const periodAverage = result.statisticsAverage.periodValuationMeasures[period];

        let headersRow = Object.keys(result.statisticsAverage)
            .filter(key => key !== 'periodValuationMeasures')
            .map(field => FormattingUtils.statLabel(field));
        headersRow = headersRow.concat(Object.keys(periodAverage)
            .map(field => FormattingUtils.statLabel(field)));


        let averagesRow = Object.keys(result.statisticsAverage)
            .filter(key => key !== 'periodValuationMeasures')
            .map(key => result.statisticsAverage[key]);
        averagesRow = averagesRow.concat(Object.keys(periodAverage)
            .map(key => periodAverage[key]));

        return [
            ['Ticker', ...headersRow],
            ['', ...averagesRow]
        ]
    }

    toTableData(period: string, result: AnalysisResult): any[][] {
        let rows = [];
        for (const stock of result.stocks) {
            let rowValues = [stock.symbol];
            rowValues = rowValues.concat(
                Object.keys(stock.statistics)
                    .filter(key => key !== 'periodValuationMeasures')
                    .map(key => stock.statistics[key] ? stock.statistics[key] : ''));
            let periodMeasure = stock.statistics.periodValuationMeasures[period];
            if (periodMeasure) {
                rowValues = rowValues.concat(
                    Object.keys(periodMeasure)
                        .map(key => periodMeasure[key] ? periodMeasure[key] : ''));
            }
            rows.push(rowValues);
        }
        return rows;
    }

    toRowData(stock: StockInfo, measure: PeriodMeasure): string[] {
        const stockName = stock.symbol;
        return [stockName, ...Object.values(measure)];
    }


}