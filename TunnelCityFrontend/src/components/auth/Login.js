import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //taking the structure from the login controller rails api endpoint
  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true } // stores cookie in client
      )
      .then(response => {
        console.log(response);

        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          console.log(response);
          this.state.loginErrors = response.data.status;
        }
      })
      .catch(error => {
        console.log("Login error: ", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("handle change", event);
  }

  render() {
    return (
      <div>
        <h1> Login </h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
