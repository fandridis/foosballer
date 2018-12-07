import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateTournamentName } from '../../utilities/generators';
import Button from '../../components/CustomButton';
import IconButton from '../../components/IconButton';

import './index.css';

class PlayersCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: '',
      newPlayerAvatarUrl: '',
      isLoading: false,

      newTournamentName: ''
    }
  }

  componentDidMount() {
		console.log('this.props: ', this.props);
    this.generateTournamentName();
  }

  generateTournamentName = () => {
    const newTournamentName = generateTournamentName();
    this.setState({ newTournamentName });
  }

  // onChange = event => this.setState({ newTournamentName: event.target.value });
  
  /**
   * Creates a new tournament in the database.
   * @method
   * @param {object} event - Contains the form event object
   */
  onSubmit = async event => {
    event.preventDefault();
    console.log('Creating a tourney');
    // const player = {
    //   userRef: this.props.isAuthenticated,
    //   name: this.state.newPlayerName,
    //   rating: 1000,
    //   avatarUrl: this.state.newPlayerAvatarUrl
    // }

    // this.props.firebase.createPlayer(player)
    //   .then(() => {
    //     console.log('Player added successfully');
    //     this.setState({ newPlayerName: '', isLoading: false, }, () => {
    //       this.props.history.goBack();
    //     });
    //   })
    //   .catch(err => { 
    //     console.log('err: ', err)
    //     this.setState({ isLoading: false });
    //   })
  };

  onCancel = () => this.props.history.goBack();
  
  render() {
    return (
      <div className="TournamentsCreate-page">

        <h2>{this.state.newTournamentName}</h2>
        
        <IconButton icon='sync-alt' onClick={() => this.generateTournamentName()} />

        <Button text='Primary' />

        <button onClick={() => this.onCancel()}>Cancel</button>
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
