import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateTournamentName } from '../../utilities/generators';
import Button from '../../components/CustomButton';
import Divider from '../../components/Divider';
import IconButton from '../../components/IconButton';
import PlayerRow from '../../components/PlayerRow';
import Header from '../../components/Header';
import { colors } from '../../css/Variables';
import './index.css';

const Text = styled.p`
  margin: 5px;
  font-weight: 700;
  font-size: 20px;
  color: ${colors.normal.primary}
`

const TournamentTypes = styled.div`
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

class PlayersCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newTournamentName: '',
      newTournamentType: 'knockout',
      playersAll: [],
      playerIdsSelected: [],

      step: 1,
      isLoading: false
    }
  }

  componentDidMount() {
    console.log('this.props: ', this.props);
    this.setState({ playersAll: this.props.globalState.players })
    this.generateTournamentName();
  }

  generateTournamentName = () => {
    const newTournamentName = generateTournamentName();
    this.setState({ newTournamentName });
  }

  togglePlayerSelect = (playerId) => {
    console.log('Toggle ', playerId);
    let playerIdsSelected = [...this.state.playerIdsSelected];
    if (!playerIdsSelected.includes(playerId)) {
      console.log('adding it');
      playerIdsSelected.push(playerId);
    }
    else {
      console.log('removing it')
      playerIdsSelected = playerIdsSelected.filter(id => id !== playerId);
    }

    this.setState({ playerIdsSelected });
  }

  onDone = () => {
    console.log('Creating a tourney');
    console.log('this.state: ', this.state);
    

    const tournament = {
      userRef: this.props.isAuthenticated,
      name: this.state.newTournamentName,
      createdAt: Date.now()
    }

    this.props.firebase.createTournament(tournament)
      .then((res) => {
        console.log('Tournament added successfully');
        tournament.uid = res.id;
        this.props.globalState.addTournament(tournament);
        this.setState({ isLoading: false, step: 2 }, () => { });
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })
  }

  onNext = () => this.setState(prevState => ({ step: prevState.step + 1 }));
  onBack = () => this.setState({ step: 1 });
  onCancel = () => this.props.history.goBack();
  
  renderStepTwo() {
    return (
      <div className="TournamentsCreate-page">
      <Header>New Tournament</Header>

        <div className="TournamentsCreate-nameWrapper">
          <h2 className="TournamentsCreate-name">{this.state.newTournamentName}</h2>
          <span className="TournamentsCreate-iconWrapper">
            <IconButton icon='sync-alt' size='large' borderColor='white' onClick={() => this.generateTournamentName()} />
          </span>
        </div>

        <Text>Select Participants</Text>
        <Divider rounded color='primary' widthPx='120' marginBottom='30' />
        <div className="TournamentsCreate-playersList">
          { 
            this.state.playersAll && this.state.playersAll.map(player => {
              return (
                <div
                  className={1===0 ? 'this' : 'thatclass'}
                  key={player.uid}
                  onClick={() => this.togglePlayerSelect(player.uid)}
                >
                  <PlayerRow 
                    player={player}
                    onRemove={this.handleRemovePlayer}
                    onEdit={this.handleEditPlayer}
                    selectable={true}
                    selected={this.state.playerIdsSelected.includes(player.uid)}      
                  />
                </div>          
              );
            })
          }
        </div>

        <div className="TournamentsCreate-footer">
          <Button onClick={() => this.onDone() }>Done</Button>
          <Button inverted onClick={() => this.onBack()}>Back</Button>
        </div>
      </div>
    );
  }

  onTypeSelect = (type) => {
      console.log('type selected: ', type);
      this.setState({ newTournamentType: type });
  }

  renderStepOne() {
    return (
      <div className="TournamentsCreate-page">
        <Header>New Tournament</Header>
        
        <Text>Select Tournament Type</Text>
        <Divider rounded color='primary' widthPx='120' marginBottom='30' />

        <TournamentTypes>
          <Option selected={this.state.newTournamentType === 'knockout'} onClick={() => this.onTypeSelect('knockout')}>Knockout</Option>
          <Option selected={this.state.newTournamentType === 'allvsall'} onClick={() => this.onTypeSelect('allvsall')}>All vs All</Option>
          <Option selected={this.state.newTournamentType === 'rounds'} onClick={() => this.onTypeSelect('rounds')}>Rounds</Option>
        </TournamentTypes>

        <div className="TournamentsCreate-footer">
          <Button onClick={() => this.onNext() }>Next</Button>
          <Button inverted onClick={() => this.onCancel()}>Cancel</Button>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.step === 1) { return this.renderStepOne() }
    else if (this.state.step === 2) { return this.renderStepTwo() }
  }
}

// AddPlayer.propTypes = {
//   userRef: PropTypes.string.isRequired,
//   players: PropTypes.array.isRequired,
//   onCancel: PropTypes.func.isRequired
// };

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));

