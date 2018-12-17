import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from '../../components/MenuBar';
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

  render() {
    return (
      <div className='Settings-page'>
        <Header>Settings</Header>

        <InfoBox>There will be more settings in the future. Promise!</InfoBox>

        <div className="Settings-footer">
        <Button color='orange' onClick={() => this.props.firebase.doLogout()}>Logout</Button>
        </div>
        
        <MenuBar active='settings' />
      </div>
    )
  }
}

Settings.propTypes = {
  prop: PropTypes.string
}

export default withFirebase(Settings);
