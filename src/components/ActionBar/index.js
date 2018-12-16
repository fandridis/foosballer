import React from 'react';
// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../css/Variables';

const rotate = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05);
  }
`;

const Div = styled.div`
position: fixed;
bottom: 0;
z-index: 2;

margin-top: 10px;

width: 100%;
height: 70px;

display: flex;
justify-content: center;
align-items: center;

color: ${colors.normal.white};
font-weight: 800;
font-size: 36px;

background-color: ${props => colors.normal[props.color]};
`

const Text = styled.p`
animation: ${rotate} 0.7s linear infinite alternate;
`

const ActionBar = (props) => {
  return (
    <Div color={props.color} onClick={() => props.onClick()}>
      <Text>{props.children}</Text>
    </Div>
  );
};

// Header.propTypes = {
//   // marginTop: PropTypes.string,
// };
//
// Header.defaultProps = {
//   // marginTop: '0',
// };

export default ActionBar;
