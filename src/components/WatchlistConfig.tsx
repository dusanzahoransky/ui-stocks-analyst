import React, {FocusEvent, KeyboardEvent} from "react";
import './WatchlistConfig.css'
import {WatchlistService} from "../services/WatchlistService";
import Watchlist from "../model/watchlist/Watchlist";
import {Alert} from "./Alert";
import {FormattingUtils} from "../utils/FormattingUtils";

export interface WatchlistConfigProps {
    watchlistName: string
    onRemoveWatchlistClickHandler: () => void
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
                {this.removeWatchlistLink()}
            </h2>
            {this.renderTickerContainer()}
        </div>
    }

    private removeWatchlistLink() {
        if (!this.state.isExpanded) {
            return undefined
        }
        return <i className="fa fa-minus RemoveWatchlistIcon" onClick={() =>  this.onRemoveWatchlistClick()}/>;
    }

    private async onRemoveWatchlistClick() {
        this.props.onRemoveWatchlistClickHandler()
    }

    private renderTickerContainer() {
        const {isExpanded, watchlist} = this.state
        if (!isExpanded || !watchlist) {
            return <></>
        }
        const watchlistTickers = watchlist.tickers.map(ticker => this.renderTicker(ticker))
        const addTicker = <div>
            <i className="fa fa-plus AddTickerIcon"/>
            <input className='AddTicker'
                   placeholder='XYZ:NASDAQ'
                   pattern="[0-9A-Z-]+:[A-Z]+"
                   title='Format: [SYMBOL]:[EXCHANGE], where exchange is one of: ASX, NASDAQ, NYSE, FTSE, DAX, ENX, SIX, PA, MCE, PNK, MCX, TSE, T, JSE'
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
        if (e.key === 'Enter') {
            // @ts-ignore
            this.saveTicker(e.target.value)
        }
    }

    private onAddTickerBlur(e: FocusEvent<HTMLInputElement>) {
        this.saveTicker(e.target.value)
    }

    private async saveTicker(ticker: string) {
        if (!ticker.match(/[0-9A-Z-]+:[A-Z]+/)) {
            return
        }
        try {
            const watchlist = await this.watchlistService.addTickersToWatchlist(this.props.watchlistName, [ticker]);
            this.setState({
                watchlist
            })
        } catch (e) {
            this.setState({
                error: `Failed to add ticker ${ticker} watchlist: ${e.message}`
            })
        }
    }

    private renderTicker(ticker: string) {
        return <div className='Ticker' key={ticker}>
            <i className="fa fa-minus RemoveTickerIcon" onClick={() => this.onRemoveTickerClick(ticker)}/>
            {ticker}
        </div>;
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

        try {
            const watchlist = await this.watchlistService.watchlist(this.props.watchlistName)
            console.log(watchlist)
            this.setState({
                watchlist,
                isExpanded: true
            })
        } catch (e) {
            this.setState({
                error: `Failed to load watchlist ${this.props.watchlistName}: ${e.message}`
            })
        }
    }

    private async onRemoveTickerClick(ticker: string) {
        try {
            const watchlist = await this.watchlistService.removeTickersFromWatchlist(this.props.watchlistName, [ticker]);
            this.setState({
                watchlist
            })
        } catch (e) {
            this.setState({
                error: `Failed to remove ticker ${ticker} from watchlist: ${e.message}`
            })
        }
    }

}