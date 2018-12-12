import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Header from '../../components/Header';
import TournamentRound from '../../components/TournamentRound';

import './index.css';

class TournamentsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: null,
      rounds: [],
      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ TournamentsDetails: ', this.props);
    console.log('editing tournament with id: ', this.props.match.params.id);

    // TODO: Think about a better implementation of dealing with browser back/forward buttons
    if (!this.props.location.tournament) { return this.props.history.goBack(); }

    this.setState({
      tournament: this.props.location.tournament,
      rounds: Object.keys(this.props.location.tournament.rounds)
    }, () => {
      console.log('this.state: ', this.state);
    });
  }

  render() {
    return (
      <div className="TournamentsDetails-page">
        <Header>{this.state.tournament && this.state.tournament.name}</Header>

        <div className="Tournaments-list">
          { 
            this.state.rounds.map((round, i) => {
              return (
                <div key={i} onClick={() => { this.handleClickMatch(round) }}>
                  <TournamentRound 
                    round={this.state.tournament.rounds[round]}
                    roundNumber={i}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(TournamentsDetails)));


