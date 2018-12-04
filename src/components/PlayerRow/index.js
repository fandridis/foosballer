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

	console.log('props: ', props);

	if (props.targeted === false) {
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
	}
	else {
		return (
			<Row>
				<PlayerAvatar url={props.player.avatarUrl} />
				<PlayerDetails>
					<Name>
						OPENED
					</Name>

					<Rating>
						OPENED
					</Rating>
				</PlayerDetails>
			</Row>
		)
	}
};

PlayerRow.propTypes = {
  player: PropTypes.shape({
		avatarUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
	}),
	targeted: PropTypes.bool
};

PlayerRow.defaultProps = {
  targeted: false,
};

export default PlayerRow;



/**
 * THE SAME COMPONENT BUT AS A CLASS COMPONENT WITH OPEN/CLOSE FUNCTIONALITY
 */

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Styled from 'styled-components';

// import PlayerAvatar from '../PlayerAvatar';
// import { colors } from '../../css/Variables';

// const Row = Styled.div`
// 	position: relative;

//   width: 90vw;
// 	height: 50px;

// 	display: flex;
//   align-items: center;

//   margin-bottom: 16px;

// 	border-radius: 25px;
// 	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
	
// 	background-color: white;
// `
	
// const PlayerDetails = Styled.div`
// 	width: 100%;
// 	display: flex;
// 	justify-content: space-between;
// `

// const Name = Styled.h3`
// 	margin-left: 20px;
// 	font-weight: 700;
// 	font-size: 18px;
// 	color: ${colors.normal.darkText}
// `

// const Rating = Styled.p`
// 	margin-right: 20px;
// 	font-weight: 700;
// 	font-size: 18px;
// 	color: ${colors.normal.darkText}
// `

// class PlayerRow extends Component {

// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			actionsVisible: false
// 		}
// 	}

// 	handleToggleActions = () => this.setState(prevState => ({ actionsVisible: !prevState.actionsVisible }))

// 	render() {
// 		return (
// 			<Row onClick={() => this.handleToggleActions()}>
//       	<PlayerAvatar url={this.props.player.avatarUrl} />

// 				<PlayerDetails>
// 					<Name>
// 						{this.props.player.name}
// 						{this.state.actionsVisible ? '(open)' : '(close)'}
// 					</Name>

// 					<Rating>
// 						{this.props.player.rating} pts
// 					</Rating>
// 				</PlayerDetails>
// 			</Row>
// 		);
// 	}
// }

// PlayerRow.propTypes = {
//   player: PropTypes.shape({
// 		avatarUrl: PropTypes.string.isRequired,
// 		name: PropTypes.string.isRequired,
// 		rating: PropTypes.number.isRequired,
// 	}),
// };

// export default PlayerRow;