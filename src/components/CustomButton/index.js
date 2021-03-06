import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../css/Variables';
import styled from 'styled-components';

const BasicButton = styled.button`
margin: 5px auto;
min-width: 250px;
height: 40px;
border-radius: 20px;
border: none;

font-family: 'Dosis', sans-serif;
font-weight: 800;
font-size: 12px;
transition: .3s;

opacity: ${props => props.disabled ? 0.5 : 1};
`

const Button = styled(BasicButton)`
	box-shadow: 0 3px 6px ${props => colors.normal[`${props.color}40`]};
	background-color: ${props => colors.normal[props.color]};
	color: ${colors.normal.lightText};

// &:hover {
// 	background: ${props => colors.darker[props.color]};
// 	cursor: pointer;
//   }
//   &:focus {
// 	background: ${props => colors.darker[props.color]};
//   }
`

const InvertedButton = styled(BasicButton)`
box-shadow: none;
border: 2px solid ${props => colors.normal[props.color]};
background-color: white;
color: ${props => colors.normal[props.color]};

// &:hover {
// 	background: ${props => colors.normal[props.color]};
// 	color: white;
// 	cursor: pointer;
//   }
//   &:focus {
// 	background: ${props => colors.darker[props.color]};
// 	color: white;
  }
`


const CustomButton = (props) => {
	return !props.inverted
		? <Button
				disabled={props.disabled}
				type={props.type}
				color={props.color}
				onClick={props.onClick}
			>
			{props.children}
			</Button>

		: <InvertedButton
				disabled={props.disabled}
				type={props.type}
				color={props.color}
				onClick={props.onClick}
			>
			{props.children}
			</InvertedButton> 
}

CustomButton.propTypes = {
	color: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	inverted: PropTypes.bool,
	onClick: PropTypes.func
};

CustomButton.defaultProps = {
	color: 'primary',
	disabled: false,
	type: 'submit',
	inverted: false
};

export default CustomButton