import React from 'react';
import './App.css';
import {StocksAnalysis} from "./pages/StocksAnalysis";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WatchlistManager} from "./pages/WatchlistManager";
import {Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Navbar>
                        <Navbar.Brand href="/">Stock Analyst</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Link href="/">Stocks</Nav.Link>
                                <Nav.Link href="/watchlists">Watchlists</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
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
