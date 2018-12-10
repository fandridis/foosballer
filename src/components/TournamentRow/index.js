import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '../IconButton';
import Divider from '../Divider';
import { colors } from '../../css/Variables';


const Row = styled.div`
position: relative;

width: 95vw;
height: 120px;

display: flex;
justify-content: space-around;
align-items: space-between;

margin-bottom: 16px;

border-radius: 25px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);

// opacity: ${props => props.selectable ? props.selected ? 1 : 0.4 : 1 };
background-color: white};
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
justify-content: space-around;
align-items: flex-end;
margin-right: 20px;
`

const Name = styled.h3`
margin: 0;
padding: 0;
font-weight: 800;
font-size: 18px;
color: ${colors.normal.darkText}
`

const Info = styled.div`
display: flex;
font-weight: 700;
font-size: 18px;
color: ${colors.normal.darkText}
`
const Text = styled.p`
width: 100px;
font-size: 16px;
`

const Label = styled.p`
// width: 130px;
margin-right: 10px;
font-size: 16px;
color: ${colors.normal.greyText40}
`


const TournamentRow = memo((props) => {
	console.log('Rendering')
	return (
		<Row selectable={props.selectable} selected={props.selected} >
			<LeftSide>
				<Name>
					{props.tournament.name || 'No name'}
				</Name>

				<Divider color={'greyText40'} height={1.5} widthPerc='75' marginTop={'5'} marginBottom={'10'} />

				<Info>
					<Label>Started: </Label><Text>{props.tournament.startedAt || 'No date'}</Text>
				</Info>
				<Info>
					<Label>Games Remaining: </Label><Text>{'3'}</Text>
				</Info>
			</LeftSide>
			
			<RightSide>
				<IconButton icon='pencil-alt' onClick={() => {}} />
				<IconButton icon='trash-alt'  onClick={() => {}} />
			</RightSide>
		</Row>
	);
	
});

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
