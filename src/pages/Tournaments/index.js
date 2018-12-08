import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Navigation from '../../components/Navigation';
import Button from '../../components/CustomButton';
import Loading from '../../components/Loading';


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
    this.setState({ tournaments: this.props.globalState.tournaments });
    this.props.globalState.stopLoading();
  }

  /**
   * Open the PlayersCreate page for creating a new player.
   */
  handleAddTournament = () => { 
    return this.props.history.push('/tournaments/create')
  }
  
  /**
   * Open the PlayersEdit page for editing a player.
   */
  handleEditPlayer = player => {
    return this.props.history.push({
      pathname: `/players/edit/${player.uid}`,
      player: player
    });
  }

  /**
   * Delete a player document from the database.
   */
  handleRemovePlayer = playerId => {
    this.props.firebase.removePlayer(playerId)
      .then(() => console.log('Player removed successfully'))
      .catch(err => console.log('err: ', err))
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    if (this.props.globalState.isLoading) { return this.renderLoading(); }

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

        {/* Bottom Navigation bar */}
        <Navigation isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Tournaments)));


