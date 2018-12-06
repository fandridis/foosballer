import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { colors } from '../../css/Variables';

// const BasicIconButton = styled.span`
// display: flex;
// justify-content: center;
// align-items: center;
// margin: 0 2px;
// width: 35px;
// height: 35px;
// border-radius: 50%;
// color: white;
// `

const BasicIconWrapper = styled.span`
display: flex;
justify-content: center;
align-items: center;
margin: 0 2px;
width: 35px;
height: 35px;
border-radius: 50%;
color: black;
`

// const PrimaryIconWrapper = styled(BasicIconWrapper)`
// background-color: ${colors.normal.primary};
// `
// const OrangeIconWrapper = styled(BasicIconWrapper)`
// background-color: ${colors.normal.orange};
// `

const IconButton = (props) => {
	return (
			<BasicIconWrapper onClick={() => props.onEdit()}>
				<FontAwesomeIcon 
					icon={'pencil-alt'}
					size="1x"
				/>
			</BasicIconWrapper>
	);
};

export default IconButton;