import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../css/Variables';

const Div = styled.div`
position: sticky;
top: 0;
z-index: 1;

margin-bottom: 60px;

width: 100%;
height: 90px;

display: flex;
justify-content: center;
align-items: center;

color: ${colors.normal.lightText};
font-weight: 800;
font-size: 40px;

background-color: ${colors.normal.darkText}
`

const Header = (props) => {
  return (
    <Div marginTop={props.marginTop}>
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

export default Header;