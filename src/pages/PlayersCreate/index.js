import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateAvatarUrl } from '../../utilities/generators';
import PlayerAvatar from '../../components/PlayerAvatar';
import Button from '../../components/CustomButton';
import InfoBox from '../../components/InfoBox';
import Header from '../../components/Header';

import './index.css';

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
  onSubmit = () => {
    const player = {
      name: this.state.newPlayerName,
      avatarUrl: this.state.newPlayerAvatarUrl,
      userRef: this.props.isAuthenticated,
      ratings: {
        singles: 1000,
        doubles: 1000
      },
      wins: {
        singles: 0,
        doubles: 0
      },
      losses: {
        singles: 0,
        doubles: 0
      },
      longestStreaks: {
        singles: 0,
        doubles: 0
      },
      trophies: {
        singles: 0,
        doubles: 0
      }
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
      <div className='PlayersCreate-page'>
        <Header>NEW PLAYER</Header>

        <div className='PlayersCreate-avatarWrapper'>
          <PlayerAvatar className='PlayersCreate-avatar' url={this.state.newPlayerAvatarUrl} size={"90"} />
        </div>

        <Button color='orange' onClick={() => this.generateAvatar()}>Shuffle</Button>

        <div className='PlayersCreate-nameInputWrapper'>
          <input
              name='name'
              className='PlayersCreate-nameInput'
              value={this.state.newPlayerName}
              onChange={this.onChange}
              type='text'
              placeholder='Player name goes here'
            />
        </div>

        <InfoBox>Every new player starts with a rating of 1000 points.</InfoBox>

        <div className="PlayersCreate-footer">
          <Button onClick={() => this.onSubmit() }>CREATE</Button>
          <Button inverted onClick={() => this.onCancel()}>CANCEL</Button>
        </div>

      </div>
    );
  }
}

// AddPlayer.propTypes = {
//   userRef: PropTypes.string.isRequired,
//   players: PropTypes.array.isRequired,
//   onCancel: PropTypes.func.isRequired
// };

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));
