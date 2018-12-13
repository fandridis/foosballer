import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import dayjs from 'dayjs';

import IconButton from '../IconButton';
import Divider from '../Divider';
import MatchRow from './MatchRow';
import { colors } from '../../css/Variables';

const H1 = styled.h1`
color: ${colors.normal.darkText}
`

const TournamentRound = memo((props) => {
	console.log('Props: ', props);
	return (
		<div >
		 <H1>Round {props.roundNumber + 1}</H1>

		 <div className="TournamentRound">
          { 
            props.round.matches.map((match, i) => {
              return (
                <MatchRow
                  key={i}
                  index={i}
                  match={match}
                />
              );
            })
          }
        </div>
		</div>
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

export default TournamentRound;
