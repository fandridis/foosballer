import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import * as ROUTES from '../../routes/names';

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

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    try {
      this.props.globalState.startLoading();
      // Create a user in the firebase - authentication system
      const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne);

      // Create a user document in firebase - firestore database
      await this.props.firebase.createUser({ email, uid: authUser.user.uid });

    } catch (error) {
      console.error("Error @ signup: ", error);
      this.setState({ error, passwordOne: '', passwordTwo: '' });
      this.props.globalState.stopLoading();
    }
  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === ''

    return (
      <Fragment>
        <h3>Signup</h3>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
        </button>

          {error && <p>{error.message}</p>}
        </form>

        <p>Already have an account?<Link to={ROUTES.LOGIN}>Login</Link></p>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
  withGlobalState
)(Signup);


