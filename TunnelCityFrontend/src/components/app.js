import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./dashboard";
import Registration from "./auth/Registration";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.isLoggedIn === "NOT_LOGGED_IN"
        ) {
          this.setState({ isLoggedIn: "LOGGED_IN", user: response.data.user });
        } else if (
          !response.data.logged_in &&
          this.state.isLoggedIn === "LOGGED_IN"
        ) {
          this.setState({
            isLoggedIn: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(err => {
        console.log("check login error, ", err);
      });
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: "LOGGED_IN",
      user: data.user
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      isLoggedIn: "NOT_LOGGED_IN",
      user: {}
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
                  handleLogout={this.handleLogout}
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
