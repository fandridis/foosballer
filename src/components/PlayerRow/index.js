import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FadeIn, FadeInRight } from 'animate-css-styled-components';

import PlayerAvatar from '../PlayerAvatar';
import RowButtons from './RowButtons';
import { colors } from '../../css/Variables';

const Row = styled.div`
position: relative;
overflow: hidden;

width: 95vw;
height: 50px;

display: flex;
align-items: center;

margin-bottom: 16px;

border-radius: 25px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);

background-color: white;
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


/**
 * THE PLAYER_ROW COMPONENT
 */

const PlayerRow = memo((props) => {
	return (
		<Row>
			<PlayerAvatar url={props.player.avatarUrl} />
			<PlayerDetails>
				<Name>
					{props.player.name}
				</Name>

			{
				props.targeted === false
					? <Rating> {props.player.rating} pts </Rating>
					: <FadeInRight duration="0.3s" style={{display: 'flex', alignItems: 'center'}}>
							<RowButtons
								onEdit={() => props.onEdit(props.player)}
								onRemove={() => props.onRemove(props.player.uid)}
							/>
						</FadeInRight>
			}
				
			</PlayerDetails>
		</Row>
	);
	
});

PlayerRow.propTypes = {
  player: PropTypes.shape({
		avatarUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired
	}),
		targeted: PropTypes.bool,
		onRemove: PropTypes.func,
		onEdit: PropTypes.func
};

PlayerRow.defaultProps = {
  targeted: false,
};

export default PlayerRow;
