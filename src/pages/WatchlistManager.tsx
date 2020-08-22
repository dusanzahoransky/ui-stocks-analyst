import React from "react";
import './WatchlistManager.css';
import Watchlist from "../model/watchlist/Watchlist";
import {WatchlistService} from "../services/WatchlistService";
import {BackendError} from "../model/BackendError";
import {Alert} from "../components/Alert";
import {WatchlistConfig} from "../components/WatchlistConfig";

export interface WatchlistManagerState {
    error?: string
    watchlists?: Watchlist[]
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
        const response = await this.watchlistService.allWatchlists()
        if ((response as BackendError).error) {
            this.setState(
                {
                    error: `Failed to load watchlists [${(response as BackendError).message}]`
                }
            )
        } else {
            this.setState(
                {
                    watchlists: response as Watchlist[]
                }
            )
        }
    }

    render() {

        if (this.state.error) {
            return <Alert message={this.state.error} onCloseHandler={event => this.setState({error: undefined})} />
        }

        return this.renderWatchlists();
    }

    private renderWatchlists() {
        return <div>
            {this.state.watchlists.map( watchlist => <WatchlistConfig watchlist={watchlist}/>)}
        </div>;
    }

}
