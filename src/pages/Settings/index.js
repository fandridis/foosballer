import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../hocs/Firebase';
import Header from '../../components/Header';
import Button from '../../components/CustomButton';
import InfoBox from '../../components/InfoBox';

import './index.css';

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  resetTestPlayers() {
    this.props.firebase.resetTestPlayers();
  }

  async DeleteTestTournaments() {
    const data = await this.props.firebase.getTournaments(this.props.isAuthenticated);
      let tournaments = {};
      let tournamentsAllIds = [];

      for (let doc of data.docs) {
        tournaments[doc.id] = { ...doc.data(), uid: doc.id };
        tournamentsAllIds.push(doc.id);
      }

      for (let tournamentId of tournamentsAllIds) {
        this.props.firebase.removeTournament(tournamentId);
      }
  }

  render() {
    return (
      <div className='Settings-page'>
        <Header color="dark" icon="SettingsImg">Settings</Header>

        <InfoBox>There will be more settings in the future. Promise!</InfoBox>

        <div className="Settings-footer">
        <Button color='orange' onClick={() => this.props.firebase.doLogout()}>Logout</Button>
        {/* <Button onClick={() => this.resetTestPlayers()}>RESET TEST PLAYERS</Button>
        <Button onClick={() => this.DeleteTestTournaments()}>DELETE TEST TOURNAMENTS</Button> */}
        </div>
      
      </div>
    )
  }
}

Settings.propTypes = {
  prop: PropTypes.string
}

export default withFirebase(Settings);
