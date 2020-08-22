import {BackendError} from "../model/BackendError";
import HttpClient from "./HttpClient";
import Watchlist from "../model/watchlist/Watchlist";


export class WatchlistService {

    async allWatchlists(): Promise<Watchlist[] | BackendError> {
        return HttpClient.fetch('http://localhost:3000/watchlists');
    }
}