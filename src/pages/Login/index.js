import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import CustomButton from '../../components/CustomButton';

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
    this.props.globalState.startLoading();

    const { email, password } = this.state;

    this.props.firebase.doSignInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res @ login: ', res);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log('err @ login: ', err);
        this.setState({ isLoading: false });
      })
  };

  render() {
    if (this.props.globalState.isLoading) { return this.props.globalState.renderLoading() }

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
          {/* <button disabled={isInvalid} type="submit">
            Login
          </button> */}
          <CustomButton disabled={isInvalid} type="submit" text="Login" />

          {error && <p>{error.message}</p>}
        </form>

        <p>Don't have an account?<Link to={'/signup'}>Sign Up</Link></p>

        <p>Fogot your password?<Link to={'/resetpassword'}>Reset</Link></p>
      </Fragment>
    );
  }
}

export default withFirebase(withGlobalState(Login));

