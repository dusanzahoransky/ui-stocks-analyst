import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import "./Menu.css"


export class Menu extends React.Component<{}, {}> {
    render() {
        return  <Navbar>
            <Navbar.Brand href="/">Stock Analyst: </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Stocks</Nav.Link>
                    <Nav.Link href="/watchlists">Watchlists</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}