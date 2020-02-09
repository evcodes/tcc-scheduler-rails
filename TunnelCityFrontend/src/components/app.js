import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./dashboard";
import Registration from "./auth/Registration";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard {...props} isLoggedIn={this.state.isLoggedIn} />
              )}
            />
            <Route exact path={"/registration"} component={Registration} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
