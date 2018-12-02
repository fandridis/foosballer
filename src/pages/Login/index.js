import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
// import { compose } from 'recompose';

import { withFirebase } from '../../hocs/Firebase';
import * as ROUTES from '../../routes/names';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  invalidForm = () => this.state.password === '' || this.state.email === ''

  onSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase.doSignInWithEmailAndPassword(email, password)
      .then(res => console.log('res @ login: ', res))
      .catch(err => console.log('err @ login: ', err))
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Fragment>
        <h3>Login</h3>

        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Login
          </button>

          {error && <p>{error.message}</p>}
        </form>

        <p>Don't have an account?<Link to={ROUTES.SIGNUP}>Sign Up</Link></p>

        <p>Fogot your password?<Link to={ROUTES.RESET_PASSWORD}>Reset</Link></p>
      </Fragment>
    );
  }
}

export default withFirebase(Login);

