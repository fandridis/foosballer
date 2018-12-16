import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerAvatar from '../PlayerAvatar';
import { colors } from '../../css/Variables';

const Row = styled.div`
position: relative;

width: 95vw;
height: 50px;

display: flex;
align-items: center;

margin-bottom: 16px;

border-radius: 25px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);

opacity: ${props => props.selectable ? props.selected ? 1 : 0.4 : 1 };
background-color: white};
filter: grayscale(${props => props.selectable ? props.selected ? '0%' : '100%' : '0%'});
`

const PlayerDetails = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

const Name = styled.h3`
margin-left: 20px;
font-weight: 700;
font-size: 18px;
color: ${colors.normal.darkText}
`

const Rating = styled.p`
margin-right: 20px;
font-weight: 700;
font-size: 18px;
color: ${colors.normal.darkText}
`

const LeaderboardsPlayerRow = memo((props) => {
	console.log('Rendering')
	return (
		<Row selectable={props.selectable} selected={props.selected} >
			<PlayerAvatar url={props.player.avatarUrl} />

			<PlayerDetails>
				<Name>
					{props.player.name}
				</Name>

				{
				props.filterSelected === 'rating'
					? <Rating> {props.player.rating} pts </Rating>
					: props.filterSelected === 'wins'
						? <Rating> {props.player.wins} wins </Rating>
						: props.filterSelected === 'winRatio'
							? <Rating> {props.player.winRatio}%</Rating>
							: props.filterSelected === 'longestStreak'
								? <Rating> {props.player.longestStreak} wins </Rating>
								: <Rating> {props.player.rating} pts </Rating>
				}
			</PlayerDetails>
		</Row>
	);
	
});

LeaderboardsPlayerRow.propTypes = {
  player: PropTypes.shape({
		avatarUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
	}),
		targeted: PropTypes.bool,
		selectable: PropTypes.bool,
		selected: PropTypes.bool,
		onRemove: PropTypes.func,
		onEdit: PropTypes.func,
};

LeaderboardsPlayerRow.defaultProps = {
	targeted: false,
	selectable: false,
	selected: false,
};

export default LeaderboardsPlayerRow;
