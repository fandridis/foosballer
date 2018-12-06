import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { withFirebase } from './hocs/Firebase';

import Navigation from './components/Navigation';
import Routes from './routes/Routes';

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
        <Fragment>
          {/*<Navigation isAuthenticated={childProps.isAuthenticated} />*/}

          <Routes childProps={childProps} />
        </Fragment>
      </Router>
    );
  }
}

export default withFirebase(App);
