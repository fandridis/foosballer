import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateAvatarUrl } from '../../utilities/generators';
import PlayerAvatar from '../../components/PlayerAvatar';
import Button from '../../components/CustomButton';
import Header from '../../components/Header';

import './index.css'

class PlayersEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: '',
      newPlayerAvatarUrl: '',
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('nextprops: ', nextProps);
  }

  componentDidMount() {
		console.log('this.props: ', this.props);
    console.log('editing user with id: ', this.props.match.params.id);

    // TODO: Think about a better implementation of dealing with browser back/forward buttons
    if (!this.props.location.player) { return this.props.history.goBack(); }

    this.setState({
      newPlayerName: this.props.location.player.name,
      newPlayerAvatarUrl: this.props.location.player.avatarUrl
    });
	}

  generateAvatar = () => {
    const newPlayerAvatarUrl = generateAvatarUrl();
    this.setState({ newPlayerAvatarUrl });
  }

  onChange = event => this.setState({ newPlayerName: event.target.value });
  
  /**
   * Update an existing player in the database.
   * @method
   * @param {object} event - Contains the form event object
   */
  onSubmit = async event => {
    const player = { ...this.props.location.player,
      name: this.state.newPlayerName,
      avatarUrl: this.state.newPlayerAvatarUrl
    }

    this.props.firebase.updatePlayer(this.props.location.player.uid, player)
      .then(() => {
        console.log('Player updated successfully');
        this.props.globalState.updatePlayer(player);
        this.setState({ newPlayerName: '', isLoading: false, }, () => {
          this.props.history.goBack();
        });
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })
  };

  onCancel = () =>  this.props.history.goBack();
  
  render() {
    return (
      <div className='PlayersEdit-page'>
        <Header>EDIT PLAYER</Header>

        <div className='PlayersEdit-avatarWrapper'>
          <PlayerAvatar className='PlayersCreate-avatar' url={this.state.newPlayerAvatarUrl} size={"90"} />
        </div>

        <Button color='orange' onClick={() => this.generateAvatar()}>Shuffle</Button>

        <div className='PlayersEdit-nameInputWrapper'>
          <input
              name='name'
              className='PlayersEdit-nameInput'
              value={this.state.newPlayerName}
              onChange={this.onChange}
              type='text'
              placeholder='Player name goes here'
            />
        </div>

        {/* <InfoBox>Every new player starts with a rating of 1000 points.</InfoBox> */}

        <div className="PlayersEdit-footer">
          <Button onClick={() => this.onSubmit() }>SAVE</Button>
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

export default withRouter(withFirebase(withGlobalState(PlayersEdit)));
