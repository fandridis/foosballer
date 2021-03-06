import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Button from '../../components/CustomButton';
import TournamentRow from '../../components/TournamentRow';
import InfoBox from '../../components/InfoBox';

import './index.css';
import Header from "../../components/Header";

class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: null,
      tournamentsAllIds: [],
      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ Tournaments: ', this.props);
    this.setState({
      tournaments: this.props.globalState.tournaments,
      tournamentsAllIds: this.props.globalState.tournamentsAllIds
    });

    this.props.globalState.stopLoading();
  }

  /**
   * Open the PlayersCreate page for creating a new player.
   */
  handleAddTournament = () => { 
    return this.props.history.push('/tournaments/create');
  }
  
  /**
   * Open the TournamentsDetails page for editing a player.
   */
  handleViewTournament = tournament => {
    this.props.globalState.setCurrentTournament(tournament);

    return this.props.history.push({
      pathname: `/tournaments/${tournament.uid}`,
      tournament
    });
  }

  render() {
    if (this.props.globalState.isLoading) { return this.props.globalState.renderLoading(); }

    return (
      <div className="Tournaments-page">
        <Header color="dark" icon="TournamentsImg">Tournaments</Header>

        <div className="Tournaments-list">
          { 
            this.state.tournamentsAllIds.length > 0
            // If there are one or more tournaments
            ? this.state.tournamentsAllIds.map(tournamentId => {
              const tournament = this.state.tournaments[tournamentId];
              return (
                <div key={tournamentId} onClick={() => { this.handleViewTournament(tournament) }}>
                  
                    <TournamentRow 
                      tournament={tournament}
                    />
                  
                </div>
              );
            })
            // If there are no tournaments created
            : <InfoBox>No tournaments available. <br /> <br /> Create one by clicking the button: <br />'NEW TOURNAMENT'</InfoBox>
          }
        </div>

        <div className="Tournaments-footer">
          <Button onClick={() => this.handleAddTournament()}>NEW TOURNAMENT</Button>
        </div>

      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Tournaments)));


