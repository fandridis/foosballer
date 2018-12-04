import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { generateAvatarUrl } from '../../utilities/generators';
import PlayerAvatar from '../../components/PlayerAvatar';
import Button from '../../components/CustomButton';

class PlayersEdit extends Component {

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
    console.log('editing user with id: ', this.props.match.params.id);
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
    event.preventDefault();

    const player = {
      name: this.state.newPlayerName,
      avatarUrl: this.state.newPlayerAvatarUrl
    }

    this.props.firebase.updatePlayer(this.props.location.player.uid, player)
      .then(() => {
        console.log('Player updated successfully');
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
          
          <Button btnText='Save' />
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

export default withRouter(withFirebase(PlayersEdit));
