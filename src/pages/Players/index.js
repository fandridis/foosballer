import React, { Component, Fragment } from 'react';

import { withFirebase } from '../../hocs/Firebase';
import PlayerItem from './PlayerItem';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playersListener: null,

      newPlayerName: '',

      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ Players - props: ', this.props);

    // Listener that catches changes in the players collection (firestore db) and updates the state
    const playersListener = this.props.firebase.db.collection("players").where("userRef", "==", this.props.isAuthenticated)
      .onSnapshot((querySnapshot) => {
        let players = [];
        querySnapshot.forEach((doc) => {
            players.push( { ...doc.data(), uid: doc.id });
        });
        this.setState({ players });
    });
    this.setState({ playersListener });
  }

  componentWillUnmount() {
    // Unsubscribing from the players collection listener
    this.state.playersListener();
    this.setState({ playersListener: null })
  }

  onChange = event => this.setState({ newPlayerName: event.target.value });

  handleRemovePlayer = playerId => {
    this.props.firebase.removePlayer(playerId)
      .then(() => console.log('Player removed successfully'))
      .catch(err => console.log('err: ', err))
  }
  
  onSubmit = async event => {
    // TODO: Do not allow empty player names
    event.preventDefault();

    if (this.state.players.find(player => player.name === this.state.newPlayerName)) {
      return console.log('Player name already exists.');
    }

    this.props.firebase.createPlayer(this.props.isAuthenticated, this.state.newPlayerName)
      .then(() => console.log('Player added successfully'))
      .catch(err => console.log('err: ', err))
  };


  render() {
    return (
      <Fragment>
        <h3>Players Squad</h3>

        {/* List of Players */}
        {this.state.players && this.state.players.map(player => {
          return (
            <PlayerItem key={player.uid} player={player} removePlayer={this.handleRemovePlayer} />
          )
        })}

        {/* Add new Player */}
        <form onSubmit={this.onSubmit}>
          <input
            name="name"
            value={this.state.newPlayerName}
            onChange={this.onChange}
            type="text"
            placeholder="Bob?"
          />
          <button disabled={!this.state.newPlayerName} type="submit">
            Add
        </button>

        </form>

      </Fragment>
    );
  }
}

export default withFirebase(Players);


