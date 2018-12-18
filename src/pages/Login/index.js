import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import CustomButton from '../../components/CustomButton';
import './index.css';

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
        this.props.globalState.stopLoading();
        this.setState({ isLoading: false });
      })
  };

  render() {
    if (this.props.globalState.isLoading) { return this.props.globalState.renderLoading() }

    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="Login-Page">
        <form className="Login-Form" onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="email"
            required={true}
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="password"
            required={true}
          />
          {/* <button disabled={isInvalid} type="submit">
            Login
          </button> */}
          {error && <p>{error.message}</p>}
          <CustomButton disabled={isInvalid} type="submit" >LOGIN</CustomButton>
        </form>
        <div className="Login-links">
          <Link to={'/resetpassword'}>Forgot password</Link>
          <Link to={'/signup'}>Create account</Link>
        </div>
      </div>
    );
  }
}

export default withFirebase(withGlobalState(Login));

