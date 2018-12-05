import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import PlayerAvatar from '../PlayerAvatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { colors } from '../../css/Variables';

const PlayerRow = memo((props) => {

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

	const Actions = Styled.div`
	display: flex;
	align-items: center;
	margin-right: 10px;
	font-weight: 700;
	font-size: 18px;
	color: ${colors.normal.darkText}
	`

	const IconWrapper = Styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 2px;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	color: white;
	`

	const PrimaryIconWrapper = Styled(IconWrapper)`
	background-color: ${colors.normal.primary};
	`
	const OrangeIconWrapper = Styled(IconWrapper)`
	background-color: ${colors.normal.orange};
	`


	console.log('props: ', props);

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
					: <Actions>
							<PrimaryIconWrapper onClick={() => props.onEdit(props.player)}>
								<FontAwesomeIcon 
									icon={faPencilAlt}
									size="1x"
								/>
							</PrimaryIconWrapper>

							<OrangeIconWrapper onClick={() => props.onRemove(props.player.uid)}>
								<FontAwesomeIcon
									icon={faTrashAlt}
									size="1x" 
								/>
							</OrangeIconWrapper>
						</Actions>
			}
				
			</PlayerDetails>
		</Row>
	);
	
});

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