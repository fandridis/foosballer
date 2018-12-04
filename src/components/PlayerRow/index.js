import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PlayerAvatar from '../PlayerAvatar';

import { colors } from '../../css/Variables';

const PlayerRow = (props) => {

	const Row = Styled.div`
	position: relative;

  width: 90vw;
	height: 50px;

	display: flex;
  align-items: center;

  margin-bottom: 16px;

	border-radius: 25px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
	
	background-color: white;
	`
	
	const PlayerDetails = Styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	`

	const Name = Styled.h3`
	margin-left: 20px;
	font-weight: 700;
	font-size: 18px;
	color: ${colors.normal.darkText}
	`

	const Rating = Styled.p`
	margin-right: 20px;
	font-weight: 700;
	font-size: 18px;
	color: ${colors.normal.darkText}
	`

  return (
    <Row>

      <PlayerAvatar url={props.player.avatarUrl} />

			<PlayerDetails>
				<Name>
					{props.player.name}
				</Name>

				<Rating>
					{props.player.rating} pts
				</Rating>

			</PlayerDetails>
		
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