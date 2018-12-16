import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring';
// import styled from 'styled-components'; 

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import PlayerRow from '../../components/PlayerRow';
import Button from '../../components/CustomButton';
import MenuBar from '../../components/MenuBar'
import Header from '../../components/Header';

// import { colors } from '../../css/Variables';

import './index.css';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playerTargeted: null,

      isLoading: false,
    };
  }

  componentDidMount() {
    console.log('DidMount @ Players: ', this.props);
    this.setState({ players: this.props.globalState.players });
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players');
    // this.unsubscribeFromPlayersCollection();
  }

  /**
   * Open the PlayersCreate page for creating a new player.
   */
  handleAddPlayer = () => {
    console.log('Opening player page for creating');
    this.props.history.push('/players/create');
  }

  /**
   * Open the PlayersEdit page for editing a player.
   */
  handleEditPlayer = player => {
    console.log('Open player page for editing');
    this.props.history.push({
      pathname: `/players/edit/${player.uid}`,
      player
    });
  }

  /**
   * Delete a player document from the database.
   */
  handleRemovePlayer = playerId => {
    this.props.firebase.removePlayer(playerId)
      .then(() => {
        console.log('Player removed successfully');
        const playersLeft = this.state.players.filter(player => player.uid !== playerId);
        this.props.globalState.setPlayers(playersLeft);
        this.setState({ players: playersLeft })
    })
      .catch(err => console.log('err: ', err))
  }

  handleTarget = playerTargeted => {
    if (playerTargeted === this.state.playerTargeted) { playerTargeted = null}

    this.setState({ playerTargeted }) 
  }

  render() {
    return (
      <div className="Players-page">
        <Header>Players</Header>

        <div className="Players-playersList">
          { this.state.players &&
            <Transition
              items={this.state.players} keys={player => player.uid}
              from={{ opacity: 0, height: 0 }}
              enter={{ opacity: 1, height: 65 }}
              leave={{ opacity: 0, height: 0 }}>
              {player => props =>
                <div style={props} onClick={() => this.handleTarget(player.uid)}>
                  <PlayerRow 
                    player={player}
                    onRemove={this.handleRemovePlayer}
                    onEdit={this.handleEditPlayer}
                    targeted={player.uid === this.state.playerTargeted ? true : false}      
                  />
                </div>
              }
            </Transition>
          }
        </div>

        <div className="Players-footer">
          <Button onClick={() => this.handleAddPlayer()}>NEW PLAYER</Button>
        </div>

        {/* Bottom Navigation bar/>*/}
        <MenuBar active='players'/>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Players)));


