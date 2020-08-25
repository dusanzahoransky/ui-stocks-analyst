import React from "react";
import './WatchlistConfig.css'
import {WatchlistService} from "../services/WatchlistService";
import Watchlist from "../model/watchlist/Watchlist";
import {Alert} from "./Alert";

export interface WatchlistConfigProps {
    watchlistName: string
}

export interface WatchlistConfigState {
    /**
     * show the watchlist - render it as expanded, showing all the stocks
     */
    isExpanded: boolean
    watchlist: Watchlist
    error: string
}

export class WatchlistConfig extends React.Component<WatchlistConfigProps, WatchlistConfigState> {

    private readonly watchlistService: WatchlistService;

    constructor(props: Readonly<WatchlistConfigProps>) {
        super(props)
        this.state = {
            isExpanded: false,
            error: undefined,
            watchlist: undefined
        }
        this.watchlistService = new WatchlistService()
        //uncomment below to have expanded TEST_ETF watchlist for testing
        if(this.props.watchlistName === 'TEST_ETF') {
            this.watchlistService.watchlist(this.props.watchlistName).then(watchlist => {
                this.setState( {
                    isExpanded: true,
                    watchlist
                })
            })
        }
    }

    render() {
        if (this.state.error) {
            return <Alert message={this.state.error} onCloseHandler={() => this.setState({error: undefined})}/>
        }
        let watchlistTickers
        if(this.state.isExpanded && this.state.watchlist){
            watchlistTickers = this.state.watchlist.tickers.map(ticker => this.renderTicker(ticker))
        }
        return <div className='WatchlistConfig' key={this.props.watchlistName}>
            <h2 className={"WatchlistName Stock"}>
                {this.renderShowLink()}
                {this.props.watchlistName}
            </h2>
            {watchlistTickers}
        </div>
    }

    private renderTicker(ticker: string) {
        return <span className='Ticker' key={ticker}>{ticker}<br/></span>;
    }

    private renderShowLink() {
        return <i className="fa fa-caret-down" onClick={() => this.onExpand()}/>
    }

    private async onExpand() {
        if(this.state.isExpanded){
            this.setState( state => {
                return {
                    isExpanded: !state.isExpanded
                }
            })
            return
        }

        let watchlist
        let error
        try {
            watchlist = await this.watchlistService.watchlist(this.props.watchlistName)
        } catch (e) {
            error = `Failed to load watchlist: ${e.message}`
        }
        this.setState( state => {
            return {
                isExpanded: !state.isExpanded,
                watchlist,
                error
            }
        })
    }
}