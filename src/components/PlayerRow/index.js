import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PlayerAvatar from '../PlayerAvatar';

const PlayerRow = (props) => {

	const Row = Styled.div`
	position: relative;

  width: 90vw;
	height: 40px;

  display: flex;
  align-items: center;

  margin-bottom: 15px;

  border: solid 5px white;
	border-radius: 25px;
	
	background-color: white;
  `

  const Avatar = Styled.div`
	position: absolute;
	left: -10px;
	`

	const Name = Styled.div`
	margin-left: 100px;
	color: blue;
	`

	const Rating = Styled.div`
	position: absolute;
	right: 20px;

	color: red;
	`

  return (
    <Row>
      <Avatar>
        <PlayerAvatar url={props.player.avatarUrl} />
      </Avatar>

			<Name>
				{props.player.name}
			</Name>

			 <Rating>
			 {props.player.rating} pts
			 </Rating>
    </Row>
  );
};

PlayerRow.propTypes = {
  player: PropTypes.shape({
		avatarUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
	}),
};

export default PlayerRow;