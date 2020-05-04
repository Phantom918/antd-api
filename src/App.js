import React, { Component } from "react";
import Router from "./router/router";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App login_bg">
                <Router />
            </div>
        );
    }
}

export default App;
