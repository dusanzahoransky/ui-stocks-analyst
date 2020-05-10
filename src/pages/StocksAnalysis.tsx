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
    indicesResults?: WatchlistResult[]
    results?: WatchlistResult[]
    customResults?: WatchlistResult[]
}

interface WatchlistResult {
    isLoaded: boolean,
    isPreset: boolean,
    isIndex: boolean,
    watchlist: string,
    analysisResult: AnalysisResult
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {
            error: undefined,
            indicesResults: [],
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
        'USD_DIVIDENDS',
        /*'NASDAQ_100',*/
        /*        'TRADING_212_US',
                'TRADING_212_EUR',
                'TRADING_212_GBP'*/
    ];

    private readonly PRESET_INDICES_WATCHLISTS = [
        /*'TEST_INDICES',*/
        'AUD_INDICES',
         'GBP_INDICES'
    ];

    componentDidMount() {
        this.PRESET_INDICES_WATCHLISTS
            // .forEach(watchlist => this.loadWatchlistData(watchlist, true, false, false))
            .forEach(watchlist => this.createEmptyWatchlist(watchlist, true))
        this.PRESET_WATCHLISTS
            // .forEach(watchlist => this.loadWatchlistData(watchlist, false))
            .forEach(watchlist => this.createEmptyWatchlist(watchlist, false))
    }

    private async loadWatchlistData(watchlist: string,
                                    isIndex: boolean,
                                    forceRefresh: boolean = false,
                                    mockData: boolean = false) {
        const response = isIndex ?
            await this.stockAnalystService.loadIndicesAnalysis(watchlist, forceRefresh, mockData)
            : await this.stockAnalystService.loadAnalysis(watchlist, forceRefresh, mockData)
        const error = response as BackendError;
        if (error.error) {
            console.error(`Failed to load ${watchlist}: ${error.message}`)
            return
        }
        const analysisResult = response as AnalysisResult;

        const watchlistResult: WatchlistResult = {
            isLoaded: true,
            isPreset: true,
            isIndex,
            watchlist,
            analysisResult
        }

        this.setState((state) => {
            if (isIndex) {
                return {indicesResults: this.mergeResult(state.indicesResults, watchlistResult, isIndex)}
            } else {
                return {results: this.mergeResult(state.results, watchlistResult, isIndex)}
            }
        })
    }

    private createEmptyWatchlist(watchlist: string, isIndex: boolean) {
        const watchlistResult: WatchlistResult = {
            isLoaded: false,
            isPreset: true,
            isIndex,
            watchlist,
            analysisResult: undefined
        }

        this.setState((state) => {
            if (isIndex) {
                return {indicesResults: this.mergeResult(state.indicesResults, watchlistResult, isIndex)}
            } else {
                return {results: this.mergeResult(state.results, watchlistResult, isIndex)}
            }
        })
    }

    private unloadWatchlistData(watchlist: string, isIndex: boolean) {
        this.setState((state) => {
            if (isIndex) {
                return {indicesResults: this.unloadResult(state.indicesResults, watchlist)}
            } else {
                return {results: this.unloadResult(state.results, watchlist)}
            }
        })
    }

    private mergeResult(results: WatchlistResult[], newResult: WatchlistResult, isIndex: boolean) {
        return results
            .filter(r => r.watchlist !== newResult.watchlist)
            .concat(newResult)
            .sort((r1, r2) =>
                isIndex ?
                    this.PRESET_INDICES_WATCHLISTS.indexOf(r1.watchlist) < this.PRESET_INDICES_WATCHLISTS.indexOf(r2.watchlist) ? -1 : 1
                    : this.PRESET_WATCHLISTS.indexOf(r1.watchlist) < this.PRESET_WATCHLISTS.indexOf(r2.watchlist) ? -1 : 1
            );
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

    private containWatchlistData(watchlist: string, isIndex: boolean): boolean {
        const results = isIndex ? this.state.indicesResults : this.state.results;
        const watchlistResult = results
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

        const allResults = this.state.indicesResults.concat(this.state.results.concat(this.state.customResults));
        const watchlists = []

        allResults
            .forEach((watchlistResult) => {
                const onRefreshClickHandler = (watchlist) => this.loadWatchlistData(watchlist, watchlistResult.isIndex, true, false);
                const onShowClickHandler = (watchlist) => {
                    if (this.containWatchlistData(watchlist, watchlistResult.isIndex)) {
                        this.unloadWatchlistData(watchlist, watchlistResult.isIndex)
                    } else {
                        this.loadWatchlistData(watchlist, watchlistResult.isIndex, false, false);
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
                        isIndex={watchlistResult.isIndex}
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