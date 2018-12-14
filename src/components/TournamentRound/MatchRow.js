import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { withGlobalState } from '../../hocs/GlobalState';
import IconButton from '../IconButton';
import Divider from '../Divider';
import { colors } from '../../css/Variables';

const Row = styled.div`
	position: relative;
	margin-bottom: 16px;
	width: 95vw;
	height: 120px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`

const VS = styled.div`
	position: absolute;
	top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	height: 70px;
	width: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	background-color: ${colors.normal.primary};
	color: ${colors.normal.darkText};
	font-weight: 800;
	font-size: 72px;
`

const Team = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 25px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
	color: ${colors.normal.darkText};
	font-size: 24px;
	font-weight: 500;
`

const TeamLeft = styled(Team)`
	background-color: ${props => props.winner ? colors.normal.secondary : 'white'};
`

const TeamRight = styled(Team)`
background-color: ${props => props.winner ? colors.normal.secondary : 'white'};
`

const MatchRow = memo((props) => {
	console.log('Props @ MatchRow: ', props);
	return (
		<Row>
			<TeamLeft 
				winner={props.match.winner === props.match.team1.index}
				onClick={() => props.globalState.resolveMatch({
					match: props.match,
					winner: 1,
					matchIndex: props.index,
					clickable: props.clickable,
					isPreviouslyResolved: props.match.winner !== null ? true : false
				})}
				>
				{props.match.team1.name}
			</TeamLeft>
			<VS>VS</VS>
			<TeamRight 
				winner={props.match.winner === props.match.team2.index}
				onClick={() => props.globalState.resolveMatch({
					match: props.match,
					winner: 2,
					matchIndex: props.index,
					clickable: props.clickable,
					isPreviouslyResolved: props.match.winner !== null ? true : false
				})}
			>
				{props.match.team2.name || 'FREE-PASS'}
			</TeamRight>
		</Row>
	);
	
});

// TournamentRow.propTypes = {
//   player: PropTypes.shape({
// 		avatarUrl: PropTypes.string.isRequired,
// 		name: PropTypes.string.isRequired,
// 		rating: PropTypes.number.isRequired,
// 	}),
// 		targeted: PropTypes.bool,
// 		selectable: PropTypes.bool,
// 		selected: PropTypes.bool,
// 		onRemove: PropTypes.func,
// 		onEdit: PropTypes.func,
// };

// TournamentRound.defaultProps = {
// 	targeted: false,
// 	selectable: false,
// 	selected: false,
// };

export default withGlobalState(MatchRow);
