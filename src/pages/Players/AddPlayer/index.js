import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../../hocs/Firebase';

class AddPlayer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: '',
      isLoading: false
    }
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

    this.props.firebase.createPlayer(this.props.userRef, this.state.newPlayerName)
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