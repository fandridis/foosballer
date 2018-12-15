import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../css/Variables';

const Div = styled.div`
position: sticky;
bottom: 0;
z-index: 2;

margin-top: 10px;

width: 100%;
height: 90px;

display: flex;
justify-content: center;
align-items: center;

color: ${colors.normal.white};
font-weight: 800;
font-size: 40px;

background-color: ${props => colors.normal[props.color]}
`

const ActionBar = (props) => {
  return (
    <Div color={props.color} onClick={() => props.onClick()}>
      {props.children}
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
