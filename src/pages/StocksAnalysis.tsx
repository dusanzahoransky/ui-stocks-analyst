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
    isLoaded: boolean,
    isPreset: boolean,
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

    private readonly PRESET_WATCHLISTS = [
        'TEST',
        'AUD',
        'CHF',
        'EUR',
        'GBP',
        'USD',
        'USD_TECH',
        /*'NASDAQ_100',*/
/*        'TRADING_212_US',
        'TRADING_212_EUR',
        'TRADING_212_GBP'*/
    ];

    componentDidMount() {
        this.PRESET_WATCHLISTS
            .forEach(watchlist => this.createEmptyWatchlist(watchlist))
    }

    private async loadWatchlistData(watchlist: string,
                                    forceRefresh: boolean = false,
                                    mockData: boolean = false) {
        const response = await this.stockAnalystService.loadAnalysis(watchlist, forceRefresh, mockData)
        const error = response as BackendError;
        if (error.error) {
            console.error(`Failed to load ${watchlist}: ${error.message}`)
            return
        }
        const analysisResult = response as AnalysisResult;

        const watchlistResult: WatchlistResult = {
            isLoaded: true,
            isPreset: true,
            watchlist,
            analysisResult
        }

        this.setState((state) => {
            return {results: this.mergeResult(state.results, watchlistResult)}
        })
    }

    private createEmptyWatchlist(watchlist: string) {
        const watchlistResult: WatchlistResult = {
            isLoaded: false,
            isPreset: true,
            watchlist,
            analysisResult: undefined
        }

        this.setState((state) => {
            return {results: this.mergeResult(state.results, watchlistResult)}
        })
    }

    private unloadWatchlistData(watchlist: string) {
        this.setState((state) => {
            return {results: this.unloadResult(state.results, watchlist)}
        })
    }

    private mergeResult(results: WatchlistResult[], newResult: WatchlistResult) {
        return results
            .filter(r => r.watchlist !== newResult.watchlist)
            .concat(newResult)
            .sort((r1, r2) =>
                this.PRESET_WATCHLISTS.indexOf(r1.watchlist) < this.PRESET_WATCHLISTS.indexOf(r2.watchlist) ? -1 : 1);
    }

    private unloadResult(results: WatchlistResult[], watchlist: string) {
        return results
            .map(r => {
                    if (r.watchlist === watchlist) {
                        r.isLoaded = false
                        return r
                    } else {
                        return r
                    }
                }
            )
    }

    private containWatchlistData(watchlist: string): boolean {
        const watchlistResult = this.state.results
            .find(r => r.watchlist === watchlist);

        return watchlistResult && watchlistResult.isLoaded
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
            .forEach((watchlistResult) => {
                const onRefreshClickHandler = (watchlist) => this.loadWatchlistData(watchlist, true, false);
                const onShowClickHandler = (watchlist) => {
                    if (this.containWatchlistData(watchlist)) {
                        this.unloadWatchlistData(watchlist)
                    } else {
                        this.loadWatchlistData(watchlist, false, false);
                    }
                }
                watchlists.push(
                    <Watchlist
                        key={watchlistResult.watchlist}
                        result={watchlistResult.analysisResult}
                        watchlist={watchlistResult.watchlist}
                        peRatio={15}
                        onRefreshClickHandler={onRefreshClickHandler}
                        onShowClickHandler={onShowClickHandler}
                        isPreset={watchlistResult.isPreset}
                        isLoaded={watchlistResult.isLoaded}
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