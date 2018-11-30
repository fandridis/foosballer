import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import { withFirebase } from '../../hocs/Firebase';
import * as ROUTES from '../../routes/names';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { email } = this.state;

    try {
      await this.props.firebase.doPasswordReset(email);
      this.setState({ email: '', error: null });

    } catch (error) {
      this.setState({ error });
    }
  };


  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Fragment>
        <h3>Reset Password</h3>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <button disabled={isInvalid} type="submit">
            Reset My Password
        </button>

          {error && <p>{error.message}</p>}
        </form>

        <p><Link to={ROUTES.LOGIN}>Back</Link></p>
      </Fragment>
    );
  }
}

export default withFirebase(ResetPassword);



