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
    customResults?: WatchlistResult[]
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
            results: [],
            customResults: []
        }
        this.stockAnalystService = new StockAnalystService();
    }

    async componentDidMount() {
        ['TEST', 'AUD', 'CHF', 'EUR', 'GBP', 'USD', 'USD_TECH']
            .map(watchlist => this.loadWatchlist(watchlist, false, false))
    }

    private async loadWatchlist(watchlist: string, forceRefresh: boolean, mockData: boolean) {
        const response = await this.stockAnalystService.loadAnalysis(watchlist, forceRefresh, mockData)
        const error = response as BackendError;
        if(error.error){
            console.error(`Failed to load ${watchlist}: ${error.message}`)
            return
        }
        const analysisResult = response as AnalysisResult;
        analysisResult.preset = true
        let mergedResults = this.mergeResults(this.state.results, watchlist, analysisResult);
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

        const allResults = this.state.results.concat(this.state.customResults);
        const watchlists = []

        allResults
            .sort((w1, w2) => w1.watchlist.localeCompare(w2.watchlist))
            .forEach((watchlistResults) => {
            const onRefreshClickHandler = (watchlist) => this.loadWatchlist(watchlist, true, false);
            watchlists.push(
                <Watchlist
                    key={watchlistResults.watchlist}
                    result={watchlistResults.analysisResult}
                    watchlist={watchlistResults.watchlist}
                    peRatio={15}
                    onRefreshClickHandler={onRefreshClickHandler}
                    preset={true}
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