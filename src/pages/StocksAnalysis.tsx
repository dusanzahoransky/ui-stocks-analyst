import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {AnalysisResult} from "../model/AnalysisResult";
import './StocksAnalysis.css';
import {Watchlist} from "../components/Watchlist";

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
        this.state = {
            error: undefined,
            results: undefined
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

        //TODO input to scale PE ration

        const watchlists = []
        this.state.results.forEach((result: AnalysisResult, watchlist: string) => {
            watchlists.push(
                <Watchlist
                    key={watchlist}
                    result={result}
                    watchlist={watchlist}
                    peRatio={15}
                />
            )
        });

        return (
            <div className='StocksAnalysis'>
                <div className={'Watchlists'}>{watchlists}</div>
            </div>
        )
    };


}