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
    result?: AnalysisResult
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {error: undefined, result: undefined}
    }

    componentDidMount() {
        let result = new StockAnalystService().loadAnalysis();
        this.setState({
            result
        })
    }

    render = () => {
        if (this.state.error) {
            return <div>Error</div>;
        }

        if (!this.state.result) {
            return <div>Loading analysis result...</div>;
        }

        const result: AnalysisResult = this.state.result;
        const currentPeriod = result.statisticsAllPeriods[0];

        const headers = this.toHeaderData(currentPeriod, result);
        const data = this.toTableData(currentPeriod, result);
        return (
            <div className='StocksAnalysis'>
                <Table data={data} headers={headers}/>
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
            let rowValues = [stock.ticker.symbol];
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
        const stockName = stock.ticker.symbol;
        return [stockName, ...Object.values(measure)];
    }


}