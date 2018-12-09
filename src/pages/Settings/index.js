import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from '../../components/MenuBar';

class Settings extends Component {

  render() {
    return (
      <div>
        <h1>Settings coming soon!</h1>
        <MenuBar active='settings' />
      </div>
    )
  }
}

Settings.propTypes = {
  prop: PropTypes.string
}

export default Settings;
