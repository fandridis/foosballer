import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../css/Variables';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 500px;
  margin: 20px;
  padding: 30px 40px;

  box-shadow: 0 3px 6px ${props => colors.normal.greyText40};
  border-radius: 10px;

  background-color: ${props => colors.normal[props.backgroundColor]};
  color: ${props => colors.normal[props.textColor]};
  font-weigth: 500;
  font-size: 20px;
  text-align: center;
`

function InfoBox(props) {
  return (
    <Box backgroundColor={props.backgroundColor} textColor={props.textColor}>
      {props.children}
    </Box>
  )
}

InfoBox.propTypes = {
  isVisible: PropTypes.bool
}

InfoBox.defaultProps = {
  isVisible: false,
  backgroundColor: 'white',
  textColor: 'greyText'
}

export default InfoBox;

