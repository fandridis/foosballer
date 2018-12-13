import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import IconButton from '../IconButton';
import Divider from '../Divider';
import { colors } from '../../css/Variables';

const Row = styled.div`
	margin-bottom: 16px;
	width: 95vw;
	height: 120px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: white;
	border-radius: 25px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
`

const VS = styled.div`
	height: 60px;
	width: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	background-color: ${colors.normal.primary};
	font-weight: 800;
	font-size: 64px;
`

const Team = styled.div`
	width: 40%;
	margin: 0 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	font-weight: 500;
`

const MatchRow = memo((props) => {
	console.log('Props: ', props);
	return (
		<Row>
			<Team>{props.match.team1.name}</Team>
			<VS>VS</VS>
			<Team>{props.match.team2.name || 'FREE-PASS'}</Team>
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

export default MatchRow;
