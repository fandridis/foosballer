import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from './hocs/Firebase';
import { withGlobalState } from './hocs/GlobalState';
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
      user: null,
      isLoading: true,
    }
  }

  async componentDidMount() {
    console.log('DidMount @ App - props: ', this.props);
    this.setState({ isLoading: true });

    this.initializeApp();

    // try {
    //   console.log('Trying to listen to auth');
    //   const user = await this.subscribeToAuth();

    //   console.log('Listener to auth started with user: ', user);
    //   if (user) {
    //     console.log('Trying to listen to players');
    //     const players = await this.subscribeToPlayers();

    //     console.log('Listener to players started with: ', players);
    //     this.setState({ isLoading: false });
    //   }
    //   else {
    //     this.setState({ isLoading: false });
    //   }
      
    // } catch (err) {
    //   console.log('err: ', err);
    // }
  }

  componentWillUnmount() {
    // Unsubscribing from the onAuthStateChanged listener
    this.unsubscribeToAuth();
    this.unsubscribeToPlayers();
  }


    
  async initializeApp() {
    console.log('Initializing app');
    console.log('this.unsubscribeToAuth: ', this.unsubscribeToAuth);
    console.log('this.unsubscribeToPlayers: ', this.unsubscribeToPlayers);
    console.log('this.state.player: ', this.state.player);

    // Only run if auth listener isn't established
    if (!this.unsubscribeToAuth) {
      console.log('No auth listener, creating one');
      await this.subscribeToAuth();
    }

    // Only run if players listener isn't established and user exists
    if (!this.unsubscribeToPlayers && this.state.user) {
      console.log('No players listener, creating one');
      await this.subscribeToPlayers();
    }

    if (this.unsubscribeToPlayers) {
      console.log('Removing players listener');
      this.unsubscribeToPlayers();
    }

    this.setState({ isLoading: false });
  }

  // async refreshApp() {
  //   if (!this.unsubscribeToPlayers && this.state.user) {
  //     this.
  //   }
  // }



  subscribeToAuth() {
    return new Promise((resolve, reject) => {
      this.unsubscribeToAuth = this.props.firebase.auth.onAuthStateChanged(authUser => {
        console.log('Running auth from listener');
        if (authUser) {
          // Authenticated user found - checking if we have a user doc in the database
          this.props.firebase.getUser(authUser.uid)
            .then(res => { 
              if (res.exists) {
                // User doc found in database - updating the state
                this.setState({ user: res.data() }, () => {
                  // this.subscribeToPlayers();
                  console.log('user:', this.state.user);
                  this.initializeApp();
                  resolve('olduser');
                });
                // Further subscribe to players / tournaments / leaderboards collections
                // TODO: Subscribe to rest of collections
                
              }
              else {
                // No user doc found in database (only happens for new signups) - creating one
                this.props.firebase.createUser({ email: authUser.email, uid: authUser.uid })
                  .then(() => {
                    this.setState({ user: { email: authUser.email, uid: authUser.uid } }, () => {
                      // this.subscribeToPlayers();
                      resolve('newuser');
                    })
                  }).catch(err => reject(err));
              }
            }).catch(err => reject(err))
        }
        else {
          // Authenticated user not found (not logged in) - updating state
          resolve(null);
          this.setState({ user: null}, () => {
            this.initializeApp();
          })
          
        }
      });
    })
  }

  subscribeToPlayers() {
    return new Promise((resolve, reject) => {
      console.log('Subscribing to players of user: ', this.state.user);
      this.unsubscribeToPlayers = this.props.firebase.db.collection("players")
        .where("userRef", "==", this.state.user.uid)
        .orderBy('name')
        .onSnapshot((querySnapshot) => {
          let players = [];
          querySnapshot.forEach((doc) => {
              players.push( { ...doc.data(), uid: doc.id });
          });
          // this.setState({ players });
          console.log('players: ', players);
          this.props.globalState.setPlayers(players);
          resolve(players);
        });
    });
  }

  clearUserAndState = () => {
    // console.log('Reseting user - globalState - playerListener ', this.props);
    // this.setState({ user: null });
    // this.props.globalState.reset();

    // if (this.unsubscribeToPlayers) { this.unsubscribeToPlayers() }
  }

  renderLoading() {
    return (
      <h1>Loading...</h1>
    )
  }

  render() {
    if (this.state.isLoading) { return this.renderLoading() }

    const childProps = { isAuthenticated: this.state.user ? this.state.user.uid : false };

    return (
      <Router>
        <Routes childProps={childProps} />
      </Router>
    );
  }
}

export default withFirebase(withGlobalState(App));
