import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring';
import styled from 'styled-components'; 

import { orderByProperty } from '../../utilities/helpers';
import { withGlobalState } from '../../hocs/GlobalState';
import LeaderboardsPlayerRow from '../../components/LeaderboardsPlayerRow';
import MenuBar from '../../components/MenuBar'
import Header from '../../components/Header';

import { colors } from '../../css/Variables';

import './index.css';

const FilterTypes = styled.div`
  margin-bottom: 30px;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`

const Option = styled.div`
  width: 30%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.selected ? colors.normal.darkText : colors.normal.darkText40};
  color: white;
  font-weight: 600;
  font-size: 24px;
`

class Leaderboards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      playerTargeted: null,
      filterSelected: 'rating',

      isLoading: false,
    };
  }

  componentDidMount() {
    console.log('DidMount @ Leaderboards: ', this.props);
    const players = orderByProperty(this.props.globalState.players, 'rating', 'desc');
    console.log('ordered: ', players);

    this.setState({ players });
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players');
    // this.unsubscribeFromPlayersCollection();
  }

  filterPlayers = filter => {
    let playersBefore = this.state.players;
    let property = '';

    if (filter === 'rating') { property = 'rating' }
    else if (filter === 'wins') { property = 'wins' }
    else if (filter === 'win-ratio') { return console.log('wtf to do?') }

    let players = orderByProperty(playersBefore, property, 'desc');
    this.setState({ players });
  }

  handleTarget = playerTargeted => {
    if (playerTargeted === this.state.playerTargeted) { playerTargeted = null}

    this.setState({ playerTargeted }) 
  }

  onFilterSelect = (filter) => {
    this.setState({ filterSelected: filter });
    this.filterPlayers(filter);
  }

  render() {
    return (
      <div className="Leaderboards-page">
        <Header>Leaderboards</Header>

        <FilterTypes>
          <Option selected={this.state.filterSelected === 'rating'} onClick={() => this.onFilterSelect('rating')}>By Rating</Option>
          <Option selected={this.state.filterSelected === 'wins'} onClick={() => this.onFilterSelect('wins')}>Most wins</Option>
          <Option selected={this.state.filterSelected === 'win-ratio'} onClick={() => this.onFilterSelect('win-ratio')}>Highest Win Ratio</Option>
        </FilterTypes>

        <div className="Leaderboards-playersList">
          { this.state.players &&
            <Transition
              items={this.state.players} keys={player => player.uid}
              from={{ opacity: 0, height: 0 }}
              enter={{ opacity: 1, height: 65 }}
              leave={{ opacity: 0, height: 0 }}>
              {player => props =>
                <div style={props}>
                  <LeaderboardsPlayerRow 
                    player={player}
                    filterSelected={this.state.filterSelected}
                    onRemove={this.handleRemovePlayer}
                    onEdit={this.handleEditPlayer}
                    targeted={player.uid === this.state.playerTargeted ? true : false}    
                  />
                </div>
              }
            </Transition>
          }
        </div>

        {/* Bottom Navigation bar/>*/}
        <MenuBar active='leaderboards'/>
      </div>
    )
  }
}

export default withRouter(withGlobalState(Leaderboards));


