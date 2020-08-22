import React from "react";
import Watchlist from "../model/watchlist/Watchlist";
import './WatchlistConfig.css'

export interface WatchlistConfigProps {
    watchlist: Watchlist
}

export class WatchlistConfig extends React.Component<WatchlistConfigProps, {}> {
    render() {
        return <div className='WatchlistConfig'>
            <p>{this.props.watchlist.name}</p>
            <ul>
                {this.props.watchlist.tickers.map(ticker => <li>{ticker}</li>)}
            </ul>
        </div>
    }
}