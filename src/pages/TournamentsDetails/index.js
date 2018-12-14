import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import Header from '../../components/Header';
import TournamentRound from '../../components/TournamentRound';
import Button from '../../components/CustomButton';

import './index.css';

class TournamentsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: null,
      roundsAllIndexes: [],
      isLoading: false
    };
  }

  componentDidMount() {
    console.log('DidMount @ TournamentsDetails: ', this.props);
    console.log('editing tournament with id: ', this.props.match.params.id);
  
    // TODO: Think about a better implementation of dealing with browser back/forward buttons
    if (!this.props.location.tournament) { return this.props.history.goBack(); }

    this.props.globalState.setCurrentTournamentId(this.props.match.params.id);

    this.setState({
      tournament: this.props.location.tournament,
      roundsAllIndexes: Object.keys(this.props.location.tournament.rounds).reverse()
    }, () => {
      console.log('this.state: ', this.state);
    });
  }

  handleNextRound = () => {
    console.log('Moving to next round');
    this.props.globalState.moveToNextRound(this.state.tournament)
  }

  onBack = () => this.props.history.goBack();

  render() {
    return (
      <div className="TournamentsDetails-page">
        <Header>{this.state.tournament && this.state.tournament.name}</Header>

        <div className="TournamentsDetails-list">

          {
            this.state.tournament && this.state.tournament.rounds[this.state.roundsAllIndexes.length].matchesRemaining === 0
              ? <h2 onClick={() => this.handleNextRound()}>NEXT ROUND //TODO: Buttonify me!</h2>
              : ''
          }
          { 
            this.state.roundsAllIndexes.map((round, i) => {
              return (
                <TournamentRound 
                  key={i}
                  round={this.state.tournament.rounds[round]}
                  roundNumber={i}
                  clickable={i <= this.state.tournament.currentRound ? true : false}
                />
              );
            })
          }
        </div>

        <div className="TournamentsDetails-footer">
          <Button onClick={() => this.onBack()}>Back</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(TournamentsDetails)));


