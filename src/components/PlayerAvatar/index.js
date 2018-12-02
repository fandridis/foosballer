import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const PlayerAvatar = (props) => {

  const StyledImg = Styled.img`
  border: solid 5px white;
  border-radius: 50%;
  height: ${props.size}px;
  `

  return (
    <StyledImg src={props.url} alt="player avatar"></StyledImg>
  );
};

PlayerAvatar.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.string
};

PlayerAvatar.defaultProps = {
  size: '50',
};

export default PlayerAvatar;