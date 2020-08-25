import React from "react";
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
            return <Alert message={this.state.error} onCloseHandler={event => this.setState({error: undefined})}/>
        }
        const watchlists = this.renderWatchlists();
        return <div className='WatchlistManager'>
            <h2 className='WatchlistsLabel'>Watchlists</h2>
            <div>
            {watchlists}
            </div>
        </div>
    }

    private renderWatchlists() {
        return <div>
            {this.state.watchlists.map(watchlist => <WatchlistConfig key={watchlist} watchlistName={watchlist}/>)}
        </div>;
    }

}
