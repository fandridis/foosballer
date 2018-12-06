import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import PlayerRow from '../../components/PlayerRow';
import Navigation from '../../components/Navigation';
import Button from '../../components/CustomButton';

import './index.css';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playersListener: null,
      playerTargeted: null,

      isLoading: false,
    };
  }

  componentDidMount() {
    console.log('DidMount @ Players: ', this.props);
    this.subscribeToPlayersCollection();
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players');
    this.unsubscribeFromPlayersCollection();
  }

  /**
   * Create a listener for real-time communication between the app and the database.
   * Update the state to always contain the same info with the database.
   * Injects the player document id into the player object for easy reference
   */
  subscribeToPlayersCollection() {
    const playersListener = this.props.firebase.db.collection("players")
    .where("userRef", "==", this.props.isAuthenticated)
    .orderBy('name')
    .onSnapshot((querySnapshot) => {
      let players = [];
      querySnapshot.forEach((doc) => {
          players.push( { ...doc.data(), uid: doc.id });
      });
      this.setState({ players });
    });
    this.setState({ playersListener });
  }

  /**
   * Unsubscribe from the players collection listener.
   * Update the state.
   */
  unsubscribeFromPlayersCollection() {
    this.state.playersListener();
    this.setState({ playersListener: null });
  }

  /**
   * Open the PlayersCreate page for creating a new player.
   */
  handleAddPlayer = () => {
    console.log('Opening player page for creating');
    this.props.history.push('/players/create');
  }

  /**
   * Opens the PlayersEdit page for editing a player.
   * @param {object} player - The player to be edited
   */
  handleEditPlayer = player => {
    console.log('Open player page for editing');
    this.props.history.push({
      pathname: `/players/edit/${player.uid}`,
      player: player
    })
  }

  /**
   * Deletes a player document from the database.
   * @param {string} playerId - The id of the player to be removed
   */
  handleRemovePlayer = playerId => {
    this.props.firebase.removePlayer(playerId)
      .then(() => console.log('Player removed successfully'))
      .catch(err => console.log('err: ', err))
  }

  handleTarget = playerTargeted => {
    if (playerTargeted === this.state.playerTargeted) { playerTargeted = null}

    this.setState({ playerTargeted }) 
  }

  render() {
    return (
      <div className="players-page">
        <h3>Players Squad</h3>

        { this.state.players &&
          <Transition
            items={this.state.players} keys={player => player.uid}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 60 }}
            leave={{ opacity: 0, height: 0 }}>
            {player => props =>
              <div style={props} key={player.uid} onClick={() => this.handleTarget(player.uid)}>
                <PlayerRow 
                  key={player.uid}
                  player={player}
                  onRemove={this.handleRemovePlayer}
                  onEdit={this.handleEditPlayer}
                  targeted={player.uid === this.state.playerTargeted ? true : false}      
                />
              </div>
            }
          </Transition>
        }

        <Button text="NEW PLAYER"  onClick={() => this.handleAddPlayer()} />

        {/* Bottom Navigation bar/>*/}
        <Navigation isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}

export default withRouter(withFirebase(Players));


