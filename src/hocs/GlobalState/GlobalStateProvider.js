import React from 'react';

import GlobalStateContext from './context';
import { withFirebase } from '../Firebase';
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

    const round = tournament.currentRound - 1;
    this.updateStats(updatedTournament, round);

    this.setState({ ...this.state.tournaments }, () => console.log('new globalState: ', this.state));
    this.props.firebase.updateTournamentObj(updatedTournament.uid, updatedTournament);
  }

  finishTournament = (tournament) => {
    const updatedTournament = finishTournament(tournament);
    const round = tournament.currentRound;
    this.updateStats(updatedTournament, round);

    this.setState({ ...this.state.tournaments }, () => console.log('new globalState: ', this.state));
    this.props.firebase.updateTournamentObj(updatedTournament.uid, updatedTournament);
  }

  updateStats(tournament, round) {
    let players = this.state.players;

    for (let match of tournament.rounds[round].matches) {
      if (match.team2 !== 'pass') {
        let player1team1 = players.find(player => player.uid === match.team1.player1.uid);
        let player2team1 = players.find(player => player.uid === match.team1.player2.uid);
        let player1team2 = players.find(player => player.uid === match.team2.player1.uid);
        let player2team2 = players.find(player => player.uid === match.team2.player2.uid);

        this.updatePlayerEverywhere(player1team1, match.team1.player1);
        this.updatePlayerEverywhere(player2team1, match.team1.player2);
        this.updatePlayerEverywhere(player1team2, match.team2.player1);
        this.updatePlayerEverywhere(player2team2, match.team2.player2);
      }
    }
  }

  updatePlayerEverywhere(oldPlayer, newPlayer) {

    oldPlayer.ratings.doubles += newPlayer.ratings.doubles || 0;
    oldPlayer.wins.doubles += newPlayer.wins.doubles || 0;
    oldPlayer.losses.doubles += newPlayer.losses.doubles || 0;
    oldPlayer.longestStreaks.doubles += newPlayer.longestStreaks.doubles || 0;
    this.props.firebase.updatePlayerObj(newPlayer.uid, oldPlayer);
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

export default withFirebase(GlobalStateProvider);

