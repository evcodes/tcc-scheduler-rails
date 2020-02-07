import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //taking the structure from the registrations controller rails api endpoint
  handleSubmit(event) {
    const { email, password, passwordConfirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true } // stores cookie in client
      )
      .then(response => {
        console.log("Registration response: ", response);
      })
      .catch(error => {
        console.log("Registration error: ", error);
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
        <h1> Registration </h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />
          <br />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
