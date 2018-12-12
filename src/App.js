import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { withFirebase } from './hocs/Firebase';
import { withGlobalState } from './hocs/GlobalState';
import Routes from './routes/Routes';
import Loading from './components/Loading';
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

      playersLoading: true,
      tournamentsLoading: true,
      isLoading: true,
    }
  }

  async componentDidMount() {
    console.log('DidMount @ App - props: ', this.props);
    this.setState({ isLoading: true });

    this.subscribeToAuth();
  }

  componentWillUnmount() {
    this.unsubscribeToAuth();
  }

  initializeApp = async () => {
    this.setState({ isLoading: true });
    console.log('----- Initializing app -----');

    if (this.state.playersLoading) {
      console.log('Fetching players');
      const data = await this.props.firebase.getPlayers(this.state.user.uid);
      console.log('Fetched Players');
      let players = [];

      for (let doc of data.docs) {
        players.push({ ...doc.data(), uid: doc.id });
      }

      this.props.globalState.setPlayers(players);
    }

    if (this.state.tournamentsLoading) {
      console.log('Fetching tournaments');
      const data = await this.props.firebase.getTournaments(this.state.user.uid);
      console.log('Fetched tournaments')
      let tournaments = [];

      for (let doc of data.docs) {
        tournaments.push({ ...doc.data(), uid: doc.id });
      }

      this.props.globalState.setTournaments(tournaments);
    }

    this.setState({ isLoading: false });
  }

  resetApp = () => {
    this.props.globalState.reset();
    this.setState({ isLoading: false });
  }

  subscribeToAuth() {
      this.unsubscribeToAuth = this.props.firebase.auth.onAuthStateChanged(authUser => {
        console.log('Running auth from listener');
        if (authUser) {
          // Authenticated user found - checking if we have a user doc in the database
          this.props.firebase.getUser(authUser.uid)
            .then(res => { 
              if (res.exists) {
                // User doc found in database - updating the state
                this.setState({ user: res.data() }, () => {
                  console.log('user:', this.state.user);
                  this.initializeApp();
                });             
              }
              else {
                // No user doc found in database (only happens for new signups) - creating one
                this.props.firebase.createUser({ email: authUser.email, uid: authUser.uid })
                  .then(() => {
                    this.setState({ user: { email: authUser.email, uid: authUser.uid } }, () => {
                    })
                  }).catch(err => console.log(err));
              }
            }).catch(err => console.log(err))
        }
        else {
          // Authenticated user not found (not logged in) - updating state
          this.setState({ user: null}, () => {
            this.resetApp();
          })
          
        }
    })
  }

  /**
   * Not used, but kept as an example for realtime subsription to db
   */
  // subscribeToPlayers() {
  //   return new Promise((resolve, reject) => {
  //     console.log('Subscribing to players of user: ', this.state.user);
  //     this.unsubscribeToPlayers = this.props.firebase.db.collection("players")
  //       .where("userRef", "==", this.state.user.uid)
  //       .orderBy('name')
  //       .onSnapshot((querySnapshot) => {
  //         let players = [];
  //         querySnapshot.forEach((doc) => {
  //             players.push( { ...doc.data(), uid: doc.id });
  //         });
  //         // this.setState({ players });
  //         console.log('players: ', players);
  //         this.props.globalState.setPlayers(players);
  //         resolve(players);
  //       });
  //   });
  // }

  renderLoading() { return ( <Loading /> )}

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
