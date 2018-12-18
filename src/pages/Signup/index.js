import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../Login/index.css'

import { withFirebase } from '../../hocs/Firebase';
import CustomButton from "../../components/CustomButton";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(res => {
        console.log('res @ onSubmit @ Signup: ', res);
      })
      .catch(err => console.log('err: ', err))

  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === ''

    return (
      <div className="Login-Page">
        <form className="Login-Form" onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="email"
            required={true}
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="password"
            required={true}
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="confirm password"
            required={true}
          />
          {error && <p>{error.message}</p>}
          <CustomButton disabled={isInvalid} type="submit" >SIGN UP</CustomButton>
        </form>
        <Link className="Login-links" to={'/login'}>Already have an account? Login!</Link>
      </div>
    );
  }
}

export default withRouter(withFirebase(Signup));


