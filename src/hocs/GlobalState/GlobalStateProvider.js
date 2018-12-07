import React from 'react';

import GlobalStateContext from './context';

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      changeUser: this.changeUser,

      players: [],
      playersListener: null,
      setPlayers: (players) => this.setState({ players }),
      setPlayerListener: (playersListener) => this.setState({ playersListener }),

      isLoading: false,
      startLoading: () => this.setState({ isLoading: true }),
      stopLoading: () => this.setState({ isLoading: false }),

      reset: this.reset
    };
  }

  changeUser = (user) => {
    if (user === this.state.user) { return; }  
    this.setState({ user });
  }

  reset = () => this.setState({ user: null, players: [] });

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export default GlobalStateProvider;

