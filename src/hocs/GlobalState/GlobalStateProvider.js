import React from 'react';

import GlobalStateContext from './context';
import Loading from '../../components/Loading';

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

      tournaments: [],
      setTournaments: (tournaments) => this.setState({ tournaments }),
      addTournament: (tournament) => this.setState(prevState => ({ tournaments: [ tournament , ...prevState.tournaments ] })),

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
    console.log('data: ', data);

    if (window.confirm(`You are about to mark team ${data.winner} as the winner.`)) { 
      console.log('Yes clicked!');

      // const updatedTournaments = []

      // this.setState({ tournaments: updatedTournaments });

    }
    else {
      console.log('No clicked!');
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

