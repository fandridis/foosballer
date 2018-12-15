import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateAvatarUrl } from '../../utilities/generators';
import PlayerAvatar from '../../components/PlayerAvatar';
import Button from '../../components/CustomButton';

class PlayersCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: '',
      newPlayerAvatarUrl: '',
      isLoading: false
    }
  }

  componentDidMount() {
		console.log('this.props: ', this.props);
    this.generateAvatar();
  }

  generateAvatar = () => {
    const newPlayerAvatarUrl = generateAvatarUrl();
    this.setState({ newPlayerAvatarUrl });
  }

  onChange = event => this.setState({ newPlayerName: event.target.value });
  
  /**
   * Creates a new player in the database.
   * @method
   * @param {object} event - Contains the form event object
   */
  onSubmit = async event => {
    event.preventDefault();

    const player = {
      userRef: this.props.isAuthenticated,
      name: this.state.newPlayerName,
      rating: 1000,
      ratingSingle: 1000,
      avatarUrl: this.state.newPlayerAvatarUrl,
      wins: 0,
      losses: 0,
      singleWins: 0,
      singleLosses: 0
    }

    this.props.firebase.createPlayer(player)
      .then((res) => {
        console.log('Player added successfully: ');
        player.uid = res.id;
        this.props.globalState.addPlayer(player);
        this.setState({ newPlayerName: '', isLoading: false, }, () => {
          this.props.history.goBack();
        });
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })
  };

  onCancel = () => this.props.history.goBack();
  
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

          <Button text='Primary' />
          <Button text='Secondary' color="secondary" />
          <Button text='Orange' color="orange" />
          <Button text='Red' color="red" />
          <Button text='darkText' color="darkText" />

          <Button inverted text='Primary (inverted)' />
          <Button inverted text='Secondary (inverted)' color="secondary" />
          <Button inverted text='Orange (inverted)' color="orange" />
          <Button inverted text='Red (inverted)' color="red" />
          <Button inverted text='darkText (inverted)' color="darkText" />

        </form>

        <button onClick={() => this.onCancel()}>Cancel</button>
        <button onClick={() => this.generateAvatar()}>Shuffle me!</button>
      </Fragment>
    );
  }
}

// AddPlayer.propTypes = {
//   userRef: PropTypes.string.isRequired,
//   players: PropTypes.array.isRequired,
//   onCancel: PropTypes.func.isRequired
// };

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));
