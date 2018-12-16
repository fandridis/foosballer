import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../css/Variables';

const BasicIconWrapper = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 2px;
	width: ${props => props.size === 'large' ? 60 : 35 }px;
	height: ${props => props.size === 'large' ? 60 : 35 }px;
	border-radius: 50%;
	transition: .3s;
`

const IconWrapper = styled(BasicIconWrapper)`
	box-shadow: ${props => props.shadow ? `0 3px 6px ${colors.normal[props.color + '40']}` : 'none'};
	border: ${props => props.size === 'large' ? '5px' : '2px'} solid ${props => colors.normal[props.borderColor]};
	background-color: ${props => colors.normal[props.color]};
	color: white;

	&:hover {
		background: ${props => colors.darker[props.color]};
		cursor: pointer;
		}
		&:focus {
		background: ${props => colors.darker[props.color]};
	}
`

const InvertedIconWrapper = styled(BasicIconWrapper)`
	box-shadow: none;
	border: 2px solid ${props => colors.normal[props.color]};
	background-color: white;
	color: ${props => colors.normal[props.color]};

	&:hover {
		background: ${props => colors.darker[props.color]};
		color: white;
		cursor: pointer;
		}
		&:focus {
		background: ${props => colors.darker[props.color]};
	}
`

const IconButton = (props) => {
	return !props.inverted 
		? <IconWrapper className={props.className} size={props.size} color={props.color} borderColor={props.borderColor} shadow={props.shadow} onClick={() => props.onClick()}>
				<FontAwesomeIcon
					icon={props.icon}
					size={props.size === 'large' ? '2x' : '1x'}
				/>
			</IconWrapper>

		: <InvertedIconWrapper className={props.className} size={props.size} color={props.color} onClick={() => props.onClick()}>
				<FontAwesomeIcon
					icon={props.icon}
					size={props.size === 'large' ? '2x' : '1x'}
				/>
			</InvertedIconWrapper>
};

IconButton.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	borderColor: PropTypes.string,
	shadow: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
	size: 'normal',
	color: 'primary',
	shadow: false
};

export default IconButton;