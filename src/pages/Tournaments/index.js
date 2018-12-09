import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Navigation from '../../components/Navigation';
import Button from '../../components/CustomButton';
import Loading from '../../components/Loading';
import MenuBar from '../../components/MenuBar'


import './index.css';
import Header from "../../components/Header";

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
        <Header>Tournaments</Header>

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

        <Button onClick={() => this.handleAddTournament()}>NEW TOURNAMENT</Button>

        {/* Bottom Navigation bar */}
        <Navigation isAuthenticated={this.props.isAuthenticated} />
        <MenuBar active="tournaments"/>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Tournaments)));


