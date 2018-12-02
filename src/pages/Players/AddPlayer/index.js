import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../../hocs/Firebase';
import { generateAvatarUrl } from '../../../utilities/generators';
import PlayerAvatar from '../../../components/PlayerAvatar';

class AddPlayer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: '',
      newPlayerAvatarUrl: '',
      isLoading: false
    }
  }

  componentDidMount() {
    this.generateAvatar();
  }

  generateAvatar = () => {
    const newPlayerAvatarUrl = generateAvatarUrl();
    console.log("new url: ", newPlayerAvatarUrl);
    this.setState({ newPlayerAvatarUrl });
  }

  onChange = event => this.setState({ newPlayerName: event.target.value });
  
  /**
   * Creates a new player in the database.
   * Restrictions: The player name cannot be null and must be unique for the user.
   * @method
   * @param {object} event - Contains the form event object
   */
  onSubmit = async event => {
    event.preventDefault();

    if (this.props.players.find(player => player.name === this.state.newPlayerName)) {
      // TODO: Show an error message to the user
      return console.log('Player name already exists.');
    }

    const player = {
      userRef: this.props.userRef,
      name: this.state.newPlayerName,
      rating: 1000,
      avatarUrl: this.state.newPlayerAvatarUrl
    }

    this.props.firebase.createPlayer(player)
      .then(() => {
        console.log('Player added successfully');
        this.setState({ newPlayerName: '', isLoading: false, });
        this.props.onCancel('playerList');
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })
  };


  
  render() {
    return (
      <Fragment>
        <PlayerAvatar url={this.state.newPlayerAvatarUrl} size={"90"} />

        <form onSubmit={this.onSubmit}>
          <input
            name="name"
            value={this.state.newPlayerName}
            onChange={this.onChange}
            type="text"
            placeholder="Bob?"
          />
          <button disabled={!this.state.newPlayerName} type="submit">
            Add
        </button>

        </form>

        <button onClick={() => this.props.onCancel('playerList')}>Cancel</button>
        <button onClick={() => this.generateAvatar()}>Shuffle me!</button>
      </Fragment>
    );
  }
}

AddPlayer.propTypes = {
  userRef: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withFirebase(AddPlayer);