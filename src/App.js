import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from './hocs/Firebase';
import Routes from './routes/Routes';
/**
 * FONT AWESOME ICON LIBRARY
 * Import any icons here so they are usable across all components
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt, faPencilAlt, faSyncAlt);


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    console.log('DidMount @ App - props: ', this.props);

    // Listener that catches changes in authentication
    this.unsubscribe = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // Authenticated user found - checking if we have a user doc in the database
        this.props.firebase.getUser(authUser.uid)
          .then(res => { 
            if (res.exists) {
              // User doc found in database - updating the state
              this.setState({ user: res.data() });
            }
            else {
              // No user doc found in database (only happens for new signups) - creating one
              this.props.firebase.createUser({ email: authUser.email, uid: authUser.uid })
                .then(() => {
                  this.setState({ user: { email: authUser.email, uid: authUser.uid } })
                }).catch(err => console.log("err: ", err));
            }
          }).catch(err => console.log('err: ', err))
      }
      else {
        // Authenticated user not found (not logged in) - updating state
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    // Unsubscribing from the onAuthStateChanged listener
    this.unsubscribe();
  }

  render() {
    const childProps = { isAuthenticated: this.state.user ? this.state.user.uid : false };

    return (
      <Router>
        <Routes childProps={childProps} />
      </Router>
    );
  }
}

export default withFirebase(App);
