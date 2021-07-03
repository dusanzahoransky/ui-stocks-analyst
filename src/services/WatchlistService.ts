import HttpClient from "./HttpClient";
import Watchlist from "../model/watchlist/Watchlist";


export class WatchlistService {

    private readonly watchlistEndpoint = 'http://localhost:3000/watchlist';

    async allWatchlists(): Promise<Watchlist[]> {
        return HttpClient.fetch(this.watchlistEndpoint);
    }

    async allWatchlistNames(): Promise<string[]> {
        return HttpClient.fetch(`${this.watchlistEndpoint}/names`);
    }

    async watchlist(watchlistName: string) {
        return HttpClient.fetch(`${this.watchlistEndpoint}/${watchlistName}`);
    }

    async removeWatchlist(watchlistName: string) {
        return HttpClient.fetch(`${this.watchlistEndpoint}/${watchlistName}`,'DELETE');
    }

    async addWatchlist(watchlist: Watchlist) {
        return HttpClient.fetch(this.watchlistEndpoint,'POST', watchlist);
    }


    async addTickersToWatchlist(watchlistName: string, tickers:string[]) {
        return HttpClient.fetch(`${this.watchlistEndpoint}/${watchlistName}/add`, 'PUT', tickers);
    }

    async removeTickersFromWatchlist(watchlistName: string, tickers:string[]) {
        return HttpClient.fetch(`${this.watchlistEndpoint}/${watchlistName}/remove`,'PUT', tickers);
    }

}