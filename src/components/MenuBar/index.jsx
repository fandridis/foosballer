import React from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import './index.css';
import { colors } from '../../css/Variables';

import PlayerImg from '../../assets/images/players.svg';
import TournamentsImg from '../../assets/images/futbol.svg';
import LeaderboardsImg from '../../assets/images/medal.svg';
import SettingsImg from '../../assets/images/cog.svg';

const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: space-between;

  height: 60px;
  width: 100%;

  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.15);

  background-color: ${colors.normal.primary};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
	justify-content: center;
  align-items: center;
  
  width: 25%;
  height: 100%;
  
  margin: 0;
  
  font-size: 10px;
  font-weight: 500;
  color: ${colors.normal.lightText};
`


const MenuBar = (props) => {
  console.log('props @ MenuBar: ', props);
  return (
    <Drawer>
      <Section className={props.active === '/players' ? "CurrentPage" : ""} onClick={() => props.history.push('/players')}>
        <img className="MenuBarIcon" src={PlayerImg} alt="Players"/>
        <h3 className="MenuBarText">Players</h3>
      </Section>
      <Section className={props.active === '/tournaments' ? "CurrentPage" : ""} onClick={() => props.history.push('/tournaments')}>
        <img className="MenuBarIcon" src={TournamentsImg} alt="Tournaments"/>
        <h3 className="MenuBarText">Tournaments</h3>
      </Section>
      <Section className={props.active === '/leaderboards' ? "CurrentPage" : ""} onClick={() => props.history.push('/leaderboards')}>
        <img className="MenuBarIcon" src={LeaderboardsImg} alt="Leaderboards"/>
        <h3 className="MenuBarText">Leaderboards</h3>
      </Section>
      <Section className={props.active === '/settings' ? "CurrentPage" : ""} onClick={() => props.history.push('/settings')}>
        <img className="MenuBarIcon" src={SettingsImg} alt="Settings"/>
        <h3 className="MenuBarText">Settings</h3>
      </Section>
    </Drawer>
  )
}

export default withRouter(MenuBar);
