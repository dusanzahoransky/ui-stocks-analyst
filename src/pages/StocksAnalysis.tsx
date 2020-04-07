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

        const headersRow = Object.keys(periodAverage).map(field => FormattingUtils.statLabel(field));

        return [
            ['Ticker', ...headersRow],
            ['', ...Object.values(periodAverage)]
        ]
    }

    toTableData(period: string, result: AnalysisResult): any[][] {
        let rows = [];
        for (const stock of result.stocks) {
            let periodMeasure = stock.statistics.periodValuationMeasures[period];
            if (periodMeasure) {
                rows.push(this.toRowData(stock, periodMeasure));
            }
        }
        return rows;
    }

    toRowData(stock: StockInfo, measure: PeriodMeasure): string[] {
        const stockName = stock.ticker.symbol;
        return [stockName, ...Object.values(measure)];
    }


}