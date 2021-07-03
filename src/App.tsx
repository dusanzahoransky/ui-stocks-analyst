import React from 'react';
import './App.css';
import {StocksAnalysis} from "./pages/StocksAnalysis";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WatchlistManager} from "./pages/WatchlistManager";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Menu} from "./components/Menu";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Menu/>
                    <Switch>
                        <Route exact path="/">
                            <StocksAnalysis/>
                        </Route>
                        <Route exact path="/watchlists">
                            <WatchlistManager/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
