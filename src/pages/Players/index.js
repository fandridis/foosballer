import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../hocs/Firebase';
import PlayerItem from './PlayerItem';
import ManagePlayer from './ManagePlayer';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playersListener: null,

      selectedPlayer: null,

      tab: 'playerList', // 'playerList', 'managePlayer'

      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ Players');
    this.subscribeToPlayersCollection();
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players');
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
   * Opens the AddPlayer page for creating a player.
   * @method
   * @param {string} playerId - The player to be edited
   */
  handleAddPlayer = () => {
    console.log('Opening player page for creating');
    this.handleChangeTab('managePlayer');
  }

  // TESTING
  handleAddPlayerNewRoute = () => {
    console.log('Opening NEW ROUTE PAGE for creating');
      this.props.history.push({
        pathname: `/players/0`
      })
  }
  // TESTING
  handleEditPlayerNewRoute = (player) => {
    console.log('Opening NEW ROUTE PAGE for creating');
      this.props.history.push({
        pathname: `/players/${player.uid}`,
        data: player
      })
  }

  /**
   * Opens the EditPlayer page for editing a player.
   * @method
   * @param {string} playerId - The player to be edited
   */
  handleEditPlayer = selectedPlayer => {
    console.log('Open player page for editing');
    this.setState({ selectedPlayer }, () => {
      this.handleChangeTab('managePlayer');
    })
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


  renderManagePlayer() {
    return (
      <ManagePlayer 
        userRef={this.props.isAuthenticated}
        players={this.state.players}
        onCancel={this.handleChangeTab}
        player={this.state.selectedPlayer}
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
            <PlayerItem 
              key={player.uid}
              player={player}
              onRemove={this.handleRemovePlayer}
              onEdit={this.handleEditPlayer}
              onEditTest={this.handleEditPlayerNewRoute}
              />
          )
        })}

        <button onClick={() => this.handleAddPlayer()}>Add new Player</button>
        <button onClick={() => this.handleAddPlayerNewRoute()}>Add new Player(newRoute)</button>
      </Fragment>
    )
  }

  render() {
    if (this.state.tab === 'playerList') { return this.renderPlayerList(); }
    else if (this.state.tab === 'managePlayer') { return this.renderManagePlayer(); }
  }
}

export default withRouter(withFirebase(Players));


