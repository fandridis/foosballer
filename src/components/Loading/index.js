import React from 'react';
import styled from 'styled-components';
import { colors } from '../../css/Variables';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Graphics from '../../assets/images/loading.png'

const Wrapper = styled.div`
width: 100vw;
height: 100vh;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

color: ${colors.normal.greyText};

background-image: url("src/assets/images/background.png")
`
const randomText = [
  "Here could be your advertisement!", 
  "Creating randomly generated feature",
  "Does anyone actually read this",
  "Ensuring everything works perfektly",
  "Field watering with the beer time!",
  "If at first you don't succeed, skydiving is not for you",
  "Only a couple of more hours!"
];
const GetRandomTextMethod = () => {
   return randomText[Math.floor(Math.random()*randomText.length)];
}

const Loading = () => {
  return (
    <Wrapper>
      {/* <img className="PageGraphics" src={Graphics} alt="graphics"></img> */}
      <FontAwesomeIcon id="LoaderIcon" icon='futbol' size='4x' color={colors.normal.primary}/>
      <h2>Loading...</h2>
      <h2 className="Loading-text">{GetRandomTextMethod()}</h2>
    </Wrapper>
  );
};

export default Loading;