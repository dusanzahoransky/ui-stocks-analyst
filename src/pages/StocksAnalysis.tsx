import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import {StockAnalysisResult} from "../model/StockAnalysisResult";
import './StocksAnalysis.css';
import {Watchlist} from "../components/Watchlist";
import {BackendError} from "../model/BackendError";
import {EtfsAnalysisResult} from "../model/EtfsAnalysisResult";
import {StickerPriceCalculator} from "../components/StickerPriceCalculator";

export interface StocksAnalysisProps {

}

export interface StocksAnalysisState {
    error?: string
    etfsResults?: WatchlistResult[]
    results?: WatchlistResult[]
    customResults?: WatchlistResult[]
}

interface WatchlistResult {
    isLoaded: boolean,
    isPreset: boolean,
    isEtf: boolean,
    watchlist: string,
    analysisResult: StockAnalysisResult | EtfsAnalysisResult
}

export class StocksAnalysis extends React.Component<StocksAnalysisProps, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;

    constructor(props: Readonly<StocksAnalysisProps>) {
        super(props);
        this.state = {
            error: undefined,
            etfsResults: [],
            results: [],
            customResults: []
        }
        this.stockAnalystService = new StockAnalystService();
    }

    private readonly STOCK_WATCHLISTS = [
        /* 'TEST',*/
        'TO_CHECK',
        'ALL_INVESTED',

        'US_ALL',
        'US_INVESTED_IN',

        'EU_ALL',
        'EU_INVESTED_IN',

        'GB_ALL',
        'GB_INVESTED_IN',

        'AU_ALL',
        'AU_INVESTED_IN',

        'AIRLINES',
        'TECH',
        'NASDAQ_100',
        'DIVIDENDS',
    ];

    private readonly ETF_WATCHLISTS = [
        'TEST_INDICES',
        'ETF_ALL',

        'AU_ETF_ALL',
        'AU_ETF_AU',
        'AU_ETF_US',
        'AU_ETF_ASIA',
        'AU_ETF_INVESTED_IN',

        'GB_ETF_ALL',
        'GB_ETF_INVESTED_IN',

        'EU_ETF_ALL',
        'EU_ETF_INVESTED_IN',

        'ETF_TRADING_212_INVESTED_IN',

        'EU_ETF_BOND',
        'AU_ETF_BOND'
    ];

    componentDidMount() {
        // this.loadWatchlistData("TEST", false)
        this.STOCK_WATCHLISTS
            // .forEach(watchlist => this.loadWatchlistData(watchlist, false))
            .forEach(watchlist => this.createEmptyWatchlist(watchlist, false))
        this.ETF_WATCHLISTS
            // .forEach(watchlist => this.loadWatchlistData(watchlist, true, false))
            .forEach(watchlist => this.createEmptyWatchlist(watchlist, true))
    }

    private async loadWatchlistData(watchlist: string,
                                    isEtf: boolean,
                                    forceRefresh: boolean = false,
                                    forceRefreshRatios: boolean = false,
                                    mockData: boolean = false) {
        const response = isEtf ?
            await this.stockAnalystService.loadEtfsAnalysis(watchlist, forceRefresh, mockData)
            : await this.stockAnalystService.loadAnalysis(watchlist, forceRefresh, forceRefreshRatios, mockData)
        const error = response as BackendError;
        if (error.error) {
            console.error(`Failed to load ${watchlist}: ${error.message}`)
            return
        }
        const analysisResult = response as StockAnalysisResult | EtfsAnalysisResult;

        const watchlistResult: WatchlistResult = {
            isLoaded: true,
            isPreset: true,
            isEtf,
            watchlist,
            analysisResult
        }

        this.setState((state) => {
            if (isEtf) {
                return {etfsResults: this.mergeResult(state.etfsResults, watchlistResult, isEtf)}
            } else {
                return {results: this.mergeResult(state.results, watchlistResult, isEtf)}
            }
        })
    }

    private createEmptyWatchlist(watchlist: string, isEtf: boolean) {
        const watchlistResult: WatchlistResult = {
            isLoaded: false,
            isPreset: true,
            isEtf,
            watchlist,
            analysisResult: undefined
        }

        this.setState((state) => {
            if (isEtf) {
                return {etfsResults: this.mergeResult(state.etfsResults, watchlistResult, isEtf)}
            } else {
                return {results: this.mergeResult(state.results, watchlistResult, isEtf)}
            }
        })
    }

    private unloadWatchlistData(watchlist: string, isEtf: boolean) {
        this.setState((state) => {
            if (isEtf) {
                return {etfsResults: this.unloadResult(state.etfsResults, watchlist)}
            } else {
                return {results: this.unloadResult(state.results, watchlist)}
            }
        })
    }

    private mergeResult(results: WatchlistResult[], newResult: WatchlistResult, isEtf: boolean) {
        return results
            .filter(r => r.watchlist !== newResult.watchlist)
            .concat(newResult)
            .sort((r1, r2) =>
                isEtf ?
                    this.ETF_WATCHLISTS.indexOf(r1.watchlist) < this.ETF_WATCHLISTS.indexOf(r2.watchlist) ? -1 : 1
                    : this.STOCK_WATCHLISTS.indexOf(r1.watchlist) < this.STOCK_WATCHLISTS.indexOf(r2.watchlist) ? -1 : 1
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

    private containWatchlistData(watchlist: string, isEtf: boolean): boolean {
        const results = isEtf ? this.state.etfsResults : this.state.results;
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

        const allResults = this.state.etfsResults.concat(this.state.results.concat(this.state.customResults));
        const watchlists = []

        allResults
            .forEach((watchlistResult) => {
                const onRefreshClickHandler = (watchlist) => {
                    this.loadWatchlistData(watchlist, watchlistResult.isEtf, true, false, false);
                }
                const onRefreshRatiosClickHandler = (watchlist) => {
                    this.loadWatchlistData(watchlist, watchlistResult.isEtf, false, true, false);
                }
                const onShowClickHandler = (watchlist) => {
                    if (this.containWatchlistData(watchlist, watchlistResult.isEtf)) {
                        this.unloadWatchlistData(watchlist, watchlistResult.isEtf)
                    } else {
                        this.loadWatchlistData(watchlist, watchlistResult.isEtf, false, false);
                    }
                }
                watchlists.push(
                    <Watchlist
                        key={watchlistResult.watchlist}
                        result={watchlistResult.analysisResult}
                        watchlist={watchlistResult.watchlist}
                        onRefreshYahooHandler={onRefreshClickHandler}
                        onRefreshMorningstarClickHandler={onRefreshRatiosClickHandler}
                        onShowClickHandler={onShowClickHandler}
                        isPreset={watchlistResult.isPreset}
                        isEtf={watchlistResult.isEtf}
                        isExpanded={watchlistResult.isLoaded}
                    />
                )
            });

        return (
            <div className='StocksAnalysis'>
                <div className='StickerPrice'><StickerPriceCalculator/></div>
                <div className={'Watchlists'}>{watchlists}</div>
            </div>
        )
    };


}