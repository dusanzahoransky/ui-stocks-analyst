import HttpClient from "./HttpClient";
import Watchlist from "../model/watchlist/Watchlist";


export class WatchlistService {

    async allWatchlists(): Promise<Watchlist[]> {
        return HttpClient.fetch('http://localhost:3000/watchlists');
    }

    async allWatchlistNames(): Promise<string[]> {
        return HttpClient.fetch('http://localhost:3000/watchlists/names');
    }

    async watchlist(watchlistName: string) {
        return HttpClient.fetch(`http://localhost:3000/watchlists/${watchlistName}`);
    }

    async addTickersToWatchlist(watchlistName: string, tickers:string[]) {
        return HttpClient.fetch(`http://localhost:3000/watchlists/${watchlistName}/add`, 'PUT', tickers);
    }

    async removeTickersFromWatchlist(watchlistName: string, tickers:string[]) {
        return HttpClient.fetch(`http://localhost:3000/watchlists/${watchlistName}/remove`,'PUT', tickers);
    }

    async removeWatchlist(watchlistName: string) {
        return HttpClient.fetch(`http://localhost:3000/watchlists/${watchlistName}`,'DELETE');
    }
}