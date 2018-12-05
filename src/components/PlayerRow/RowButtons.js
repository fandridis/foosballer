import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { colors } from '../../css/Variables';

const Actions = styled.div`
display: flex;
align-items: center;
margin-right: 10px;
`

const IconWrapper = styled.span`
display: flex;
justify-content: center;
align-items: center;
margin: 0 2px;
width: 35px;
height: 35px;
border-radius: 50%;
color: white;
`

const PrimaryIconWrapper = styled(IconWrapper)`
background-color: ${colors.normal.primary};
`
const OrangeIconWrapper = styled(IconWrapper)`
background-color: ${colors.normal.orange};
`

const RowButtons = (props) => {
	return (
	  <Actions>
			<PrimaryIconWrapper onClick={() => props.onEdit()}>
				<FontAwesomeIcon 
					icon={faPencilAlt}
					size="1x"
				/>
			</PrimaryIconWrapper>

			<OrangeIconWrapper onClick={() => props.onRemove()}>
				<FontAwesomeIcon
					icon={faTrashAlt}
					size="1x" 
				/>
			</OrangeIconWrapper>
		</Actions>
	);
	
};

// PlayerRow.propTypes = {
//   player: PropTypes.shape({
// 		avatarUrl: PropTypes.string.isRequired,
// 		name: PropTypes.string.isRequired,
// 		rating: PropTypes.number.isRequired
// 	}),
// 		targeted: PropTypes.bool,
// 		onRemove: PropTypes.func,
// 		onEdit: PropTypes.func
// };

// PlayerRow.defaultProps = {
//   targeted: false,
// };

export default RowButtons;