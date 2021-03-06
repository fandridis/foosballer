import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import IconButton from '../IconButton';
import Divider from '../Divider';
import { colors } from '../../css/Variables';


const Row = styled.div`
position: relative;
margin-bottom: 16px;
width: 95vw;
height: 120px;

display: flex;
justify-content: space-around;
align-items: space-between;

border-radius: 25px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);

// opacity: ${props => props.selectable ? props.selected ? 1 : 0.4 : 1 };
background-color: white;
// filter: grayscale(${props => props.selectable ? props.selected ? '0%' : '100%' : '0%'});
`

const LeftSide = styled.div`
margin: 20px 0 0 25px;
width: 100%;
display: flex;
flex-direction: column;
`

const RightSide = styled.div`
width: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
margin-right: 20px;
`

const Name = styled.h3`
margin: 0;
padding: 0;
font-weight: 800;
font-size: 20px;
color: ${colors.normal.darkText}
`

const Info = styled.div`
display: flex;
font-weight: 700;
font-size: 18px;
color: ${colors.normal.darkText}
`
const Text = styled.p`
// width: 160px;
font-size: 16px;
color: ${props => props.type === 'winner' ? colors.normal.primary : props.type === 'date' ? colors.normal.darkText : colors.normal.orange}
`

const Label = styled.p`
// width: 250px;
margin-right: 10px;
font-size: 16px;
color: ${colors.normal.greyText40}
`


const TournamentRow = props => {
	console.log('Props @ TournamentRow: ', props);
	return (
		<Row selectable={props.selectable} selected={props.selected} >
			<LeftSide>
				<Name>
					{props.tournament.name}
				</Name>

				<Divider color={'greyText40'} height={1.5} widthPerc='75' marginTop={'5'} marginBottom={'10'} />

				<Info>
					<Label>Started: </Label><Text type='date'>{ dayjs(props.tournament.createdAt).format('MMM DD, YYYY') || 'No date'}</Text>
				</Info>
				<Info>
					{
						!props.tournament.winner
							? <><Label>Remaining matches: </Label><Text type='remainingMatches'>{props.tournament.matchesRemaining}</Text></>
							: <><Label>Winner: </Label><Text type='winner'>{props.tournament.winner}</Text></>
					}
				</Info>
			</LeftSide>

			<RightSide>
				<IconButton icon='trophy' onClick={() => {}} />
			</RightSide>
		</Row>
	);
	
};

TournamentRow.propTypes = {
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

TournamentRow.defaultProps = {
	targeted: false,
	selectable: false,
	selected: false,
};

export default TournamentRow;
