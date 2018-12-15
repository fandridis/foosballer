import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateTournamentName } from '../../utilities/generators';
import { calculateTeams } from '../../utilities/manageTournament';
import Button from '../../components/CustomButton';
import Divider from '../../components/Divider';
import IconButton from '../../components/IconButton';
import PlayerRow from '../../components/PlayerRow';
import Header from '../../components/Header';
import InfoBox from '../../components/InfoBox';
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
      randomTeams: true,
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
    let playerIdsSelected = [...this.state.playerIdsSelected];
    if (!playerIdsSelected.includes(playerId)) {
      playerIdsSelected.push(playerId);
    }
    else {
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

    const players = this.state.playersAll.filter(player => this.state.playerIdsSelected.indexOf(player.uid) > -1);
    const teams = calculateTeams(players);
    const tourDetails = { name: this.state.newTournamentName, type: this.state.newTournamentType }
    
    fetch("https://us-central1-foosballer-8c110.cloudfunctions.net/initializeTournament", {
      method: "POST",
      body: JSON.stringify({ 
        tourDetails: tourDetails,
        teams: teams
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('res: ', data);
      data.tourney.userRef = this.props.isAuthenticated;
      data.tourney.createdAt = Date.now();
            
      this.props.firebase.createTournament(data.tourney)
      .then((res) => {
        console.log('Tournament added successfully: ', data);
        data.tourney.uid = res.id;
        this.props.globalState.addTournament(data.tourney);
        this.setState({ isLoading: false }, () => {
          this.props.history.push(`/tournaments`);
        });
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })


    })
    .catch(err => console.log('err: ', err))
  }

  onTypeSelect = (type) => {
    console.log('type selected: ', type);
    this.setState({ newTournamentType: type });
  }

  onRandomTeamsSelect = (type) => {
    this.setState({ randomTeams: type })
  }

  onNext = () => this.setState(prevState => ({ step: prevState.step + 1 }));
  onBack = () => this.setState(prevState => ({ step: prevState.step - 1 }));
  onCancel = () => this.props.history.goBack();

  renderStepThree() {
    return (
      <div className="TournamentsCreate-page">
        <Header>New Tournament</Header>
        
        <Text>Select Tournament Type</Text>
        <Divider rounded color='primary' widthPx='120' marginBottom='30' />

        <TournamentTypes>
          <Option selected={this.state.randomTeams} onClick={() => this.onRandomTeamsSelect(true)}>Random</Option>
          <Option selected={!this.state.randomTeams} onClick={() => this.onRandomTeamsSelect(false)}>Select</Option>
        </TournamentTypes>

        {
          this.state.randomTeams
            ? <InfoBox>
                The system will generate random teams.
              </InfoBox>
            : <InfoBox>
                You will choose the players of each team.
              </InfoBox>


        }

        <div className="TournamentsCreate-footer">
          <Button onClick={() => this.onDone() }>Done</Button>
          <Button inverted onClick={() => this.onBack()}>Back</Button>
        </div>
      </div>
    )
  }
  
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
          <Button onClick={() => this.onNext()}>Next</Button>
          <Button inverted onClick={() => this.onBack()}>Back</Button>
        </div>
      </div>
    );
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

        {
          this.state.newTournamentType === 'knockout'
            ? <InfoBox>
                The classic playoffs tournament. The winning teams move to the next around, until there's only one left!
              </InfoBox>
            : this.state.newTournamentType === 'allvsall'
              ? <InfoBox>
                  Who said three players cannot play foosball? Players take turns playing one versus two. The one with the most goals wins!
                </InfoBox>
              : <InfoBox>
                  A championship style tournament. Each team plays against the rest. The team with the most wins is the champion!
                </InfoBox>

        }

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
    else if (this.state.step === 3) { return this.renderStepThree() }
  }
}

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));

