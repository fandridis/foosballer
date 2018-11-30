import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import PasswordReset from '../../components/PasswordReset';
import * as ROUTES from '../../routes/names';

class Login extends Component {
  render(props) {
    return (
      <Fragment>
        <h3>Reset password</h3>
        <PasswordReset />

        <p><Link to={ROUTES.LOGIN}>Back</Link></p>
      </Fragment>
    );
  }
}

export default Login;
