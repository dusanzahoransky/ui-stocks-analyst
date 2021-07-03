import React, {FocusEvent, KeyboardEvent} from "react";
import './WatchlistManager.css';
import {WatchlistService} from "../services/WatchlistService";
import {Alert} from "../components/Alert";
import {WatchlistConfig} from "../components/WatchlistConfig";

export interface WatchlistManagerState {
    error?: string
    watchlists?: string[]
}

export class WatchlistManager extends React.Component<{}, WatchlistManagerState> {

    private readonly watchlistService: WatchlistService;

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            watchlists: []
        }
        this.watchlistService = new WatchlistService()
    }

    async componentDidMount() {
        try {
            const watchlists = await this.watchlistService.allWatchlistNames()
            this.setState({watchlists})
        } catch (e) {
            this.setState({error: `Failed to load watchlists: ${e.message}`})
        }
    }

    render() {
        if (this.state.error) {
            return <Alert message={this.state.error} onCloseHandler={() => this.setState({error: undefined})}/>
        }
        const watchlists = this.renderWatchlists();
        return <div className='WatchlistManager'>
            <h2 className='WatchlistsLabel'>Watchlists</h2>
            <div>
            {watchlists}
            <div className='AddWatchlist Container'>
                <i className="fa fa-plus AddWatchlist Icon"/>
                <label>Stock</label>
                <input type="checkbox" id="isStock" name="watchlistType" checked={true} className='AddWatchlist WatchlistType'
                       onClick={(e) => WatchlistManager.watchlistTypeClick(e)}/>
                <label>Etf</label>
                <input type="checkbox" id="isEtf" name="watchlistType" className='AddWatchlist WatchlistType'
                       onClick={(e) => WatchlistManager.watchlistTypeClick(e)}/>
                <input className='AddWatchlist WatchlistName'
                       placeholder='Watchlist name'
                       pattern="\w+"
                       onBlur={e => this.onAddTickerBlur(e)}
                       onKeyPress={e => this.onAddTickerKeyPress(e)}
                />
            </div>
            </div>
        </div>
    }

    private renderWatchlists() {
        return <div>
            {this.state.watchlists.map(watchlist => <WatchlistConfig key={watchlist} watchlistName={watchlist}
                onRemoveWatchlistClickHandler={() => this.onRemoveWatchlistClick(watchlist)}/>)}
        </div>;
    }

    private async onRemoveWatchlistClick(watchlistName) {
        if (window.confirm(`Delete watchlist ${watchlistName}`)){
            try {
                await this.watchlistService.removeWatchlist(watchlistName)
                const watchlists = await this.watchlistService.allWatchlistNames()
                this.setState({watchlists})
            } catch (e) {
                this.setState({
                    error: `Failed to delete watchlist ${watchlistName}: ${e.message}`
                })
            }
        }
    }


    private static watchlistTypeClick(event: React.MouseEvent<HTMLInputElement>) {
        const watchlistType = event.target as HTMLInputElement;
        document.getElementsByName('watchlistType')
            .forEach((item) => {
                if (item !== watchlistType) (item as HTMLInputElement).checked = false
        })
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

    private async saveTicker(watchlistName: string) {
        if (!watchlistName.match(/\w+/)) {
            return
        }
        const isEtf = (document.getElementById('isEtf') as HTMLInputElement).checked
        try {
            await this.watchlistService.addWatchlist({
                name: watchlistName,
                etf: isEtf,
                tickers: []
            });
            const watchlists = await this.watchlistService.allWatchlistNames()
            this.setState({watchlists})
        } catch (e) {
            this.setState({
                error: `Failed to create watchlist ${watchlistName}: ${e.message}`
            })
        }
    }

}
