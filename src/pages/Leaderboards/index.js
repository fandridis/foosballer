import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring';
import styled from 'styled-components'; 

import { orderByProperty, orderByCalcProperty } from '../../utilities/helpers';
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
  text-align: center;
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

  // TODO: Save the filters so it does not sort again and again
  filterPlayers = filter => {
    let playersBefore = this.state.players;
    let players = [];

    if (filter === 'rating') {
      players = orderByProperty(playersBefore, 'rating', 'desc');
    }
    else if (filter === 'wins') {
      players = orderByProperty(playersBefore, 'wins', 'desc')
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
        <Header>Leaderboards</Header>

        <FilterTypes>
          <Option selected={this.state.filterSelected === 'rating'} onClick={() => this.onFilterSelect('rating')}>By Rating</Option>
          <Option selected={this.state.filterSelected === 'wins'} onClick={() => this.onFilterSelect('wins')}>Most wins</Option>
          <Option selected={this.state.filterSelected === 'winRatio'} onClick={() => this.onFilterSelect('winRatio')}>Highest Win Ratio</Option>
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


