import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import { withFirebase } from '../../hocs/Firebase';
import CustomButton from "../../components/CustomButton";

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

    this.props.firebase.doPasswordReset(email)
      .then(res => {
        console.log('Reset email sent');
        this.setState({ email: '', error: null });
      })
      .catch(error => {
        console.log('err: ', error);
        this.setState({ error });
      })
  };


  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div className="Login-Page">
        <h3>Let’s reset your password<br/>Tell us your email and we will help!</h3>
        <form  className="Reset-form" onSubmit={this.onSubmit}>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          {error && <p>{error.message}</p>}
          <CustomButton disabled={isInvalid} type="submit" >SEND</CustomButton>
        </form>
        <Link className="Login-links" to={'/login'}>Cancel</Link>
      </div>
    );
  }
}

export default withFirebase(ResetPassword);



