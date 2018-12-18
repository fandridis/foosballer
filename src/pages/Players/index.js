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
import Modal from '../../components/Modal';
import InfoBox from '../../components/InfoBox';

// import { colors } from '../../css/Variables';

import './index.css';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      playerTargeted: null,

      playerIdToDelete: null,

      isLoading: false,
      modalIsOpen: false
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
    this.setState({ modalIsOpen: true, playerIdToDelete: playerId })
    // this.props.firebase.removePlayer(playerId)
    //   .then(() => {
    //     console.log('Player removed successfully');
    //     const playersLeft = this.state.players.filter(player => player.uid !== playerId);
    //     this.props.globalState.setPlayers(playersLeft);
    //     this.setState({ players: playersLeft })
    // })
    //   .catch(err => console.log('err: ', err))
  }

  handleTarget = playerTargeted => {
    if (playerTargeted === this.state.playerTargeted) { playerTargeted = null}

    this.setState({ playerTargeted }) 
  }

  onConfirm = () => {
    console.log('Confirmed!');
    this.props.firebase.removePlayer(this.state.playerIdToDelete)
      .then(() => {
        console.log('Player removed successfully');
        const playersLeft = this.state.players.filter(player => player.uid !== this.state.playerIdToDelete);
        this.props.globalState.setPlayers(playersLeft);
        this.setState({ players: playersLeft, playerIdToDelete: null, modalIsOpen: false })
    })
      .catch(err => console.log('err: ', err))
  }

  onCancel = () => {
    console.log('Canceled!');
    this.setState({ playerIdToDelete: false, modalIsOpen: false })
  }


  render() {
    return (
      <div className="Players-page">
        <Header>Players Squad</Header>
        {/*<PageHeader></PageHeader>*/}

        <div className="Players-playersList">
          { this.state.players.length > 0
            ? <Transition
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

            : <InfoBox>No players available. <br /> <br /> Create one by clicking the button: <br />'NEW PLAYER'</InfoBox>
          }
        </div>

        <div className="Players-footer">
          <Button onClick={() => this.handleAddPlayer()}>NEW PLAYER</Button>
        </div>

        {/* Bottom Navigation bar/>*/}
        <MenuBar active='players'/>

        <Modal
          isOpen={this.state.modalIsOpen}
          onConfirm={() => this.onConfirm()}
          onCancel={() => this.onCancel()}
        >
          You are about to delete this player. Are you sure?
        </Modal>
      </div>
    )
  }
}

export default withRouter(withFirebase(withGlobalState(Players)));


