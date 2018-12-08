import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Navigation from '../../components/Navigation';
import Button from '../../components/CustomButton';

import './index.css';

class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: null,

      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ Tournaments: ', this.props);
    this.setState({ tournaments: this.props.globalState.tournaments })
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Tournaments');
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
  handleAddTournament = () => {
    console.log('Opening player page for creating');
    this.props.history.push('/tournaments/create');
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
      <div className="Tournaments-page">
        <h3>Tournaments</h3>

        { 
          this.state.tournaments && this.state.tournaments.map(tournament => {
            return (
              <div key={tournament.uid}>
                <h3>{tournament.name}</h3>
                <p>{tournament.createdAt}</p>
              </div>
            );
          })  
        }

        <Button text="NEW TOURNAMENT"  onClick={() => this.handleAddTournament()} />

        {/* Bottom Navigation bar/>*/}
        <Navigation isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Tournaments)));


