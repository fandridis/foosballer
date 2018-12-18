import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../css/Variables';
import "./index.css";

import PlayerImg from '../../assets/images/players.svg';
import TournamentsImg from '../../assets/images/futbol.svg';
import LeaderboardsImg from '../../assets/images/medal.svg';
import SettingsImg from '../../assets/images/cog.svg';

const Div = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  
  margin-top: 50px;
  margin-bottom: 60px;
  
  width: 100%;
  height: 90px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: ${props => props.color === "dark" ? colors.normal.lightText : colors.normal.darkText};
  
  font-weight: 800;
  font-size: 40px;
  
  background-color: ${props => props.color === "dark" ? colors.normal.darkText : "#fff"}
`
const DivIcon = styled(Div)`
  
`
const Img = styled.img`
  position: absolute;
  height: 60px;
  border-radius: 50%;
  padding: 30px;
  background-color: ${props => props.color === "dark" ? colors.normal.darkText : "#fff"}
`


const Header = (props) => {
  console.log(props)
  return (
    props.icon
      ? <DivIcon color={props.color} icon={props.icon}>
        <Img className="Header-icon" color={props.color} src={props.icon==="LeaderboardsImg"?LeaderboardsImg:LeaderboardsImg} alt="Icon"/>
          {props.children}
        </DivIcon>

      : <Div color={props.color} icon={props.icon}>
          {props.children}
        </Div>


  );
};

Header.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string
};
Header.defaultProps = {
  color: "light",
};

export default Header;
