import React from 'react';
import styled from 'styled-components';
import { colors } from '../../css/Variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: ${colors.normal.lightText}
color: red;
`

const Loading = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon='trash-alt' size='4x' color={colors.normal.primary} pulse />
    </Wrapper>
  );
};

export default Loading;