import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {AnalysisResult} from "../model/AnalysisResult";
import './StocksAnalysis.css';
import {Watchlist} from "../components/Watchlist";
import {BackendError} from "../model/BackendError";

export interface StocksAnalysisProps {

}

export interface StocksAnalysisState {
    error?: string
    results?: WatchlistResult[]
}

interface WatchlistResult {
    watchlist: string,
    analysisResult: AnalysisResult
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {
            error: undefined,
            results: []
        }
        this.stockAnalystService = new StockAnalystService();
    }

    async componentDidMount() {
        ['TEST', 'AUD', 'CHF', 'EUR', 'GBP', 'USD', 'USD_TECH']
            .map(watchlist => this.loadWatchlist(watchlist, false, false))
    }

    private async loadWatchlist(watchlist: string, forceRefresh: boolean, mockData: boolean) {
        const analysisResult = await this.stockAnalystService.loadAnalysis(watchlist, forceRefresh, mockData)
        const error = analysisResult as BackendError;
        if(error.error){
            console.error(`Failed to load ${watchlist}: ${error.message}`)
            return
        }
        let mergedResults = this.mergeResults(this.state.results, watchlist, analysisResult as AnalysisResult);
        this.setState({
            results: mergedResults
        })

    }

    private mergeResults(results: WatchlistResult[], watchlist: string, analysisResult: AnalysisResult) {
        return results
            .filter(r => r.watchlist !== watchlist)
            .concat({watchlist, analysisResult})
            .sort((r1, r2) => r1.watchlist.localeCompare(r2.watchlist));
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
        this.state.results.forEach((watchlistResults) => {
            const onRefreshClickHandler = (watchlist) => this.loadWatchlist(watchlist, true, false);
            watchlists.push(
                <Watchlist
                    key={watchlistResults.watchlist}
                    result={watchlistResults.analysisResult}
                    watchlist={watchlistResults.watchlist}
                    peRatio={15}
                    onRefreshClickHandler={onRefreshClickHandler}
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