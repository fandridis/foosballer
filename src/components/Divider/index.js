import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../css/Variables';

const Line = styled.div`
width: ${props => props.widthPx ? props.widthPx + 'px' : props.widthPerc + '%'};
height: ${props => props.height}px;

margin-top: ${props => props.marginTop}px;
margin-bottom: ${props => props.marginBottom}px;

border-radius: ${props => props.rounded ? props.height / 2 + 'px' : 'none'}

background-color: ${props => colors.normal[props.color]}
`

const Divider = (props) => {
  return (
    <Line
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      widthPx={props.widthPx}
      widthPerc={props.widthPerc}
      height={props.height}
      color={props.color} 
      rounded={props.rounded}
    />
  );
};

Divider.propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
	widthPx: PropTypes.string,
	widthPerc: PropTypes.string,
	heightPx: PropTypes.string,
  color: PropTypes.string,
  rounded: PropTypes.bool
};

Divider.defaultProps = {
  marginTop: '0',
  marginBottom: '10',
  widthPerc: '50',
  height: '3',
  color: 'white',
  rounded: false
};

export default Divider;
