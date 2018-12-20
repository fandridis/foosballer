import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring';
import styled from 'styled-components'; 

import { orderByProperty, orderByCalcProperty } from '../../utilities/helpers';
import { withGlobalState } from '../../hocs/GlobalState';
import LeaderboardsPlayerRow from '../../components/LeaderboardsPlayerRow';
import Header from '../../components/Header';

import { colors } from '../../css/Variables';

import './index.css';

const FilterTypes = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`

const Option = styled.div`
  width: 25%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${props => props.selected ? colors.normal.darkText : colors.normal.darkText40};
  color: white;
  font-weight: 600;
  font-size: 14px;
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
    const players = orderByProperty(this.props.globalState.players, 'ratings.doubles', 'desc');
    console.log('ordered: ', players);

    this.setState({ players });
  }

  componentWillUnmount() {
    console.log('WillUnmount @ Players');
    // this.unsubscribeFromPlayersCollection();
  }

  // TODO: Save the filters so it does not sort again and again
  filterPlayers = filter => {
    let playersBefore = this.state.players;
    let players = [];

    if (filter === 'rating') {
      players = orderByProperty(playersBefore, 'ratings.doubles', 'desc');
    }
    else if (filter === 'wins') {
      players = orderByProperty(playersBefore, 'wins.doubles', 'desc')
    }
    else if (filter === 'longestStreak') {
      players = orderByProperty(playersBefore, 'longestStreaks.doubles', 'desc');
    }
    else if (filter === 'winRatio') {
      players = orderByCalcProperty(playersBefore, 'winRatio', 'desc');
    }

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
        <Header color="dark" icon="LeaderboardsImg">Leaderboards</Header>

        <FilterTypes>
          <Option selected={this.state.filterSelected === 'rating'} onClick={() => this.onFilterSelect('rating')}>Rating</Option>
          <Option selected={this.state.filterSelected === 'wins'} onClick={() => this.onFilterSelect('wins')}>Wins</Option>
          <Option selected={this.state.filterSelected === 'longestStreak'} onClick={() => this.onFilterSelect('longestStreak')}>Longest Streak</Option>
          <Option selected={this.state.filterSelected === 'winRatio'} onClick={() => this.onFilterSelect('winRatio')}>Win Ratio</Option>
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
        
      </div>
    )
  }
}

export default withRouter(withGlobalState(Leaderboards));


