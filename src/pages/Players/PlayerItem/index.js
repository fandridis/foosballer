import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PlayerAvatar from '../../../components/PlayerAvatar';

const StyledDiv = Styled.div`
display: flex;
justify-content: space-around;
`

const PlayerItem = (props) => {

  return (
    <StyledDiv>
      <h2>{props.player.name}</h2>
      <p>{props.player.rating}</p>
      <PlayerAvatar url={props.player.avatarUrl} />
      
      <button onClick={() => props.onRemove(props.player.uid)}>Remove</button>
      <button onClick={() => props.onEdit(props.player)}>Edit</button>
      <button onClick={() => props.onEditTest(props.player)}>EditROUTE</button>
    </StyledDiv>
  );
};

// TODO: Require the player object to contain name, rating and uid
PlayerItem.propTypes = {
  player: PropTypes.object,
};
export default PlayerItem;