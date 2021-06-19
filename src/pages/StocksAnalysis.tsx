import React from "react";
import {StockAnalystService} from "../services/StockAnalystService";
import './StocksAnalysis.css';
import {IntrinsicValueCalculator} from "../components/IntrinsicValueCalculator";
import {Alert} from "../components/Alert";
import Watchlist from "../model/watchlist/Watchlist";
import {WatchlistService} from "../services/WatchlistService";
import {WatchlistAnalysis} from "../components/WatchlistAnalysis";
import {DiscountedFCFCalculator} from "../components/DiscountedFCFCalculator";

export interface StocksAnalysisState {
    error?: string
    watchlists?: Watchlist[]
}

export class StocksAnalysis extends React.Component<{}, StocksAnalysisState> {

    private readonly stockAnalystService: StockAnalystService;
    private readonly watchlistService: WatchlistService;

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            watchlists: []
        }
        this.stockAnalystService = new StockAnalystService();
        this.watchlistService = new WatchlistService();
    }

    async componentDidMount() {
        try {
            const watchlists = await this.watchlistService.allWatchlists()
            this.setState({watchlists})
        } catch (e) {
            this.setState({error: `Failed to load watchlists: ${e.message}`})
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({error: error.message})
    }

    render() {
        const alert = this.state.error ?
            <Alert message={this.state.error} onCloseHandler={() => this.setState({error: undefined})}/> :
            undefined
        const etfWatchlists = this.state.watchlists
            .filter(watchlist => watchlist.etf)
            .map(watchlist => StocksAnalysis.renderResult(watchlist))
        const stockWatchlists = this.state.watchlists
            .filter(watchlist => !watchlist.etf)
            .map(watchlist => StocksAnalysis.renderResult(watchlist))

        return <div className='StocksAnalysis'>
            <div className='TopPanel'>
                {alert}
                <div className='Calculators'>
                    <IntrinsicValueCalculator/>
                    <DiscountedFCFCalculator/>
                </div>
            </div>
            <div className='Watchlists'>
                <div className={'EtfWatchlists'}>
                    <h2 className='WatchlistsTypeLabel'>ETF Watchlists</h2>
                    {etfWatchlists}
                </div>
                <div className={'StockWatchlists'}>
                    <h2 className='WatchlistsTypeLabel'>Stock Watchlists</h2>
                    {stockWatchlists}
                </div>
            </div>
        </div>
    }

    private static renderResult(watchlist: Watchlist) {
        return <WatchlistAnalysis
            key={watchlist.name}
            watchlist={watchlist}
        />
    }
}