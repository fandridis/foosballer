import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withGlobalState } from '../../hocs/GlobalState';
import MatchRow from './MatchRow';
import { colors } from '../../css/Variables';
import './index.css';

const RoundTitleWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${colors.normal.darkText};
margin-bottom: 20px;
`
const H1 = styled.h1`
color: ${colors.normal.lightText}
`

const TournamentRound = props => {
	console.log('Props @ TournamentRound: ', props);
	return (
		<div>
      <RoundTitleWrapper>
        <H1>
          Round {props.round.number} 
        </H1>
      </RoundTitleWrapper>
		 

		 <div className="TournamentRound">
          { 
            props.round.matches.map((match, i) => {
              return (
                <MatchRow
                  key={i}
                  index={i}
                  match={match}
                  clickable={props.clickable}
                />
              );
            })
          }
        </div>
		</div>
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

export default withGlobalState(TournamentRound);
