import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withGlobalState } from '../../hocs/GlobalState';
import { colors } from '../../css/Variables';

const Row = styled.div`
	position: relative;
	margin-bottom: 16px;
	width: 95vw;
	height: 120px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	opacity: ${props => props.clickable ? 1 : 0.6}
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
	flex-direction: column;
	justify-content: space-evenly;

	border-radius: 25px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
	color: ${colors.normal.darkText};
	font-size: 22px;
	font-weight: 500;
`

const TeamLeft = styled(Team)`
	background-color: ${props => props.winner ? colors.normal.secondary : 'white'};
`

const TeamRight = styled(Team)`
	text-align: right;
	background-color: ${props => props.winner ? colors.normal.secondary : 'white'};
`

const PlayerName = styled.p`
color: ${colors.normal.darkText};
font-weight: 900;
padding-left: 15px;
padding-right: 15px;
`

const MatchRow = props => {
	console.log('Props @ MatchRow: ', props);
	return (
		<Row clickable={props.clickable}>
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
				<PlayerName>{props.match.team1.player1.name}</PlayerName>
				<PlayerName>{props.match.team1.player2.name}</PlayerName>
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
			{ !props.match.team2.player1
				? <PlayerName>FREE PASS</PlayerName>
				: <><PlayerName>{props.match.team2.player1.name}</PlayerName>
					<PlayerName>{props.match.team2.player2.name}</PlayerName></>
			}
			</TeamRight>
		</Row>
	);
	
};

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
