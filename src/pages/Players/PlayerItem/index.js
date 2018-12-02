import React from 'react';
import PropTypes from 'prop-types';

const PlayerItem = (props) => {

  return (
    <div>
      <h2>{props.player.name}</h2>
      <p>{props.player.rating}</p>
      
      <button onClick={() => props.removePlayer(props.player.uid)}>Remove</button>
    </div>
  );
};

// TODO: Require the player object to contain name, rating and uid
PlayerItem.propTypes = {
  player: PropTypes.object,
};
export default PlayerItem;