import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateTournamentName } from '../../utilities/generators';
import { calculateTeams } from '../../utilities/manageTournament';
import Button from '../../components/CustomButton';
// import Divider from '../../components/Divider';
import IconButton from '../../components/IconButton';
import PlayerRow from '../../components/PlayerRow';
import Header from '../../components/Header';
import InfoBox from '../../components/InfoBox';
import { colors } from '../../css/Variables';
import './index.css';

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
  text-align: center;
  background-color: ${props => props.selected ? colors.normal.darkText : colors.normal.darkText40};
  color: white;
  font-weight: 600;
  font-size: 24px;
`

const ExplanationWrapper = styled.div`
margin-top: 40px;
width: 90vw;
display: flex;
justify-content: center;
align-items: center;
background-color: ${colors.normal.darkText};
margin-bottom: 20px;
`
const H1 = styled.h1`
padding: 5px;
color: ${colors.normal.lightText}
`

class PlayersCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newTournamentName: '',
      newTournamentType: 'elimination',
      randomTeams: true,
      playersAll: [],
      playerIdsSelected: [],
      step: 1,
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
    /**
     * TEMPORARY CHECKS TO PREVENT SOME MODES
     * // TODO: Remove the checks when the modes are working
     */
    if (this.state.step === 3 && this.state.randomTeams !== true) { return window.alert('Sorrrrry, only random teams work.') }
    
    this.props.globalState.startLoading();
    console.log('Creating a tourney');
    console.log('this.state: ', this.state);

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
        this.props.globalState.stopLoading();
        data.tourney.uid = res.id;
        this.props.globalState.addTournament(data.tourney);

        this.props.history.push(`/tournaments`);
      })
      .catch(err => { 
        console.log('err: ', err)
        this.props.globalState.stopLoading();
      })


    })
    .catch(err => console.log('err: ', err))
  }

  onTypeSelect = (type) => this.setState({ newTournamentType: type });
  
  onRandomTeamsSelect = (type) => this.setState({ randomTeams: type })
  
  onNext = () => {
    /**
     * TEMPORARY CHECKS TO PREVENT SOME MODES
     * // TODO: Remove the checks when the modes are working
     */
    if (this.state.step === 1 && this.state.newTournamentType !== 'elimination') { return window.alert('Sorrrrry, only elimination works.') }
    if (this.state.step === 2 && this.state.playerIdsSelected.length < 4) { return window.alert('Please select more players') }
    if (this.state.step === 2 && this.state.playerIdsSelected.length % 2 !== 0) { return window.alert('Please select an even amount of players.') }
    
    this.setState(prevState => ({ step: prevState.step + 1 }))
  };
  onBack = () => this.setState(prevState => ({ step: prevState.step - 1 }));
  onCancel = () => this.props.history.goBack();

  renderStepThree() {
    return (
      <div className="TournamentsCreate-page">
        <Header>New Tournament</Header>
        
        <ExplanationWrapper>
          <H1>
            Select Teams
          </H1>
        </ExplanationWrapper>

        <TournamentTypes>
          <Option selected={this.state.randomTeams} onClick={() => this.onRandomTeamsSelect(true)}>Random</Option>
          <Option selected={!this.state.randomTeams} onClick={() => this.onRandomTeamsSelect(false)}>Manual</Option>
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

        <ExplanationWrapper>
          <H1>
            Select Participants
          </H1>
        </ExplanationWrapper>

        <div className="TournamentsCreate-playersList">
          { 
            this.state.playersAll.length > 0
            ? this.state.playersAll.map(player => {
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

            : <InfoBox>
                <div className='TournamentsCreate-infoBox'>
                  No players available. 
                  <br /> <br />
                  Go to <Link to='/players'>players tab</Link> first to create some.                
                </div>
              </InfoBox>
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
        
        <ExplanationWrapper>
          <H1>
          Select Tournament Type
          </H1>
        </ExplanationWrapper>

        <TournamentTypes>
          <Option selected={this.state.newTournamentType === 'elimination'} onClick={() => this.onTypeSelect('elimination')}>Elimination</Option>
          <Option selected={this.state.newTournamentType === 'roundRobin'} onClick={() => this.onTypeSelect('roundRobin')}>Round Robin</Option>
          <Option selected={this.state.newTournamentType === '1v1'} onClick={() => this.onTypeSelect('1v1')}>1 vs 1</Option>
        </TournamentTypes>

        {
          this.state.newTournamentType === 'elimination'
            ? <InfoBox>
                The classic playoffs tournament. The winning teams move to the next around, until there's only one left!
              </InfoBox>
            : this.state.newTournamentType === '1v1'
              ? <InfoBox>
                  For the ones that do not want to depend on their teammates. One versus one and let the best player win!
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
    if (this.props.globalState.isLoading) { return this.props.globalState.renderLoading() }

    if (this.state.step === 1) { return this.renderStepOne() }
    else if (this.state.step === 2) { return this.renderStepTwo() }
    else if (this.state.step === 3) { return this.renderStepThree() }
  }
}

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));

