import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Transition } from 'react-spring';

import { withGlobalState } from '../../hocs/GlobalState';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';
import TournamentRound from '../../components/TournamentRound';
import Button from '../../components/CustomButton';
import InfoBox from '../../components/InfoBox';

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

    this.setState({
      tournament: this.props.globalState.currentTournament,
      roundsAllIndexes: Object.keys(this.props.globalState.currentTournament.rounds).reverse()
    }, () => {
      console.log('this.state: ', this.state);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps: ', nextProps);

    // do things with nextProps.someProp and prevState.cachedSomeProp
    return {
      cachedSomeProp: nextProps.someProp,
    };
  }

  handleNextRound = (tournament) => {
    console.log('Moving to next round');
    this.props.globalState.moveToNextRound(tournament);
  }

  handleFinishTournament = (tournament) => {
    console.log('Finishing the tournament');
    this.props.globalState.finishTournament(tournament)
  }

  onBack = () => this.props.history.goBack();

  render() {
    console.log('Rerendering TournamentDetails');
    const currentTournament = this.props.globalState.currentTournament;
    const roundsAllIndexes = this.props.globalState.currentTournament
      ? Object.keys(this.props.globalState.currentTournament.rounds).reverse()
      : []

    return (
      <div className="TournamentsDetails-page">
        <Header>{currentTournament && currentTournament.name}</Header>

        {/* {
          currentTournament && currentTournament.winner
            ? <div className="TournamentDetais-winnerWrapper">
                <h2 className="TournamentDetais-winnerTitle">Finished! Winner:</h2>
                <h1 className="TournamentDetais-winnerName">{currentTournament.winner}</h1>
            </div>
            : ''
        } */}

        {
          currentTournament && currentTournament.winner
            ? <InfoBox>This tournament has finished! Winning team: {currentTournament.winner}</InfoBox>
            : ''
        }

        <div className="TournamentsDetails-list">
          { 
            roundsAllIndexes.map((round, i) => {
              return (
                <TournamentRound 
                  key={i}
                  round={currentTournament.rounds[round]}
                  clickable={currentTournament.winner
                    ? false
                    : currentTournament.rounds[round].number == roundsAllIndexes[0]
                      ? true
                      : false
                  }
                />
              );
            })
          }
        </div>

        <div className="TournamentsDetails-footer">
          <Button onClick={() => this.onBack()}>Back</Button>
        </div>

        {
          currentTournament && currentTournament.rounds[roundsAllIndexes.length].matchesRemaining === 0
            ? currentTournament.matchesRemaining > 0
              ? <ActionBar color="orange" onClick={() => this.handleNextRound(currentTournament)}>START NEXT ROUND</ActionBar>
              : !currentTournament.winner
                ? <ActionBar color="orange" onClick={() => this.handleFinishTournament(currentTournament)}>FINISH TOURNAMENT</ActionBar>
                : ''
            : ''
        }
      </div>
    )
  }
}

export default withRouter(withGlobalState(TournamentsDetails));


