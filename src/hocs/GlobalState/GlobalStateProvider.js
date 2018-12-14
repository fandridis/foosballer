import React from 'react';

import GlobalStateContext from './context';
import Loading from '../../components/Loading';
import { resolveMatch } from '../../utilities/manageTournament';

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

      currentTournamentId: null,
      setCurrentTournamentId: (currentTournamentId) => this.setState({ currentTournamentId }),

      currentMatchIndex: null,
      SetCurrentMatchIndex: (currentMatchIndex) => this.setState({ currentMatchIndex }),

      resolveMatch: this.resolveMatch,

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
    const { match, matchIndex, winner } = data;
    if (!match || match.winner) { return console.log('Winner already announced or no match param') }

    if (window.confirm(`You are about to mark team-${winner} as the winner.`)) { 
      const tournament = this.state.tournaments[this.state.currentTournamentId];
      const winningTeamIndex = winner === 1 ? match.team1.index : data.match.team2.index

      const updatedTournament = resolveMatch({ tournament, matchIndex, winningTeamIndex })
 
      this.setState({ ...this.state.tournaments,
        [this.state.currentTournamentId]: updatedTournament
      }, () => console.log('new globalState: ', this.state));
    }
    else {
      // console.log('No clicked!');
    }
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

