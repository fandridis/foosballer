import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from '../../components/MenuBar';

class Leaderboards extends Component {

  render() {
    return (
      <div>
        <h1>Leaderboards coming soon!</h1>
        <MenuBar active='leaderboards' />
      </div>
    )
  }
}

Leaderboards.propTypes = {
  prop: PropTypes.string
}

export default Leaderboards;
