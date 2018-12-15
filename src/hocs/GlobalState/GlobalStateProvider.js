import React from 'react';

import GlobalStateContext from './context';
import Loading from '../../components/Loading';
import { updateMatchAndTournament, calculateNextRound, finishTournament } from '../../utilities/manageTournament';

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      changeUser: this.changeUser,

      players: [],
      setPlayers: (players) => this.setState({ players }),
      addPlayer: (player) => this.setState(prevState => ({ players: [ ...prevState.players, player ] })),
      updatePlayer: (updatedPlayer) => this.setState(prevState => ( {
        players: [...prevState.players.filter(player => player.uid !== updatedPlayer.uid), updatedPlayer]
      })),

      tournaments: {},
      tournamentsAllIds: [],
      setTournaments: (tournaments) => this.setState({ tournaments }),
      setTournamentsAllIds: (tournamentsAllIds) => this.setState({ tournamentsAllIds }),
      addTournament: (tournament) => this.setState(prevState =>  ({
        tournaments: { ...prevState.tournaments, [tournament.uid]: tournament },
        tournamentsAllIds: [tournament.uid, ...prevState.tournamentsAllIds]
      })),
      _addTournament: (tournament) => this.setState(prevState => ({ tournaments: [ tournament , ...prevState.tournaments ] })),

      currentTournament: null,
      setCurrentTournament: (currentTournament) => this.setState({ currentTournament }),

      currentMatchIndex: null,
      SetCurrentMatchIndex: (currentMatchIndex) => this.setState({ currentMatchIndex }),

      resolveMatch: this.resolveMatch,
      moveToNextRound: this.moveToNextRound,
      finishTournament: this.finishTournament,

      isLoading: false,
      startLoading: () => this.setState({ isLoading: true }),
      stopLoading: () => this.setState({ isLoading: false }),

      renderLoading: () => <Loading />,
      reset: this.reset
    };
  }

  changeUser = (user) => {
    if (user === this.state.user) { return; }  
    this.setState({ user });
  }

  resolveMatch = (data) => {
    const { match, matchIndex, winner, clickable, isPreviouslyResolved } = data;

    if (!clickable || match.team2 === 'pass') { return console.log('Cannot change this.') }

    if (window.confirm(`You are about to mark team-${winner} as the winner.`)) { 
      const tournament = this.state.currentTournament;
      const winningTeamIndex = winner === 1 ? match.team1.index : data.match.team2.index

      const updatedTournament = updateMatchAndTournament({ tournament, matchIndex, winningTeamIndex, isPreviouslyResolved })
 
      this.setState({ ...this.state.tournaments,
        [this.state.currentTournament.uid]: updatedTournament
      }, () => console.log('new globalState: ', this.state));
    }
    else {
      // console.log('No clicked!');
    }
  }

  moveToNextRound = (tournament) => {
    const updatedTournament = calculateNextRound(tournament);

    this.setState({ ...this.state.tournaments,
      [this.state.currentTournament.uid]: updatedTournament
    }, () => console.log('new globalState: ', this.state));
  }

  finishTournament = (tournament) => {
    const updatedTournament = finishTournament(tournament);

    this.setState({ ...this.state.tournaments,
      [this.state.currentTournament.uid]: updatedTournament
    }, () => console.log('new globalState: ', this.state));
  }



  reset = () => this.setState({ user: null, players: [], tournaments: [], isLoading: false });

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;

