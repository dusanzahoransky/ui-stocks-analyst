import React, {FocusEvent, KeyboardEvent} from "react";
import './WatchlistConfig.css'
import {WatchlistService} from "../services/WatchlistService";
import Watchlist from "../model/watchlist/Watchlist";
import {Alert} from "./Alert";
import {FormattingUtils} from "../utils/FormattingUtils";

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
        if (this.props.watchlistName === 'TEST_ETF') {
            this.watchlistService.watchlist(this.props.watchlistName).then(watchlist => {
                this.setState({
                    isExpanded: true,
                    watchlist
                })
            })
        }
    }

    render() {
        const {error} = this.state
        const {watchlistName} = this.props
        if (this.state.error) {
            return <Alert message={error} onCloseHandler={() => this.setState({error: undefined})}/>
        }
        return <div className='WatchlistConfig' key={watchlistName}>
            <h2 className={"WatchlistName Stock"}>
                {this.renderShowLink()}
                {FormattingUtils.toWatchlistLabel(watchlistName)}
            </h2>
            {this.renderTickerContainer()}
        </div>
    }

    private renderTickerContainer() {
        const {isExpanded, watchlist} = this.state
        if (!isExpanded || !watchlist) {
            return <></>
        }
        const watchlistTickers = watchlist.tickers.map(ticker => WatchlistConfig.renderTicker(ticker))
        const addTicker = <div>
            <i className="fa fa-plus"/>
            <input className='AddTicker'
                   name='AddTicker'
                   onBlur={e => this.onAddTickerBlur(e)}
                   onKeyPress={e => this.onAddTickerKeyPress(e)}
            />
        </div>
        return <div className='TickerContainer'>
            {watchlistTickers}
            {addTicker}
        </div>;
    }

    private onAddTickerKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter'){
            // @ts-ignore
            this.saveTicker(e.target.value)
        }
    }

    private onAddTickerBlur(e: FocusEvent<HTMLInputElement>) {
        this.saveTicker(e.target.value)
    }

    private saveTicker(value: string) {
        console.log(value)
    }

    private static renderTicker(ticker: string) {
        return <div className='Ticker' key={ticker}>{ticker}</div>;
    }

    private renderShowLink() {
        return <i className="fa fa-caret-down" onClick={() => this.onExpand()}/>
    }

    private async onExpand() {
        const {isExpanded} = this.state
        if (isExpanded) {
            this.setState({isExpanded: !isExpanded})
            return
        }

        let watchlist
        let error
        try {
            watchlist = await this.watchlistService.watchlist(this.props.watchlistName)
        } catch (e) {
            error = `Failed to load watchlist: ${e.message}`
        }
        this.setState({
                isExpanded: !isExpanded,
                watchlist,
                error
            }
        )
    }

}