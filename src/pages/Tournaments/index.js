import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Button from '../../components/CustomButton';
import MenuBar from '../../components/MenuBar'
import TournamentRow from '../../components/TournamentRow';

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
    return this.props.history.push('/tournaments/create');
  }
  
  /**
   * Open the TournamentsDetails page for editing a player.
   */
  handleViewTournament = tournament => {
    return this.props.history.push({
      pathname: `/tournaments/${tournament.uid}`,
      tournament
    });
  }

  render() {
    if (this.props.globalState.isLoading) { return this.props.globalState.renderLoading(); }

    return (
      <div className="Tournaments-page">
        <Header>Tournaments</Header>

        <div className="Tournaments-list">
          { 
            this.state.tournaments && this.state.tournaments.map(tournament => {
              return (
                <div key={tournament.uid} onClick={() => { this.handleViewTournament(tournament) }}>
                  
                    <TournamentRow 
                      tournament={tournament}
                    />
                  
                </div>
              );
            })
          }
        </div>

        <div className="Tournaments-footer">
          <Button onClick={() => this.handleAddTournament()}>NEW TOURNAMENT</Button>
        </div>

        {/* Bottom Navigation bar */}
        <MenuBar active="tournaments"/>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Tournaments)));


