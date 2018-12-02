import React, { Component, Fragment } from 'react';

import { withFirebase } from '../../hocs/Firebase';
import PlayerItem from './PlayerItem';
import AddPlayer from './AddPlayer';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playersListener: null,

      tab: 'playerList', // 'playerList', 'addPlayer'

      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ Players - props: ', this.props);
    this.subscribeToPlayersCollection();
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players - props: ', this.props);
    this.unsubscribeFromPlayersCollection();
  }

  /**
   * Create a listener for real-time communication between the app and the database.
   * Update the state to always contain the same info with the database.
   * @method
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
   * @method
   */
  unsubscribeFromPlayersCollection() {
    this.state.playersListener();
    this.setState({ playersListener: null });
  }

  /**
   * Deletes a player document from the database.
   * @method
   * @param {string} playerId - The id of the player to be removed
   */
  handleRemovePlayer = playerId => {
    this.props.firebase.removePlayer(playerId)
      .then(() => console.log('Player removed successfully'))
      .catch(err => console.log('err: ', err))
  }
  
  /**
   * Switches between the playerList view and the addPlayer view.
   * @method
   * @param {string} tab - The tab to switch to: playerList or addPlayer
   */
  handleChangeTab = (tab = 'playerList') => this.setState({ tab })

  renderAddPlayer() {
    return (
      <AddPlayer 
        userRef={this.props.isAuthenticated}
        players={this.state.players}
        onCancel={this.handleChangeTab}
      />
    )
  }

  renderPlayerList() {
    return (
      <Fragment>
        <h3>Players Squad</h3>

        {/* List of Players */}
        {this.state.players && this.state.players.map(player => {
          return (
            <PlayerItem key={player.uid} player={player} removePlayer={this.handleRemovePlayer} />
          )
        })}

        <button onClick={() => this.handleChangeTab('addPlayer')}>Add new Player</button>
      </Fragment>
    )
  }

  render() {
    if (this.state.tab === 'playerList') { return this.renderPlayerList(); }
    else if (this.state.tab === 'addPlayer') { return this.renderAddPlayer(); }
  }
}

export default withFirebase(Players);


